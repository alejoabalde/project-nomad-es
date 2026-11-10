import db from '@adonisjs/lucid/services/db'
import logger from '@adonisjs/core/services/logger'
import { createReadStream } from 'node:fs'
import { createGunzip } from 'node:zlib'
import { createInterface } from 'node:readline'
import { aempsRecordToRow, type AempsRecord } from '../../util/aemps_prospecto.js'

/**
 * Fork (project-nomad-es): imports the Spanish leaflet package (CIMA/AEMPS)
 * built by tools/aemps/build_package.py into drug_labels, as `source='aemps'`
 * rows. Idempotent: the upsert key is set_id (`aemps:<nregistro>`).
 *
 * Prototype stage: run by hand with `node ace drugs:import-aemps <file>`.
 */
export class AempsDrugImportService {
  async importFile(path: string): Promise<{ imported: number; skipped: number }> {
    const input = path.endsWith('.gz')
      ? createReadStream(path).pipe(createGunzip())
      : createReadStream(path)
    const lines = createInterface({ input, crlfDelay: Infinity })

    let imported = 0
    let skipped = 0
    let batch: Record<string, unknown>[] = []
    const now = new Date()

    const flush = async () => {
      if (batch.length === 0) return
      await db.knexQuery().table('drug_labels').insert(batch).onConflict('set_id').merge()
      imported += batch.length
      batch = []
    }

    for await (const line of lines) {
      if (!line.trim()) continue
      const rec = JSON.parse(line) as AempsRecord & { _paquete?: string }
      if (rec._paquete) continue // header line
      if (!rec.nregistro || !Array.isArray(rec.secciones) || rec.secciones.length === 0) {
        skipped++
        continue
      }
      const row = aempsRecordToRow(rec)
      batch.push({ ...row, sections: JSON.stringify(row.sections), ingested_at: now })
      if (batch.length >= 200) await flush()
    }
    await flush()

    logger.info(`[AempsDrugImportService] imported ${imported} AEMPS leaflets (${skipped} skipped)`)
    return { imported, skipped }
  }
}
