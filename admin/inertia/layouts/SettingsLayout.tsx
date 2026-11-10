import {
  IconAdjustments,
  IconArrowBigUpLines,
  IconBox,
  IconChartBar,
  IconCode,
  IconDashboard,
  IconFolder,
  IconGavel,
  IconHeart,
  IconMapRoute,
  IconMovie,
  IconSettings,
  IconWand,
  IconZoom
} from '@tabler/icons-react'
import StyledSidebar from '~/components/StyledSidebar'
import { getServiceLink } from '~/lib/navigation'
import useServiceInstalledStatus from '~/hooks/useServiceInstalledStatus'
import useCreatorPacks from '~/hooks/useCreatorPacks'
import { SERVICE_NAMES } from '../../constants/service_names'
import { useTranslation } from 'react-i18next'
import { useAssistantName } from '~/lib/assistant_name'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation('settings')
  const aiAssistantName = useAssistantName()
  const aiAssistantInstallStatus = useServiceInstalledStatus(SERVICE_NAMES.OLLAMA)
  // Only show the Creator Packs entry on builds that can actually install packs
  // (release-injected key present) — a fork built from source has no key.
  const { configured: creatorPacksConfigured } = useCreatorPacks()

  const navigation = [
    ...(aiAssistantInstallStatus.isInstalled ? [{ name: aiAssistantName, href: '/settings/models', icon: IconWand, current: false }] : []),
    { name: t('nav.supplyDepot'), href: '/supply-depot', icon: IconBox, current: false },
    { name: t('nav.benchmark'), href: '/settings/benchmark', icon: IconChartBar, current: false },
    { name: t('nav.contentExplorer'), href: '/settings/zim/remote-explorer', icon: IconZoom, current: false },
    { name: t('nav.contentManager'), href: '/settings/zim', icon: IconFolder, current: false },
    ...(creatorPacksConfigured ? [{ name: t('nav.creatorPacks'), href: '/settings/creator-packs', icon: IconMovie, current: false }] : []),
    { name: t('nav.mapsManager'), href: '/settings/maps', icon: IconMapRoute, current: false },
    {
      name: t('nav.serviceLogs'),
      href: getServiceLink('9999'),
      icon: IconDashboard,
      current: false,
      target: '_blank',
    },
    {
      name: t('nav.checkUpdates'),
      href: '/settings/update',
      icon: IconArrowBigUpLines,
      current: false,
    },
    { name: t('nav.system'), href: '/settings/system', icon: IconSettings, current: false },
    { name: t('nav.advanced'), href: '/settings/advanced', icon: IconAdjustments, current: false },
    { name: t('nav.apiReference'), href: '/reference', icon: IconCode, current: false },
    { name: t('nav.support'), href: '/settings/support', icon: IconHeart, current: false },
    { name: t('nav.legal'), href: '/settings/legal', icon: IconGavel, current: false },
  ]

  return (
    <div className="min-h-screen flex flex-row bg-surface-secondary/90">
      <StyledSidebar title={t('title')} items={navigation} />
      {children}
    </div>
  )
}
