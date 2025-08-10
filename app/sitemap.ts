import { MetadataRoute } from 'next'

const baseUrl = 'https://dev-forge.vercel.app'

const tools = [
  'json',
  'base64',
  'timestamp',
  'crontab',
  'hash',
  'jwt',
  'uuid',
  'password',
  'url',
  'beautifier',
  'color',
  'base',
  'sql',
  'image2base64',
  'convert',
  'http-status',
  'user-agent'
]

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'zh']
  const sitemap: MetadataRoute.Sitemap = []

  // Add root pages
  sitemap.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  })

  // Add locale-specific pages
  locales.forEach(locale => {
    // Home page for each locale
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })

    // Tool pages for each locale
    tools.forEach(tool => {
      sitemap.push({
        url: `${baseUrl}/${locale}/${tool}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    })
  })

  return sitemap
}
