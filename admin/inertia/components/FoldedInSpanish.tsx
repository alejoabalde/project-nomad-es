import { useTranslation } from 'react-i18next'

/**
 * Fork-only: content that only fits the original (US) audience, such as the US
 * map regions, stays available in Spanish but starts folded. In English it is
 * shown exactly as in the original NOMAD.
 */
export default function FoldedInSpanish({
  summary,
  children,
}: {
  summary: string
  children: React.ReactNode
}) {
  const { i18n } = useTranslation()
  if (!i18n.language?.startsWith('es')) return <>{children}</>

  return (
    <details className="group rounded-lg border border-border-subtle bg-surface-primary p-4">
      <summary className="cursor-pointer select-none font-medium text-desert-green">
        {summary}
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  )
}
