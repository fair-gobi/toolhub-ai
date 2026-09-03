import { sql } from '@/lib/db'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug
  try {
    const rows = await sql`SELECT id, title, COALESCE(NULLIF(slug,''), id::text) as slug, LEFT(prompt_content, 150) as description FROM prompts WHERE slug = ${slug} OR id::text = ${slug} LIMIT 1`
    if (!rows[0]) return {}
    const row = rows[0]
    return {
      title: `${row.title} | Promptoolhub`,
      description: row.description || row.title,
      alternates: {
        canonical: `https://www.promptoolhub.com/prompts/${row.slug}`
      }
    }
  } catch {
    return {}
  }
}

export default async function PromptDetail({ params }: { params: { slug: string } }) {
  const slug = params.slug
  try {
    const rows = await sql`SELECT id, title, COALESCE(NULLIF(slug,''), id::text) as slug, category, prompt_content FROM prompts WHERE slug = ${slug} OR id::text = ${slug} LIMIT 1`
    if (!rows[0]) return notFound()
    const p = rows[0]

    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <p className="text-sm text-zinc-500 mt-2">{p.category}</p>
        <div className="mt-6 whitespace-pre-wrap bg-zinc-50 p-6 rounded-xl border">
          {p.prompt_content}
        </div>
      </div>
    )
  } catch {
    return notFound()
  }
}