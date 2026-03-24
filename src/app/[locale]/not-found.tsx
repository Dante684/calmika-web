import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('common');

  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <SearchX className="h-16 w-16 text-calmika-teal-400 mx-auto mb-6" />
      <h1 className="font-nunito text-4xl font-bold text-calmika-dark mb-4">
        404
      </h1>
      <p className="text-gray-500 text-xl mb-8">
        Az oldal nem található
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-calmika-teal-400 px-6 py-3 text-white font-semibold hover:bg-calmika-teal-500 transition-colors"
      >
        {t('backToHome')}
      </Link>
    </div>
  );
}
