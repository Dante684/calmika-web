import { getTranslations } from 'next-intl/server';
import TerapeutaknaClient from './terapeutaknak-client';
import { getSeoAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'therapists.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: getSeoAlternates('/terapeutaknak', locale),
  };
}

export default function TerapeutaknaPage() {
  return <TerapeutaknaClient />;
}
