import db from '@adonisjs/lucid/services/db'
import logger from '@adonisjs/core/services/logger'
import { createReadStream } from 'node:fs'
import { createGunzip } from 'node:zlib'
import { createInterface } from 'node:readline'
import { aempsRecordToRow, type AempsRecord } from '../../util/aemps_prospecto.js'
import { summarizeJobError } from '../../util/drug_labels.js'
import KVStore from '#models/kv_store'
import { ImportAempsDataJob, type AempsJobData } from '#jobs/import_aemps_data_job'
import type { AempsDataStatus } from '../../types/drug_reference.js'

/**
 * Fork (project-nomad-es): imports the Spanish leaflet package (CIMA/AEMPS)
 * built by tools/aemps/build_package.py into drug_labels, as `source='aemps'`
 * rows. Idempotent: the upsert key is set_id (`aemps:<nregistro>`).
 *
 * Used by ImportAempsDataJob (the in-app download) and by
 * `node ace drugs:import-aemps <file>` for a package already on disk.
 */

/** Header line the package builder writes first. */
export interface AempsPackageHeader {
  _paquete: 'aemps-prospectos'
  fuente?: string
  url?: string
  generado?: string
}

export interface AempsImportProgress {
  imported: number
  skipped: number
}

export class AempsDrugImportService {
  /**
   * Stream the package into drug_labels. Rows left over from an older package
   * (a medicine no longer marketed) are removed at the end, so a re-import
   * mirrors the package exactly.
   */
  async importFile(
    path: string,
    onProgress?: (p: AempsImportProgress) => Promise<void> | void
  ): Promise<{ imported: number; skipped: number; removed: number; header: AempsPackageHeader | null }> {
    const input = path.endsWith('.gz')
      ? createReadStream(path).pipe(createGunzip())
      : createReadStream(path)
    const lines = createInterface({ input, crlfDelay: Infinity })

    let imported = 0
    let skipped = 0
    let header: AempsPackageHeader | null = null
    let batch: Record<string, unknown>[] = []
    // Second precision, as stored by MySQL DATETIME — used to drop stale rows.
    const now = new Date(Math.floor(Date.now() / 1000) * 1000)

    const flush = async () => {
      if (batch.length === 0) return
      await db.knexQuery().table('drug_labels').insert(batch).onConflict('set_id').merge()
      imported += batch.length
      batch = []
      if (onProgress) await onProgress({ imported, skipped })
    }

    for await (const line of lines) {
      if (!line.trim()) continue
      let rec: AempsRecord & { _paquete?: string }
      try {
        rec = JSON.parse(line)
      } catch {
        skipped++
        continue
      }
      if (rec._paquete) {
        header = rec as unknown as AempsPackageHeader
        continue
      }
      if (!rec.nregistro || !Array.isArray(rec.secciones) || rec.secciones.length === 0) {
        skipped++
        continue
      }
      const row = aempsRecordToRow(rec)
      batch.push({ ...row, sections: JSON.stringify(row.sections), ingested_at: now })
      if (batch.length >= 200) await flush()
    }
    await flush()

    let removed = 0
    if (imported > 0) {
      const result = await db.rawQuery(
        "DELETE FROM drug_labels WHERE source = 'aemps' AND (ingested_at IS NULL OR ingested_at < ?)",
        [now]
      )
      removed = Number((result as any)?.[0]?.affectedRows ?? 0)
    }

    logger.info(
      `[AempsDrugImportService] imported ${imported} AEMPS leaflets (${skipped} skipped, ${removed} stale removed)`
    )
    return { imported, skipped, removed, header }
  }

  /** Number of AEMPS rows currently searchable. */
  async rowCount(): Promise<number> {
    try {
      const result = await db.rawQuery("SELECT COUNT(*) AS cnt FROM drug_labels WHERE source = 'aemps'")
      const rows = result[0] as Array<{ cnt: number | string }>
      return Number(rows[0]?.cnt ?? 0)
    } catch {
      return 0
    }
  }

  /** Remove every AEMPS row; FDA rows are left alone. */
  async removeAll(): Promise<number> {
    const result = await db.rawQuery("DELETE FROM drug_labels WHERE source = 'aemps'")
    return Number((result as any)?.[0]?.affectedRows ?? 0)
  }

  /** Start the download + import (idempotent). */
  async triggerDownload() {
    return ImportAempsDataJob.dispatch()
  }

  /** Remove every AEMPS row and forget the package date. */
  async uninstall(): Promise<number> {
    const job = await ImportAempsDataJob.getJob()
    if (job) {
      const state = await job.getState()
      if (state === 'active' || state === 'waiting' || state === 'delayed') {
        throw new Error('The AEMPS package is still being installed')
      }
    }
    const removed = await this.removeAll()
    await KVStore.clearValue('drugReference.aempsPackageDate')
    return removed
  }

  async getStatus(): Promise<AempsDataStatus> {
    const [job, rowCount, packageDate] = await Promise.all([
      ImportAempsDataJob.getJob().catch(() => undefined),
      this.rowCount(),
      KVStore.getValue('drugReference.aempsPackageDate'),
    ])
    const base = { rowCount, packageDate: packageDate ?? null }
    const state = job ? await job.getState() : undefined
    const data = (job?.data ?? {}) as AempsJobData

    if (state === 'active' || state === 'waiting' || state === 'delayed') {
      return {
        ...base,
        phase: data.phase === 'importing' ? 'importing' : 'downloading',
        bytesDownloaded: data.bytesDownloaded,
        totalBytes: data.totalBytes,
        imported: data.imported,
      }
    }
    if (state === 'failed') {
      return { ...base, phase: 'failed', error: summarizeJobError(job?.failedReason) }
    }
    return { ...base, phase: rowCount > 0 ? 'ready' : 'idle' }
  }
}
