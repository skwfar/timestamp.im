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
    en: 'Free Unix Timestamp Converter & Date Tools | Timestamp.im',
    cn: '免费Unix时间戳转换器和日期工具 | Timestamp.im',
    es: 'Conversor Unix Timestamp Gratuito | Timestamp.im',
    fr: 'Convertisseur Unix Timestamp Gratuit | Timestamp.im',
    de: 'Kostenloser Unix Timestamp Konverter | Timestamp.im',
    it: 'Convertitore Unix Timestamp Gratuito | Timestamp.im',
    ru: 'Бесплатный Unix Timestamp Конвертер | Timestamp.im',
    ja: '無料Unixタイムスタンプコンバーター | Timestamp.im',
    ko: '무료 Unix 타임스탬프 변환기 | Timestamp.im',
    pt: 'Conversor Unix Timestamp Gratuito | Timestamp.im',
    hi: 'मुफ्त Unix टाइमस्टैम्प कनवर्टर | Timestamp.im',
    ar: 'محول Unix Timestamp مجاني | Timestamp.im'
  };

  const descriptions = {
    en: 'Free online Unix timestamp converter and date tools. Convert timestamps to dates, generate current timestamps, and use Discord timestamp generator. Perfect for developers and data analysts.',
    cn: '免费的在线Unix时间戳转换器和日期工具。转换时间戳到日期，生成当前时间戳，使用Discord时间戳生成器。适合开发者和数据分析师。',
    es: 'Conversor gratuito de timestamp Unix y herramientas de fecha online. Convierte timestamps a fechas, genera timestamps actuales, y usa el generador de timestamps de Discord. Perfecto para desarrolladores.',
    fr: 'Convertisseur gratuit de timestamp Unix et outils de date en ligne. Convertissez les timestamps en dates, générez des timestamps actuels, et utilisez le générateur de timestamps Discord. Parfait pour les développeurs.',
    de: 'Kostenloser Online-Unix-Timestamp-Konverter und Datums-Tools. Konvertieren Sie Timestamps zu Daten, generieren Sie aktuelle Timestamps und nutzen Sie den Discord-Timestamp-Generator. Perfekt für Entwickler.',
    it: 'Convertitore gratuito di timestamp Unix e strumenti di data online. Converti timestamp in date, genera timestamp attuali e usa il generatore di timestamp Discord. Perfetto per sviluppatori e analisti.',
    ru: 'Бесплатный онлайн конвертер Unix временных меток и инструменты дат. Конвертируйте временные метки в даты, генерируйте текущие временные метки и используйте генератор Discord.',
    ja: '無料のオンラインUnixタイムスタンプコンバーターと日付ツール。タイムスタンプを日付に変換し、現在のタイムスタンプを生成し、Discordタイムスタンプジェネレーターを使用。開発者やデータアナリストに最適。',
    ko: '무료 온라인 Unix 타임스탬프 변환기 및 날짜 도구. 타임스탬프를 날짜로 변환하고, 현재 타임스탬프를 생성하며, Discord 타임스탬프 생성기를 사용하세요. 개발자와 데이터 분석가에게 완벽합니다.',
    pt: 'Conversor gratuito de timestamp Unix e ferramentas de data online. Converta timestamps para datas, gere timestamps atuais e use o gerador de timestamps Discord. Perfeito para desenvolvedores e analistas de dados.',
    hi: 'मुफ्त ऑनलाइन Unix टाइमस्टैम्प कनवर्टर और दिनांक उपकरण। टाइमस्टैम्प को दिनांक में कनवर्ट करें, वर्तमान टाइमस्टैम्प जेनरेट करें और Discord टाइमस्टैम्प जेनरेटर का उपयोग करें।',
    ar: 'محول مجاني للطوابع الزمنية Unix وأدوات التاريخ عبر الإنترنت. قم بتحويل الطوابع الزمنية إلى تواريخ وإنشاء طوابع زمنية حالية واستخدام مولد Discord. مثالي للمطورين ومحللي البيانات.'
  };

  const title = titles[locale as keyof typeof titles] || titles.en;
  const description = descriptions[locale as keyof typeof descriptions] || descriptions.en;

  // Generate alternate URLs for all locales
  const alternates = {
    canonical: locale === 'en' ? baseUrl : `${baseUrl}/${locale}`,
    languages: Object.fromEntries(
      i18nConfig.locales.map(lang => [lang, lang === 'en' ? baseUrl : `${baseUrl}/${lang}`])
    )
  };

  const keywordsMap = {
    en: 'timestamp tools, online timestamp generator, convert timestamp to date, Unix timestamp converter, time and date conversion, digital timestamping, epoch time converter, date to timestamp, human-readable timestamp, current timestamp generator, time formatting tools, timestamp utilities, Unix epoch time, time conversion tools, Discord timestamp',
    cn: '时间戳工具,在线时间戳转换器,Unix时间戳,日期转换,时间戳生成器,纪元时间,当前时间戳,时间格式化,Discord时间戳',
    es: 'herramientas timestamp, conversor timestamp online, convertir timestamp a fecha, conversor Unix timestamp, conversión fecha hora, timestamp Discord, generador timestamp',
    fr: 'outils timestamp, convertisseur timestamp en ligne, convertir timestamp en date, convertisseur Unix timestamp, conversion date heure, timestamp Discord, générateur timestamp',
    de: 'timestamp tools, online timestamp konverter, timestamp zu datum, Unix timestamp konverter, datum zeit konvertierung, timestamp Discord, timestamp generator',
    it: 'strumenti timestamp, convertitore timestamp online, convertire timestamp in data, convertitore Unix timestamp, conversione data ora, timestamp Discord, generatore timestamp',
    ru: 'инструменты timestamp, конвертер временных меток, Unix timestamp, конвертация даты, генератор timestamp, Discord timestamp',
    ja: 'タイムスタンプツール,オンラインタイムスタンプ変換,Unixタイムスタンプ,日付変換,タイムスタンプ生成,エポック時刻,Discordタイムスタンプ',
    ko: '타임스탬프 도구, 온라인 타임스탬프 변환기, Unix 타임스탬프, 날짜 변환, 타임스탬프 생성기, 에포크 시간, Discord 타임스탬프',
    pt: 'ferramentas timestamp, conversor timestamp online, converter timestamp para data, conversor Unix timestamp, conversão data hora, timestamp Discord, gerador timestamp',
    hi: 'टाइमस्टैम्प टूल्स, ऑनलाइन टाइमस्टैम्प कनवर्टर, Unix टाइमस्टैम्प, दिनांक रूपांतरण, टाइमस्टैम्प जेनरेटर, Discord टाइमस्टैम्प',
    ar: 'أدوات الطوابع الزمنية, محول الطوابع الزمنية, Unix timestamp, تحويل التاريخ, مولد الطوابع الزمنية, Discord timestamp'
  };

  const keywords = keywordsMap[locale as keyof typeof keywordsMap] || keywordsMap.en;

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Timestamp.im' }],
    creator: 'Timestamp.im',
    publisher: 'Timestamp.im',
    alternates,
    openGraph: {
      type: 'website',
      locale: locale,
      url: locale === 'en' ? baseUrl : `${baseUrl}/${locale}`,
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
  const baseUrl = 'https://timestamp.im';
  
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
          url={locale === 'en' ? baseUrl : `${baseUrl}/${locale}`}
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
