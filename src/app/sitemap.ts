import type { MetadataRoute } from 'next';

const BASE = 'https://doctoricl.com';

const pages = [
  { path: '', priority: 1.0 },
  { path: '/about/doctor', priority: 0.8 },
  { path: '/about/info', priority: 0.7 },
  { path: '/about/equipment', priority: 0.7 },
  { path: '/about/system', priority: 0.7 },
  { path: '/maestro', priority: 0.8 },
  { path: '/icl/definition', priority: 0.8 },
  { path: '/icl/evo', priority: 0.8 },
  { path: '/icl/faq', priority: 0.7 },
  { path: '/myopia', priority: 0.8 },
  { path: '/special/post-lasik', priority: 0.7 },
  { path: '/special/keratoconus', priority: 0.7 },
  { path: '/special/avellino', priority: 0.7 },
  { path: '/presbyopia/viva-icl', priority: 0.7 },
  { path: '/presbyopia/cataract', priority: 0.7 },
  { path: '/community/news', priority: 0.6 },
  { path: '/community/reservation', priority: 0.6 },
  { path: '/community/reviews', priority: 0.6 },
  { path: '/community/youtube', priority: 0.6 },
  { path: '/legal/terms', priority: 0.3 },
  { path: '/legal/privacy', priority: 0.3 },
  { path: '/legal/non-covered', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of ['ko', 'en']) {
    for (const page of pages) {
      entries.push({
        url: `${BASE}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.priority >= 0.8 ? 'weekly' : 'monthly',
        priority: page.priority,
      });
    }
  }
  return entries;
}
