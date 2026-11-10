import { IconLanguage } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES, setLanguage, type LanguageCode } from '~/i18n'

export default function LanguageSelector() {
  const { t, i18n } = useTranslation()

  return (
    <label
      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-desert-stone"
      title={t('language.label')}
    >
      <IconLanguage className="size-4" aria-hidden="true" />
      <span className="sr-only">{t('language.label')}</span>
      <select
        value={i18n.resolvedLanguage}
        onChange={(e) => setLanguage(e.target.value as LanguageCode)}
        className="bg-transparent text-sm text-desert-stone hover:text-desert-green-darker cursor-pointer border-none focus:ring-0 py-0 pl-0 pr-6"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </label>
  )
}
