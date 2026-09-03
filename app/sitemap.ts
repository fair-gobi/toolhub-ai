import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function sitemap() {
  const base = 'https://www.promptoolhub.com'

  const staticUrls = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${base}/prompts`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${base}/prompts?cat=image-prompt`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/prompts?cat=video-prompt`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/prompts?cat=marketing`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/prompts?cat=business`, lastModified: new Date(), priority: 0.7 },
  ]

  try {
    // Use ID as slug fallback - always exists, no WHERE filter
    const rows = await sql`
      SELECT id, COALESCE(NULLIF(slug,''), id::text) as slug, COALESCE(updated_at, created_at, NOW()) as updated_at 
      FROM prompts 
      ORDER BY id DESC
      LIMIT 50000
    `

    console.log(`SITEMAP: found ${rows.length} prompts`)

    const promptUrls = rows.map((p: any) => ({
      url: `${base}/prompts/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    return [...staticUrls, ...promptUrls]
  } catch (e) {
    console.error('SITEMAP ERROR', e)
    return staticUrls
  }
}