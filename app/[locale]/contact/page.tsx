import initTranslations from '../../i18n';
import TranslationsProvider from '@/components/i18n/TranslationProvider';
import ToolTemplate from '@/components/ui/ToolTemplate';
import ContactContent from '@/components/contact/ContactContent';
import { Suspense } from 'react';
import Loading from '../loading';
import ErrorBoundary from '../../../components/ErrorBoundary';

const i18nNamespaces = ['timestamp', 'contact'];

async function ContactPage({ params }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={params.locale}
          resources={resources}>
          <ToolTemplate title="" className="container mx-auto p-4 lg:w-3/5 xl:w-3/5">
            <ContactContent locale={params.locale} />
          </ToolTemplate>
        </TranslationsProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    title: 'Contact Us - Get Help with Timestamp Tools | Timestamp.im',
    description: 'Contact the Timestamp.im team for support, feedback, or questions about our Unix timestamp conversion tools and utilities.',
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default ContactPage;