import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calmika.com';
  const locales = ['hu', 'en'];

  const pages = [
    '',
    '/funkciok',
    '/arazas',
    '/rolunk',
    '/terapeutaknak',
    '/blog',
    '/letoltes',
    '/beta',
    '/kapcsolat',
    '/gyik',
    '/adatvedelem',
    '/aszf',
  ];

  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}${locale === 'hu' ? '' : '/en'}${page}`,
      lastModified: new Date(),
      changeFrequency: (page === '/blog' ? 'weekly' : 'monthly') as
        | 'weekly'
        | 'monthly',
      priority: page === '' ? 1.0 : 0.8,
    }))
  );
}
