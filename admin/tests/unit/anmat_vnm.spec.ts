import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import { normalizeIngredient, parseVnmIngredients, vnmRecordToRow } from '../../util/anmat_vnm.js'

test('parseVnmIngredients drops doses and splits combinations', () => {
  assert.deepEqual(parseVnmIngredients('IBUPROFENO 400 MG'), ['ibuprofeno'])
  assert.deepEqual(parseVnmIngredients('PARACETAMOL 500 MG + CAFEINA 65 MG'), ['paracetamol', 'cafeina'])
  assert.deepEqual(parseVnmIngredients('IBUPROFENO 4 G / 100 ML'), ['ibuprofeno'])
  assert.deepEqual(parseVnmIngredients(''), [])
})

test('normalizeIngredient maps Argentine names and salts to AEMPS naming', () => {
  assert.equal(normalizeIngredient('DIPIRONA 500 MG / ML'), 'metamizol')
  assert.equal(normalizeIngredient('DICLOFENAC SODICO 75 MG'), 'diclofenaco')
  assert.equal(normalizeIngredient('HIOSCINA BUTILBROMURO 10 MG'), 'butilescopolamina')
  assert.equal(normalizeIngredient('CLORFENIRAMINA MALEATO 4 MG'), 'clorfenamina')
  assert.equal(normalizeIngredient('ÁCIDO ACETILSALICÍLICO 500 MG'), 'acido acetilsalicilico')
})

test('vnmRecordToRow builds a stable key and a folded search name', () => {
  const rec = {
    certificado: '54577',
    laboratorio: 'SAVANT PHARM S.A.',
    nombre_comercial: 'FABOGESIC NIÑOS 4%',
    forma: 'SUSPENSION ORAL',
    presentacion: '1 FRASCO por 90 ML',
    gtin: '07798032933436',
    generico: 'IBUPROFENO 4 G / 100 ML',
  }
  const a = vnmRecordToRow(rec)
  assert.equal(a.clave, vnmRecordToRow(rec).clave)
  assert.equal(a.searchable, 'fabogesic ninos 4%')
  assert.equal(a.ingredientes, 'ibuprofeno')
  assert.notEqual(a.clave, vnmRecordToRow({ ...rec, gtin: '07798032933437' }).clave)
})
