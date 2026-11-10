import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  aempsRecordToRow,
  extractSubsection,
  mapAempsRoutes,
  type AempsRecord,
} from '../../util/aemps_prospecto.js'
import { normalizeDrugName } from '../../util/drug_labels.js'

const seccion2 = [
  'No tome Ibuprofeno X',
  '• Si es alérgico al ibuprofeno.',
  '• Si tiene úlcera de estómago.',
  'Advertencias y precauciones',
  'Consulte a su médico antes de tomarlo.',
  'Otros medicamentos e Ibuprofeno X',
  'Informe a su médico si toma anticoagulantes.',
  'Embarazo y lactancia',
  'No lo tome en el tercer trimestre.',
].join('\n')

const rec: AempsRecord = {
  nregistro: '12345',
  nombre: 'IBUPROFENO X 400 mg COMPRIMIDOS',
  principios_activos: ['IBUPROFENO'],
  vtm: 'ibuprofeno',
  laboratorio: 'Lab X',
  receta: false,
  vias: ['VÍA ORAL'],
  forma: 'COMPRIMIDO',
  fecha_prospecto: '2025-01-02',
  url_prospecto: 'https://cima.aemps.es/x.html',
  secciones: [
    { seccion: '1', titulo: 'Qué es Ibuprofeno X y para qué se utiliza', texto: 'Alivia el dolor.' },
    { seccion: '2', titulo: 'Qué necesita saber antes de empezar a tomar Ibuprofeno X', texto: seccion2 },
    { seccion: '3', titulo: 'Cómo tomar Ibuprofeno X', texto: 'Un comprimido cada 8 horas.' },
    { seccion: '4', titulo: 'Posibles efectos adversos', texto: '' },
  ],
}

test('normalizeDrugName folds Spanish accents', () => {
  assert.equal(normalizeDrugName('Ácido acetilsalicílico', null), 'acido acetilsalicilico')
})

test('maps CIMA routes to openFDA route codes', () => {
  assert.equal(mapAempsRoutes(['VÍA ORAL']), 'ORAL')
  assert.equal(mapAempsRoutes(['VÍA CUTÁNEA', 'VÍA SUBCUTÁNEA']), 'TOPICAL, SUBCUTANEOUS')
  assert.equal(mapAempsRoutes([]), null)
})

test('extracts sub-sections of the "before you take" section', () => {
  assert.equal(
    extractSubsection(seccion2, /^no tome/i),
    '• Si es alérgico al ibuprofeno.\n• Si tiene úlcera de estómago.'
  )
  assert.equal(
    extractSubsection(seccion2, /otros medicamentos/i),
    'Informe a su médico si toma anticoagulantes.'
  )
  assert.equal(extractSubsection(seccion2, /no existe/i), null)
})

test('maps a leaflet record onto a drug_labels row', () => {
  const row = aempsRecordToRow(rec)
  assert.equal(row.set_id, 'aemps:12345')
  assert.equal(row.source, 'aemps')
  assert.equal(row.product_type, 'HUMAN OTC DRUG')
  assert.equal(row.route, 'ORAL')
  assert.equal(row.indications, 'Alivia el dolor.')
  assert.equal(row.dosage, 'Un comprimido cada 8 horas.')
  assert.equal(row.drug_interactions, 'Informe a su médico si toma anticoagulantes.')
  assert.equal(row.searchable_name, 'ibuprofeno x 400 mg comprimidos')
  // Empty sections are dropped; the rest keep their headings and order.
  assert.deepEqual(
    row.sections.map((s) => s.titulo),
    [
      'Qué es Ibuprofeno X y para qué se utiliza',
      'Qué necesita saber antes de empezar a tomar Ibuprofeno X',
      'Cómo tomar Ibuprofeno X',
    ]
  )
})
