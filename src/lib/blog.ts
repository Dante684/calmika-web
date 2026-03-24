import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readingTime: number;
  content: string;
  locale: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');

export function getBlogPosts(locale: string): BlogPost[] {
  const dir = path.join(CONTENT_DIR, locale);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);

    return {
      slug: data.slug || filename.replace('.mdx', ''),
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      author: data.author || '',
      category: data.category || '',
      image: data.image || '/images/blog/placeholder.png',
      readingTime: data.readingTime || 5,
      content,
      locale,
    } as BlogPost;
  });

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(locale: string, slug: string): BlogPost | null {
  const posts = getBlogPosts(locale);
  return posts.find((p) => p.slug === slug) ?? null;
}

export function getRelatedPosts(locale: string, currentSlug: string, category: string, limit = 3): BlogPost[] {
  const posts = getBlogPosts(locale);
  return posts.filter((p) => p.slug !== currentSlug && p.category === category).slice(0, limit);
}

export function getAllSlugs(locale: string): string[] {
  return getBlogPosts(locale).map((p) => p.slug);
}

/** Extract H2 headings from markdown content for Table of Contents */
export function extractHeadings(content: string): { id: string; text: string }[] {
  const lines = content.split('\n');
  return lines
    .filter((line) => line.startsWith('## '))
    .map((line) => {
      const text = line.replace(/^## /, '').trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\sáéíóöőúüű]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      return { id, text };
    });
}

/** Simple markdown-to-HTML for the blog post content (no MDX runtime needed) */
export function markdownToHtml(content: string): string {
  let html = content
    // Headers
    .replace(/^### (.+)$/gm, '<h3 id="$1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 id="$1">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Unordered list items (collect consecutive)
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Paragraphs (blank-line separated)
    .split(/\n{2,}/)
    .map((block) => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('<h') || block.startsWith('<ul') || block.startsWith('<li')) return block;
      // Wrap loose <li> blocks in <ul>
      if (block.includes('<li>')) {
        return `<ul>${block}</ul>`;
      }
      return `<p>${block.replace(/\n/g, ' ')}</p>`;
    })
    .join('\n');

  // Fix h3 ids (headings with special chars)
  html = html.replace(/<h3 id="(.+?)">(.+?)<\/h3>/g, (_, rawId, text) => {
    const id = rawId
      .toLowerCase()
      .replace(/[^a-z0-9\sáéíóöőúüű-]/g, '')
      .replace(/\s+/g, '-');
    return `<h3 id="${id}">${text}</h3>`;
  });
  html = html.replace(/<h2 id="(.+?)">(.+?)<\/h2>/g, (_, rawId, text) => {
    const id = rawId
      .toLowerCase()
      .replace(/[^a-z0-9\sáéíóöőúüű-]/g, '')
      .replace(/\s+/g, '-');
    return `<h2 id="${id}">${text}</h2>`;
  });

  return html;
}
