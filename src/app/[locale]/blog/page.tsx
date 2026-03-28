import { getTranslations } from 'next-intl/server';
import { getBlogPosts } from '@/lib/blog';
import { BlogListing } from '@/components/blog/blog-listing';
import { getSeoAlternates } from '@/lib/seo';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return {
    title: `${t('title')}`,
    description: t('subtitle'),
    alternates: getSeoAlternates('/blog', locale),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  const posts = getBlogPosts(locale);

  const categories = [
    { key: 'parents', label: t('categories.parents') },
    { key: 'therapists', label: t('categories.therapists') },
    { key: 'updates', label: t('categories.updates') },
    { key: 'research', label: t('categories.research') },
  ];

  return (
    <div style={{ backgroundColor: '#f9f9f7', minHeight: '100vh' }}>
      {/* Teal gradient hero header */}
      <div
        className="relative overflow-hidden py-20 md:py-28"
        style={{
          background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 50%, #5eead4 100%)',
        }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-10 -left-10 w-64 h-64 rounded-full pointer-events-none"
          style={{ backgroundColor: '#ffffff', filter: 'blur(80px)', opacity: 0.08 }}
          aria-hidden
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ backgroundColor: '#f9bd22', filter: 'blur(100px)', opacity: 0.10 }}
          aria-hidden
        />

        <div className="max-w-5xl mx-auto px-6 md:px-8 text-center relative z-10">
          {/* Pill badge */}
          <div
            className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}
          >
            Calmika
          </div>

          <h1 className="font-nunito text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-14">
        <BlogListing
          posts={posts}
          locale={locale}
          categories={categories}
          allLabel={t('categories.all')}
          readingTimeTemplate={t('readingTime')}
          newsletterTitle={t('newsletter.title')}
          newsletterSubtitle={t('newsletter.subtitle')}
          newsletterPlaceholder={t('newsletter.placeholder')}
          newsletterButton={t('newsletter.button')}
        />
      </div>
    </div>
  );
}
