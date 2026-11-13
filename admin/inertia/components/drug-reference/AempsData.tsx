import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import StyledButton from '~/components/StyledButton'
import type { AempsDataStatus } from '../../../types/drug_reference'

/**
 * Fork (project-nomad-es): Data-tab card for the Spanish leaflet package
 * (CIMA/AEMPS). One button downloads the published package and imports it;
 * the card polls while that runs and calls `onChanged` when the number of
 * searchable leaflets changes, so the page can reload its counts.
 */
export default function AempsData({
  initial,
  onChanged,
  className = '',
}: {
  initial: AempsDataStatus | null
  onChanged?: () => void
  className?: string
}) {
  const { t, i18n } = useTranslation('drugs')
  const [status, setStatus] = useState<AempsDataStatus | null>(initial)
  const [starting, setStarting] = useState(false)
  const [removing, setRemoving] = useState(false)
  const lastCount = useRef(initial?.rowCount ?? 0)

  const phase = status?.phase ?? 'idle'
  const busy = phase === 'downloading' || phase === 'importing'

  const refresh = useCallback(async () => {
    try {
      const resp = await fetch('/api/drug-reference/aemps/status')
      if (!resp.ok) return
      const next = (await resp.json()) as AempsDataStatus
      setStatus(next)
      const settled = next.phase !== 'downloading' && next.phase !== 'importing'
      if (settled && next.rowCount !== lastCount.current) {
        lastCount.current = next.rowCount
        onChanged?.()
      }
    } catch {
      // Next poll retries.
    }
  }, [onChanged])

  useEffect(() => {
    if (!busy) return
    const id = window.setInterval(refresh, 2000)
    return () => window.clearInterval(id)
  }, [busy, refresh])

  const handleDownload = async () => {
    if (starting || busy) return
    setStarting(true)
    try {
      await fetch('/api/drug-reference/aemps/download', { method: 'POST' })
      await refresh()
    } finally {
      setStarting(false)
    }
  }

  const handleRemove = async () => {
    if (removing || busy) return
    if (!window.confirm(t('aemps.removeConfirm'))) return
    setRemoving(true)
    try {
      await fetch('/api/drug-reference/aemps/uninstall', { method: 'POST' })
      await refresh()
    } finally {
      setRemoving(false)
    }
  }

  const mb = (bytes?: number) => ((bytes ?? 0) / 1_000_000).toLocaleString(i18n.language, { maximumFractionDigits: 0 })
  const date = status?.packageDate
    ? new Date(status.packageDate).toLocaleDateString(i18n.language, { dateStyle: 'long' })
    : null
  const pct =
    phase === 'downloading' && status?.totalBytes
      ? Math.min(100, Math.round(((status.bytesDownloaded ?? 0) / status.totalBytes) * 100))
      : null

  let line: string
  if (phase === 'downloading') {
    line = status?.totalBytes
      ? t('aemps.downloadingBytes', { done: mb(status.bytesDownloaded), total: mb(status.totalBytes) })
      : t('aemps.downloading')
  } else if (phase === 'importing') {
    line = t('aemps.importing', { count: (status?.imported ?? 0).toLocaleString(i18n.language) })
  } else if (phase === 'failed') {
    line = t('aemps.failed', { error: status?.error ?? '' })
  } else if ((status?.rowCount ?? 0) > 0) {
    line = date
      ? t('aemps.ready', { count: status!.rowCount.toLocaleString(i18n.language), date })
      : t('aemps.readyNoDate', { count: status!.rowCount.toLocaleString(i18n.language) })
  } else {
    line = t('aemps.notInstalled')
  }

  const installed = (status?.rowCount ?? 0) > 0
  const newer = installed && !busy && phase !== 'failed' && status?.updateAvailable && status.latestDate
    ? new Date(status.latestDate).toLocaleDateString(i18n.language, { dateStyle: 'long' })
    : null

  return (
    <div className={className}>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-desert-green-darker">{t('aemps.title')}</h2>
        <div className="flex flex-wrap items-center gap-2">
          {installed && !busy && (
            <StyledButton variant="outline" size="sm" onClick={handleRemove} disabled={removing}>
              {t('aemps.remove')}
            </StyledButton>
          )}
          <StyledButton
            variant={installed && !newer ? 'secondary' : 'primary'}
            size="sm"
            onClick={handleDownload}
            disabled={starting || busy}
          >
            {busy ? t('aemps.working') : installed ? t('aemps.update') : t('aemps.download')}
          </StyledButton>
        </div>
      </div>
      <p className="mb-2 text-xs text-desert-stone">{t('aemps.body')}</p>
      <p className={`text-sm ${phase === 'failed' ? 'text-desert-red-dark' : 'text-desert-green-darker'}`}>{line}</p>
      {newer && (
        <p className="mt-1 text-sm font-semibold text-desert-orange-dark">{t('aemps.updateAvailable', { date: newer })}</p>
      )}
      {busy && (
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-desert-stone-lighter/40">
          <div
            className={`h-full bg-desert-green transition-all ${pct === null ? 'animate-pulse w-full opacity-60' : ''}`}
            style={pct === null ? undefined : { width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  )
}
