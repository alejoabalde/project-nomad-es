import { useEffect, useState } from 'react'
import useEmbedJobs from '~/hooks/useEmbedJobs'
import HorizontalBarChart from './HorizontalBarChart'
import StyledSectionHeader from './StyledSectionHeader'
import {
  JOB_HEALTH_DISPLAY,
  computeJobHealth,
} from '~/lib/kb_job_health_display'
import { useTranslation } from 'react-i18next'

interface ActiveEmbedJobsProps {
  withHeader?: boolean
}

const ActiveEmbedJobs = ({ withHeader = false }: ActiveEmbedJobsProps) => {
  const { data: jobs } = useEmbedJobs()
  const { t, i18n } = useTranslation('components')
  // Localized "time ago" (the shared helper in ~/lib returns English).
  const timeAgo = (ms: number) => {
    const seconds = Math.max(0, Math.floor((tick - ms) / 1000))
    if (seconds < 5) return t('embedJobs.justNow')
    const rtf = new Intl.RelativeTimeFormat(i18n.language, { style: 'narrow' })
    if (seconds < 60) return rtf.format(-seconds, 'second')
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return rtf.format(-minutes, 'minute')
    return rtf.format(-Math.floor(minutes / 60), 'hour')
  }

  // Re-render every 5s to keep per-job "last activity Xs ago" timestamps fresh.
  const [tick, setTick] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setTick(Date.now()), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      {withHeader && (
        <StyledSectionHeader title={t('embedJobs.title')} className="mt-12 mb-4" />
      )}

      <div className="space-y-4">
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => {
            const health = computeJobHealth({
              status: job.status,
              progress: job.progress,
              lastBatchAt: job.lastBatchAt,
              startedAt: job.startedAt,
              now: tick,
            })
            const display = JOB_HEALTH_DISPLAY[health]
            const lastActivityMs = job.lastBatchAt ?? job.startedAt
            return (
              <div
                key={job.jobId}
                className="bg-desert-white rounded-lg p-4 border border-desert-stone-light shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${display.dot}`}
                    aria-label={t(`embedJobs.health.${health}.aria`, { defaultValue: display.ariaLabel })}
                    title={t(`embedJobs.health.${health}.aria`, { defaultValue: display.ariaLabel })}
                  />
                  <span className="text-sm font-medium text-text-primary">
                    {t(`embedJobs.health.${health}.label`, { defaultValue: display.label })}
                  </span>
                  {lastActivityMs !== undefined && (
                    <span className="text-xs text-text-muted">
                      · {t('embedJobs.lastActivity', { ago: timeAgo(lastActivityMs) })}
                    </span>
                  )}
                  {typeof job.chunks === 'number' && job.chunks > 0 && (
                    <span className="text-xs text-text-muted">
                      · {t('embedJobs.chunks', { count: job.chunks, formattedCount: job.chunks.toLocaleString() })}
                    </span>
                  )}
                </div>
                <HorizontalBarChart
                  items={[
                    {
                      label: job.fileName,
                      value: job.progress,
                      total: '100%',
                      used: `${job.progress}%`,
                      type: job.status,
                    },
                  ]}
                />
              </div>
            )
          })
        ) : (
          <p className="text-text-muted">{t('embedJobs.none')}</p>
        )}
      </div>
    </>
  )
}

export default ActiveEmbedJobs
