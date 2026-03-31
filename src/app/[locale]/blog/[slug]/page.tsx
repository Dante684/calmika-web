import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { getBlogPost, getRelatedPosts, getAllSlugs, extractHeadings, markdownToHtml } from '@/lib/blog';
import { BlogCard } from '@/components/blog/blog-card';
import { ShareButtons } from '@/components/blog/share-buttons';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { getBlogSeoAlternates } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ['hu', 'en'];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const slugs = getAllSlugs(locale);
    slugs.forEach((slug) => params.push({ locale, slug }));
  }
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);
  if (!post) return {};
  return {
    title: `${post.title} — Calmika Blog`,
    description: post.description,
    alternates: getBlogSeoAlternates(slug, locale),
  };
}

// Category color helper
function categoryStyle(category: string): { bg: string; color: string } {
  const map: Record<string, { bg: string; color: string }> = {
    Szülőknek: { bg: '#b9e9e0', color: '#006b5f' },
    Parents: { bg: '#b9e9e0', color: '#006b5f' },
    Terapeutáknak: { bg: '#DDD6FE', color: '#5b21b6' },
    Therapists: { bg: '#DDD6FE', color: '#5b21b6' },
    Kutatás: { bg: '#FCD34D', color: '#92400e' },
    Research: { bg: '#FCD34D', color: '#92400e' },
    'App frissítések': { bg: '#FDA4AF', color: '#9f1239' },
    Updates: { bg: '#FDA4AF', color: '#9f1239' },
  };
  return map[category] ?? { bg: '#e5e7eb', color: '#374151' };
}

