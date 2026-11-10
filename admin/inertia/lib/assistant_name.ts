/**
 * Display name of the AI assistant (project-nomad-es fork).
 *
 * The server shares `aiAssistantName` with every page; it is the user's custom
 * name or the English default "AI Assistant". We show the default in the UI
 * language and leave a custom name untouched.
 */
import { usePage } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

export const DEFAULT_ASSISTANT_NAME = 'AI Assistant'

export function useAssistantName(): string {
  const { t } = useTranslation('common')
  const name = usePage<{ aiAssistantName?: string }>().props?.aiAssistantName?.trim()
  if (!name || name === DEFAULT_ASSISTANT_NAME) return t('assistant.defaultName')
  return name
}
