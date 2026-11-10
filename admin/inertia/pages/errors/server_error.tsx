import { useTranslation } from 'react-i18next'

export default function ServerError(props: { error: any }) {
  const { t } = useTranslation()
  return (
    <>
      <div className="container">
        <div className="title">{t('common:errors.server')}</div>

        <span>{props.error.message}</span>
      </div>
    </>
  )
}