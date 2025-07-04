import React from "react";
import initTranslations from "@/app/i18n";
import i18nConfig from '@/i18nConfig';
import LanguageChanger from "../i18n/LanguageChanger";

const i18nNamespaces = ["timestamp"];

const LANGUAGE_NAMES = {
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

const Header = async ({ locale }: { locale: string }) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  
  return (
    <header className="top-0 w-full">
      <div className="bg-neutral text-neutral-content bg-base-100">
        <div className="navbar mx-auto flex justify-between lg:w-1/2 xl:w-1/2">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[9999] mt-3 w-52 p-2 shadow bg-neutral text-neutral-content lg:hidden"
              >
                <li>
                  <a href={`/${locale}/t/discord`}>Discord Timestamp Generator</a>
                </li>
                {/* 以后可以在这里加更多工具 */}
              </ul>
            </div>
            <a className="btn btn-ghost text-xl" href={`/${locale}`}>
              {t("site-name")}
            </a>
            {/* locale-aware home link */}
            {/* <a className="btn btn-ghost text-xl" href={`/${locale}`}>{t("site-name")}</a> */}
          </div>
          <div className="navbar-center hidden lg:flex">
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn btn-ghost text-base font-medium px-4 rounded hover:bg-neutral-focus transition-colors">
                Tools
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[9999] w-52 p-2 shadow bg-neutral text-neutral-content">
                <li>
                  <a href={`/${locale}/t/discord`}>Discord Timestamp Generator</a>
                </li>
                {/* 以后可以在这里加更多工具 */}
              </ul>
            </div>
          </div>
          <div className="navbar-end">
            <LanguageChanger locale={locale} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
