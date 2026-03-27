import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['hu', 'en', 'pl'],
  defaultLocale: 'hu',
  localePrefix: 'as-needed', // HU prefix nélkül, EN /en/ prefixel, PL /pl/ prefixel
  pathnames: {
    '/': '/',
    '/funkciok': { hu: '/funkciok', en: '/features', pl: '/funkcje' },
    '/funkciok/[module]': { hu: '/funkciok/[module]', en: '/features/[module]', pl: '/funkcje/[module]' },
    '/arazas': { hu: '/arazas', en: '/pricing', pl: '/cennik' },
    '/rolunk': { hu: '/rolunk', en: '/about', pl: '/o-nas' },
    '/terapeutaknak': { hu: '/terapeutaknak', en: '/therapists', pl: '/dla-terapeutow' },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/letoltes': { hu: '/letoltes', en: '/download', pl: '/pobierz' },
    '/beta': '/beta',
    '/kapcsolat': { hu: '/kapcsolat', en: '/contact', pl: '/kontakt' },
    '/gyik': { hu: '/gyik', en: '/faq', pl: '/faq' },
    '/adatvedelem': { hu: '/adatvedelem', en: '/privacy', pl: '/prywatnosc' },
    '/aszf': { hu: '/aszf', en: '/terms', pl: '/regulamin' },
  },
});
