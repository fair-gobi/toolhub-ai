import { sql } from '@/lib/db'
import { notFound } from 'next/navigation'
import { PromptActions } from '@/components/PromptActions'
import Link from 'next/link'

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

  const related = await sql`SELECT slug, title, category FROM prompts WHERE category=${prompt.category} AND slug!= ${slug} LIMIT 6`

  return (
    <div className="container mx-auto max-w-4xl p-6 space-y-6">
      <Link href="/prompts" className="text-sm text-zinc-500 hover:text-black">← Back to all prompts</Link>

      <div className="bg-gradient-to-br from-violet-600 to-black text-white p-8 rounded-3xl">
        <div className="flex gap-2 flex-wrap">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs">{prompt.category}</span>
          {prompt.is_hero && <span className="bg-amber-400 text-black px-3 py-1 rounded-full text-xs font-bold">⭐ HERO</span>}
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs">{prompt.difficulty || 'Beginner'}</span>
        </div>
        <h1 className="text-4xl font-bold mt-4 leading-tight">{prompt.title}</h1>
        <p className="opacity-80 mt-3">{prompt.seo_description}</p>
      </div>

      {/* Your Action Buttons */}
      <PromptActions prompt={prompt.prompt_content} />

      <div className="bg-zinc-50 border rounded-2xl p-6">
        <h3 className="font-bold mb-3">Prompt</h3>
        <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">{prompt.prompt_content}</pre>
      </div>

      {prompt.example_output && (
        <div className="bg-white border rounded-2xl p-6">
          <h3 className="font-bold mb-3">Example Output</h3>
          <p className="text-sm text-zinc-600 whitespace-pre-wrap">{prompt.example_output}</p>
        </div>
      )}

      <div className="border rounded-2xl p-5">
        <h4 className="font-bold mb-3">Related in {prompt.category}</h4>
        <div className="grid gap-2">
          {related.map((r:any)=>(
            <Link key={r.slug} href={`/prompts/${r.slug}`} className="text-sm py-2 border-b last:border-0 hover:text-violet-600">
              {r.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}