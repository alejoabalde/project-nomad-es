import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import { wikipediaLanguageOf } from '../../app/utils/content_language.js'
import { findReplacedWikipediaFiles } from '../../app/utils/zim_filename.js'

test('wikipediaLanguageOf reads the language from a file name or URL', () => {
  assert.equal(wikipediaLanguageOf('wikipedia_es_top_nopic_2026-10.zim'), 'es')
  assert.equal(
    wikipediaLanguageOf('https://download.kiwix.org/zim/wikipedia/wikipedia_es_all_maxi_2026-10.zim'),
    'es'
  )
  assert.equal(wikipediaLanguageOf('wikipedia_en_all_nopic_2026-01.zim'), 'en')
})

test('a new Spanish Wikipedia never replaces the English one', () => {
  const existing = ['wikipedia_en_top_nopic_2026-01.zim', 'wikipedia_es_top_nopic_2026-09.zim']
  assert.deepEqual(findReplacedWikipediaFiles('wikipedia_es_top_nopic_2026-10.zim', existing), [
    'wikipedia_es_top_nopic_2026-09.zim',
  ])
})
