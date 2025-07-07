import initTranslations from '../../../i18n';
import TranslationsProvider from '@/components/i18n/TranslationProvider';
import TimezoneConverter from '@/components/timestamp/timezone';
import { Suspense } from 'react';
import Loading from '../../loading';
import ErrorBoundary from '../../../../components/ErrorBoundary';

const i18nNamespaces = ['timestamp'];

async function TimezonePage({ params }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={params.locale}
          resources={resources}>
          <TimezoneConverter />
        </TranslationsProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    title: 'Timezone Converter | Timestamp.im',
    description: 'Free online timezone converter tool. Convert time between different timezones worldwide. Perfect for scheduling international meetings and coordinating global events.',
    keywords: 'timezone converter, time zone conversion, international time, world clock, meeting scheduler, timezone calculator, UTC converter, GMT converter',
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default TimezonePage;