import { promptData } from '../../../data/prompts-data'
import PromptDetailClient from './PromptDetailClient'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug)
  const p:any = promptData.find((x:any)=> x.slug === slug)
  return {
    title: p ? `${p.title} - PromptoolHub` : `Prompt ${slug}`,
    description: p ? p.content.slice(0,155) : `Free AI prompt ${slug}`,
    alternates: {
      canonical: `https://www.promptoolhub.com/prompts/${slug}`
    }
  }
}

export default function Page({ params }: { params: { slug: string } }){
  const slug = decodeURIComponent(params.slug)
  return <PromptDetailClient slug={slug} />
}