import { getTranslations } from 'next-intl/server';
import KapcsolatClient from './kapcsolat-client';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.contact' });
  return {
    title: `${t('title')} — Calmika`,
    description: t('description'),
  };
}

export default function KapcsolatPage() {
  return <KapcsolatClient />;
}
