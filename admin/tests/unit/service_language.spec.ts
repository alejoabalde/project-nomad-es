import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import { withServiceLanguage } from '../../inertia/lib/service_language.js'

const KIWIX = 'nomad_kiwix_server'

test('opens Kiwix in Spanish when NOMAD is in Spanish', () => {
  assert.equal(
    withServiceLanguage('http://localhost:8090', KIWIX, 'es'),
    'http://localhost:8090/?userlang=es#lang=spa'
  )
})

test('leaves Kiwix alone in English', () => {
  assert.equal(withServiceLanguage('http://localhost:8090', KIWIX, 'en'), 'http://localhost:8090')
})

test('never touches a user-set custom URL', () => {
  const custom = 'http://kiwix.lan/'
  assert.equal(withServiceLanguage(custom, KIWIX, 'es', custom), custom)
})

test('leaves other apps alone', () => {
  assert.equal(withServiceLanguage('http://localhost:8310', 'nomad_kolibri', 'es'), 'http://localhost:8310')
})
