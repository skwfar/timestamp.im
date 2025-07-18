import initTranslations from '../../../i18n';
import TranslationsProvider from '@/components/i18n/TranslationProvider';
import DiscordTimestampGenerator from '../../../../components/timestamp/discord';

const i18nNamespaces = ['discord-timestamp'];

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    alternates: {
      canonical: `https://timestamp.im/${params.locale}/t/discord`,
    },
  };
}

async function DiscordPage({ params }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={params.locale}
      resources={resources}>
      <DiscordTimestampGenerator />
    </TranslationsProvider>
  );
}

export default DiscordPage; 