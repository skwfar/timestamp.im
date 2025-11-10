import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from "@/components/footer";
import Header from "@/components/header";
import i18nConfig from '@/i18nConfig';
import { dir } from 'i18next';
import GoogleAnalytics from "@/components/analytics/ga";
import MicrosoftClarity from "@/components/analytics/clarity";
import StructuredData from "@/components/seo/StructuredData";

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  const baseUrl = 'https://timestamp.im';
  
  const titles = {
    en: 'Unix Timestamp Converter - Convert Timestamp to Date Online | Timestamp.im',
    cn: 'Unix时间戳转换器 - 在线时间戳转日期工具 | Timestamp.im',
    es: 'Conversor Unix Timestamp - Convertir Timestamp a Fecha Online | Timestamp.im',
    fr: 'Convertisseur Unix Timestamp - Convertir Timestamp en Date | Timestamp.im',
    de: 'Unix Timestamp Konverter - Timestamp zu Datum Online | Timestamp.im',
    it: 'Convertitore Unix Timestamp - Convertire Timestamp in Data | Timestamp.im',
    ru: 'Unix Timestamp Конвертер - Конвертация Timestamp в Дату | Timestamp.im',
    ja: 'Unixタイムスタンプ変換 - タイムスタンプから日付変換 | Timestamp.im',
    ko: 'Unix 타임스탬프 변환기 - 타임스탬프를 날짜로 변환 | Timestamp.im',
    pt: 'Conversor Unix Timestamp - Converter Timestamp para Data | Timestamp.im',
    hi: 'Unix टाइमस्टैम्प कनवर्टर - ऑनलाइन टाइमस्टैम्प टूल | Timestamp.im',
    ar: 'محول Unix Timestamp - تحويل الطابع الزمني إلى تاريخ | Timestamp.im'
  };

  const descriptions = {
    en: 'Convert Unix timestamp to date and time format instantly. Free online timestamp converter with Discord timestamp generator, timezone converter, and batch conversion tools. Supports epoch time, ISO 8601, and all major timestamp formats.',
    cn: '瞬间将Unix时间戳转换为日期和时间格式。免费在线时间戳转换器，支持Discord时间戳生成、时区转换和批量转换工具。支持纪元时间、ISO 8601和所有主要时间戳格式。',
    es: 'Convierte timestamp Unix a formato de fecha y hora al instante. Conversor de timestamp online gratuito con generador Discord, conversor de zonas horarias y herramientas de conversión por lotes. Compatible con época Unix, ISO 8601.',
    fr: 'Convertissez instantanément les timestamp Unix en format date et heure. Convertisseur de timestamp en ligne gratuit avec générateur Discord, convertisseur de fuseaux horaires et outils de conversion par lot. Compatible époque Unix, ISO 8601.',
    de: 'Unix Timestamp sofort in Datum- und Zeitformat konvertieren. Kostenloser Online-Timestamp-Konverter mit Discord-Generator, Zeitzonen-Konverter und Batch-Konvertierungstools. Unterstützt Epoch-Zeit, ISO 8601.',
    it: 'Converti istantaneamente timestamp Unix in formato data e ora. Convertitore di timestamp online gratuito con generatore Discord, convertitore fuso orario e strumenti di conversione batch. Supporta epoca Unix, ISO 8601.',
    ru: 'Мгновенно конвертируйте Unix timestamp в формат даты и времени. Бесплатный онлайн конвертер временных меток с генератором Discord, конвертером часовых поясов. Поддержка эпохи Unix, ISO 8601.',
    ja: 'Unixタイムスタンプを日時形式に瞬時に変換。Discord タイムスタンプジェネレーター、タイムゾーン変換、バッチ変換ツール付きの無料オンライン変換ツール。エポック時刻、ISO 8601対応。',
    ko: 'Unix 타임스탬프를 날짜 및 시간 형식으로 즉시 변환. Discord 타임스탬프 생성기, 시간대 변환기, 일괄 변환 도구가 포함된 무료 온라인 변환기. 에포크 시간, ISO 8601 지원.',
    pt: 'Converta timestamp Unix para formato de data e hora instantaneamente. Conversor de timestamp online gratuito com gerador Discord, conversor de fuso horário e ferramentas de conversão em lote. Suporta época Unix, ISO 8601.',
    hi: 'Unix टाइमस्टैम्प को तुरंत दिनांक और समय प्रारूप में कनवर्ट करें। Discord टाइमस्टैम्प जेनरेटर, टाइमज़ोन कनवर्टर और बैच कनवर्शन टूल्स के साथ मुफ्त ऑनलाइन कनवर्टर।',
    ar: 'قم بتحويل الطابع الزمني Unix إلى تنسيق التاريخ والوقت فورًا. محول الطوابع الزمنية المجاني عبر الإنترنت مع مولد Discord، محول المناطق الزمنية وأدوات التحويل المجمع. يدعم وقت العصر، ISO 8601.'
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
    en: 'unix timestamp, timestamp converter, convert timestamp to date, unix timestamp converter, timestamp to date, epoch time converter, timestamp generator, discord timestamp, current timestamp, unix epoch time, timestamp format, datetime converter, timestamp calculator, unix time converter, epoch timestamp, timestamp decoder, time conversion, timestamp tools, unix timestamp to date, date to unix timestamp, timestamp utilities, online timestamp converter, timestamp conversion tool, epoch converter',
    cn: 'unix时间戳,时间戳转换器,时间戳转日期,Unix时间戳转换,日期转时间戳,纪元时间转换器,时间戳生成器,Discord时间戳,当前时间戳,Unix纪元时间,时间戳格式,日期时间转换器,时间戳计算器,Unix时间转换器,纪元时间戳,时间戳解码器,时间转换,时间戳工具,在线时间戳转换器',
    es: 'unix timestamp, conversor timestamp, convertir timestamp a fecha, conversor unix timestamp, timestamp a fecha, conversor época unix, generador timestamp, discord timestamp, timestamp actual, tiempo epoch unix, formato timestamp, conversor datetime, calculadora timestamp, convertidor tiempo unix, epoch timestamp, decodificador timestamp, conversión tiempo, herramientas timestamp',
    fr: 'unix timestamp, convertisseur timestamp, convertir timestamp en date, convertisseur unix timestamp, timestamp vers date, convertisseur époque unix, générateur timestamp, discord timestamp, timestamp actuel, temps epoch unix, format timestamp, convertisseur datetime, calculateur timestamp, convertisseur temps unix, epoch timestamp, décodeur timestamp, conversion temps, outils timestamp',
    de: 'unix timestamp, timestamp konverter, timestamp zu datum konvertieren, unix timestamp konverter, timestamp zu datum, epoch zeit konverter, timestamp generator, discord timestamp, aktueller timestamp, unix epoch zeit, timestamp format, datetime konverter, timestamp rechner, unix zeit konverter, epoch timestamp, timestamp decoder, zeit konvertierung, timestamp tools',
    it: 'unix timestamp, convertitore timestamp, convertire timestamp in data, convertitore unix timestamp, timestamp in data, convertitore epoca unix, generatore timestamp, discord timestamp, timestamp attuale, tempo epoch unix, formato timestamp, convertitore datetime, calcolatore timestamp, convertitore tempo unix, epoch timestamp, decodificatore timestamp, conversione tempo, strumenti timestamp',
    ru: 'unix timestamp, конвертер timestamp, конвертировать timestamp в дату, unix timestamp конвертер, timestamp в дату, конвертер эпохи unix, генератор timestamp, discord timestamp, текущий timestamp, unix epoch время, формат timestamp, datetime конвертер, калькулятор timestamp, unix время конвертер, epoch timestamp, декодер timestamp, конвертация времени, инструменты timestamp',
    ja: 'unix timestamp,タイムスタンプ変換,タイムスタンプから日付変換,unixタイムスタンプ変換器,タイムスタンプから日付,エポック時刻変換器,タイムスタンプ生成器,discordタイムスタンプ,現在のタイムスタンプ,unixエポック時刻,タイムスタンプ形式,datetime変換器,タイムスタンプ計算機,unixタイム変換器,エポックタイムスタンプ,タイムスタンプデコーダー,時刻変換,タイムスタンプツール',
    ko: 'unix timestamp,타임스탬프 변환기,타임스탬프를 날짜로 변환,unix 타임스탬프 변환기,타임스탬프를 날짜로,에포크 시간 변환기,타임스탬프 생성기,discord 타임스탬프,현재 타임스탬프,unix 에포크 시간,타임스탬프 형식,datetime 변환기,타임스탬프 계산기,unix 시간 변환기,에포크 타임스탬프,타임스탬프 디코더,시간 변환,타임스탬프 도구',
    pt: 'unix timestamp, conversor timestamp, converter timestamp para data, conversor unix timestamp, timestamp para data, conversor época unix, gerador timestamp, discord timestamp, timestamp atual, tempo epoch unix, formato timestamp, conversor datetime, calculadora timestamp, conversor tempo unix, epoch timestamp, decodificador timestamp, conversão tempo, ferramentas timestamp',
    hi: 'unix timestamp,टाइमस्टैम्प कनवर्टर,टाइमस्टैम्प को दिनांक में कनवर्ट करें,unix टाइमस्टैम्प कनवर्टर,टाइमस्टैम्प से दिनांक,epoch समय कनवर्टर,टाइमस्टैम्प जेनरेटर,discord टाइमस्टैम्प,वर्तमान टाइमस्टैम्प,unix epoch समय,टाइमस्टैम्प प्रारूप,datetime कनवर्टर,टाइमस्टैम्प कैलकुलेटर',
    ar: 'unix timestamp,محول timestamp,تحويل timestamp إلى تاريخ,محول unix timestamp,timestamp إلى تاريخ,محول عصر unix,مولد timestamp,discord timestamp,timestamp حالي,unix epoch وقت,تنسيق timestamp,محول datetime,حاسبة timestamp,محول وقت unix,epoch timestamp,فك تشفير timestamp,تحويل الوقت,أدوات timestamp'
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
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
          <MicrosoftClarity />
          <Header locale={locale}/>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
