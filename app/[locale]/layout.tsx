import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from "@/components/footer";
import Header from "@/components/header";
import i18nConfig from '@/i18nConfig';
import { dir } from 'i18next';
import GoogleAnalytics from "@/components/analytics/ga";
import StructuredData from "@/components/seo/StructuredData";

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  const baseUrl = 'https://timestamp.im';
  
  const titles = {
    en: 'Timestamp.im - Best Online Timestamp Tools for Accurate Date and Time Conversion',
    cn: 'Timestamp.im - 最佳在线时间戳工具，精确的日期和时间转换',
    es: 'Timestamp.im - Las Mejores Herramientas de Timestamp Online para Conversión Precisa',
    fr: 'Timestamp.im - Meilleurs Outils de Timestamp En Ligne pour une Conversion Précise',
    de: 'Timestamp.im - Beste Online-Timestamp-Tools für präzise Datum- und Zeitkonvertierung',
    it: 'Timestamp.im - I Migliori Strumenti di Timestamp Online per Conversione Precisa',
    ru: 'Timestamp.im - Лучшие Онлайн Инструменты Временных Меток',
    ja: 'Timestamp.im - 正確な日時変換のための最高のオンラインタイムスタンプツール',
    ko: 'Timestamp.im - 정확한 날짜 및 시간 변환을 위한 최고의 온라인 타임스탬프 도구',
    pt: 'Timestamp.im - Melhores Ferramentas de Timestamp Online para Conversão Precisa',
    hi: 'Timestamp.im - सटीक दिनांक और समय रूपांतरण के लिए सर्वश्रेष्ठ ऑनलाइन टाइमस्टैम्प उपकरण',
    ar: 'Timestamp.im - أفضل أدوات الطوابع الزمنية عبر الإنترنت للتحويل الدقيق'
  };

  const descriptions = {
    en: 'Free online Unix timestamp converter and date tools. Convert timestamps to dates, generate current timestamps, and use Discord timestamp generator. Perfect for developers and data analysts.',
    cn: '免费的在线Unix时间戳转换器和日期工具。转换时间戳到日期，生成当前时间戳，使用Discord时间戳生成器。完美适合开发者和数据分析师。',
    es: 'Conversor gratuito de timestamp Unix y herramientas de fecha online. Convierte timestamps a fechas, genera timestamps actuales, y usa el generador de timestamps de Discord.',
    fr: 'Convertisseur gratuit de timestamp Unix et outils de date en ligne. Convertissez les timestamps en dates, générez des timestamps actuels, et utilisez le générateur de timestamps Discord.',
    de: 'Kostenloser Online-Unix-Timestamp-Konverter und Datums-Tools. Konvertieren Sie Timestamps zu Daten, generieren Sie aktuelle Timestamps und nutzen Sie den Discord-Timestamp-Generator.',
    it: 'Convertitore gratuito di timestamp Unix e strumenti di data online. Converti timestamp in date, genera timestamp attuali e usa il generatore di timestamp Discord.',
    ru: 'Бесплатный онлайн конвертер Unix временных меток и инструменты дат. Конвертируйте временные метки в даты, генерируйте текущие временные метки.',
    ja: '無料のオンラインUnixタイムスタンプコンバーターと日付ツール。タイムスタンプを日付に変換し、現在のタイムスタンプを生成し、Discordタイムスタンプジェネレーターを使用。',
    ko: '무료 온라인 Unix 타임스탬프 변환기 및 날짜 도구. 타임스탬프를 날짜로 변환하고, 현재 타임스탬프를 생성하며, Discord 타임스탬프 생성기를 사용하세요.',
    pt: 'Conversor gratuito de timestamp Unix e ferramentas de data online. Converta timestamps para datas, gere timestamps atuais e use o gerador de timestamps Discord.',
    hi: 'मुफ्त ऑनलाइन Unix टाइमस्टैम्प कनवर्टर और दिनांक उपकरण। टाइमस्टैम्प को दिनांक में कनवर्ट करें, वर्तमान टाइमस्टैम्प जेनरेट करें।',
    ar: 'محول مجاني للطوابع الزمنية Unix وأدوات التاريخ عبر الإنترنت. قم بتحويل الطوابع الزمنية إلى تواريخ وإنشاء طوابع زمنية حالية.'
  };

  const title = titles[locale as keyof typeof titles] || titles.en;
  const description = descriptions[locale as keyof typeof descriptions] || descriptions.en;

  // Generate alternate URLs for all locales
  const alternates = {
    canonical: `${baseUrl}/${locale}`,
    languages: Object.fromEntries(
      i18nConfig.locales.map(lang => [lang, `${baseUrl}/${lang}`])
    )
  };

  return {
    title,
    description,
    keywords: 'timestamp tools, online timestamp generator, convert timestamp to date, Unix timestamp converter, time and date conversion, digital timestamping, epoch time converter, date to timestamp, human-readable timestamp, current timestamp generator, time formatting tools, timestamp utilities, Unix epoch time, time conversion tools, Discord timestamp',
    authors: [{ name: 'Timestamp.im' }],
    creator: 'Timestamp.im',
    publisher: 'Timestamp.im',
    alternates,
    openGraph: {
      type: 'website',
      locale: locale,
      url: `${baseUrl}/${locale}`,
      title,
      description,
      siteName: 'Timestamp.im',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode,
  params: { locale: string };
},) {
  return (
    <html lang={locale} dir={dir(locale)} data-theme="light">
      <head>
        {/* <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" /> */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7687969538448394" crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>
        <StructuredData
          type="WebApplication"
          name="Timestamp.im"
          description="Free online Unix timestamp converter and date tools for developers"
          url={`https://timestamp.im/${locale}`}
        />
        <main>
          <GoogleAnalytics />
          <Header locale={locale}/>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
