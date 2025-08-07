import initTranslations from '../../../i18n';
import TranslationsProvider from '@/components/i18n/TranslationProvider';
import TimezoneConverter from '@/components/timestamp/timezone';
import { Suspense } from 'react';
import Loading from '../../loading';
import ErrorBoundary from '../../../../components/ErrorBoundary';

const i18nNamespaces = ['timestamp'];

async function TimezonePage({ params }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={params.locale}
          resources={resources}>
          <TimezoneConverter />
        </TranslationsProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const canonicalUrl = locale === 'en' ? 'https://timestamp.im/t/timezone' : `https://timestamp.im/${locale}/t/timezone`;
  
  const titles = {
    en: 'Timezone Converter - World Time Zone Converter | Timestamp.im',
    cn: '时区转换器 - 世界时区时间转换工具 | Timestamp.im',
    es: 'Conversor de Zona Horaria - Convertidor Mundial | Timestamp.im',
    fr: 'Convertisseur de Fuseau Horaire - Convertir Fuseaux | Timestamp.im',
    de: 'Zeitzonen-Konverter - Weltzeit Umrechner | Timestamp.im',
    it: 'Convertitore Fuso Orario - Convertitore Mondiale | Timestamp.im',
    ru: 'Конвертер Часовых Поясов - Мировое Время | Timestamp.im',
    ja: 'タイムゾーン変換 - 世界時間帯コンバーター | Timestamp.im',
    ko: '시간대 변환기 - 세계 시간대 변환 도구 | Timestamp.im',
    pt: 'Conversor de Fuso Horário - Conversor Mundial | Timestamp.im',
    hi: 'टाइमज़ोन कनवर्टर - विश्व समय क्षेत्र परिवर्तक | Timestamp.im',
    ar: 'محول المناطق الزمنية - محول التوقيت العالمي | Timestamp.im'
  };

  const descriptions = {
    en: 'Convert time between any timezone worldwide with automatic DST handling. Schedule meetings across time zones, compare world times, and coordinate with global teams. Supports GMT, UTC, PST, EST, CET and 400+ timezones.',
    cn: '在世界各地任何时区之间转换时间，自动处理夏令时。安排跨时区会议，比较世界时间，与全球团队协调。支持GMT、UTC、PST、EST、CET和400+时区。',
    es: 'Convierte la hora entre cualquier zona horaria mundial con manejo automático del horario de verano. Programa reuniones a través de zonas horarias, compara horarios mundiales y coordina con equipos globales.',
    fr: 'Convertissez l\'heure entre n\'importe quel fuseau horaire mondial avec gestion automatique de l\'heure d\'été. Planifiez des réunions à travers les fuseaux horaires, comparez les heures mondiales et coordonnez avec des équipes globales.',
    de: 'Konvertieren Sie die Zeit zwischen beliebigen Zeitzonen weltweit mit automatischer Sommerzeit-Behandlung. Planen Sie Besprechungen über Zeitzonen hinweg, vergleichen Sie Weltzeiten und koordinieren Sie mit globalen Teams.',
    it: 'Converti il tempo tra qualsiasi fuso orario mondiale con gestione automatica dell\'ora legale. Programma riunioni attraverso fusi orari, confronta gli orari mondiali e coordina con team globali.',
    ru: 'Конвертируйте время между любыми часовыми поясами мира с автоматической обработкой летнего времени. Планируйте встречи через часовые пояса, сравнивайте мировое время и координируйтесь с глобальными командами.',
    ja: '自動的な夏時間処理により、世界中の任意のタイムゾーン間で時間を変換。タイムゾーンを跨いだ会議の予定、世界時間の比較、グローバルチームとの調整が可能。GMT、UTC、PST、EST、CETなど400以上のタイムゾーンをサポート。',
    ko: '자동 일광 절약 시간 처리로 전 세계 모든 시간대 간 시간 변환. 시간대를 넘나드는 회의 일정, 세계 시간 비교, 글로벌 팀과의 조율. GMT, UTC, PST, EST, CET 및 400개 이상의 시간대 지원.',
    pt: 'Converta o tempo entre qualquer fuso horário mundial com tratamento automático de horário de verão. Agende reuniões através de fusos horários, compare horários mundiais e coordene com equipes globais.',
    hi: 'स्वचालित DST हैंडलिंग के साथ दुनिया भर के किसी भी समय क्षेत्र के बीच समय कनवर्ट करें। समय क्षेत्रों में मीटिंग शेड्यूल करें, विश्व समय की तुलना करें, और वैश्विक टीमों के साथ समन्वय करें।',
    ar: 'قم بتحويل الوقت بين أي منطقة زمنية في العالم مع المعالجة التلقائية للتوقيت الصيفي. جدولة الاجتماعات عبر المناطق الزمنية، مقارنة الأوقات العالمية، والتنسيق مع الفرق العالمية.'
  };

  const keywordsMap = {
    en: 'timezone converter, time zone conversion, world time converter, GMT converter, UTC converter, PST to EST, timezone calculator, world clock, international time, meeting scheduler, time zone tool, global time, daylight saving time, timezone comparison, world time zones, time difference calculator',
    cn: '时区转换器,世界时间转换,GMT转换,UTC转换,PST到EST,时区计算器,世界时钟,国际时间,会议调度器,时区工具,全球时间,夏令时,时区比较,世界时区,时差计算器',
    es: 'conversor zona horaria, conversión zona horaria, conversor tiempo mundial, conversor GMT, conversor UTC, PST a EST, calculadora zona horaria, reloj mundial, tiempo internacional, programador reuniones, herramienta zona horaria, tiempo global, horario verano, comparación zona horaria',
    fr: 'convertisseur fuseau horaire, conversion fuseau horaire, convertisseur temps mondial, convertisseur GMT, convertisseur UTC, PST vers EST, calculateur fuseau horaire, horloge mondiale, temps international, planificateur réunions, outil fuseau horaire, temps global, heure été, comparaison fuseau horaire',
    de: 'zeitzonen konverter, zeitzone umrechnung, weltzeit konverter, GMT konverter, UTC konverter, PST zu EST, zeitzonen rechner, weltzeit uhr, internationale zeit, meeting planer, zeitzonen tool, globale zeit, sommerzeit, zeitzonen vergleich',
    it: 'convertitore fuso orario, conversione fuso orario, convertitore tempo mondiale, convertitore GMT, convertitore UTC, PST a EST, calcolatore fuso orario, orologio mondiale, tempo internazionale, pianificatore riunioni, strumento fuso orario, tempo globale, ora legale, confronto fuso orario',
    ru: 'конвертер часовых поясов, конвертация часовых поясов, конвертер мирового времени, GMT конвертер, UTC конвертер, PST в EST, калькулятор часовых поясов, мировые часы, международное время, планировщик встреч, инструмент часовых поясов, глобальное время, летнее время, сравнение часовых поясов',
    ja: 'タイムゾーンコンバーター,時差変換,世界時間変換,GMT変換,UTC変換,PST から EST,タイムゾーン計算機,世界時計,国際時間,ミーティングスケジューラー,タイムゾーンツール,グローバル時間,夏時間,タイムゾーン比較',
    ko: '시간대 변환기,시간대 변환,세계 시간 변환기,GMT 변환기,UTC 변환기,PST에서 EST,시간대 계산기,세계 시계,국제 시간,미팅 스케줄러,시간대 도구,글로벌 시간,일광 절약 시간,시간대 비교',
    pt: 'conversor fuso horário, conversão fuso horário, conversor tempo mundial, conversor GMT, conversor UTC, PST para EST, calculadora fuso horário, relógio mundial, tempo internacional, agendador reuniões, ferramenta fuso horário, tempo global, horário verão, comparação fuso horário',
    hi: 'टाइमज़ोन कनवर्टर,समय क्षेत्र रूपांतरण,विश्व समय कनवर्टर,GMT कनवर्टर,UTC कनवर्टर,PST से EST,टाइमज़ोन कैलकुलेटर,विश्व घड़ी,अंतर्राष्ट्रीय समय,मीटिंग शेड्यूलर,टाइमज़ोन टूल,वैश्विक समय,डेलाइट सेविंग टाइम,टाइमज़ोन तुलना',
    ar: 'محول المناطق الزمنية,تحويل المنطقة الزمنية,محول التوقيت العالمي,محول GMT,محول UTC,PST إلى EST,حاسبة المنطقة الزمنية,ساعة عالمية,وقت دولي,مجدول الاجتماعات,أداة المنطقة الزمنية,وقت عالمي,التوقيت الصيفي,مقارنة المناطق الزمنية'
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

export default TimezonePage;