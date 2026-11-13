import { Job } from 'bullmq'
import { rm } from 'node:fs/promises'
import path from 'node:path'
import logger from '@adonisjs/core/services/logger'
import { QueueService } from '#services/queue_service'
import { doResumableDownload } from '../utils/downloads.js'

/**
 * Fork (project-nomad-es): download + import of the Spanish leaflet package
 * (CIMA, Agencia Española de Medicamentos y Productos Sanitarios).
 *
 * The package is built offline by tools/aemps/build_package.py and published
 * on the fork's `datos` branch (no history; replaced on each update), so the device never queries CIMA itself.
 * One job does both steps: a resumable download of a single ~60 MB .jsonl.gz,
 * then a streamed upsert into drug_labels (source='aemps'). Its own queue and
 * storage dir keep it apart from the FDA chain, whose uninstall wipes
 * /app/storage/drug-data.
 */
export const AEMPS_STORAGE_BASE = '/app/storage/drug-data-aemps'
export const AEMPS_PACKAGE_URL =
  process.env.NOMAD_AEMPS_PACKAGE_URL ||
  'https://raw.githubusercontent.com/alejoabalde/project-nomad-es/datos/aemps-prospectos.jsonl.gz'

/**
 * Argentine brands (ANMAT Vademécum Nacional), built by
 * tools/anmat/vnm_extract.py and published next to the leaflets. Optional: if
 * it is missing the leaflets still install.
 */
export const ANMAT_PACKAGE_URL =
  process.env.NOMAD_ANMAT_PACKAGE_URL ||
  'https://raw.githubusercontent.com/alejoabalde/project-nomad-es/datos/anmat-vnm.jsonl.gz'

/**
 * Small file written on every publish of the `datos` branch (see
 * tools/datos/publicar.py): lets the Data tab say when newer data is out.
 */
export const DATOS_VERSION_URL =
  process.env.NOMAD_DATOS_VERSION_URL ||
  'https://raw.githubusercontent.com/alejoabalde/project-nomad-es/datos/paquetes.json'

export type AempsJobPhase = 'downloading' | 'importing' | 'brands' | 'done'

export interface AempsJobData {
  phase?: AempsJobPhase
  bytesDownloaded?: number
  totalBytes?: number
  imported?: number
  startedAt?: number
}

export class ImportAempsDataJob {
  static get queue() {
    return 'drug-aemps'
  }

  static get key() {
    return 'import-aemps-data'
  }

  static get jobId() {
    return 'aemps-data-import'
  }

  /** Idempotent: returns the running job instead of starting a second one. */
  static async dispatch() {
    const queue = QueueService.getInstance().getQueue(this.queue)
    const existing = await queue.getJob(this.jobId)
    if (existing) {
      const state = await existing.getState()
      if (state === 'active' || state === 'waiting' || state === 'delayed') {
        return { job: existing, created: false, message: 'AEMPS import already running' }
      }
      try {
        await existing.remove()
      } catch {
        // Best-effort; add() below surfaces a real conflict.
      }
    }
    const job = await queue.add(
      this.key,
      { startedAt: Date.now() } satisfies AempsJobData,
      {
        jobId: this.jobId,
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 },
        removeOnComplete: { count: 3 },
        removeOnFail: { count: 3 },
      }
    )
    return { job, created: true, message: 'AEMPS import dispatched' }
  }

  static async getJob(): Promise<Job | undefined> {
    return QueueService.getInstance().getQueue(this.queue).getJob(this.jobId)
  }

  async handle(job: Job) {
    const startedAt = (job.data as AempsJobData).startedAt ?? Date.now()
    const filepath = path.join(AEMPS_STORAGE_BASE, 'aemps-prospectos.jsonl.gz')
    // Which publish of the `datos` branch this install comes from (best effort).
    const { fetchDatosVersion } = await import('#services/aemps_drug_import_service')
    const publish = await fetchDatosVersion(true)

    // 1) Download (resumes from the .tmp after a worker restart).
    await job.updateData({ phase: 'downloading', bytesDownloaded: 0, startedAt } satisfies AempsJobData)
    logger.info(`[ImportAempsDataJob] downloading ${AEMPS_PACKAGE_URL}`)
    let lastWrite = 0
    try {
      await doResumableDownload({
        url: AEMPS_PACKAGE_URL,
        filepath,
        timeout: 60000,
        allowedMimeTypes: [], // GitHub serves the raw .gz as application/octet-stream
        onProgress: async ({ downloadedBytes, totalBytes }) => {
          const now = Date.now()
          if (now - lastWrite < 1000) return
          lastWrite = now
          await job.updateData({
            phase: 'downloading',
            bytesDownloaded: downloadedBytes,
            totalBytes,
            startedAt,
          } satisfies AempsJobData)
        },
      })
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      if (/ENOTFOUND|ECONNREFUSED|ECONNRESET|EAI_AGAIN|fetch failed/.test(msg)) {
        throw new Error(`No internet connection: could not download the AEMPS package. (${msg})`)
      }
      throw err
    }

    // 2) Import.
    await job.updateData({ phase: 'importing', imported: 0, startedAt } satisfies AempsJobData)
    const { AempsDrugImportService } = await import('#services/aemps_drug_import_service')
    const result = await new AempsDrugImportService().importFile(filepath, async ({ imported }) => {
      await job.updateData({ phase: 'importing', imported, startedAt } satisfies AempsJobData)
    })
    if (result.imported === 0) {
      throw new Error('The AEMPS package had no leaflets to import')
    }

    const KVStore = (await import('#models/kv_store')).default
    await KVStore.setValue(
      'drugReference.aempsPackageDate',
      result.header?.generado ?? new Date().toISOString()
    )

    if (publish) {
      await KVStore.setValue('drugReference.datosPublished', publish.published)
    } else {
      await KVStore.clearValue('drugReference.datosPublished')
    }

    // The rows are in the database; the package is not needed on disk anymore.
    await rm(filepath, { force: true })

    // 3) Argentine brands (optional).
    await job.updateData({ phase: 'brands', imported: result.imported, startedAt } satisfies AempsJobData)
    const brandsPath = path.join(AEMPS_STORAGE_BASE, 'anmat-vnm.jsonl.gz')
    try {
      await doResumableDownload({
        url: ANMAT_PACKAGE_URL,
        filepath: brandsPath,
        timeout: 60000,
        allowedMimeTypes: [],
      })
      const { AnmatBrandService } = await import('#services/anmat_brand_service')
      await new AnmatBrandService().importFile(brandsPath)
    } catch (err) {
      logger.warn(
        `[ImportAempsDataJob] Argentine brands not installed: ${err instanceof Error ? err.message : String(err)}`
      )
    } finally {
      await rm(brandsPath, { force: true })
      await rm(brandsPath + '.tmp', { force: true })
    }
    await job.updateData({ phase: 'done', imported: result.imported, startedAt } satisfies AempsJobData)
    logger.info(`[ImportAempsDataJob] done: ${result.imported} leaflets`)
    return result
  }
}
