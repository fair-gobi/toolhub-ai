import { sql } from '@/lib/db'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [p] = await sql`SELECT seo_title, seo_description FROM prompts WHERE slug=${slug} LIMIT 1`
  if (!p) return {}
  return { title: p.seo_title, description: p.seo_description }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [prompt] = await sql`SELECT * FROM prompts WHERE slug=${slug} LIMIT 1`
  if (!prompt) notFound()
  return (
    <div className="container mx-auto max-w-4xl p-6 space-y-6">
      <div className="bg-gradient-to-br from-violet-600 to-black text-white p-8 rounded-3xl">
        <span className="bg-white/20 px-3 py-1 rounded-full text-xs">{prompt.category}</span>
        <h1 className="text-4xl font-bold mt-4">{prompt.title}</h1>
        <p className="opacity-80 mt-2">{prompt.seo_description}</p>
      </div>
      <pre className="whitespace-pre-wrap bg-gray-50 p-6 rounded-xl border text-sm leading-relaxed">{prompt.prompt_content}</pre>
    </div>
  )
}