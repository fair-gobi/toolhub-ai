import { sql } from '@/lib/db'
import Link from 'next/link'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export default async function PromptsPage({ searchParams }: { searchParams: { page?: string, q?: string } }) {
  const page = parseInt(searchParams?.page || '1')
  const perPage = 30
  const offset = (page - 1) * perPage
  const q = searchParams?.q || ''

  const prompts = await sql`
    SELECT id, title, slug, category, difficulty
    FROM prompts
    WHERE ${q} = '' OR title ILIKE ${'%' + q + '%'}
    ORDER BY is_hero DESC, id DESC
    LIMIT ${perPage} OFFSET ${offset}
  `

  const [{ count }] = await sql`
    SELECT COUNT(*) FROM prompts WHERE ${q} = '' OR title ILIKE ${'%' + q + '%'}
  `

  const totalPages = Math.ceil(Number(count) / perPage)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">{String(count)} Prompts</h1>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {prompts.map((p: any) => (
          <Link key={p.id} href={`/prompts/${p.slug}`} className="border p-4 rounded-xl hover:shadow">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-xs opacity-70">{p.category}</p>
          </Link>
        ))}
      </div>
      <div className="flex gap-4 mt-8">
        {page > 1 && <Link href={`/prompts?page=${page - 1}&q=${q}`}>Prev</Link>}
        <span>{page}/{totalPages}</span>
        {page < totalPages && <Link href={`/prompts?page=${page + 1}&q=${q}`}>Next</Link>}
      </div>
    </div>
  )
}