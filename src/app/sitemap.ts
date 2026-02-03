import { MetadataRoute } from 'next';
import { getAllDocSlugs } from '@/lib/docs/mdx';
import { getSortedPostsData } from '@/lib/notes';

const siteUrl = 'https://audioguidekit.org';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/notes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/updates`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Documentation pages
  const docSlugs = getAllDocSlugs();
  const docPages: MetadataRoute.Sitemap = docSlugs.map((slug) => ({
    url: slug.length === 0 ? `${siteUrl}/docs` : `${siteUrl}/docs/${slug.join('/')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: slug.length === 0 ? 0.9 : 0.7,
  }));

  // Blog posts
  const posts = await getSortedPostsData();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/notes/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...docPages, ...blogPages];
}
