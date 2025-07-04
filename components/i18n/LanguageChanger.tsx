'use client';

import i18nConfig from '@/i18nConfig.js';
import { usePathname, useRouter } from 'next/navigation';

const LANGUAGE_NAMES: Record<any, string> = {
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
  const pathname = usePathname() || '/';
  const router = useRouter();

const handleChange = (lang: string) => {
  const segments = pathname.split('/').filter(Boolean); // 去掉空字符串
  const allLocales = i18nConfig.locales;
  if (allLocales.includes(segments[0])) {
    // 已有 locale，直接替换
    segments[0] = lang;
  } else {
    // 没有 locale，插入
    segments.unshift(lang);
  }
  const newPath = '/' + segments.join('/');
  router.push(newPath);
};

  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1 bg-neutral text-neutral-content hover:text-black">
        {LANGUAGE_NAMES[locale as keyof typeof LANGUAGE_NAMES]}
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow bg-neutral text-neutral-content">
        {i18nConfig.locales.map((lang) => (
          <li key={lang}>
            <button
              onClick={() => handleChange(lang)}
              className={locale === lang ? 'active' : ''}
            >
              {LANGUAGE_NAMES[lang]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
