import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import StyledModal from '../StyledModal'
import StyledButton from '~/components/StyledButton'
import { useNotifications } from '~/context/NotificationContext'
import api from '~/lib/api'
import { useTranslation } from 'react-i18next'

interface CollectionsManagerProps {
  onClose: () => void
}

export default function CollectionsManager({ onClose }: CollectionsManagerProps) {
  const { t } = useTranslation('chat')
  const { addNotification } = useNotifications()
  const queryClient = useQueryClient()
  const [editingName, setEditingName] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const { data: collections = [], isLoading } = useQuery({
    queryKey: ['kbCollections'],
    queryFn: () => api.getKnowledgeCollections(),
    select: (data) => data?.collections ?? [],
  })

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ['kbCollections'] })
    queryClient.invalidateQueries({ queryKey: ['storedFiles'] })
  }

  const renameMutation = useMutation({
    mutationFn: ({ oldName, newName }: { oldName: string; newName: string }) =>
      api.renameCollection(oldName, newName),
    onSuccess: (data) => {
      addNotification({ type: 'success', message: data?.message || t('m.renamed') })
      setEditingName(null)
      invalidateAll()
    },
    onError: (error: any) => {
      addNotification({ type: 'error', message: error?.message || t('m.renameFail') })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (name: string) => api.deleteCollection(name),
    onSuccess: (data) => {
      addNotification({ type: 'success', message: data?.message || t('m.removed') })
      setConfirmDelete(null)
      invalidateAll()
    },
    onError: (error: any) => {
      addNotification({ type: 'error', message: error?.message || t('m.removeFail') })
    },
  })

  return (
    <StyledModal
      open={true}
      title={t('m.title')}
      onClose={onClose}
      cancelText={t('common:actions.close')}
      onCancel={onClose}
      large
    >
      <div className="text-left">
        <p className="text-sm text-text-secondary mb-4">
          {t('m.help')}
        </p>

        {isLoading && <p className="text-sm text-text-muted">{t('m.loading')}</p>}
        {!isLoading && collections.length === 0 && (
          <p className="text-sm text-text-muted">
            {t('m.none')}
          </p>
        )}

        <ul className="divide-y divide-border-subtle">
          {collections.map((name) => (
            <li key={name} className="flex items-center justify-between gap-3 py-3">
              {editingName === name ? (
                <>
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 rounded border border-border-subtle bg-surface-primary px-2 py-1 text-sm text-text-primary"
                  />
                  <StyledButton
                    variant="primary"
                    icon="IconCheck"
                    loading={renameMutation.isPending}
                    disabled={!editValue.trim() || editValue.trim() === name}
                    onClick={() =>
                      renameMutation.mutate({ oldName: name, newName: editValue.trim() })
                    }
                  >
                    {t('common:actions.save')}
                  </StyledButton>
                  <StyledButton variant="outline" onClick={() => setEditingName(null)}>
                    {t('common:actions.cancel')}
                  </StyledButton>
                </>
              ) : confirmDelete === name ? (
                <>
                  <span className="flex-1 text-sm text-text-primary">
                    {t('m.removeQ', { name })}
                  </span>
                  <StyledButton
                    variant="danger"
                    icon="IconTrash"
                    loading={deleteMutation.isPending}
                    onClick={() => deleteMutation.mutate(name)}
                  >
                    {t('m.confirm')}
                  </StyledButton>
                  <StyledButton variant="outline" onClick={() => setConfirmDelete(null)}>
                    {t('common:actions.cancel')}
                  </StyledButton>
                </>
              ) : (
                <>
                  <span className="flex-1 text-sm text-text-primary">{name}</span>
                  <StyledButton
                    variant="secondary"
                    icon="IconPencil"
                    onClick={() => {
                      setEditingName(name)
                      setEditValue(name)
                    }}
                  >
                    {t('m.rename')}
                  </StyledButton>
                  <StyledButton
                    variant="danger"
                    icon="IconTrash"
                    onClick={() => setConfirmDelete(name)}
                  >
                    {t('common:actions.remove')}
                  </StyledButton>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </StyledModal>
  )
}
