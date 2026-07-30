import { promptData } from '../../../data/prompts-data'
import PromptDetailClient from './PromptDetailClient'

export async function generateMetadata({ params }: any) {
  const { slug } = await params
  const s = decodeURIComponent(slug)
  const p:any = promptData.find((x:any)=> x.slug === s || String(x.id) === String(s) || x.slug.endsWith(`-${s}`))
  return {
    title: p ? `${p.title} - PromptoolHub` : `Prompt ${s}`,
    description: p ? p.content.slice(0,155) : `Free AI prompt ${s}`,
    alternates: { canonical: `https://www.promptoolhub.com/prompts/${p?.slug || s}` }
  }
}

export default async function Page({ params }: any){
  const { slug } = await params
  const s = decodeURIComponent(slug)
  return <PromptDetailClient slug={s} />
}