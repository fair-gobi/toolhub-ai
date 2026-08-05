import { sql } from '@/lib/db'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const [p] = await sql`SELECT seo_title, seo_description FROM prompts WHERE slug=${params.slug} LIMIT 1`
  if (!p) return {}
  return { title: p.seo_title, description: p.seo_description }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const [prompt] = await sql`SELECT * FROM prompts WHERE slug=${params.slug} LIMIT 1`
  if (!prompt) notFound()
  return (
    <div className="container mx-auto max-w-4xl p-6 space-y-6">
      <div className="bg-gradient-to-br from-violet-600 to-black text-white p-8 rounded-3xl">
        <span className="bg-white/20 px-3 py-1 rounded-full text-xs">{prompt.category}</span>
        <h1 className="text-4xl font-bold mt-4">{prompt.title}</h1>
      </div>
      <pre className="whitespace-pre-wrap bg-gray-50 p-6 rounded-xl border text-sm">{prompt.prompt_content}</pre>
    </div>
  )
}