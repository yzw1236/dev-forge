import { MetadataRoute } from 'next'

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
];

const locales = ['en', 'zh'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dev-forge.vercel.app';
  
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];

  // Add locale-specific home pages
  locales.forEach(locale => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    });
  });

  // Add tool pages for each locale
  locales.forEach(locale => {
    tools.forEach(tool => {
      routes.push({
        url: `${baseUrl}/${locale}/${tool}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      });
    });
  });

  return routes;
} 