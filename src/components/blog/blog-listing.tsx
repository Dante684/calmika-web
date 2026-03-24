'use client';

import { useState } from 'react';
import { BlogCard } from './blog-card';
import type { BlogPost } from '@/lib/blog';

interface Category {
  key: string;
  label: string;
}

interface BlogListingProps {
  posts: BlogPost[];
  locale: string;
  categories: Category[];
  allLabel: string;
  readingTimeTemplate: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
  newsletterPlaceholder: string;
  newsletterButton: string;
}

export function BlogListing({
  posts,
  locale,
  categories,
  allLabel,
  readingTimeTemplate,
  newsletterTitle,
  newsletterSubtitle,
  newsletterPlaceholder,
  newsletterButton,
}: BlogListingProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredPosts =
    activeCategory === 'all'
      ? posts
      : posts.filter((p) => {
          // Match by category value or key
          const cat = p.category.toLowerCase();
          const active = activeCategory.toLowerCase();
          return cat === active || cat.includes(active) || active.includes(cat);
        });

  function readingLabel(minutes: number): string {
    return readingTimeTemplate.replace('{minutes}', String(minutes));
  }

  return (
    <div>
      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveCategory('all')}
          className="rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200"
          style={{
            backgroundColor: activeCategory === 'all' ? '#006b5f' : '#b9e9e0',
            color: activeCategory === 'all' ? '#ffffff' : '#006b5f',
          }}
        >
          {allLabel}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200"
            style={{
              backgroundColor: activeCategory === cat.key ? '#006b5f' : '#b9e9e0',
              color: activeCategory === cat.key ? '#ffffff' : '#006b5f',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Blog grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">Nincs cikk ebben a kategóriában.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              excerpt={post.description}
              date={post.date}
              category={post.category}
              slug={post.slug}
              locale={locale}
              image={post.image}
              readingTime={post.readingTime}
              readingTimeLabel={readingLabel(post.readingTime)}
            />
          ))}
        </div>
      )}

      {/* Newsletter CTA */}
      <div
        className="mt-20 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
        style={{ backgroundColor: '#e8f9f6' }}
      >
        {/* Decorative blob */}
        <div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
          style={{ backgroundColor: '#14b8a6', filter: 'blur(60px)', opacity: 0.12 }}
          aria-hidden
        />
        <h3
          className="font-nunito text-2xl md:text-3xl font-bold mb-2"
          style={{ color: '#1a1c1b' }}
        >
          {newsletterTitle}
        </h3>
        <p className="text-base mb-8" style={{ color: '#3c4947' }}>
          {newsletterSubtitle}
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder={newsletterPlaceholder}
            className="flex-1 rounded-full px-5 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-teal-400"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
          />
          <button
            type="submit"
            className="rounded-full px-7 py-3 text-sm font-bold text-white transition-all duration-200 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #006b5f 0%, #14b8a6 100%)' }}
          >
            {newsletterButton}
          </button>
        </form>
      </div>
    </div>
  );
}
