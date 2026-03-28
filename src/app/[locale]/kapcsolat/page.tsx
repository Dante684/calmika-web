import { getTranslations } from 'next-intl/server';
import KapcsolatClient from './kapcsolat-client';
import { getSeoAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.contact' });
  return {
    title: `${t('title')}`,
    description: t('description'),
    alternates: getSeoAlternates('/kapcsolat', locale),
  };
}

export default function KapcsolatPage() {
  return <KapcsolatClient />;
}