function formatDate(dateStr: string, locale: string): string {
  try {
    return new Date(dateStr).toLocaleDateString(locale === 'hu' ? 'hu-HU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);

  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'blog' });
  const related = getRelatedPosts(locale, slug, post.category, 3);
  const headings = extractHeadings(post.content);
  const htmlContent = markdownToHtml(post.content);
  const catStyle = categoryStyle(post.category);
  const postUrl = `https://calmika.com/${locale}/blog/${slug}`;

  const readingLabel = t('readingTime').replace('{minutes}', String(post.readingTime));

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.date,
    url: postUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Calmika',
      logo: {
        '@type': 'ImageObject',
        url: 'https://calmika-web.vercel.app/images/logo.png',
      },
    },
    ...(post.image ? { image: post.image } : {}),
  };

  // PlayStore SVG
  function PlayStoreIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M3.18 23.76a2 2 0 0 0 2.18-.22l12.26-7.08-2.88-2.88L3.18 23.76ZM.5 1.49A2 2 0 0 0 0 2.91v18.18a2 2 0 0 0 .5 1.42l.07.07 10.18-10.18v-.24L.57 1.42.5 1.49ZM21.12 10.4l-2.93-1.7-3.23 3.23 3.23 3.24 2.95-1.7a2.01 2.01 0 0 0 0-3.07ZM5.36.46 17.62 7.54l-2.88 2.88L3.18.22A2 2 0 0 1 5.36.46Z" />
      </svg>
    );
  }

  return (
    <>
    <JsonLd data={articleSchema} />
    <div style={{ backgroundColor: '#f9f9f7', minHeight: '100vh' }}>
      {/* Teal gradient hero strip */}
      <div
        className="relative py-10 md:py-14 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 60%, #5eead4 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)' }}
          aria-hidden
        />
        <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-white/70 text-sm mb-6 flex-wrap">
            <Link href={`/${locale}/blog`} className="hover:text-white transition-colors font-medium">
              {t('title')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-bold"
              style={{ backgroundColor: 'rgba(255,255,255,0.25)', color: '#fff' }}
            >
              {post.category}
            </span>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-white/90 line-clamp-1 max-w-xs">{post.title}</span>
          </nav>

          {/* Post header */}
          <h1 className="font-nunito text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5 max-w-3xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {t('by')} {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date, locale)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readingLabel}
            </span>
            <span
              className="rounded-full px-3 py-0.5 text-xs font-bold"
              style={{ backgroundColor: catStyle.bg, color: catStyle.color }}
            >
              {post.category}
            </span>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-12">
        <div className="flex gap-10 items-start">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            {/* Hero image placeholder */}
            <div
              className="w-full aspect-video rounded-2xl mb-10 flex items-center justify-center overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #b9e9e0 0%, #e0f7f4 100%)' }}
            >
              <div className="flex flex-col items-center gap-3 opacity-30">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#006b5f" strokeWidth="1.2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                <span className="text-sm font-medium" style={{ color: '#006b5f' }}>Calmika Blog</span>
              </div>
            </div>

            {/* Prose content */}
            <div
              className="blog-prose max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Share buttons */}
            <div
              className="mt-12 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              style={{ borderTop: '1px solid #e8f9f6' }}
            >
              <ShareButtons url={postUrl} title={post.title} label={t('share')} />
            </div>

            {/* Author box */}
            <div
              className="mt-10 rounded-2xl p-6 flex items-start gap-5"
              style={{ backgroundColor: '#ffffff', boxShadow: '0 8px 40px rgba(0,0,0,0.04)' }}
            >
              {/* Avatar placeholder */}
              <div
                className="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center text-2xl font-bold"
                style={{ background: 'linear-gradient(135deg, #b9e9e0 0%, #14b8a6 100%)', color: '#006b5f' }}
              >
                KD
              </div>
              <div>
                <div className="font-nunito font-bold text-base mb-1" style={{ color: '#1a1c1b' }}>
                  {post.author}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>
                  {t('authorBio')}
                </p>
              </div>
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <section className="mt-16">
                <h2 className="font-nunito text-2xl font-bold mb-6" style={{ color: '#1a1c1b' }}>
                  {t('relatedPosts')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {related.map((rp) => (
                    <BlogCard
                      key={rp.slug}
                      title={rp.title}
                      excerpt={rp.description}
                      date={rp.date}
                      category={rp.category}
                      slug={rp.slug}
                      locale={locale}
                      image={rp.image}
                      readingTime={rp.readingTime}
                      readingTimeLabel={t('readingTime').replace('{minutes}', String(rp.readingTime))}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* CTA section */}
            <div
              className="mt-16 rounded-3xl p-10 text-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)' }}
            >
              <div
                className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
                style={{ backgroundColor: '#f9bd22', filter: 'blur(60px)', opacity: 0.15 }}
                aria-hidden
              />
              <h3 className="font-nunito text-2xl md:text-3xl font-extrabold text-white mb-3">
                {t('ctaTitle')}
              </h3>
              <p className="text-white/80 mb-8 max-w-md mx-auto">
                {t('ctaDescription')}
              </p>
              <a
                href="https://play.google.com/store/apps/details?id=com.magicworlds.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#ffffff', color: '#006b5f' }}
              >
                <PlayStoreIcon />
                {t('ctaButton')}
              </a>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 sticky top-24">
            <TableOfContents headings={headings} label={t('toc')} />

            {/* Related posts sidebar */}
            {related.length > 0 && (
              <div className="mt-6">
                <h4 className="font-nunito font-bold text-sm uppercase tracking-wider mb-4" style={{ color: '#006b5f' }}>
                  {t('relatedPosts')}
                </h4>
                <div className="flex flex-col gap-4">
                  {related.slice(0, 2).map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/${locale}/blog/${rp.slug}`}
                      className="group rounded-xl p-3 flex gap-3 transition-all duration-200 hover:shadow-md"
                      style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}
                    >
                      <div
                        className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #b9e9e0 0%, #e0f7f4 100%)' }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#006b5f" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="m21 15-5-5L5 21" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold line-clamp-2 group-hover:text-teal-600 transition-colors" style={{ color: '#1a1c1b' }}>
                          {rp.title}
                        </p>
                        <p className="text-xs mt-1" style={{ color: '#718096' }}>
                          {t('readingTime').replace('{minutes}', String(rp.readingTime))}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
    </>
  );
}
