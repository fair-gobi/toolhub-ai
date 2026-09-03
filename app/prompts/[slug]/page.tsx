import { sql } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CopyButton } from '@/components/CopyButton'
import { TryItDropdown } from '@/components/TryItDropdown'
export const dynamic = 'force-dynamic'

export default async function PromptDetail({ params }: any) {
  const { slug } = await params
  let rows = await sql`SELECT id, title, COALESCE(NULLIF(TRIM(slug),''), id::text) as slug, category, prompt_content FROM prompts WHERE slug = ${slug} OR id::text = ${slug} LIMIT 1`
  if (!rows[0]) {
    const guess = slug.replace(/-/g, ' ').slice(0, 35)
    rows = await sql`SELECT id, title, COALESCE(NULLIF(TRIM(slug),''), id::text) as slug, category, prompt_content FROM prompts WHERE title ILIKE ${'%' + guess + '%'} LIMIT 1`
  }
  if (!rows[0]) return notFound()
  const p = rows[0]

  // recommended
  const related = await sql`SELECT id, title, COALESCE(NULLIF(TRIM(slug),''), id::text) as slug, category FROM prompts WHERE LOWER(TRIM(category)) = LOWER(TRIM(${p.category})) AND id!= ${p.id} ORDER BY RANDOM() LIMIT 6`

  const encodedPrompt = encodeURIComponent(p.prompt_content)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/prompts" className="text-sm text-zinc-500 hover:text-black">← Back</Link>

      <div className="mt-4 flex items-center gap-2">
        <span className="px-3 py-1 bg-zinc-100 rounded-full text-xs uppercase tracking-wider">{p.category}</span>
        <span className="text-xs text-zinc-400">#{p.id}</span>
      </div>
      <h1 className="mt-3 text-4xl font-bold leading-tight">{p.title}</h1>

      <div className="mt-6 flex gap-3">
  <TryItDropdown prompt={p.prompt_content} />
  <CopyButton text={p.prompt_content} />
</div>

      <div className="mt-8 rounded-2xl border bg-zinc-50 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b bg-white">
          <span className="text-sm font-medium">Prompt</span>
          <CopyButton text={p.prompt_content} />
        </div>
        <div className="p-6 whitespace-pre-wrap font-mono text- leading-7">{p.prompt_content}</div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold">Recommended Prompts</h2>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            {related.map((r: any) => (
              <Link key={r.id} href={`/prompts/${r.slug}`} className="border rounded-xl p-4 hover:bg-zinc-50 block">
                <div className="text- text-zinc-500 uppercase">{r.category}</div>
                <div className="font-medium mt-1 line-clamp-2 text-sm">{r.title}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}