/**
 * Fork (project-nomad-es): open Kiwix in the interface language.
 *
 * kiwix-serve picks its interface language and its book-language filter from
 * the browser, so on an English browser the library opens in English even when
 * NOMAD is in Spanish. Its own URL parameters override that: `?userlang=es`
 * for the interface and `#lang=spa` for the book filter. Only the default link
 * is changed; a user-set custom URL is left as is.
 */
import { SERVICE_NAMES } from '../../constants/service_names.js'

const KIWIX_LANGUAGE: Record<string, { userlang: string; books: string }> = {
  es: { userlang: 'es', books: 'spa' },
}

export function withServiceLanguage(
  link: string,
  serviceName: string,
  language: string,
  customUrl?: string | null
): string {
  if (serviceName !== SERVICE_NAMES.KIWIX || customUrl) return link
  const lang = KIWIX_LANGUAGE[language?.split('-')[0]]
  if (!lang || !/^https?:\/\//.test(link)) return link
  try {
    const url = new URL(link)
    if (url.pathname !== '/' || url.search || url.hash) return link
    url.searchParams.set('userlang', lang.userlang)
    url.hash = `lang=${lang.books}`
    return url.href
  } catch {
    return link
  }
}
