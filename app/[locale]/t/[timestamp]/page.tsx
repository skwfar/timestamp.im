import initTranslations from '../../../i18n';
import TranslationsProvider from '@/components/i18n/TranslationProvider';
import ToDateTime from '../../../../components/timestamp/toDateTime';

const i18nNamespaces = ['timestamp'];

async function TimestampPage({ params }: { params: { locale: string, timestamp: string } }) {
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

export async function generateMetadata({ params }: { params: { locale: string, timestamp: string } }) {
  const timestampNumber = parseInt(params.timestamp);
  const date = new Date(timestampNumber * 1000);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const title = `Unix Timestamp ${params.timestamp} - ${formattedDate} | Timestamp.im`;
  const description = `Convert Unix timestamp ${params.timestamp} to human-readable date: ${formattedDate}. View detailed timestamp analysis, historical context, timezone conversions, and programming formats.`;
  
  return {
    title,
    description,
    keywords: `timestamp ${params.timestamp}, unix timestamp converter, ${formattedDate}, timestamp analysis, date conversion, epoch time, timestamp meaning`,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: params.locale,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: `https://timestamp.im/${params.locale}/t/details`,
    },
  };
}

export default TimestampPage;