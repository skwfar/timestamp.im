import initTranslations from '../../../i18n';
import TranslationsProvider from '@/components/i18n/TranslationProvider';
import ISO8601Converter from '@/components/timestamp/iso8601';
import { Suspense } from 'react';
import Loading from '../../loading';
import ErrorBoundary from '../../../../components/ErrorBoundary';

const i18nNamespaces = ['timestamp'];

async function ISO8601Page({ params }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={params.locale}
          resources={resources}>
          <ISO8601Converter />
        </TranslationsProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const canonicalUrl = locale === 'en' ? 'https://timestamp.im/t/iso8601' : `https://timestamp.im/${locale}/t/iso8601`;
  
  const titles = {
    en: 'ISO 8601 Timestamp Converter - Date Format Standard | Timestamp.im',
    cn: 'ISO 8601 时间戳转换器 - 日期格式标准 | Timestamp.im',
    es: 'Conversor ISO 8601 - Formato de Fecha Estándar | Timestamp.im',
    fr: 'Convertisseur ISO 8601 - Format de Date Standard | Timestamp.im',
    de: 'ISO 8601 Konverter - Standard Datumsformat | Timestamp.im',
    it: 'Convertitore ISO 8601 - Formato Data Standard | Timestamp.im',
    ru: 'ISO 8601 Конвертер - Стандартный Формат Даты | Timestamp.im',
    ja: 'ISO 8601 変換 - 標準日付形式コンバーター | Timestamp.im',
    ko: 'ISO 8601 변환기 - 표준 날짜 형식 변환 | Timestamp.im',
    pt: 'Conversor ISO 8601 - Formato de Data Padrão | Timestamp.im',
    hi: 'ISO 8601 कनवर्टर - मानक दिनांक प्रारूप | Timestamp.im',
    ar: 'محول ISO 8601 - تنسيق التاريخ المعياري | Timestamp.im'
  };

  const descriptions = {
    en: 'Convert ISO 8601 timestamps to readable dates and Unix timestamps. ISO 8601 is the international standard for date and time representation (YYYY-MM-DDTHH:mm:ss.sssZ). Supports UTC, timezone offsets, and RFC 3339 format validation.',
    cn: '将ISO 8601时间戳转换为可读日期和Unix时间戳。ISO 8601是日期和时间表示的国际标准(YYYY-MM-DDTHH:mm:ss.sssZ)。支持UTC、时区偏移和RFC 3339格式验证。',
    es: 'Convierte timestamps ISO 8601 a fechas legibles y timestamps Unix. ISO 8601 es el estándar internacional para representación de fecha y hora (YYYY-MM-DDTHH:mm:ss.sssZ). Soporta UTC, offsets de zona horaria y validación de formato RFC 3339.',
    fr: 'Convertissez les timestamps ISO 8601 en dates lisibles et timestamps Unix. ISO 8601 est la norme internationale pour la représentation de date et heure (YYYY-MM-DDTHH:mm:ss.sssZ). Supporte UTC, décalages de fuseau horaire et validation du format RFC 3339.',
    de: 'Konvertieren Sie ISO 8601 Timestamps in lesbare Daten und Unix Timestamps. ISO 8601 ist der internationale Standard für Datums- und Zeitdarstellung (YYYY-MM-DDTHH:mm:ss.sssZ). Unterstützt UTC, Zeitzonen-Offsets und RFC 3339 Format-Validierung.',
    it: 'Converti i timestamp ISO 8601 in date leggibili e timestamp Unix. ISO 8601 è lo standard internazionale per la rappresentazione di data e ora (YYYY-MM-DDTHH:mm:ss.sssZ). Supporta UTC, offset fuso orario e validazione formato RFC 3339.',
    ru: 'Конвертируйте timestamps ISO 8601 в читаемые даты и Unix timestamps. ISO 8601 - международный стандарт представления даты и времени (YYYY-MM-DDTHH:mm:ss.sssZ). Поддержка UTC, смещений часовых поясов и валидации формата RFC 3339.',
    ja: 'ISO 8601タイムスタンプを読みやすい日付とUnixタイムスタンプに変換。ISO 8601は日付と時刻表現の国際規格(YYYY-MM-DDTHH:mm:ss.sssZ)。UTC、タイムゾーンオフセット、RFC 3339形式の検証をサポート。',
    ko: 'ISO 8601 타임스탬프를 읽기 쉬운 날짜와 Unix 타임스탬프로 변환. ISO 8601은 날짜와 시간 표현의 국제 표준(YYYY-MM-DDTHH:mm:ss.sssZ). UTC, 시간대 오프셋, RFC 3339 형식 검증을 지원.',
    pt: 'Converta timestamps ISO 8601 em datas legíveis e timestamps Unix. ISO 8601 é o padrão internacional para representação de data e hora (YYYY-MM-DDTHH:mm:ss.sssZ). Suporta UTC, offsets de fuso horário e validação de formato RFC 3339.',
    hi: 'ISO 8601 टाइमस्टैम्प को पठनीय दिनांक और Unix टाइमस्टैम्प में कनवर्ट करें। ISO 8601 दिनांक और समय प्रतिनिधित्व के लिए अंतर्राष्ट्रीय मानक है (YYYY-MM-DDTHH:mm:ss.sssZ)। UTC, टाइमज़ोन ऑफसेट, और RFC 3339 प्रारूप सत्यापन का समर्थन करता है।',
    ar: 'قم بتحويل timestamps ISO 8601 إلى تواريخ مقروءة و Unix timestamps. ISO 8601 هو المعيار الدولي لتمثيل التاريخ والوقت (YYYY-MM-DDTHH:mm:ss.sssZ). يدعم UTC وإزاحات المناطق الزمنية والتحقق من صحة تنسيق RFC 3339.'
  };

  const keywordsMap = {
    en: 'iso 8601, iso timestamp, iso 8601 format, iso date format, iso 8601 converter, timestamp format, iso 8601 to unix, unix to iso 8601, rfc 3339, utc timestamp, international date format, standard date format, datetime format, iso format converter, date time standard, timezone format, iso string, datetime iso format, date parser',
    cn: 'iso 8601,iso时间戳,iso 8601格式,iso日期格式,iso 8601转换器,时间戳格式,iso 8601转unix,unix转iso 8601,rfc 3339,utc时间戳,国际日期格式,标准日期格式,日期时间格式,iso格式转换器,日期时间标准,时区格式,iso字符串,日期时间iso格式,日期解析器',
    es: 'iso 8601, timestamp iso, formato iso 8601, formato fecha iso, conversor iso 8601, formato timestamp, iso 8601 a unix, unix a iso 8601, rfc 3339, timestamp utc, formato fecha internacional, formato fecha estándar, formato datetime, convertidor formato iso, estándar fecha hora, formato zona horaria, cadena iso, formato iso datetime, analizador fecha',
    fr: 'iso 8601, timestamp iso, format iso 8601, format date iso, convertisseur iso 8601, format timestamp, iso 8601 vers unix, unix vers iso 8601, rfc 3339, timestamp utc, format date international, format date standard, format datetime, convertisseur format iso, standard date heure, format fuseau horaire, chaîne iso, format iso datetime, analyseur date',
    de: 'iso 8601, iso timestamp, iso 8601 format, iso datumsformat, iso 8601 konverter, timestamp format, iso 8601 zu unix, unix zu iso 8601, rfc 3339, utc timestamp, internationales datumsformat, standard datumsformat, datetime format, iso format konverter, datum zeit standard, zeitzone format, iso string, datetime iso format, datum parser',
    it: 'iso 8601, timestamp iso, formato iso 8601, formato data iso, convertitore iso 8601, formato timestamp, iso 8601 a unix, unix a iso 8601, rfc 3339, timestamp utc, formato data internazionale, formato data standard, formato datetime, convertitore formato iso, standard data ora, formato fuso orario, stringa iso, formato iso datetime, parser data',
    ru: 'iso 8601, iso timestamp, iso 8601 формат, iso формат даты, iso 8601 конвертер, формат timestamp, iso 8601 в unix, unix в iso 8601, rfc 3339, utc timestamp, международный формат даты, стандартный формат даты, datetime формат, iso формат конвертер, стандарт дата время, формат часового пояса, iso строка, datetime iso формат, парсер даты',
    ja: 'iso 8601,isoタイムスタンプ,iso 8601形式,iso日付形式,iso 8601変換器,タイムスタンプ形式,iso 8601からunix,unixからiso 8601,rfc 3339,utcタイムスタンプ,国際日付形式,標準日付形式,datetime形式,iso形式変換器,日付時刻標準,タイムゾーン形式,iso文字列,datetime iso形式,日付パーサー',
    ko: 'iso 8601,iso 타임스탬프,iso 8601 형식,iso 날짜 형식,iso 8601 변환기,타임스탬프 형식,iso 8601을 unix로,unix를 iso 8601로,rfc 3339,utc 타임스탬프,국제 날짜 형식,표준 날짜 형식,datetime 형식,iso 형식 변환기,날짜 시간 표준,시간대 형식,iso 문자열,datetime iso 형식,날짜 파서',
    pt: 'iso 8601, timestamp iso, formato iso 8601, formato data iso, conversor iso 8601, formato timestamp, iso 8601 para unix, unix para iso 8601, rfc 3339, timestamp utc, formato data internacional, formato data padrão, formato datetime, conversor formato iso, padrão data hora, formato fuso horário, string iso, formato iso datetime, analisador data',
    hi: 'iso 8601,iso टाइमस्टैम्प,iso 8601 प्रारूप,iso दिनांक प्रारूप,iso 8601 कनवर्टर,टाइमस्टैम्प प्रारूप,iso 8601 से unix,unix से iso 8601,rfc 3339,utc टाइमस्टैम्प,अंतर्राष्ट्रीय दिनांक प्रारूप,मानक दिनांक प्रारूप,datetime प्रारूप,iso प्रारूप कनवर्टर,दिनांक समय मानक,टाइमज़ोन प्रारूप,iso स्ट्रिंग,datetime iso प्रारूप,दिनांक पार्सर',
    ar: 'iso 8601,timestamp iso,تنسيق iso 8601,تنسيق التاريخ iso,محول iso 8601,تنسيق timestamp,iso 8601 إلى unix,unix إلى iso 8601,rfc 3339,timestamp utc,تنسيق التاريخ الدولي,تنسيق التاريخ المعياري,تنسيق datetime,محول تنسيق iso,معيار التاريخ والوقت,تنسيق المنطقة الزمنية,سلسلة iso,تنسيق iso datetime,محلل التاريخ'
  };

  const title = titles[locale as keyof typeof titles] || titles.en;
  const description = descriptions[locale as keyof typeof descriptions] || descriptions.en;
  const keywords = keywordsMap[locale as keyof typeof keywordsMap] || keywordsMap.en;

  return {
    title,
    description,
    keywords,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Timestamp.im',
      images: [
        {
          url: 'https://timestamp.im/og-image.png',
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
      images: ['https://timestamp.im/og-image.png'],
    },
  };
}

export default ISO8601Page;