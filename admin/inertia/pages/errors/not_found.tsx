import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <>
      <div className="container">
        <div className="title">{t('common:errors.notFound')}</div>

        <span>{t('common:errors.notFoundBody')}</span>
      </div>
    </>
  )
}