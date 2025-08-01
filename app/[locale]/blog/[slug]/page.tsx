import initTranslations from '../../../i18n';
import TranslationsProvider from '@/components/i18n/TranslationProvider';
import ToolTemplate from '@/components/ui/ToolTemplate';
import BlogPost from '@/components/blog/BlogPost';
import { Suspense } from 'react';
import Loading from '../../loading';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import { notFound } from 'next/navigation';

const i18nNamespaces = ['timestamp', 'blog'];

async function BlogPostPage({ params }: { params: { locale: string, slug: string } }) {
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={params.locale}
          resources={resources}>
          <ToolTemplate title="" className="container mx-auto p-4">
            <BlogPost slug={params.slug} locale={params.locale} />
          </ToolTemplate>
        </TranslationsProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export async function generateMetadata({ params }: { params: { locale: string, slug: string } }) {
  // Dynamic metadata based on blog post
  return {
    title: `${params.slug} | Blog | Timestamp.im`,
    description: 'Learn about Unix timestamps, time handling in programming, and development best practices.',
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default BlogPostPage;