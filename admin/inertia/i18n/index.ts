/**
 * Internationalization setup for the Command Center UI (project-nomad-es fork).
 *
 * - Spanish is the default language of this fork; English is available from the
 *   language selector in the footer.
 * - Translations live in `inertia/locales/<lang>/<namespace>.json`. Missing keys
 *   in Spanish fall back to English, so untranslated upstream strings still render.
 * - The chosen language is stored in localStorage (`nomad:language`).
 */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import esCommon from '../locales/es/common.json'
import esHome from '../locales/es/home.json'
import esEasySetup from '../locales/es/easySetup.json'
import esComponents from '../locales/es/components.json'
import enComponents from '../locales/en/components.json'
import esSettings from '../locales/es/settings.json'
import enSettings from '../locales/en/settings.json'
import esServices from '../locales/es/services.json'
import enServices from '../locales/en/services.json'
import esSupplyDepot from '../locales/es/supplyDepot.json'
import enSupplyDepot from '../locales/en/supplyDepot.json'
import esChat from '../locales/es/chat.json'
import enChat from '../locales/en/chat.json'
import esMaps from '../locales/es/maps.json'
import enMaps from '../locales/en/maps.json'
import enCommon from '../locales/en/common.json'
import enHome from '../locales/en/home.json'
import enEasySetup from '../locales/en/easySetup.json'

export const SUPPORTED_LANGUAGES = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
] as const

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code']

export const DEFAULT_LANGUAGE: LanguageCode = 'es'
export const LANGUAGE_STORAGE_KEY = 'nomad:language'

export const resources = {
  es: { common: esCommon, maps: esMaps, chat: esChat, supplyDepot: esSupplyDepot, services: esServices, settings: esSettings, components: esComponents, home: esHome, easySetup: esEasySetup },
  en: { common: enCommon, maps: enMaps, chat: enChat, supplyDepot: enSupplyDepot, services: enServices, settings: enSettings, components: enComponents, home: enHome, easySetup: enEasySetup },
} as const

function isSupported(code: unknown): code is LanguageCode {
  return SUPPORTED_LANGUAGES.some((l) => l.code === code)
}

function getInitialLanguage(): LanguageCode {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (isSupported(stored)) return stored
  } catch {}
  return DEFAULT_LANGUAGE
}

export function setLanguage(code: LanguageCode) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, code)
  } catch {}
  void i18n.changeLanguage(code)
}

i18n.on('languageChanged', (lng) => {
  document.documentElement.setAttribute('lang', lng)
})

void i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common', 'maps', 'chat', 'supplyDepot', 'services', 'settings', 'components', 'home', 'easySetup'],
  interpolation: { escapeValue: false },
  returnNull: false,
})

document.documentElement.setAttribute('lang', i18n.language)

export default i18n
