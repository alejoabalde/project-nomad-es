/**
 * Localized display names/descriptions for the built-in apps (project-nomad-es fork).
 *
 * The server stores each app's friendly_name and description in English (seeded
 * by database/seeders/service_seeder.ts). Instead of changing the database, which
 * would conflict with upstream migrations, we translate at display time.
 *
 * We only translate a value while it still equals the English default; if the
 * user renamed an app or wrote their own description, we show their text as-is.
 */
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import enServices from '../locales/en/services.json'

type ServiceLike = {
  service_name: string
  friendly_name?: string | null
  description?: string | null
}

const DEFAULTS = enServices as Record<string, { name: string; description: string }>

export function useServiceText() {
  const { t } = useTranslation('services')

  const name = useCallback(
    (service: ServiceLike): string => {
      const def = DEFAULTS[service.service_name]
      if (def && (!service.friendly_name || service.friendly_name === def.name)) {
        return t(`${service.service_name}.name`)
      }
      return service.friendly_name || service.service_name
    },
    [t]
  )

  const description = useCallback(
    (service: ServiceLike): string | null => {
      const def = DEFAULTS[service.service_name]
      if (def && service.description === def.description) {
        return t(`${service.service_name}.description`)
      }
      return service.description ?? null
    },
    [t]
  )

  return { name, description }
}
