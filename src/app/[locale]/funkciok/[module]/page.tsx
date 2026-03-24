import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { features } from '@/lib/features-data';

interface Props {
  params: Promise<{ module: string }>;
}

export default async function ModulePage({ params }: Props) {
  const { module } = await params;
  const t = useTranslations();

  const feature = features.find((f) => f.key === module);
  const title = feature?.huName ?? module;

  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <Star className="h-12 w-12 text-calmika-teal-400 mx-auto mb-6" />
      <h1 className="font-nunito text-3xl font-bold text-calmika-dark mb-4">
        {title}
      </h1>
      <p className="text-gray-400 text-base">
        {t('common.comingSoon')}
      </p>
    </div>
  );
}

export function generateStaticParams() {
  return features.map((f) => ({ module: f.key }));
}
