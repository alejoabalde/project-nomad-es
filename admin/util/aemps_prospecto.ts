/**
 * Fork (project-nomad-es): maps one record of the AEMPS (CIMA) leaflet package
 * — built by tools/aemps/build_package.py — onto a drug_labels row.
 *
 * Spanish leaflets follow a fixed structure (Directive 2001/83/EC, art. 59):
 *   1 Qué es X y para qué se utiliza   → indications
 *   2 Qué necesita saber antes de…     → warnings (+ contraindications and
 *                                         interactions pulled out of it)
 *   3 Cómo tomar/usar X                → dosage
 *   4 Posibles efectos adversos
 *   5 Conservación
 *   6 Contenido del envase…
 * All sections are kept, in order and with their own headings, in `sections`;
 * the flat columns exist so search and the comparison view keep working.
 */
import { normalizeDrugName } from './drug_labels.js'
import { PRODUCT_TYPES } from '../types/drug_reference.js'

export interface AempsSection {
  seccion: string
  titulo: string
  texto: string
}

export interface AempsRecord {
  nregistro: string
  nombre: string | null
  principios_activos: string[]
  vtm: string | null
  laboratorio: string | null
  receta: boolean
  vias: string[]
  forma: string | null
  fecha_prospecto: string | null
  url_prospecto: string | null
  secciones: AempsSection[]
}

export interface AempsDrugLabelRow {
  set_id: string
  spl_id: null
  version: string | null
  brand_name: string | null
  generic_name: string | null
  manufacturer: string | null
  product_ndc: null
  route: string | null
  product_type: string
  searchable_name: string | null
  indications: string | null
  dosage: string | null
  warnings: string | null
  boxed_warning: null
  drug_interactions: string | null
  contraindications: string | null
  when_using: null
  stop_use: null
  source_updated_at: string | null
  source: 'aemps'
  sections: Array<{ titulo: string; texto: string }>
  source_url: string | null
}

/** CIMA route names → the openFDA route codes the "Form" filter uses. */
const ROUTE_MAP: Array<[RegExp, string]> = [
  [/ORAL|BUCAL/, 'ORAL'],
  [/SUBLINGUAL/, 'SUBLINGUAL'],
  [/CUT[AÁ]NEA|T[OÓ]PICA/, 'TOPICAL'],
  [/TRANSD[EÉ]RMICA/, 'TRANSDERMAL'],
  [/OFT[AÁ]LMICA/, 'OPHTHALMIC'],
  [/[OÓ]TICA/, 'OTIC'],
  [/NASAL/, 'NASAL'],
  [/INHALATORIA|RESPIRATORIA/, 'INHALATION'],
  [/RECTAL/, 'RECTAL'],
  [/VAGINAL/, 'VAGINAL'],
  [/DENTAL/, 'DENTAL'],
  [/INTRAVENOSA/, 'INTRAVENOUS'],
  [/INTRAMUSCULAR/, 'INTRAMUSCULAR'],
  [/SUBCUT[AÁ]NEA/, 'SUBCUTANEOUS'],
]

export function mapAempsRoutes(vias: string[]): string | null {
  const out: string[] = []
  for (const via of vias) {
    const upper = via.toUpperCase()
    // SUBCUTÁNEA contains CUTÁNEA; check it first.
    const hit = /SUBCUT[AÁ]NEA/.test(upper)
      ? 'SUBCUTANEOUS'
      : ROUTE_MAP.find(([re]) => re.test(upper))?.[1]
    if (hit && !out.includes(hit)) out.push(hit)
  }
  return out.length > 0 ? out.join(', ') : null
}

/** A short line that reads like a sub-heading inside section 2. */
function isSubheading(line: string): boolean {
  return line.length <= 90 && !line.startsWith('•') && !/[.:;,]$/.test(line.trim())
}

/**
 * Pull the lines under the first sub-heading that matches `start` until the
 * next sub-heading. Returns null when no such heading exists.
 */
export function extractSubsection(text: string, start: RegExp): string | null {
  const lines = text.split('\n')
  const from = lines.findIndex((l) => isSubheading(l) && start.test(l))
  if (from === -1) return null
  const body: string[] = []
  for (let i = from + 1; i < lines.length; i++) {
    if (isSubheading(lines[i])) break
    body.push(lines[i])
  }
  const joined = body.join('\n').trim()
  return joined.length > 0 ? joined : null
}

function sectionText(rec: AempsRecord, n: string): string | null {
  const s = rec.secciones.find((x) => x.seccion === n)
  return s && s.texto.trim().length > 0 ? s.texto : null
}

export function aempsRecordToRow(rec: AempsRecord): AempsDrugLabelRow {
  const generic =
    rec.vtm?.trim() ||
    (rec.principios_activos.length > 0 ? rec.principios_activos.join(', ').toLowerCase() : null)
  const before = sectionText(rec, '2')

  return {
    set_id: `aemps:${rec.nregistro}`,
    spl_id: null,
    version: rec.fecha_prospecto,
    brand_name: rec.nombre,
    generic_name: generic,
    manufacturer: rec.laboratorio,
    product_ndc: null,
    route: mapAempsRoutes(rec.vias),
    product_type: rec.receta ? PRODUCT_TYPES.RX : PRODUCT_TYPES.OTC,
    searchable_name: normalizeDrugName(rec.nombre, [generic, ...rec.principios_activos].join(' ')),
    indications: sectionText(rec, '1'),
    dosage: sectionText(rec, '3'),
    warnings: before,
    boxed_warning: null,
    drug_interactions: before
      ? extractSubsection(before, /otros medicamentos|con otros|interacci/i)
      : null,
    contraindications: before ? extractSubsection(before, /^(no (tome|use|utilice|debe|aplique|administre))/i) : null,
    when_using: null,
    stop_use: null,
    source_updated_at: rec.fecha_prospecto,
    source: 'aemps',
    sections: rec.secciones
      .filter((s) => s.texto.trim().length > 0)
      .map((s) => ({ titulo: s.titulo, texto: s.texto })),
    source_url: rec.url_prospecto,
  }
}
