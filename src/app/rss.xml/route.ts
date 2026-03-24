import { getBlogPosts } from '@/lib/blog';

const SITE_URL = 'https://calmika.app';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const huPosts = getBlogPosts('hu');
  const enPosts = getBlogPosts('en');

  // Merge and deduplicate by slug, prefer hu
  const slugSet = new Set<string>();
  const allPosts = [...huPosts, ...enPosts].filter((p) => {
    if (slugSet.has(p.slug)) return false;
    slugSet.add(p.slug);
    return true;
  });

  const items = allPosts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/${post.locale}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/${post.locale}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${escapeXml(post.author)}</author>
      <category>${escapeXml(post.category)}</category>
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Calmika Blog</title>
    <link>${SITE_URL}</link>
    <description>ASD szülői tudástár — tippek, kutatások, app frissítések | Autism parenting knowledge base</description>
    <language>hu</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/images/calmika-logo.png</url>
      <title>Calmika Blog</title>
      <link>${SITE_URL}</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
