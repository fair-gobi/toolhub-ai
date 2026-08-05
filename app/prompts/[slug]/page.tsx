import { sql } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PromptActions } from '@/components/PromptActions'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [p] = await sql`SELECT seo_title, seo_description FROM prompts WHERE slug=${slug} LIMIT 1`
  if (!p) return {}
  return { title: p.seo_title, description: p.seo_description }
}

function getCatMeta(cat: string) {
  const map: any = {
    'Image Prompt': { label: 'Image', color: '#E8990A' },
    'Video Prompt': { label: 'Video', color: '#6366f1' },
    'Marketing': { label: 'Marketing', color: '#0F6B5C' },
    'Design': { label: 'Design', color: '#ec4899' },
    'Social Media': { label: 'Social', color: '#06b6d4' },
    'Productivity': { label: 'Productivity', color: '#52525b' },
    'Business': { label: 'Business', color: '#16a34a' },
    'Coding': { label: 'Coding', color: '#0ea5e9' },
    'Writing': { label: 'Writing', color: '#8b5cf6' },
    'SEO': { label: 'SEO', color: '#f97316' },
    'Sales': { label: 'Sales', color: '#e11d48' },
    'Education': { label: 'Education', color: '#a855f7' },
  }
  return map[cat] || { label: cat, color: '#111' }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [prompt] = await sql`SELECT * FROM prompts WHERE slug=${slug} LIMIT 1`
  if (!prompt) notFound()

  const meta = getCatMeta(prompt.category)
  const related = await sql`SELECT slug, title, category, is_hero FROM prompts WHERE category=${prompt.category} AND slug!=${slug} ORDER BY is_hero DESC LIMIT 6`

  return (
    <div className="min-h-screen bg-[#fcfcf9] text-zinc-900">
      {/* Top bar */}
      <div className="border-b border-zinc-200 bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto max-w- px-4 md:px-6 h- flex items-center justify-between">
          <Link href="/prompts" className="flex items-center gap-2 text-sm font-medium hover:text-black text-zinc-600">
            ← Back to library
          </Link>
          <Link href="/" className="h-8 w-8 rounded-lg bg-black text-white grid place-items-center font-black">P</Link>
        </div>
      </div>

      <div className="mx-auto max-w- px-4 md:px-6 py-6 md:py-10">
        {/* Header */}
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 h-6 px-3 rounded-full bg-white border border-zinc-200 text- font-bold uppercase tracking-widest">
              <span className="h-2 w-2 rounded-full" style={{ background: meta.color }}></span>
              {meta.label}
            </span>
            {prompt.is_hero && <span className="h-6 px-3 rounded-full bg-amber-400 text-black text- font-bold grid place-items-center">⭐ HERO</span>}
            <span className="h-6 px-3 rounded-full bg-zinc-100 text-zinc-600 text- font-bold uppercase">{prompt.difficulty || 'Beginner'}</span>
          </div>

          <h1 className="text- md:text- font-black tracking-tight leading-[0.95]">{prompt.title}</h1>
          <p className="text- md:text- text-zinc-500 mt-4 leading-relaxed max-w-3xl">{prompt.seo_description}</p>

          <div className="mt-6">
            <PromptActions prompt={prompt.prompt_content} />
          </div>
        </div>

        {/* Content grid - responsive */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Prompt */}
          <div className="space-y-4">
            <div className="bg-white rounded- border border-zinc-200 p-5 md:p-7">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text- font-bold tracking-widest uppercase text-zinc-400">PROMPT</h3>
                <span className="text- text-zinc-400">{prompt.prompt_content?.length} chars</span>
              </div>
              <pre className="whitespace-pre-wrap font-mono text- leading-[1.7] text-zinc-900">{prompt.prompt_content}</pre>
            </div>

            {prompt.example_output && (
              <div className="bg-zinc-900 text-zinc-100 rounded- p-5 md:p-7">
                <h3 className="text- font-bold tracking-widest uppercase text-zinc-400 mb-4">EXAMPLE OUTPUT</h3>
                <p className="whitespace-pre-wrap text- leading-[1.6] text-zinc-300">{prompt.example_output}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded- border border-zinc-200 p-5">
              <h4 className="text- font-bold tracking-widest uppercase text-zinc-400 mb-3">DETAILS</h4>
              <div className="space-y-3 text-sm">
                <div><span className="text-zinc-400 text-xs">Category</span><p className="font-semibold">{prompt.category}</p></div>
                <div><span className="text-zinc-400 text-xs">Models</span><p className="font-medium">{prompt.model_compatibility?.join(', ') || 'ChatGPT, Claude, Gemini, Midjourney'}</p></div>
                <div><span className="text-zinc-400 text-xs">Tags</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {(prompt.tags||[]).map((t:string)=><span key={t} className="text- px-2 py-1 rounded-full bg-zinc-100">#{t}</span>)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded- border border-zinc-200 p-5">
              <h4 className="text- font-bold tracking-widest uppercase text-zinc-400 mb-3">RELATED IN {meta.label.toUpperCase()}</h4>
              <div className="space-y-2">
                {related.map((r:any)=>(
                  <Link key={r.slug} href={`/prompts/${r.slug}`} className="block text- leading-snug py-2 border-b last:border-0 border-zinc-100 hover:text-violet-600">
                    {r.is_hero && "⭐ "}{r.title}
                  </Link>
                ))}
              </div>
              <Link href={`/prompts?cat=${prompt.category.toLowerCase().replace(/\s+/g,'-')}`} className="mt-4 inline-flex h-8 px-4 rounded-full bg-black text-white text-xs font-bold items-center">
                View all {prompt.category} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}