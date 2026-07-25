import { MetadataRoute } from 'next'
import { ALL_TOOLS } from '@/data/all-tools'
import { promptData } from '@/data/prompts-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.promptoolhub.com'
  
  const mainPages = ['', '/ai-tools', '/business', '/dev-tools', '/finance', '/image-tools', '/pdf-tools', '/text-tools', '/utility', '/prompts'].map(p => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }))

  const toolPages = ALL_TOOLS.map(t => ({
    url: `${base}${t.path}`,
    lastModified: new Date(),
  }))

  const promptPages = promptData.map((p: any) => ({
    url: `${base}/prompts/${p.slug || p.id}`,
    lastModified: new Date(),
  }))

  return [...mainPages, ...toolPages, ...promptPages]
}