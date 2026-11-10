import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { IconX } from '@tabler/icons-react'
import StyledButton from '~/components/StyledButton'
import MarkdownEditor from '~/components/MarkdownEditor'
import { useNotifications } from '~/context/NotificationContext'
import api from '~/lib/api'
import { Trans, useTranslation } from 'react-i18next'

interface NomadMdModalProps {
  aiAssistantName?: string
  onClose: () => void
}

// The starter template seeded into the editor lives in locales/*/chat.json (md.template).

export default function NomadMdModal({ aiAssistantName, onClose }: NomadMdModalProps) {
  const queryClient = useQueryClient()
  const { t } = useTranslation('chat')
  const { addNotification } = useNotifications()
  const [content, setContent] = useState<string | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['nomad-md'],
    queryFn: () => api.getNomadMd(),
  })

  // Seed the editor once the file loads: existing content, or the template when empty.
  useEffect(() => {
    if (data && content === null) {
      setContent(data.content.trim().length > 0 ? data.content : t('md.template'))
    }
  }, [data, content])

  const saveMutation = useMutation({
    mutationFn: (value: string) => api.saveNomadMd(value),
    onSuccess: (result) => {
      if (!result?.success) {
        addNotification({ type: 'error', message: t('md.saveFail') })
        return
      }
      addNotification({ type: 'success', message: t('md.saved') })
      queryClient.invalidateQueries({ queryKey: ['nomad-md'] })
      onClose()
    },
    onError: (error: any) => {
      addNotification({ type: 'error', message: error?.message || t('md.saveFail') })
    },
  })

  const assistantName = aiAssistantName?.trim() || t('md.yourAssistant')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm transition-opacity">
      <div className="bg-surface-primary rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border-subtle shrink-0">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">NOMAD.md</h2>
            <p className="text-sm text-text-muted mt-1">
              {t('md.subtitle', { name: assistantName })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-secondary rounded-lg transition-colors"
          >
            <IconX className="h-6 w-6 text-text-muted" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          {isLoading || content === null ? (
            <div className="py-16 text-center text-text-muted">{t('md.loading')}</div>
          ) : (
            <div className="rounded-lg border border-border-subtle overflow-hidden h-[55vh]">
              <MarkdownEditor initialValue={content} onChange={setContent} className="h-full text-sm" />
            </div>
          )}
          <p className="text-xs text-text-muted mt-3">
            <Trans t={t} i18nKey="md.tip" components={{ c: <code className="font-mono" /> }} />
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-border-subtle shrink-0">
          <StyledButton variant="outline" onClick={onClose} disabled={saveMutation.isPending}>
            {t('common:actions.cancel')}
          </StyledButton>
          <StyledButton
            variant="primary"
            icon="IconCircleCheck"
            onClick={() => content !== null && saveMutation.mutate(content)}
            loading={saveMutation.isPending}
            disabled={content === null}
          >
            {t('common:actions.save')}
          </StyledButton>
        </div>
      </div>
    </div>
  )
}
