import { MetadataRoute } from 'next'
import { sql } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.promptoolhub.com'
  try {
    const prompts = await sql`SELECT slug FROM prompts LIMIT 5000`
    const urls = prompts.map((p: any) => ({
      url: `${base}/prompts/${p.slug}`,
      lastModified: new Date(),
    }))
    return [
      { url: base, lastModified: new Date() },
      { url: `${base}/prompts`, lastModified: new Date() },
     ...urls
    ]
  } catch {
    return [{ url: base, lastModified: new Date() }]
  }
}