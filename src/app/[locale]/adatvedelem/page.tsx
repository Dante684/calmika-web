import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';

export default function AdatvedelemPage() {
  const t = useTranslations();

  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <Star className="h-12 w-12 text-calmika-teal-400 mx-auto mb-6" />
      <h1 className="font-nunito text-3xl font-bold text-calmika-dark mb-4">
        {t('pages.privacy.title')}
      </h1>
      <p className="text-gray-500 text-lg mb-2">
        {t('pages.privacy.description')}
      </p>
      <p className="text-gray-400 text-base">
        {t('common.comingSoon')}
      </p>
    </div>
  );
}
