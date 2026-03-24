import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const t = useTranslations();

  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <Star className="h-12 w-12 text-calmika-teal-400 mx-auto mb-6" />
      <h1 className="font-nunito text-3xl font-bold text-calmika-dark mb-4">
        Blog post: {slug}
      </h1>
      <p className="text-gray-400 text-base">
        {t('common.comingSoon')}
      </p>
    </div>
  );
}
