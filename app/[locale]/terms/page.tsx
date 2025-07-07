import initTranslations from '../../i18n';
import TranslationsProvider from '@/components/i18n/TranslationProvider';
import ToolTemplate from '@/components/ui/ToolTemplate';
import LocalizedContent from '@/components/legal/LocalizedContent';
import { Suspense } from 'react';
import Loading from '../loading';
import ErrorBoundary from '../../../components/ErrorBoundary';

const i18nNamespaces = ['timestamp'];

async function TermsOfService({ params }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={params.locale}
          resources={resources}>
          <ToolTemplate title="" className="container mx-auto p-4 lg:w-1/2 xl:w-1/2">
            <LocalizedContent locale={params.locale} type="terms" />
          </ToolTemplate>
        </TranslationsProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    title: 'Terms of Service | Timestamp.im',
    description: 'Terms of Service for Timestamp.im - Rules and guidelines for using our timestamp conversion tools and services.',
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default TermsOfService;