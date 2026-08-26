import { MetadataRoute } from 'next'
import { sql } from '@/lib/db'

export const revalidate = 3600 // rebuild every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.promptoolhub.com'
  
  // All categories including your viral ones
  const staticCategories = [
    "hero","image-prompt","video-prompt","marketing","design","social-media",
    "productivity","business","coding","writing","seo","education","sales",
    "chatgpt-prompt","claude-prompt","gemini-prompt","developer-prompt",
    "nature","wildlife","vfx-templates","natural-location","cinematic","viral"
  ]
  
  const catUrls = staticCategories.map(c=>({ 
    url: `${base}/prompts/category/${encodeURIComponent(c)}`, 
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8
  }))

  try {
    // Get ALL 13100 prompts - increased from 8000 to 15000
    const prompts = await sql`
      SELECT 
        COALESCE(slug, id::text) as slug,
        COALESCE(updated_at, created_at, NOW()) as updated_at
      FROM prompts 
      ORDER BY created_at DESC 
      LIMIT 15000
    `
    
    const promptUrls = prompts.map((p:any)=>({ 
      url: `${base}/prompts/${p.slug}`, 
      lastModified: new Date(p.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.6
    }))
    
    console.log(`Sitemap: ${promptUrls.length} prompts + ${catUrls.length} categories`)
    
    return [
      { url: base, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
      { url: `${base}/prompts`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
      ...catUrls,
      ...promptUrls
    ]
  } catch (e) {
    console.error('Sitemap error:', e)
    return [
      { url: base, lastModified: new Date(), priority: 1 },
      { url: `${base}/prompts`, lastModified: new Date(), priority: 0.9 },
      ...catUrls
    ]
  }
}