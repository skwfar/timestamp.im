'use client';

import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig.js';

const LANGUAGE_NAMES: Record<Locale, string> = {
  en: 'English',
  cn: '中文',
  ja: '日本語',
  ko: '한국어',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  ru: 'Русский',
  pt: 'Português',
  hi: 'हिन्दी',
  ar: 'العربية',
} as const;

export default function LanguageChanger({ locale }: { locale: string }) {
  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1 bg-neutral text-neutral-content hover:text-black">
        {LANGUAGE_NAMES[locale as keyof typeof LANGUAGE_NAMES]}
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow bg-neutral text-neutral-content">
        {i18nConfig.locales.map((lang) => (
          <li key={lang}>
            <a 
              href={`/${lang}`}
              className={locale === lang ? 'active' : ''}
            >
              {LANGUAGE_NAMES[lang]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
