import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconBuildingStore } from '@tabler/icons-react'
import type { ArBrandResult } from '../../../types/drug_reference'

/**
 * Fork (project-nomad-es): Argentine brands (ANMAT Vademécum Nacional) that
 * match the search, each with its active ingredients. Picking one searches
 * the Spanish leaflets (AEMPS) of those ingredients, since Spanish brand
 * names differ from the Argentine ones.
 */
export default function ArBrands({
  query,
  onPick,
  className = '',
}: {
  query: string
  onPick: (ingredientes: string[]) => void
  className?: string
}) {
  const { t, i18n } = useTranslation('drugs')
  const [results, setResults] = useState<ArBrandResult[]>([])

  useEffect(() => {
    const q = query.trim()
    if (q.length < 3) {
      setResults([])
      return
    }
    const ctrl = new AbortController()
    const id = window.setTimeout(async () => {
      try {
        const resp = await fetch(`/api/drug-reference/ar-brands?${new URLSearchParams({ q })}`, {
          signal: ctrl.signal,
        })
        if (!resp.ok) return
        const json = (await resp.json()) as { results: ArBrandResult[] }
        setResults(json.results ?? [])
      } catch {
        // Aborted or offline: leave the list as it was.
      }
    }, 300)
    return () => {
      ctrl.abort()
      window.clearTimeout(id)
    }
  }, [query])

  if (results.length === 0) return null

  return (
    <section className={className}>
      <div className="mb-2 flex items-center gap-2">
        <IconBuildingStore size={16} className="text-desert-green" />
        <h2 className="text-sm font-bold text-desert-green-darker">{t('ar.title')}</h2>
      </div>
      <p className="mb-3 text-xs text-desert-stone">{t('ar.help')}</p>
      <ul className="divide-y divide-desert-stone-lighter/40 rounded-xl border border-desert-stone-lighter/50 bg-desert-white">
        {results.map((b) => (
          <li key={`${b.nombre_comercial}|${b.ingredientes.join(',')}`} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5">
            <span className="font-semibold text-desert-green-darker">{b.nombre_comercial}</span>
            <span className="text-sm text-desert-stone">{b.ingredientes.join(' + ')}</span>
            <span className="ml-auto">
              {b.prospectos > 0 ? (
                <button
                  type="button"
                  className="text-sm font-semibold text-desert-green underline"
                  onClick={() => onPick(b.ingredientes)}
                >
                  {t('ar.see', { count: b.prospectos, n: b.prospectos.toLocaleString(i18n.language) })}
                </button>
              ) : b.porIngrediente.some((p) => p.prospectos > 0) ? (
                <span className="text-xs text-desert-stone">
                  {t('ar.separately')}{' '}
                  {b.porIngrediente.map((p, i) => (
                    <span key={p.nombre}>
                      {i > 0 && ' · '}
                      {p.prospectos > 0 ? (
                        <button
                          type="button"
                          className="font-semibold text-desert-green underline"
                          onClick={() => onPick([p.nombre])}
                        >
                          {p.nombre} ({p.prospectos.toLocaleString(i18n.language)})
                        </button>
                      ) : (
                        <span>{p.nombre} (0)</span>
                      )}
                    </span>
                  ))}
                </span>
              ) : (
                <span className="text-xs text-desert-stone">{t('ar.none')}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[11px] text-desert-stone">{t('ar.source')}</p>
    </section>
  )
}
