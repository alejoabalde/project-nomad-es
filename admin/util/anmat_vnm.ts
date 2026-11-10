/**
 * Fork (project-nomad-es): helpers for the ANMAT "Vademécum Nacional de
 * Medicamentos" brand package built by tools/anmat/vnm_extract.py.
 *
 * The VNM writes the generic column as "IBUPROFENO 400 MG" or
 * "PARACETAMOL 500 MG + CAFEINA 65 MG", with Argentine naming. To find the
 * Spanish leaflets (AEMPS) of the same medicine we need the bare ingredient
 * names in the AEMPS spelling: "ibuprofeno", ["paracetamol", "cafeina"].
 */
import { createHash } from 'node:crypto'

export interface VnmRecord {
  certificado: string
  laboratorio?: string
  nombre_comercial: string
  forma?: string
  presentacion?: string
  gtin?: string
  generico?: string
}

export interface ArBrandRow {
  clave: string
  certificado: string
  nombre_comercial: string
  laboratorio: string | null
  forma: string | null
  presentacion: string | null
  gtin: string | null
  generico: string | null
  ingredientes: string | null
  searchable: string
}

/** Lowercase, no accents, single spaces. */
export function foldName(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Salt and hydrate words that Argentina keeps in the generic name and AEMPS
 * usually leaves out of the active-ingredient name ("diclofenac sodico" →
 * "diclofenaco").
 */
const SALT_WORDS = new Set([
  'clorhidrato',
  'hidrocloruro',
  'diclorhidrato',
  'bromhidrato',
  'maleato',
  'sodico',
  'sodica',
  'potasico',
  'potasica',
  'calcico',
  'calcica',
  'magnesico',
  'citrato',
  'fosfato',
  'besilato',
  'mesilato',
  'tartrato',
  'succinato',
  'fumarato',
  'acetato',
  'propionato',
  'valerato',
  'dipropionato',
  'monohidrato',
  'dihidrato',
  'trihidrato',
  'anhidro',
  'anhidra',
  'base',
  'equivalente',
  'como',
  'micronizado',
])

/** Argentine name → AEMPS (Spain) name, after folding and salt removal. */
const AR_TO_ES: Record<string, string> = {
  'dipirona': 'metamizol',
  'acetaminofeno': 'paracetamol',
  'acetaminofen': 'paracetamol',
  'diclofenac': 'diclofenaco',
  'ketorolac': 'ketorolaco',
  'clorfeniramina': 'clorfenamina',
  'hioscina butilbromuro': 'butilescopolamina',
  'hioscina': 'butilescopolamina',
  'butilbromuro de hioscina': 'butilescopolamina',
  'acido acetil salicilico': 'acido acetilsalicilico',
  'vitamina c': 'acido ascorbico',
  'cafeina anhidra': 'cafeina',
  'aciclovir': 'aciclovir',
  'salbutamol sulfato': 'salbutamol',
}

/** One ingredient chunk ("DICLOFENAC SODICO 75 MG") → "diclofenaco". */
export function normalizeIngredient(chunk: string): string | null {
  let s = foldName(chunk)
  // Drop the dose: everything from the first token that starts with a digit.
  s = s.replace(/\s\d.*$/, '').replace(/^\d.*$/, '')
  s = s.replace(/[(),.;]/g, ' ').replace(/\s+/g, ' ').trim()
  if (AR_TO_ES[s]) return AR_TO_ES[s]
  const words = s.split(' ').filter((w) => w.length > 0 && !SALT_WORDS.has(w) && w !== 'de')
  s = words.join(' ')
  if (AR_TO_ES[s]) return AR_TO_ES[s]
  return s.length >= 3 ? s : null
}

/** "PARACETAMOL 500 MG + CAFEINA 65 MG" → ["paracetamol", "cafeina"]. */
export function parseVnmIngredients(generico: string | null | undefined): string[] {
  if (!generico) return []
  const out: string[] = []
  for (const chunk of generico.split('+')) {
    const name = normalizeIngredient(chunk)
    if (name && !out.includes(name)) out.push(name)
  }
  return out
}

export function vnmRecordToRow(rec: VnmRecord): ArBrandRow {
  const gtin = rec.gtin?.trim() || null
  const presentacion = rec.presentacion?.trim() || null
  const clave = createHash('sha1')
    .update(`${rec.certificado}|${gtin ?? ''}|${presentacion ?? ''}|${rec.nombre_comercial}`)
    .digest('hex')
  const ingredientes = parseVnmIngredients(rec.generico)
  return {
    clave,
    certificado: rec.certificado,
    nombre_comercial: rec.nombre_comercial.trim(),
    laboratorio: rec.laboratorio?.trim() || null,
    forma: rec.forma?.trim() || null,
    presentacion,
    gtin,
    generico: rec.generico?.trim() || null,
    ingredientes: ingredientes.length > 0 ? ingredientes.join(', ') : null,
    searchable: foldName(rec.nombre_comercial),
  }
}
