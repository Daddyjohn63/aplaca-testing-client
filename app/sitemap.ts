import { MetadataRoute } from 'next'
import { getPublishedPosts } from '@/data/post'

//SITEMAP Details
//URL: Specifies page location, essential for search engine crawling.
//Last Modified: Shows content's last update date, important for assessing freshness.
//Change Frequency: Advises on content update frequency, aids in crawl scheduling. Typically set to 'yearly' for stable pages.
//Priority: Indicates page importance (0.0 to 1.0), influences crawl resource allocation. Typically set to 1.0 for homepages, 0.8 for main category pages, and lower for less critical pages.

export const revalidate = 3600 //revalidates at most every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const domain = process.env.NEXT_PUBLIC_PRIMARY_DOMAIN
  const data = await getPublishedPosts()

  const posts = data?.map((post) => ({
      url: `${domain}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    })) as any[];

  return [
    {
      url: `${domain}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url:`${domain}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${domain}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${domain}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${domain}/terms-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${domain}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },

    ...posts
  ]
}
