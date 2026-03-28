import { getTranslations } from 'next-intl/server';
import RolunkClient from './rolunk-client';
import { getSeoAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.about' });
  return {
    title: `${t('title')}`,
    description: t('description'),
    alternates: getSeoAlternates('/rolunk', locale),
  };
}

export default function RolunkPage() {
  return <RolunkClient />;
}
