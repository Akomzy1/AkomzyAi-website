import type { MetadataRoute } from 'next'

/**
 * Next.js App Router sitemap
 * Automatically served at https://akomzyai.com/sitemap.xml
 *
 * When you add new routes (e.g. /blog/[slug], /case-studies/[slug])
 * fetch the slugs here and push additional entries to the array.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://akomzyai.com'

  return [
    {
      url:             baseUrl,
      lastModified:    new Date(),
      changeFrequency: 'monthly',
      priority:        1,
    },
    /*
      Add future routes below as the site grows, e.g.:
      {
        url:             `${baseUrl}/case-studies`,
        lastModified:    new Date(),
        changeFrequency: 'weekly',
        priority:        0.8,
      },
    */
  ]
}
