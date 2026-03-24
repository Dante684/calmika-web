'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Calendar,
  Heart,
  Users,
  BookOpen,
  Music,
  Palette,
  CloudSun,
  Puzzle,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { moduleData, type ModuleKey, type ModuleCategory } from '@/lib/module-data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Calendar,
  Heart,
  Users,
  BookOpen,
  Music,
  Palette,
  CloudSun,
  Puzzle,
  Shield,
};

const categoryColors: Record<ModuleCategory, string> = {
  communication: 'bg-teal-100 text-teal-700',
  learning: 'bg-blue-100 text-blue-700',
  sensory: 'bg-purple-100 text-purple-700',
  parental: 'bg-orange-100 text-orange-700',
};

const categoryIconBg: Record<ModuleCategory, string> = {
  communication: 'bg-teal-50 text-teal-600',
  learning: 'bg-blue-50 text-blue-600',
  sensory: 'bg-purple-50 text-purple-600',
  parental: 'bg-orange-50 text-orange-600',
};

interface Props {
  locale: string;
  labels: {
    all: string;
    communication: string;
    learning: string;
    sensory: string;
    parental: string;
    learnMore: string;
    offlineBanner: string;
    offlineBannerDesc: string;
  };
  basePath: string; // /funkciok or /features
}

type FilterKey = 'all' | ModuleCategory;

const filters: FilterKey[] = ['all', 'communication', 'learning', 'sensory', 'parental'];

export function ModuleGrid({ locale, labels, basePath }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filtered = (Object.entries(moduleData) as [ModuleKey, (typeof moduleData)[ModuleKey]][]).filter(
    ([, data]) => activeFilter === 'all' || data.category === activeFilter,
  );

  const isHu = locale === 'hu';

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {filters.map((f) => {
          const label =
            f === 'all'
              ? labels.all
              : labels[f as ModuleCategory];
          const isActive = activeFilter === f;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={[
                'px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border',
                isActive
                  ? 'bg-calmika-teal-500 text-white border-calmika-teal-500 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-calmika-teal-400 hover:text-calmika-teal-600',
              ].join(' ')}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Module cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
        {filtered.map(([key, data]) => {
          const Icon = iconMap[data.icon] ?? MessageSquare;
          const name = isHu ? data.huName : data.enName;
          const desc = isHu ? data.huDesc : data.enDesc;
          const iconBg = categoryIconBg[data.category];

          return (
            <Link
              key={key}
              href={`${basePath}/${key}`}
              className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-calmika-teal-300 transition-all duration-200 flex flex-col overflow-hidden"
            >
              <div className="p-6 flex-1">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}>
                  <Icon className="w-6 h-6" />
                </div>
                {/* Name */}
                <h3 className="font-nunito font-bold text-calmika-dark text-lg mb-2 leading-tight">
                  {name}
                </h3>
                {/* Desc — truncate to 2 lines */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {desc}
                </p>
              </div>
              {/* Learn more link */}
              <div className="px-6 pb-5">
                <span className="inline-flex items-center gap-1 text-calmika-teal-600 text-sm font-semibold group-hover:gap-2 transition-all duration-150">
                  {labels.learnMore}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Offline banner */}
      <div className="bg-calmika-teal-50 border border-calmika-teal-200 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div className="text-3xl">📶</div>
        <div>
          <p className="font-nunito font-bold text-calmika-dark text-base">
            {labels.offlineBanner}
          </p>
          <p className="text-calmika-teal-700 text-sm mt-1">
            {labels.offlineBannerDesc}
          </p>
        </div>
      </div>
    </div>
  );
}
