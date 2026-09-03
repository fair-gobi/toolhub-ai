import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function sitemap() {
  const base = 'https://www.promptoolhub.com'

  const staticUrls = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${base}/prompts`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
  ]

  try {
    // Simplest possible query - only id exists for sure
    const rows = await sql`SELECT id::text as slug FROM prompts ORDER BY id DESC LIMIT 45000`
    
    const promptUrls = rows.map((p: any) => ({
      url: `${base}/prompts/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    return [...staticUrls, ...promptUrls]
  } catch (e: any) {
    // If still fails, log to Vercel logs
    console.error('SITEMAP FAIL:', e?.message || e)
    return staticUrls
  }
}