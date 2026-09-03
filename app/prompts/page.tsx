import { sql } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
const PER_PAGE = 24
function safeCount(r: any) { return Number(r[0]?.total || 0) }

export default async function PromptsPage({ searchParams }: any) {
  const params = await searchParams
  const q = (params?.q || '').trim()
  const page = Math.max(1, Number(params?.page || 1))
  const category = (params?.category || '').trim()
  const offset = (page - 1) * PER_PAGE
  const like = `%${q}%`

  let prompts: any[] = []
  let total = 0

  // get categories
  const cats = await sql`SELECT DISTINCT TRIM(category) as cat FROM prompts WHERE category IS NOT NULL AND TRIM(category) <> '' ORDER BY cat ASC LIMIT 50`

  try {
    if (category) {
      if (q) {
        prompts = await sql`SELECT id, title, COALESCE(NULLIF(TRIM(slug),''), id::text) as slug, category FROM prompts WHERE LOWER(TRIM(category)) = LOWER(TRIM(${category})) AND (title ILIKE ${like} OR prompt_content ILIKE ${like}) ORDER BY id DESC LIMIT ${PER_PAGE} OFFSET ${offset}`
        const r = await sql`SELECT COUNT(*) as total FROM prompts WHERE LOWER(TRIM(category)) = LOWER(TRIM(${category})) AND (title ILIKE ${like} OR prompt_content ILIKE ${like})`
        total = safeCount(r)
      } else {
        prompts = await sql`SELECT id, title, COALESCE(NULLIF(TRIM(slug),''), id::text) as slug, category FROM prompts WHERE LOWER(TRIM(category)) = LOWER(TRIM(${category})) ORDER BY id DESC LIMIT ${PER_PAGE} OFFSET ${offset}`
        const r = await sql`SELECT COUNT(*) as total FROM prompts WHERE LOWER(TRIM(category)) = LOWER(TRIM(${category}))`
        total = safeCount(r)
      }
    } else {
      if (q) {
        prompts = await sql`SELECT id, title, COALESCE(NULLIF(TRIM(slug),''), id::text) as slug, category FROM prompts WHERE title ILIKE ${like} OR prompt_content ILIKE ${like} OR category ILIKE ${like} ORDER BY id DESC LIMIT ${PER_PAGE} OFFSET ${offset}`
        const r = await sql`SELECT COUNT(*) as total FROM prompts WHERE title ILIKE ${like} OR prompt_content ILIKE ${like} OR category ILIKE ${like}`
        total = safeCount(r)
      } else {
        prompts = await sql`SELECT id, title, COALESCE(NULLIF(TRIM(slug),''), id::text) as slug, category FROM prompts ORDER BY id DESC LIMIT ${PER_PAGE} OFFSET ${offset}`
        const r = await sql`SELECT COUNT(*) as total FROM prompts`
        total = safeCount(r)
      }
    }
  } catch (e: any) {
    return <div className="p-8">DB Error: {e.message}</div>
  }

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE))

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">Prompts ({total.toLocaleString()})</h1>

      <form className="mt-6 flex gap-2">
        <input name="q" defaultValue={q} placeholder="Search prompts..." className="border rounded-lg px-4 py-2 w-full" />
        {category && <input type="hidden" name="category" value={category} />}
        <button className="px-5 py-2 bg-black text-white rounded-lg">Search</button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/prompts" className={`px-3 py-1 rounded-full border text-sm ${!category?'bg-black text-white':'bg-white'}`}>All</Link>
        {cats.map((c: any) => (
          <Link key={c.cat} href={`/prompts?category=${encodeURIComponent(c.cat)}${q?`&q=${q}`:''}`} className={`px-3 py-1 rounded-full border text-sm ${category.toLowerCase()===c.cat.toLowerCase()?'bg-black text-white':'bg-white hover:bg-zinc-50'}`}>{c.cat}</Link>
        ))}
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {prompts.map((p: any) => (
          <Link key={p.id} href={`/prompts/${p.slug}`} className="border rounded-xl p-4 hover:bg-zinc-50">
            <div className="text- text-zinc-500 uppercase tracking-wider">{p.category || 'General'}</div>
            <div className="font-medium mt-1 line-clamp-2">{p.title}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex gap-2 justify-center flex-wrap">
        {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
          const pg = i + 1
          return <Link key={pg} href={`/prompts?page=${pg}${q?`&q=${q}`:''}${category?`&category=${encodeURIComponent(category)}`:''}`} className={`px-3 py-1 rounded border ${pg===page?'bg-black text-white':'bg-white'}`}>{pg}</Link>
        })}
        {totalPages > 10 && <span className="px-2 py-1 text-sm">... {totalPages} pages</span>}
      </div>
    </div>
  )
}