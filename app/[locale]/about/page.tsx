import initTranslations from '../../i18n';
import TranslationsProvider from '@/components/i18n/TranslationProvider';
import ToolTemplate from '@/components/ui/ToolTemplate';
import AboutContent from '@/components/about/AboutContent';
import { Suspense } from 'react';
import Loading from '../loading';
import ErrorBoundary from '../../../components/ErrorBoundary';

const i18nNamespaces = ['timestamp', 'about'];

async function AboutPage({ params }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={params.locale}
          resources={resources}>
          <ToolTemplate title="" className="container mx-auto p-4 lg:w-4/5 xl:w-4/5">
            <AboutContent locale={params.locale} />
          </ToolTemplate>
        </TranslationsProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    title: 'About Us - Timestamp Tools & Unix Time Converter | Timestamp.im',
    description: 'Learn about Timestamp.im - your trusted source for Unix timestamp conversion tools, timezone utilities, and time-related development resources.',
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default AboutPage;