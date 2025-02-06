'use client';

import { I18nextProvider } from 'react-i18next';
import { ReactNode, useMemo } from 'react';
import initTranslations from '@/app/i18n';
import { Resource, createInstance } from 'i18next';
import { i18n as I18N } from "i18next";

interface Props {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources: Resource;
}

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources
}: Props) {
  const i18n = useMemo(() => {
    const instance = createInstance();
    initTranslations(locale, namespaces, instance as I18N, resources);
    return instance;
  }, [locale, namespaces, resources]);

  return <I18nextProvider i18n={i18n as I18N}>{children}</I18nextProvider>;
}
