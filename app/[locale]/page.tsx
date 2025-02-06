import styles from './page.module.css';
import Link from 'next/link';
import initTranslations from '../i18n';
import TranslationsProvider from '@/components/i18n/TranslationProvider';
import Index from '../../components/timestamp';
import { Suspense } from 'react';
import Loading from './loading';
import ErrorBoundary from '../../components/ErrorBoundary';
import i18nConfig from '@/i18nConfig';

// 使用 JSDoc 类型注释
/** @type {Locale} */
const locale: Locale = 'en'; // 示例使用

const i18nNamespaces = ['timestamp'];

async function Home({ params }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={params.locale as Locale}
          resources={resources}>
          <Index />
        </TranslationsProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
export default Home;

