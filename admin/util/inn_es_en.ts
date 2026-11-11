/**
 * Fork (project-nomad-es): best-effort Spanish → English name of an active
 * ingredient, to find the FDA label (English) of an Argentine brand when there
 * is no Spanish leaflet. International nonproprietary names follow regular
 * patterns between the two languages (loratadina → loratadine, prednisona →
 * prednisone, furosemida → furosemide); the common exceptions are listed.
 * A wrong guess simply finds nothing, so this never invents a match: the
 * caller only offers the FDA link when labels are actually found.
 */

const SPECIAL: Record<string, string> = {
  'paracetamol': 'acetaminophen',
  'acido acetilsalicilico': 'aspirin',
  'metamizol': 'metamizole',
  'cafeina': 'caffeine',
  'clorfenamina': 'chlorpheniramine',
  'fenilefrina': 'phenylephrine',
  'difenhidramina': 'diphenhydramine',
  'dextrometorfano': 'dextromethorphan',
  'salbutamol': 'albuterol',
  'doxiciclina': 'doxycycline',
  'doxilamina': 'doxylamine',
  'colecalciferol vitamina d3': 'cholecalciferol',
  'adrenalina': 'epinephrine',
  'noradrenalina': 'norepinephrine',
  'levotiroxina': 'levothyroxine',
  'acido ascorbico': 'ascorbic acid',
  'vitamina c': 'ascorbic acid',
  'hierro': 'iron',
  'zinc': 'zinc',
  'povidona iodada': 'povidone-iodine',
  'butilescopolamina': 'scopolamine',
  'escopolamina': 'scopolamine',
  'hioscina': 'scopolamine',
  'lidocaina': 'lidocaine',
  'benzocaina': 'benzocaine',
  'oximetazolina': 'oxymetazoline',
  'nafazolina': 'naphazoline',
  'tetrizolina': 'tetrahydrozoline',
  'mentol': 'menthol',
  'alcanfor': 'camphor',
  'glicerina': 'glycerin',
  'vaselina': 'petrolatum',
  'oxido de zinc': 'zinc oxide',
  'hidroxido de aluminio': 'aluminum hydroxide',
  'hidroxido de magnesio': 'magnesium hydroxide',
  'bicarbonato de sodio': 'sodium bicarbonate',
  'simeticona': 'simethicone',
  'loperamida': 'loperamide',
  'bisacodilo': 'bisacodyl',
  'sen': 'senna',
  'senosidos': 'sennosides',
  'clotrimazol': 'clotrimazole',
  'miconazol': 'miconazole',
  'ketoconazol': 'ketoconazole',
  'nistatina': 'nystatin',
  'eritromicina': 'erythromycin',
  'clindamicina': 'clindamycin',
  'peroxido de benzoilo': 'benzoyl peroxide',
  'acido salicilico': 'salicylic acid',
}

/** Word endings, Spanish → English, first match wins. */
const ENDINGS: Array<[RegExp, string]> = [
  [/cilina$/, 'cillin'],
  [/ciclina$/, 'cycline'],
  [/micina$/, 'mycin'],
  [/floxacino$/, 'floxacin'],
  [/dipino$/, 'dipine'],
  [/statina$/, 'statin'],
  [/gliptina$/, 'gliptin'],
  [/azol$/, 'azole'],
  [/cina$/, 'cin'],
  [/ina$/, 'ine'],
  [/ima$/, 'ime'],
  [/ona$/, 'one'],
  [/ida$/, 'ide'],
  [/ato$/, 'ate'],
  [/eno$/, 'en'],
  [/aco$/, 'ac'],
  [/ilo$/, 'yl'],
]

function word(w: string): string {
  let out = w
  for (const [re, to] of ENDINGS) {
    if (re.test(out)) {
      out = out.replace(re, to)
      break
    }
  }
  // Greek-derived spellings.
  return out.replace(/rr/g, 'r').replace(/^clor/, 'chlor').replace(/^fenil/, 'phenyl').replace(/^tio/, 'thio').replace(/^cole/, 'chole')
}

/** "loratadina" → "loratadine"; "acido mefenamico" → "mefenamic acid". */
export function spanishToEnglishName(name: string): string {
  const s = name.trim().toLowerCase()
  if (SPECIAL[s]) return SPECIAL[s]
  const acid = s.match(/^acido ([a-z]+)ico$/)
  if (acid) return `${acid[1]}ic acid`
  return s
    .split(/\s+/)
    .filter((w) => w !== 'de')
    .map(word)
    .join(' ')
}
