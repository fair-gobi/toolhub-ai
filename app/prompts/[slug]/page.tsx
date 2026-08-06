import { sql } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PromptActions } from '@/components/PromptActions'

export const dynamic = 'force-dynamic'

// SEO + OG for X / Facebook
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const [p] = await sql`SELECT title, slug, category, prompt_content FROM prompts WHERE slug=${slug} LIMIT 1`
    if (!p) return {}
    return {
      title: `${p.title} | PromptoolHub`,
      description: p.prompt_content?.slice(0, 155) || p.title,
      openGraph: {
        title: p.title,
        description: p.prompt_content?.slice(0, 155),
        type: 'article',
        images: [{ url: `/prompts/${slug}/opengraph-image`, width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: p.title,
        description: p.prompt_content?.slice(0, 155),
        images: [`/prompts/${slug}/opengraph-image`],
      },
    }
  } catch { return {} }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // SAFE SELECT - only columns you have
  const rows = await sql`SELECT id, title, slug, category, prompt_content FROM prompts WHERE slug=${slug} LIMIT 1`
  const prompt = rows[0]
  if (!prompt) notFound()

  // view count - won't crash if column missing
  try { await sql`UPDATE prompts SET views = COALESCE(views,0)+1 WHERE slug=${slug}` } catch {}

  // related - safe, no is_hero
  let related: any[] = []
  try {
    related = await sql`SELECT slug, title, category FROM prompts WHERE category=${prompt.category} AND slug!=${slug} LIMIT 6`
  } catch { related = [] }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": prompt.title,
    "about": prompt.category,
    "author": { "@type": "Organization", "name": "PromptoolHub" },
    "datePublished": new Date().toISOString(),
  }

  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="border-b bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto max-w- px-4 h- flex items-center justify-between">
          <Link href="/prompts" className="text-sm font-medium">← Library</Link>
          <div className="h-8 w-8 rounded-lg bg-black text-white grid place-items-center font-black">P</div>
        </div>
      </div>

      <div className="mx-auto max-w- px-4 py-8">
        <span className="inline-flex h-6 px-3 rounded-full bg-white border text- font-bold uppercase">{prompt.category}</span>
        <h1 className="text- md:text- font-black leading-[0.95] mt-4 max-w-3xl">{prompt.title}</h1>

        <div className="mt-6"><PromptActions prompt={prompt.prompt_content} /></div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="bg-white rounded- border p-6 md:p-7">
            <h3 className="text- font-bold uppercase text-zinc-400 mb-4">PROMPT</h3>
            <pre className="whitespace-pre-wrap font-mono text- leading-[1.7]">{prompt.prompt_content}</pre>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded- border p-5">
              <h4 className="text- font-bold uppercase text-zinc-400 mb-3">RELATED</h4>
              <div className="space-y-2">{related.map((r:any)=><Link key={r.slug} href={`/prompts/${r.slug}`} className="block text-sm py-1 hover:text-violet-600">{r.title}</Link>)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}