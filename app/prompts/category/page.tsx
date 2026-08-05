import { sql } from '@/lib/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

const CATEGORIES = ["Hero","Image Prompt","Video Prompt","Marketing","Design","Social Media","Productivity","Business","Coding","Writing","SEO","Education","Sales","ChatGPT Prompt","Claude Prompt","Gemini Prompt","Developer Prompt"]

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, '-')
}

const SLUG_MAP: Record<string,string> = {}
CATEGORIES.forEach(c => { SLUG_MAP[slugify(c)] = c })

export async function generateStaticParams() {
  return CATEGORIES.map(c => ({ category: slugify(c) }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: raw } = await params
  const decoded = decodeURIComponent(raw)
  const realCat = SLUG_MAP[decoded.toLowerCase()] || SLUG_MAP[slugify(decoded)] || decoded
  return {
    title: `${realCat} Prompts - ${realCat === 'Hero'? '100 Best Hero' : '500+ Best'} AI Prompts | PromptoolHub`,
    description: `Best ${realCat} prompts for ChatGPT, Claude, Midjourney. ${realCat === 'Hero'? 'Hand-picked 100 viral prompts.' : `500+ pro ${realCat} prompts` } Copy, save and try in one click.`,
  }
}

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ category: string }>, searchParams: Promise<{ page?: string }> }) {
  const { category: raw } = await params
  const { page: pageParam } = await searchParams
  const page = parseInt(pageParam || '1')
  const perPage = 24
  const offset = (page-1)*perPage

  const decoded = decodeURIComponent(raw)
  const realCat = SLUG_MAP[decoded.toLowerCase()] || SLUG_MAP[slugify(decoded)] || null

  if (!realCat) notFound()

  let prompts: any[] = []
  let count = 0

  if (realCat === 'Hero') {
    prompts = await sql`SELECT id, title, slug, category, difficulty, is_hero FROM prompts WHERE is_hero=true ORDER BY id LIMIT ${perPage} OFFSET ${offset}`
    const [{count: c}] = await sql`SELECT COUNT(*) FROM prompts WHERE is_hero=true`
    count = Number(c)
  } else {
    prompts = await sql`SELECT id, title, slug, category, difficulty, is_hero FROM prompts WHERE category=${realCat} ORDER BY is_hero DESC, id DESC LIMIT ${perPage} OFFSET ${offset}`
    const [{count: c}] = await sql`SELECT COUNT(*) FROM prompts WHERE category=${realCat}`
    count = Number(c)
  }

  const totalPages = Math.ceil(count / perPage)

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex gap-2 text-sm text-zinc-500">
        <Link href="/prompts">Prompts</Link><span>/</span><span className="text-black font-bold">{realCat}</span>
      </div>

      <h1 className="text-4xl font-black mt-4">{realCat} Prompts <span className="text-zinc-400 text-2xl">{count}</span></h1>
      <p className="text-zinc-600 mt-2 max-w-2xl">
        {realCat === 'Hero'? '⭐ 100 hand-picked viral prompts that actually work. Best of PromptoolHub.' : `Best ${count} ${realCat} prompts for ChatGPT, Midjourney, Claude. Copy & try in one click.`}
      </p>

      <div className="flex gap-2 overflow-x-auto mt-6 pb-2">
        {CATEGORIES.map(c=>(
          <Link key={c} href={`/prompts/category/${slugify(c)}`} className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${c===realCat? 'bg-black text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
            {c === 'Hero'? '⭐ Hero 100' : c}
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {prompts.map((p:any)=>(
          <Link key={p.id} href={`/prompts/${p.slug}`} className="group border rounded-2xl p-5 hover:shadow-xl hover:border-black transition bg-white">
            {p.is_hero && <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text- px-2 py-1 rounded-full font-bold">HERO</span>}
            <h3 className="font-semibold mt-2 line-clamp-2 group-hover:text-violet-600">{p.title}</h3>
            <p className="text-xs text-zinc-500 mt-2">{p.category} • {p.difficulty || 'Beginner'}</p>
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-10">
        {page>1 && <Link className="px-6 py-2 border rounded-full" href={`/prompts/category/${slugify(realCat)}?page=${page-1}`}>Prev</Link>}
        <span className="py-2">{page} / {totalPages}</span>
        {page<totalPages && <Link className="px-6 py-2 border rounded-full" href={`/prompts/category/${slugify(realCat)}?page=${page+1}`}>Next</Link>}
      </div>
    </div>
  )
}