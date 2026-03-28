import { getTranslations } from 'next-intl/server';
import LetoltesClient from './letoltes-client';
import { getSeoAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.download' });
  return {
    title: `${t('title')} — Calmika`,
    description: t('description'),
    alternates: getSeoAlternates('/letoltes', locale),
  };
}

export default function LetoltesPage() {
  return <LetoltesClient />;
}
