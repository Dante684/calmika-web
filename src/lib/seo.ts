/**
 * SEO utility — canonical URL + hreflang alternates generator
 *
 * Base URL: https://calmika-web.vercel.app
 * TODO: switch to https://calmika.com when domain is live
 *
 * Pathname mapping mirrors routing.ts pathnames.
 * Default locale (hu) has no prefix; en → /en/..., pl → /pl/...
 */

export const BASE_URL = 'https://calmika-web.vercel.app';

type LocalePaths = { hu: string; en: string; pl: string };

const pathnames: Record<string, LocalePaths> = {
  '/':               { hu: '/',              en: '/en',             pl: '/pl' },
  '/funkciok':       { hu: '/funkciok',      en: '/en/features',    pl: '/pl/funkcje' },
  '/arazas':         { hu: '/arazas',        en: '/en/pricing',     pl: '/pl/cennik' },
  '/rolunk':         { hu: '/rolunk',        en: '/en/about',       pl: '/pl/o-nas' },
  '/terapeutaknak':  { hu: '/terapeutaknak', en: '/en/therapists',  pl: '/pl/dla-terapeutow' },
  '/letoltes':       { hu: '/letoltes',      en: '/en/download',    pl: '/pl/pobierz' },
  '/blog':           { hu: '/blog',          en: '/en/blog',        pl: '/pl/blog' },
  '/beta':           { hu: '/beta',          en: '/en/beta',        pl: '/pl/beta' },
  '/kapcsolat':      { hu: '/kapcsolat',     en: '/en/contact',     pl: '/pl/kontakt' },
  '/gyik':           { hu: '/gyik',          en: '/en/faq',         pl: '/pl/faq' },
  '/adatvedelem':    { hu: '/adatvedelem',   en: '/en/privacy',     pl: '/pl/prywatnosc' },
  '/aszf':           { hu: '/aszf',          en: '/en/terms',       pl: '/pl/regulamin' },
};

/**
 * Returns the `alternates` object for Next.js `generateMetadata`.
 *
 * @param internalPath - The HU internal path key (e.g. '/arazas'). Falls back to '/'.
 * @param currentLocale - The active locale ('hu' | 'en' | 'pl').
 */
export function getSeoAlternates(internalPath: string, currentLocale: string) {
  const paths: LocalePaths = pathnames[internalPath] ?? pathnames['/'];
  const canonicalPath = paths[currentLocale as keyof LocalePaths] ?? paths.hu;

  return {
    canonical: `${BASE_URL}${canonicalPath}`,
    languages: {
      'hu':        `${BASE_URL}${paths.hu}`,
      'en':        `${BASE_URL}${paths.en}`,
      'pl':        `${BASE_URL}${paths.pl}`,
      'x-default': `${BASE_URL}${paths.hu}`,
    },
  };
}

/**
 * Returns alternates for dynamic blog posts.
 * Blog slugs are the same across locales so we just swap the prefix.
 */
export function getBlogSeoAlternates(slug: string, currentLocale: string) {
  const paths: LocalePaths = {
    hu: `/blog/${slug}`,
    en: `/en/blog/${slug}`,
    pl: `/pl/blog/${slug}`,
  };
  const canonicalPath = paths[currentLocale as keyof LocalePaths] ?? paths.hu;

  return {
    canonical: `${BASE_URL}${canonicalPath}`,
    languages: {
      'hu':        `${BASE_URL}${paths.hu}`,
      'en':        `${BASE_URL}${paths.en}`,
      'pl':        `${BASE_URL}${paths.pl}`,
      'x-default': `${BASE_URL}${paths.hu}`,
    },
  };
}

/**
 * Returns alternates for dynamic module pages (/funkciok/[module]).
 * Module slugs are the same across locales; only the path prefix differs.
 */
export function getModuleSeoAlternates(moduleSlug: string, currentLocale: string) {
  const paths: LocalePaths = {
    hu: `/funkciok/${moduleSlug}`,
    en: `/en/features/${moduleSlug}`,
    pl: `/pl/funkcje/${moduleSlug}`,
  };
  const canonicalPath = paths[currentLocale as keyof LocalePaths] ?? paths.hu;

  return {
    canonical: `${BASE_URL}${canonicalPath}`,
    languages: {
      'hu':        `${BASE_URL}${paths.hu}`,
      'en':        `${BASE_URL}${paths.en}`,
      'pl':        `${BASE_URL}${paths.pl}`,
      'x-default': `${BASE_URL}${paths.hu}`,
    },
  };
}
