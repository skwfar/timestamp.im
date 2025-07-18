import { MetadataRoute } from 'next'
import i18nConfig from '@/i18nConfig'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://timestamp.im'
  
  // Base routes for each locale
  const routes = [
    '',
    '/t/discord',
    '/t/timezone',
    '/t/iso8601',
    '/t/details',
    '/privacy',
    '/terms',
  ]
  
  // Generate URLs for all locales
  const urls: MetadataRoute.Sitemap = []
  
  i18nConfig.locales.forEach(locale => {
    routes.forEach(route => {
      urls.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  // Add root redirect
  urls.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  })

  return urls
}