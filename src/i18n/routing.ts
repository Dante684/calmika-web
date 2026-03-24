import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['hu', 'en'],
  defaultLocale: 'hu',
  localePrefix: 'as-needed', // HU prefix nélkül, EN /en/ prefixel
  pathnames: {
    '/': '/',
    '/funkciok': { hu: '/funkciok', en: '/features' },
    '/funkciok/[module]': { hu: '/funkciok/[module]', en: '/features/[module]' },
    '/arazas': { hu: '/arazas', en: '/pricing' },
    '/rolunk': { hu: '/rolunk', en: '/about' },
    '/terapeutaknak': { hu: '/terapeutaknak', en: '/therapists' },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/letoltes': { hu: '/letoltes', en: '/download' },
    '/beta': '/beta',
    '/kapcsolat': { hu: '/kapcsolat', en: '/contact' },
    '/gyik': { hu: '/gyik', en: '/faq' },
    '/adatvedelem': { hu: '/adatvedelem', en: '/privacy' },
    '/aszf': { hu: '/aszf', en: '/terms' },
  },
});
