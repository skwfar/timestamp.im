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
    <header className="fixed top-0 w-full">
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
              {/* <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow bg-neutral text-neutral-content"
              >
                <li>
                  <a>Tools list</a>
                  <ul className="p-2">
                    <li>
                      <a href="/discord">Discord Timestamp Convertor</a>
                    </li>
                  </ul>
                </li>
              </ul> */}
            </div>
            <a className="btn btn-ghost text-xl" href="/">
              {t("site-name")}
            </a>
          </div>
          {/* <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary>Tools list</summary>
                  <ul className="p-2 bg-neutral text-neutral-content min-w-max">
                    <li>
                    <a href="/discord">Discord Timestamp Convertor</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div> */}
          <div className="navbar-end">
            <LanguageChanger locale={locale} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
