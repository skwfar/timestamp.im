import styles from './page.module.css';
import Link from 'next/link';
import initTranslations from '../i18n';
import TranslationsProvider from '@/components/i18n/TranslationProvider';
import Index from '../../components/timestamp';

const i18nNamespaces = ['timestamp'];

async function Home({ params }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={params.locale}
      resources={resources}>
      <Index />
    </TranslationsProvider>
  );
}

export default Home;
