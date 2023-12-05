import initTranslations from '../../../i18n';
import TranslationsProvider from '@/components/i18n/TranslationProvider';
import ToDateTime from '../../../../components/timestamp/toDateTime';

const i18nNamespaces = ['timestamp'];

async function Home({ params }: { params: { locale: string, timestamp: string } }) {
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={params.locale}
      resources={resources}>
      <ToDateTime timestamp={params.timestamp} />
    </TranslationsProvider>
  );
}

export default Home;
