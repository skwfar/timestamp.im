/**
 * @typedef {'en' | 'cn' | 'fr' | 'ja' | 'ko' | 'es' | 'de' | 'it' | 'ru' | 'pt' | 'hi' | 'ar'} Locale
 */

const i18nConfig = {
  locales: [
    'en',    // English
    'cn',    // 中文
    'fr',    // Français
    'ja',    // 日本語
    'ko',    // 한국어
    'es',    // Español
    'de',    // Deutsch
    'it',    // Italiano
    'ru',    // Русский
    'pt',    // Português
    'hi',    // हिन्दी
    'ar',    // العربية
  ],
  defaultLocale: 'en',
  prefixDefault: false
};

export default i18nConfig;