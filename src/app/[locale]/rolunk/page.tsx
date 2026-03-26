import { getTranslations } from 'next-intl/server';
import RolunkClient from './rolunk-client';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.about' });
  return {
    title: `${t('title')} — Calmika`,
    description: t('description'),
  };
}

export default function RolunkPage() {
  return <RolunkClient />;
}
