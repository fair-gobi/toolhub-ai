import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function sitemap() {
  const base = 'https://www.promptoolhub.com'

  const staticUrls = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${base}/prompts`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${base}/prompts?cat=image-prompt`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/prompts?cat=video-prompt`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/prompts?cat=marketing`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/prompts?cat=design`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/prompts?cat=business`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/prompts?cat=coding`, lastModified: new Date(), priority: 0.7 },
  ]

  try {
    const rows = await sql`
      SELECT COALESCE(slug, id::text) as slug, COALESCE(updated_at, created_at, NOW()) as updated_at 
      FROM prompts 
      WHERE COALESCE(slug, id::text) IS NOT NULL 
      LIMIT 50000
    `

    const promptUrls = rows.map((p: any) => ({
      url: `${base}/prompts/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    return [...staticUrls, ...promptUrls]
  } catch (e) {
    console.error('sitemap error', e)
    return staticUrls
  }
}