import { Head, Link } from '@inertiajs/react'
import { IconMessageCircleOff } from '@tabler/icons-react'
import AppLayout from '~/layouts/AppLayout'
import { useTranslation } from 'react-i18next'

/**
 * Fork (project-nomad-es): shown at /chat (and /knowledge-base) when the AI
 * Assistant is not installed, instead of a bare JSON 404. Help pages link
 * there, so readers need to know what to do next.
 */
export default function ChatUnavailable() {
  const { t } = useTranslation('chat')
  return (
    <AppLayout compact>
      <Head title={t('unavailable.title')} />
      <div className="p-6 max-w-xl mx-auto text-center">
        <IconMessageCircleOff className="mx-auto size-12 text-desert-stone" />
        <h1 className="mt-4 text-2xl font-semibold">{t('unavailable.title')}</h1>
        <p className="mt-3">{t('unavailable.body')}</p>
        <Link
          href="/supply-depot"
          className="mt-6 inline-block rounded-md bg-desert-green px-4 py-2 font-semibold text-white hover:opacity-90"
        >
          {t('unavailable.action')}
        </Link>
      </div>
    </AppLayout>
  )
}
