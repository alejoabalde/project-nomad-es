import { useEffect, useState } from 'react'
import StyledModal from './StyledModal'
import api from '~/lib/api'
import { useTranslation } from 'react-i18next'

interface ServiceLogsModalProps {
  serviceName: string
  friendlyName: string
  open: boolean
  onClose: () => void
}

/** Shows the tail of a service container's logs with a manual refresh. */
export default function ServiceLogsModal({
  serviceName,
  friendlyName,
  open,
  onClose,
}: ServiceLogsModalProps) {
  const [logs, setLogs] = useState('')
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('components')

  async function load() {
    setLoading(true)
    const res = await api.getServiceLogs(serviceName, 500)
    setLogs(res?.success ? res.logs || '' : t('serviceLogs.loadError'))
    setLoading(false)
  }

  useEffect(() => {
    if (open) load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, serviceName])

  return (
    <StyledModal
      title={t('serviceLogs.title', { app: friendlyName })}
      open={open}
      onCancel={onClose}
      cancelText={t('common:actions.close')}
      onConfirm={load}
      confirmText={t('serviceLogs.refresh')}
      confirmIcon="IconRefresh"
      confirmVariant="outline"
      confirmLoading={loading}
      large
    >
      <pre className="text-xs font-mono whitespace-pre-wrap break-all max-h-[60vh] overflow-auto bg-surface-secondary rounded-md p-3 text-text-primary text-left">
        {logs || (loading ? t('loading') : t('serviceLogs.empty'))}
      </pre>
    </StyledModal>
  )
}
