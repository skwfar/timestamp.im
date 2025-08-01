import initTranslations from '../../i18n';
import TranslationsProvider from '@/components/i18n/TranslationProvider';
import ToolTemplate from '@/components/ui/ToolTemplate';
import BlogList from '@/components/blog/BlogList';
import { Suspense } from 'react';
import Loading from '../loading';
import ErrorBoundary from '../../../components/ErrorBoundary';

const i18nNamespaces = ['timestamp', 'blog'];

async function BlogPage({ params }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={params.locale}
          resources={resources}>
          <ToolTemplate title="" className="container mx-auto p-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog & Tutorials</h1>
                <p className="text-gray-600 text-lg">
                  Learn about Unix timestamps, time handling in programming, timezone conversion, and development best practices through our comprehensive guides and tutorials.
                </p>
              </div>
              <BlogList locale={params.locale} />
            </div>
          </ToolTemplate>
        </TranslationsProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    title: 'Blog - Unix Timestamp & Development Tutorials | Timestamp.im',
    description: 'Learn about Unix timestamps, time handling in programming, timezone conversion, and development best practices through our comprehensive tutorials and guides.',
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default BlogPage;