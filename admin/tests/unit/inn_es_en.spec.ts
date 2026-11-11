import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import { spanishToEnglishName } from '../../util/inn_es_en.js'

test('spanishToEnglishName follows the regular INN endings', () => {
  assert.equal(spanishToEnglishName('loratadina'), 'loratadine')
  assert.equal(spanishToEnglishName('meprednisona'), 'meprednisone')
  assert.equal(spanishToEnglishName('furosemida'), 'furosemide')
  assert.equal(spanishToEnglishName('omeprazol'), 'omeprazole')
  assert.equal(spanishToEnglishName('amoxicilina'), 'amoxicillin')
  assert.equal(spanishToEnglishName('doxiciclina'), 'doxycycline')
  assert.equal(spanishToEnglishName('ibuprofeno'), 'ibuprofen')
  assert.equal(spanishToEnglishName('diclofenaco'), 'diclofenac')
  assert.equal(spanishToEnglishName('clonazepam'), 'clonazepam')
  assert.equal(spanishToEnglishName('acido mefenamico'), 'mefenamic acid')
  assert.equal(spanishToEnglishName('ceftazidima'), 'ceftazidime')
  assert.equal(spanishToEnglishName('bleomicina'), 'bleomycin')
  assert.equal(spanishToEnglishName('doxorrubicina'), 'doxorubicin')
  assert.equal(spanishToEnglishName('colecalciferol'), 'cholecalciferol')
  assert.equal(spanishToEnglishName('escitalopram'), 'escitalopram')
})

test('spanishToEnglishName knows the common exceptions', () => {
  assert.equal(spanishToEnglishName('paracetamol'), 'acetaminophen')
  assert.equal(spanishToEnglishName('acido acetilsalicilico'), 'aspirin')
  assert.equal(spanishToEnglishName('clorfenamina'), 'chlorpheniramine')
})
