import db from '@adonisjs/lucid/services/db'
import logger from '@adonisjs/core/services/logger'
import { createReadStream } from 'node:fs'
import { createGunzip } from 'node:zlib'
import { createInterface } from 'node:readline'
import { foldName, vnmRecordToRow, type VnmRecord } from '../../util/anmat_vnm.js'
import type { ArBrandResult } from '../../types/drug_reference.js'

/**
 * Fork (project-nomad-es): Argentine brand names (ANMAT Vademécum Nacional)
 * mapped to active ingredients, so a search for an Argentine brand can point
 * to the Spanish leaflets (AEMPS) of the same ingredients.
 */
export class AnmatBrandService {
  /** Stream the package into drug_brands_ar; rows missing from it are removed. */
  async importFile(path: string): Promise<{ imported: number; removed: number }> {
    const input = path.endsWith('.gz')
      ? createReadStream(path).pipe(createGunzip())
      : createReadStream(path)
    const lines = createInterface({ input, crlfDelay: Infinity })
    const now = new Date(Math.floor(Date.now() / 1000) * 1000)
    let imported = 0
    let batch: Record<string, unknown>[] = []

    const flush = async () => {
      if (batch.length === 0) return
      await db.knexQuery().table('drug_brands_ar').insert(batch).onConflict('clave').merge()
      imported += batch.length
      batch = []
    }

    for await (const line of lines) {
      if (!line.trim()) continue
      let rec: VnmRecord & { _paquete?: string }
      try {
        rec = JSON.parse(line)
      } catch {
        continue
      }
      if (rec._paquete || !rec.certificado || !rec.nombre_comercial) continue
      batch.push({ ...vnmRecordToRow(rec), ingested_at: now })
      if (batch.length >= 500) await flush()
    }
    await flush()

    let removed = 0
    if (imported > 0) {
      const result = await db.rawQuery('DELETE FROM drug_brands_ar WHERE ingested_at < ?', [now])
      removed = Number((result as any)?.[0]?.affectedRows ?? 0)
    }
    logger.info(`[AnmatBrandService] imported ${imported} Argentine presentations (${removed} stale removed)`)
    return { imported, removed }
  }

  async rowCount(): Promise<number> {
    try {
      const result = await db.rawQuery('SELECT COUNT(*) AS cnt FROM drug_brands_ar')
      return Number((result[0] as Array<{ cnt: number | string }>)[0]?.cnt ?? 0)
    } catch {
      return 0
    }
  }

  async removeAll(): Promise<void> {
    await db.rawQuery('TRUNCATE TABLE drug_brands_ar')
  }

  /**
   * Argentine brands whose name starts with the query (or has a word that
   * does), collapsed by brand + ingredients, each with the number of Spanish
   * leaflets that cover all of its ingredients.
   */
  async search(q: string, limit = 12): Promise<ArBrandResult[]> {
    const folded = foldName(q).replace(/[%_\\]/g, '')
    if (folded.length < 3) return []
    let rows: any[]
    try {
      const result = await db.rawQuery(
        `SELECT nombre_comercial, ingredientes,
                MIN(generico) AS generico,
                MIN(laboratorio) AS laboratorio,
                COUNT(*) AS presentaciones
           FROM drug_brands_ar
          WHERE (searchable LIKE ? OR searchable LIKE ?) AND ingredientes IS NOT NULL
          GROUP BY nombre_comercial, ingredientes
          ORDER BY MAX(searchable LIKE ?) DESC, nombre_comercial ASC
          LIMIT ?`,
        [`${folded}%`, `% ${folded}%`, `${folded}%`, limit]
      )
      rows = result[0] as any[]
    } catch (err) {
      logger.warn(`[AnmatBrandService] search failed: ${err instanceof Error ? err.message : String(err)}`)
      return []
    }

    const out: ArBrandResult[] = []
    for (const row of rows) {
      let prospectos = 0
      const ingredientes = String(row.ingredientes)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
      prospectos = await this.countLeaflets(ingredientes)
      // No Spanish leaflet for the combination: offer each ingredient alone.
      const porIngrediente =
        prospectos === 0 && ingredientes.length > 1
          ? await Promise.all(
              ingredientes.map(async (nombre) => ({ nombre, prospectos: await this.countLeaflets([nombre]) }))
            )
          : []
      out.push({
        nombre_comercial: row.nombre_comercial,
        laboratorio: row.laboratorio ?? null,
        generico: row.generico ?? null,
        ingredientes,
        presentaciones: Number(row.presentaciones ?? 1),
        prospectos,
        porIngrediente,
      })
    }
    return out
  }

  /**
   * AEMPS leaflets whose searchable name has every word of every ingredient.
   * Word by word because searchable_name drops repeated tokens ("acido").
   */
  private async countLeaflets(ingredientes: string[]): Promise<number> {
    const words = [...new Set(ingredientes.flatMap((i) => i.split(/\s+/)).filter((w) => w.length >= 3))]
    if (words.length === 0) return 0
    const where = words.map(() => 'searchable_name LIKE ?').join(' AND ')
    const result = await db.rawQuery(
      `SELECT COUNT(*) AS cnt FROM drug_labels WHERE source = 'aemps' AND ${where}`,
      words.map((w) => `%${w}%`)
    )
    return Number((result[0] as Array<{ cnt: number | string }>)[0]?.cnt ?? 0)
  }
}
