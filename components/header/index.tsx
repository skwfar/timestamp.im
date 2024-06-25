import React from "react";
import initTranslations from "@/app/i18n";

const i18nNamespaces = ["timestamp"];

const Header = async ({ locale: locale }: { locale: string }) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <header className="fixed top-0 w-full bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center lg:w-1/2 xl:w-1/2">
        <a href="/" className="text-lg font-bold">{t("site-name")}</a>
        <nav className="relative inline-block text-left">
          <div className="inline-flex group relative">
            <a className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-gray-300 rounded-md group-hover:bg-gray-700 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-800 transition-all duration-300">
              {t("language")}
            </a>

            <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-300 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="py-1">
                <a
                  href="/en"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  English
                </a>
                <a
                  href="/cn"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  中文
                </a>
                {/* Add more language options as needed */}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
