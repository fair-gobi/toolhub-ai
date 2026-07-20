import { promptData } from '@/data/prompts-data'

export default function sitemap(){
  const base = 'https://www.promptoolhub.com'
  const prompts = promptData.map(p=>({
    url: `${base}/prompts/${p.slug}`,
    lastModified: new Date(),
  }))
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/prompts`, lastModified: new Date() },
    ...prompts
  ]
}