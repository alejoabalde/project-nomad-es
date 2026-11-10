import { useEffect, useState } from 'react'
import StyledButton from '~/components/StyledButton'
import StyledSectionHeader from '~/components/StyledSectionHeader'
import Alert from '~/components/Alert'
import api from '~/lib/api'
import Input from '~/components/inputs/Input'
import Switch from '~/components/inputs/Switch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotifications } from '~/context/NotificationContext'
import { useAutoUpdateStatus } from '~/hooks/useAutoUpdateStatus'
import { useTranslation } from 'react-i18next'

const COOLOFF_OPTIONS = [
  { value: 24, label: '24 hours (1 day)' },
  { value: 48, label: '48 hours (2 days)' },
  { value: 72, label: '72 hours (3 days)' },
  { value: 168, label: '7 days' },
]

export default function CoreAutoUpdateSection() {
  const { t, i18n } = useTranslation('settings')
  const { addNotification } = useNotifications()
  const queryClient = useQueryClient()
  const { data: status, isLoading } = useAutoUpdateStatus()

  const [windowStart, setWindowStart] = useState('02:00')
  const [windowEnd, setWindowEnd] = useState('05:00')
  const [cooloff, setCooloff] = useState(72)

  // Seed editable fields once the persisted status loads.
  useEffect(() => {
    if (status) {
      setWindowStart(status.windowStart)
      setWindowEnd(status.windowEnd)
      setCooloff(status.cooloffHours)
    }
  }, [status?.windowStart, status?.windowEnd, status?.cooloffHours])

  const saveMutation = useMutation({
    mutationFn: ({ key, value }: { key: string; value: any }) => api.updateSetting(key, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auto-update-status'] })
    },
    onError: () => {
      addNotification({ type: 'error', message: t('autoUpd.coreFail') })
    },
  })

  const enabled = status?.enabled ?? false
  const autoDisabled = !!status?.autoDisabledReason

  const handleToggle = (value: boolean) => {
    saveMutation.mutate(
      { key: 'autoUpdate.enabled', value },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['auto-update-status'] })
          addNotification({
            type: 'success',
            message: value ? t('autoUpd.coreOn') : t('autoUpd.coreOff'),
          })
        },
      }
    )
  }

  const handleSaveWindow = async () => {
    try {
      await api.updateSetting('autoUpdate.windowStart', windowStart)
      await api.updateSetting('autoUpdate.windowEnd', windowEnd)
      await api.updateSetting('autoUpdate.cooloffHours', String(cooloff))
      queryClient.invalidateQueries({ queryKey: ['auto-update-status'] })
      addNotification({ type: 'success', message: t('autoUpd.coreSaved') })
    } catch {
      addNotification({ type: 'error', message: t('autoUpd.coreSaveFail') })
    }
  }

  return (
    <>
      <StyledSectionHeader title={t('autoUpd.coreTitle')} className="mt-8" />
      <div className="bg-surface-primary rounded-lg border shadow-md overflow-hidden mt-6 p-6">
        {autoDisabled && (
          <Alert
            type="warning"
            title={t('autoUpd.coreDisabled')}
            message={status?.autoDisabledReason || t('autoUpd.coreDisabledMsg')}
            variant="bordered"
            className="mb-4"
          />
        )}

        <Switch
          checked={enabled}
          onChange={handleToggle}
          disabled={saveMutation.isPending || isLoading}
          label={t('autoUpd.coreEnable')}
          description={t('autoUpd.coreDesc')}
        />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            name="autoUpdateWindowStart"
            label={t('autoUpd.windowStart')}
            type="time"
            value={windowStart}
            onChange={(e) => setWindowStart(e.target.value)}
            disabled={!enabled}
            helpText={t('autoUpd.localTime')}
          />
          <Input
            name="autoUpdateWindowEnd"
            label={t('autoUpd.windowEnd')}
            type="time"
            value={windowEnd}
            onChange={(e) => setWindowEnd(e.target.value)}
            disabled={!enabled}
            helpText={t('autoUpd.localTime')}
          />
          <div>
            <label
              htmlFor="autoUpdateCooloff"
              className="block text-base/6 font-medium text-text-primary"
            >
              {t('autoUpd.cooloffLabel')}
            </label>
            <p className="mt-1 text-sm text-text-muted">{t('autoUpd.coreDelay')}</p>
            <select
              id="autoUpdateCooloff"
              value={cooloff}
              onChange={(e) => setCooloff(Number(e.target.value))}
              disabled={!enabled}
              className="mt-1.5 block w-full rounded-md bg-surface-primary px-3 py-2 text-base text-text-primary border border-border-default focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6 disabled:opacity-50"
            >
              {COOLOFF_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {t(`autoUpd.cooloff.${opt.value}`, { defaultValue: opt.label })}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <StyledButton
            variant="primary"
            size="sm"
            onClick={handleSaveWindow}
            disabled={!enabled}
          >
            {t('autoUpd.saveSchedule')}
          </StyledButton>
        </div>

        {enabled && status && (
          <div className="mt-6 pt-4 border-t border-desert-stone-light text-sm space-y-1">
            <p className="text-desert-stone-dark">
              <span className="font-medium">{t('autoUpd.status')} </span>
              {status.eligibleTarget
                ? t('autoUpd.eligible', { version: status.eligibleTarget.version })
                : t('autoUpd.noEligible')}
            </p>
            <p className="text-desert-stone">
              <span className="font-medium">{t('autoUpd.updateWindow')} </span>
              {status.withinWindow ? t('autoUpd.insideWin') : t('autoUpd.outsideWin')}
            </p>
            {status.lastResult && (
              <p className="text-desert-stone">
                <span className="font-medium">{t('autoUpd.lastCheck')} </span>
                {status.lastResult}
                {status.lastAttemptAt
                  ? ` (${new Date(status.lastAttemptAt).toLocaleString(i18n.language)})`
                  : ''}
              </p>
            )}
            {status.lastError && (
              <p className="text-desert-red">
                <span className="font-medium">{t('autoUpd.lastError')} </span>
                {status.lastError}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  )
}
