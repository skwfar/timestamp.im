import initTranslations from '../../../i18n';
import TranslationsProvider from '@/components/i18n/TranslationProvider';
import DiscordTimestampGenerator from '../../../../components/timestamp/discord';

const i18nNamespaces = ['discord-timestamp'];

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    title: 'Discord Timestamp Generator - Dynamic Time Display | Timestamp.im',
    description: 'Generate Discord timestamp codes that automatically display correctly in all timezones. Perfect for scheduling events, meetings, and announcements in Discord servers worldwide.',
    keywords: 'Discord timestamp, Discord time format, Discord dynamic time, Discord bot timestamp, Discord server time, timezone Discord',
    alternates: {
      canonical: `https://timestamp.im/${params.locale}/t/discord`,
    },
    openGraph: {
      title: 'Discord Timestamp Generator | Timestamp.im',
      description: 'Generate Discord timestamp codes for dynamic time display across all timezones.',
      type: 'website',
      url: `https://timestamp.im/${params.locale}/t/discord`,
    },
    robots: {
      index: true,
      follow: true,
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