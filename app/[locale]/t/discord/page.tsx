import initTranslations from '../../../i18n';
import TranslationsProvider from '@/components/i18n/TranslationProvider';
import DiscordTimestampGenerator from '../../../../components/timestamp/discord';

const i18nNamespaces = ['discord-timestamp'];

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    title: 'Discord Timestamp Generator - Dynamic Time Codes for All Timezones | Timestamp.im',
    description: 'Generate Discord timestamp codes for dynamic time display. Perfect for Discord servers, events, and announcements. Automatically displays correct time in all user timezones. Free Discord timestamp converter tool.',
    keywords: 'Discord timestamp generator, Discord timestamp converter, Discord dynamic time, Discord time format, Discord bot timestamp, Discord server time, Discord timezone, Discord time codes',
    alternates: {
      canonical: `https://timestamp.im/${params.locale}/t/discord`,
    },
    openGraph: {
      title: 'Discord Timestamp Generator - Dynamic Time Codes | Timestamp.im',
      description: 'Generate Discord timestamp codes for dynamic time display. Perfect for Discord servers, events, and announcements.',
      type: 'website',
      url: `https://timestamp.im/${params.locale}/t/discord`,
      images: ['/og-discord-timestamp.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Discord Timestamp Generator - Dynamic Time Codes',
      description: 'Generate Discord timestamp codes for dynamic time display across all timezones.',
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