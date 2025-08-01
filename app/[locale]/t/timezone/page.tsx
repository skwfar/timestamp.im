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
    title: 'Timezone Converter Tool - Convert Time Between Zones | Timestamp.im',
    description: 'Convert time between different timezones worldwide. Handle daylight saving time automatically and coordinate meetings across global teams with our timezone conversion tool.',
    keywords: 'timezone converter, time zone conversion, world time converter, GMT converter, UTC converter, daylight saving time, international meetings, world clock',
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://timestamp.im/${params.locale}/t/timezone`,
    },
    openGraph: {
      title: 'Timezone Converter | Timestamp.im',
      description: 'Convert time between different timezones worldwide with automatic DST handling.',
      type: 'website',
      url: `https://timestamp.im/${params.locale}/t/timezone`,
    },
  };
}

export default TimezonePage;