import { Head, router } from '@inertiajs/react'
import { useEffect, useRef } from 'react'
import MarkdocRenderer from '~/components/MarkdocRenderer'
import DocsLayout from '~/layouts/DocsLayout'
import { useTranslation } from 'react-i18next'

export default function Show({ content }: { content: any; }) {
  const { t, i18n } = useTranslation()

  // The page body comes from the server in the reader's language; fetch it again
  // when the language changes (project-nomad-es).
  const lastLanguage = useRef(i18n.language)
  useEffect(() => {
    if (lastLanguage.current === i18n.language) return
    lastLanguage.current = i18n.language
    router.reload({ only: ['content'] })
  }, [i18n.language])
  // Deep-link support: when arriving at /docs/<slug>#<anchor> (e.g. from a Supply Depot app's
  // "Docs" menu item), scroll to that section. The content renders synchronously from props, so a
  // double rAF lets the headings paint before we look one up.
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace(/^#/, ''))
    if (!hash) return
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    )
  }, [content])

  return (
    <DocsLayout>
      <Head title={t('common:docs.title')} />
      <div className="xl:pl-80 pt-14 xl:pt-8 pb-8 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          <MarkdocRenderer content={content} />
        </div>
      </div>
    </DocsLayout>
  )
}
