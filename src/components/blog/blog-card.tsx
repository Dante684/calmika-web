import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';

export interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  locale: string;
  image?: string;
  readingTime: number;
  readingTimeLabel?: string;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('hu-HU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// Category color mapping
const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Szülőknek: { bg: '#b9e9e0', text: '#006b5f' },
  Parents: { bg: '#b9e9e0', text: '#006b5f' },
  Terapeutáknak: { bg: '#DDD6FE', text: '#5b21b6' },
  Therapists: { bg: '#DDD6FE', text: '#5b21b6' },
  Kutatás: { bg: '#FCD34D', text: '#92400e' },
  Research: { bg: '#FCD34D', text: '#92400e' },
  'App frissítések': { bg: '#FDA4AF', text: '#9f1239' },
  Updates: { bg: '#FDA4AF', text: '#9f1239' },
};

function getCategoryColor(category: string) {
  return CATEGORY_COLORS[category] ?? { bg: '#e5e7eb', text: '#374151' };
}

export function BlogCard({
  title,
  excerpt,
  date,
  category,
  slug,
  locale,
  image,
  readingTime,
  readingTimeLabel,
}: BlogCardProps) {
  const colors = getCategoryColor(category);
  const label = readingTimeLabel && !readingTimeLabel.includes('blog.') 
    ? readingTimeLabel 
    : `${readingTime} min`;

  return (
    <Link
      href={`/${locale}/blog/${slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
      style={{
        boxShadow: '0 8px 40px rgba(0,0,0,0.04)',
      }}
    >
      {/* Category badge */}
      <div className="px-5 pt-5">
        <span
          className="inline-block rounded-full px-3 py-1 text-xs font-bold"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3
          className="font-nunito text-lg font-bold leading-snug line-clamp-2"
          style={{ color: '#1a1c1b' }}
        >
          {title}
        </h3>

        <p
          className="text-sm leading-relaxed line-clamp-2 flex-1"
          style={{ color: '#4a5568' }}
        >
          {excerpt}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 pt-2 border-t border-gray-50">
          <span className="flex items-center gap-1 text-xs" style={{ color: '#718096' }}>
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(date)}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: '#718096' }}>
            <Clock className="h-3.5 w-3.5" />
            {label}
          </span>
        </div>
      </div>
    </Link>
  );
}
