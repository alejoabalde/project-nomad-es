import { Head } from '@inertiajs/react'
import { Trans, useTranslation } from 'react-i18next'
import SettingsLayout from '~/layouts/SettingsLayout'

const LINK_CLASS = 'text-blue-600 hover:underline'

const THIRD_PARTY = [
  { key: 'kiwix', name: 'Kiwix', url: 'https://kiwix.org' },
  { key: 'kolibri', name: 'Kolibri', url: 'https://learningequality.org/kolibri' },
  { key: 'ollama', name: 'Ollama', url: 'https://ollama.com' },
  { key: 'cyberchef', name: 'CyberChef', url: 'https://github.com/gchq/CyberChef' },
  { key: 'flatnotes', name: 'FlatNotes', url: 'https://github.com/dullage/flatnotes' },
  { key: 'qdrant', name: 'Qdrant', url: 'https://github.com/qdrant/qdrant' },
] as const

export default function LegalPage() {
  const { t } = useTranslation('legal')
  const strong = { s: <strong /> }

  return (
    <SettingsLayout>
      <Head title={`${t('headTitle')} | Project NOMAD`} />
      <div className="xl:pl-72 w-full">
        <main className="px-12 py-6 max-w-4xl">
          <h1 className="text-4xl font-semibold mb-8">{t('title')}</h1>

          {/* License Agreement */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('license.title')}</h2>
            <p className="text-text-primary mb-3">{t('license.copyright')}</p>
            <p className="text-text-primary mb-3">{t('license.p1')}</p>
            <p className="text-text-primary mb-3">
              <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>https://www.apache.org/licenses/LICENSE-2.0</a>
            </p>
            <p className="text-text-primary">{t('license.p2')}</p>
            {t('license.unofficial') && (
              <p className="text-text-muted text-sm mt-3 italic">{t('license.unofficial')}</p>
            )}
          </section>

          {/* Third-Party Software */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('thirdParty.title')}</h2>
            <p className="text-text-primary mb-4">{t('thirdParty.intro')}</p>
            <ul className="space-y-3 text-text-primary">
              {THIRD_PARTY.map((item) => (
                <li key={item.key}>
                  <strong>{item.name}</strong> - {t(`thirdParty.${item.key}`)}
                  <br />
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>{item.url}</a>
                </li>
              ))}
            </ul>
          </section>

          {/* Privacy Statement */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.title')}</h2>
            <p className="text-text-primary mb-3">{t('privacy.intro')}</p>
            <ul className="list-disc list-inside space-y-2 text-text-primary">
              {(['b1', 'b2', 'b3', 'b4'] as const).map((b) => (
                <li key={b}><Trans t={t} i18nKey={`privacy.${b}`} components={strong} /></li>
              ))}
            </ul>
          </section>

          {/* Content Disclaimer */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('content.title')}</h2>
            <p className="text-text-primary mb-3">{t('content.p1')}</p>
            <p className="text-text-primary mb-3">{t('content.p2')}</p>
            <p className="text-text-primary">{t('content.p3')}</p>
          </section>

          {/* Medical Disclaimer */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('medical.title')}</h2>
            <p className="text-text-primary mb-3">{t('medical.p1')}</p>
            <p className="text-text-primary mb-3 font-semibold">{t('medical.p2')}</p>
            <ul className="list-disc list-inside space-y-2 text-text-primary mb-3">
              {(['b1', 'b2', 'b3', 'b4'] as const).map((b) => (
                <li key={b}>{t(`medical.${b}`)}</li>
              ))}
            </ul>
          </section>

          {/* Data Storage Notice */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('storage.title')}</h2>
            <p className="text-text-primary mb-3">{t('storage.intro')}</p>
            <ul className="list-disc list-inside space-y-2 text-text-primary">
              <li><strong>{t('storage.install')}</strong> /opt/project-nomad</li>
              <li><strong>{t('storage.downloaded')}</strong> /opt/project-nomad/storage</li>
              <li><strong>{t('storage.appData')}</strong> {t('storage.appDataValue')}</li>
            </ul>
            <p className="text-text-primary mt-3">{t('storage.outro')}</p>
          </section>
        </main>
      </div>
    </SettingsLayout>
  )
}
