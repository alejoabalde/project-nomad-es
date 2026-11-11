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
  'micronizada',
  'trometamina',
  'trometamol',
  'monohidratado',
  'monohidratada',
  'dihidratada',
  'trihidratado',
  'trihidratada',
  'dihidratado',
  'hidratado',
  'hidratada',
  'diclorohidrato',
  'propinato',
  'hidroxinaftoato',
  'disodico',
  'trisodico',
  'hemitartrato',
  'acetonida',
  'acetonido',
  'digluconato',
  'etilsuccinato',
  'cilexetil',
  'policristalina',
  'solucion',
])

/** Argentine name → AEMPS (Spain) name, after folding and salt removal. */
const AR_TO_ES: Record<string, string> = {
  'dipirona': 'metamizol',
  'acetaminofeno': 'paracetamol',
  'acetaminofen': 'paracetamol',
  'clorfeniramina': 'clorfenamina',
  'hioscina butilbromuro': 'butilescopolamina',
  'hioscina': 'butilescopolamina',
  'butilbromuro de hioscina': 'butilescopolamina',
  'acido acetil salicilico': 'acido acetilsalicilico',
  'vitamina c': 'acido ascorbico',
  'cafeina anhidra': 'cafeina',
  'aciclovir': 'aciclovir',
  'salbutamol sulfato': 'salbutamol',
  'iodopovidona': 'povidona iodada',
  'yodopovidona': 'povidona iodada',
  'povidona yodada': 'povidona iodada',
  'acetilcisteina': 'acetilcisteina',
  'n butilbromuro hioscina': 'butilescopolamina',
  'butilbromuro hioscina': 'butilescopolamina',
}

/**
 * Regular spelling differences, applied word by word (Argentina → Spain):
 * nifedipina → nifedipino, ciprofloxacina → ciprofloxacino, vildagliptin →
 * vildagliptina, atorvastatin → atorvastatina, entacapone → entacapona,
 * diclofenac → diclofenaco.
 */
const SUFFIXES: Array<[RegExp, string]> = [
  [/dipina$/, 'dipino'],
  [/floxacina$/, 'floxacino'],
  [/gliptin$/, 'gliptina'],
  [/statin$/, 'statina'],
  [/capone$/, 'capona'],
  [/(fenac|rolac)$/, '$1o'],
]

function spainSpelling(word: string): string {
  for (const [re, to] of SUFFIXES) {
    if (re.test(word)) return word.replace(re, to)
  }
  return word
}

/** One ingredient chunk ("DICLOFENAC SODICO 75 MG") → "diclofenaco". */
export function normalizeIngredient(chunk: string): string | null {
  let s = foldName(chunk)
  // Drop the dose: everything from the first token that starts with a digit.
  s = s.replace(/\s\d.*$/, '').replace(/^\d.*$/, '')
  s = s.replace(/[(),.;]/g, ' ').replace(/\s+/g, ' ').trim()
  // "N-ACETILCISTEINA", "L-CISTINA": drop the stereo/position prefix.
  s = s.replace(/(^|\s)[nld]-/g, '$1')
  if (AR_TO_ES[s]) return AR_TO_ES[s]
  // Amoxicillin combinations spell the second ingredient several ways.
  if (/clavulan/.test(s)) return 'acido clavulanico'
  const words: string[] = []
  for (const w of s.split(' ')) {
    const sw = spainSpelling(w)
    if (sw.length > 0 && !SALT_WORDS.has(sw) && sw !== 'de' && !words.includes(sw)) words.push(sw)
  }
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

/** Trim and cut to the column width (drug_brands_ar); empty → null. */
function fit(v: string | null | undefined, max: number): string | null {
  const t = v?.trim()
  return t ? t.slice(0, max) : null
}

export function vnmRecordToRow(rec: VnmRecord): ArBrandRow {
  const gtin = fit(rec.gtin, 20)
  const presentacion = fit(rec.presentacion, 255)
  const nombre = fit(rec.nombre_comercial, 255) ?? ''
  const clave = createHash('sha1')
    .update(`${rec.certificado}|${gtin ?? ''}|${presentacion ?? ''}|${nombre}`)
    .digest('hex')
  // Sorted so the same combination written in another order groups together.
  const ingredientes = parseVnmIngredients(rec.generico).sort()
  return {
    clave,
    certificado: rec.certificado.slice(0, 16),
    nombre_comercial: nombre,
    laboratorio: fit(rec.laboratorio, 255),
    forma: fit(rec.forma, 128),
    presentacion,
    gtin,
    generico: fit(rec.generico, 512),
    ingredientes: ingredientes.length > 0 ? ingredientes.join(', ').slice(0, 512) : null,
    searchable: foldName(nombre),
  }
}
