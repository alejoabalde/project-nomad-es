import { HttpContext } from '@adonisjs/core/http'

/**
 * Languages that have their own curated collection lists (fork-only).
 * English uses the upstream lists; Spanish uses the fork's `collections/es/`.
 */
export type ContentLanguage = 'en' | 'es'
export const CONTENT_LANGUAGES: ContentLanguage[] = ['en', 'es']
export const DEFAULT_CONTENT_LANGUAGE: ContentLanguage = 'es'

/**
 * Language of the interface for the current request, read from the
 * `nomad_lang` cookie the frontend sets. Outside a request (jobs, boot) it
 * falls back to the default, so callers that must cover every language
 * should iterate CONTENT_LANGUAGES instead.
 */
export function getContentLanguage(): ContentLanguage {
  const cookie = HttpContext.get()?.request.header('cookie') ?? ''
  const lang = /(?:^|;\s*)nomad_lang=([a-z-]+)/i.exec(cookie)?.[1]?.toLowerCase()
  return lang === 'en' || lang === 'es' ? lang : DEFAULT_CONTENT_LANGUAGE
}

/** True for the single Wikipedia file managed by the Wikipedia selector. */
export function isWikipediaSelectorFile(nameOrUrl: string): boolean {
  return nameOrUrl.includes('wikipedia_en_') || /wikipedia_es_(?:all|top)_/.test(nameOrUrl)
}

/**
 * Language of a Wikipedia selector file or URL. Each language keeps its own
 * Wikipedia selection, so a Spanish and an English Wikipedia can be installed
 * side by side.
 */
export function wikipediaLanguageOf(nameOrUrl: string): ContentLanguage {
  return /wikipedia_es_/.test(nameOrUrl) ? 'es' : 'en'
}
