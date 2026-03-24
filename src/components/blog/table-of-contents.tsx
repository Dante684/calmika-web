'use client';

import { useState, useEffect } from 'react';

interface Heading {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  headings: Heading[];
  label?: string;
}

export function TableOfContents({ headings, label = 'Tartalomjegyzék' }: TableOfContentsProps) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      className="rounded-2xl p-5"
      style={{ backgroundColor: '#f0fdfb', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}
    >
      <h4 className="font-nunito font-bold text-sm uppercase tracking-wider mb-4" style={{ color: '#006b5f' }}>
        {label}
      </h4>
      <ol className="flex flex-col gap-2">
        {headings.map(({ id, text }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="text-sm leading-snug transition-colors duration-200"
              style={{ color: active === id ? '#006b5f' : '#4a5568', fontWeight: active === id ? 700 : 400 }}
            >
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
