import { Head } from '@inertiajs/react'
import SettingsLayout from '~/layouts/SettingsLayout'
import CreatorPacksSection from '~/components/CreatorPacksSection'
import ActiveDownloads from '~/components/ActiveDownloads'
import useCreatorPacks from '~/hooks/useCreatorPacks'
import { useTranslation } from 'react-i18next'

export default function CreatorPacksPage() {
  const { t } = useTranslation('settings')
  const { configured } = useCreatorPacks()

  return (
    <SettingsLayout>
      <Head title={t('nav.creatorPacks')} />
      <div className="xl:pl-72 w-full">
        <main className="px-12 py-6">
          <h1 className="text-4xl font-semibold mb-2">{t('nav.creatorPacks')}</h1>
          <p className="text-text-muted mb-4">
            {t('creatorPacks.intro')}
          </p>

          {configured ? (
            <>
              <CreatorPacksSection allowUninstall />
              <div className="mt-10">
                <ActiveDownloads filetype="zim" withHeader />
              </div>
            </>
          ) : (
            <p className="text-text-muted mt-4">
              Creator Packs aren&apos;t available on this build.
            </p>
          )}
        </main>
      </div>
    </SettingsLayout>
  )
}
