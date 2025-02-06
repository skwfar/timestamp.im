import { createInstance, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import i18nConfig from '../i18nConfig.js';
import { i18n as I18N } from "i18next";

// 添加资源缓存
const resourceCache: Record<string, Resource> = {};

export default async function initTranslations(
  locale: string,
  namespaces: string[],
  i18nInstance: I18N = createInstance() as I18N,
  resources?: Resource
) {
  const cacheKey = `${locale}-${namespaces.join('-')}`;
  
  try {
    i18nInstance.use(initReactI18next);

    // 优先使用缓存
    if (!resources && resourceCache[cacheKey]) {
      resources = resourceCache[cacheKey];
    }

    if (!resources) {
      i18nInstance.use(
        resourcesToBackend(async (language: string, namespace: string) => {
          try {
            const translationModule = await import(`@/locales/${language}/${namespace}.json`); // 改为 translationModule
            // 更新缓存
            if (!resourceCache[cacheKey]) {
              resourceCache[cacheKey] = {};
            }
            resourceCache[cacheKey][language] = {
              ...resourceCache[cacheKey][language],
              [namespace]: translationModule.default
            };
            return translationModule.default; // 使用 translationModule
          } catch (error) {
            console.error(`Failed to load translation: ${language}/${namespace}`, error);
            return {};
          }
        })
      );
    }

    await i18nInstance.init({
      lng: locale,
      resources,
      fallbackLng: i18nConfig.defaultLocale,
      supportedLngs: i18nConfig.locales,
      defaultNS: namespaces[0],
      fallbackNS: namespaces[0],
      ns: namespaces,
      preload: resources ? [] : i18nConfig.locales,
    });

    return {
      i18n: i18nInstance,
      resources: i18nInstance.services.resourceStore.data,
      t: i18nInstance.t.bind(i18nInstance),
    };
  } catch (error) {
    console.error('Translation initialization failed:', error);
    throw error;
  }
} 