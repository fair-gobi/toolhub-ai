import { MetadataRoute } from 'next'
import { sql } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.promptoolhub.com'
  const categories = ["hero","image-prompt","video-prompt","marketing","design","social-media","productivity","business","coding","writing","seo","education","sales","chatgpt-prompt","claude-prompt","gemini-prompt","developer-prompt"]
  const catUrls = categories.map(c=>({ url: `${base}/prompts/category/${c}`, lastModified: new Date() }))

  try {
    const prompts = await sql`SELECT slug FROM prompts LIMIT 8000`
    const promptUrls = prompts.map((p:any)=>({ url: `${base}/prompts/${p.slug}`, lastModified: new Date() }))
    return [
      { url: base, lastModified: new Date() },
      { url: `${base}/prompts`, lastModified: new Date() },
     ...catUrls,
     ...promptUrls
    ]
  } catch {
    return [{ url: base, lastModified: new Date() }, { url: `${base}/prompts`, lastModified: new Date() },...catUrls]
  }
}