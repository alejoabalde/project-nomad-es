import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import { isUpdateAvailable, parsePaquetesJson } from '../../util/datos_version.js'

const remote = parsePaquetesJson({
  'actualizado': '2026-11-17T04:10:00Z',
  'aemps-prospectos': { generado: '2026-11-17T03:40:00Z', registros: 14700 },
  'anmat-vnm': { generado: '2026-11-02T09:00:00Z', registros: 15653 },
})

test('parsePaquetesJson reads the publish time and the AEMPS date', () => {
  assert.deepEqual(remote, {
    published: '2026-11-17T04:10:00Z',
    aempsGenerated: '2026-11-17T03:40:00Z',
  })
})

test('parsePaquetesJson rejects missing or broken files', () => {
  assert.equal(parsePaquetesJson(null), null)
  assert.equal(parsePaquetesJson('404: Not Found'), null)
  assert.equal(parsePaquetesJson({ actualizado: 'ayer' }), null)
  assert.deepEqual(parsePaquetesJson({ actualizado: '2026-11-17T04:10:00Z' }), {
    published: '2026-11-17T04:10:00Z',
    aempsGenerated: null,
  })
})

test('a newer publish is an update', () => {
  assert.equal(
    isUpdateAvailable(remote, { published: '2026-11-10T04:00:00Z', aempsPackageDate: null }),
    true
  )
})

test('the same publish is not an update', () => {
  assert.equal(
    isUpdateAvailable(remote, { published: '2026-11-17T04:10:00Z', aempsPackageDate: null }),
    false
  )
})

test('without a recorded publish, the AEMPS package date decides', () => {
  assert.equal(
    isUpdateAvailable(remote, { published: null, aempsPackageDate: '2026-11-11T00:30:48Z' }),
    true
  )
  assert.equal(
    isUpdateAvailable(remote, { published: null, aempsPackageDate: '2026-11-17T03:40:00Z' }),
    false
  )
})

test('no remote info or nothing installed means no notice', () => {
  assert.equal(
    isUpdateAvailable(null, { published: '2026-11-10T04:00:00Z', aempsPackageDate: null }),
    false
  )
  assert.equal(isUpdateAvailable(remote, { published: null, aempsPackageDate: null }), false)
})
