/**
 * Keeps an Uppy instance's built-in texts (drop zone, buttons, errors) in the
 * selected UI language (project-nomad-es fork). Uppy ships English by default.
 */
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type Uppy from '@uppy/core'
import es_ES from '@uppy/locales/lib/es_ES'
import en_US from '@uppy/locales/lib/en_US'

export function useUppyLocale(uppy: Uppy<any, any>) {
  const { i18n } = useTranslation()
  useEffect(() => {
    uppy.setOptions({ locale: i18n.language.startsWith('es') ? es_ES : en_US })
  }, [uppy, i18n.language])
}
