/**
 * Localized display text for the curated content collections (project-nomad-es fork).
 *
 * The collection catalogs (categories, tiers, resources, Wikipedia options, map regions)
 * are JSON files fetched from the upstream project, so their names and descriptions are in
 * English. We translate them at display time by exact English text: anything that is not in
 * the dictionary (for example a collection added upstream after this translation) is shown
 * as-is. The downloaded content itself is not changed.
 */
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '~/i18n'
import collectionsEs from './collections_es.json'

const DICTIONARIES: Record<string, Record<string, string>> = {
  es: collectionsEs as Record<string, string>,
}

function lookup(language: string | undefined, text: string): string {
  const lang = (language ?? '').split('-')[0]
  return DICTIONARIES[lang]?.[text] ?? text
}

/** Translate one collection text outside React (e.g. in notifications). */
export function collectionText(text: string | null | undefined): string {
  if (!text) return text ?? ''
  return lookup(i18n.language, text)
}

/** Hook version: re-renders when the language changes. */
export function useCollectionText() {
  const { i18n: instance } = useTranslation()
  const language = instance.language
  return useCallback(
    (text: string | null | undefined): string => (text ? lookup(language, text) : (text ?? '')),
    [language]
  )
}
