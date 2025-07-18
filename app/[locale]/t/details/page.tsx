import initTranslations from '../../../i18n';
import TranslationsProvider from '@/components/i18n/TranslationProvider';
import TimestampDetails from '@/components/timestamp/timestampDetails';
import { Suspense } from 'react';
import Loading from '../../loading';
import ErrorBoundary from '@/components/ErrorBoundary';

const i18nNamespaces = ['timestamp'];

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { t } = await initTranslations(params.locale, i18nNamespaces);
  
  return {
    title: `${t('timestamp-details-title')} | Timestamp.im`,
    description: t('timestamp-details-description'),
    keywords: 'timestamp details, unix timestamp analyzer, timestamp converter, timestamp meaning, historical events, timestamp formats',
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://timestamp.im/${params.locale}/t/details`,
    },
    openGraph: {
      title: `${t('timestamp-details-title')} | Timestamp.im`,
      description: t('timestamp-details-description'),
      type: 'website',
      locale: params.locale,
    },
    twitter: {
      card: 'summary',
      title: `${t('timestamp-details-title')} | Timestamp.im`,
      description: t('timestamp-details-description'),
    },
  };
}

async function TimestampDetailsPage({ params }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={params.locale}
          resources={resources}>
          <TimestampDetails />
        </TranslationsProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default TimestampDetailsPage;