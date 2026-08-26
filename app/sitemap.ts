import { MetadataRoute } from 'next'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.promptoolhub.com'
  const categories = ["hero","image-prompt","video-prompt","marketing","design","social-media","productivity","business","coding","writing","seo","education","sales","chatgpt-prompt","claude-prompt","gemini-prompt","developer-prompt","vfx-templates","nature","wildlife"]

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/prompts`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    ...categories.map(c=>({ 
      url: `${base}/prompts/category/${c}`, 
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8
    }))
  ]

  try {
    const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || ''
    if(!url) {
      console.log('No DB URL in sitemap - returning static only')
      return staticPages
    }

    const prompts = await sql`
      SELECT slug, COALESCE(updated_at, created_at, NOW()) as updated_at 
      FROM prompts 
      WHERE slug IS NOT NULL AND slug != 'null' AND slug != ''
      ORDER BY created_at DESC 
      LIMIT 15000
    `

    console.log(`Sitemap: Found ${prompts.length} prompts`)

    const promptUrls: MetadataRoute.Sitemap = prompts.map((p:any)=>({ 
      url: `${base}/prompts/${encodeURIComponent(p.slug)}`, 
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6
    }))

    return [...staticPages, ...promptUrls]
  } catch (e:any) {
    console.error('Sitemap error:', e.message)
    return staticPages
  }
}