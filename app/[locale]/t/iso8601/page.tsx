import initTranslations from '../../../i18n';
import TranslationsProvider from '@/components/i18n/TranslationProvider';
import ISO8601Converter from '@/components/timestamp/iso8601';
import { Suspense } from 'react';
import Loading from '../../loading';
import ErrorBoundary from '../../../../components/ErrorBoundary';

const i18nNamespaces = ['timestamp'];

async function ISO8601Page({ params }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={params.locale}
          resources={resources}>
          <ISO8601Converter />
        </TranslationsProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    title: 'ISO 8601 Converter | Timestamp.im',
    description: 'Free ISO 8601 date format converter. Convert between ISO 8601 standard format and Unix timestamps. Perfect for developers working with international date formats.',
    keywords: 'ISO 8601, ISO date format, date converter, timestamp converter, international date format, standard date format, UTC time, RFC 3339',
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://timestamp.im/${params.locale}/t/iso8601`,
    },
  };
}

export default ISO8601Page;