import { sql } from '@/lib/db'
import Link from 'next/link'
export const dynamic = 'force-dynamic'

const CATS = ["All","Hero","Image Prompt","Video Prompt","Marketing","Design","Social Media","Productivity","Business","Coding","Writing","SEO","Sales","Education"]

export default async function Page({ searchParams }: { searchParams: Promise<{ cat?: string, q?: string, page?: string }> }) {
  const { cat, q, page: pg } = await searchParams
  const page = parseInt(pg || '1') || 1
  const perPage = 18
  const offset = (page-1)*perPage
  let prompts: any[] = []
  let count = 8240
  try {
    if (!cat || cat === 'All') {
      prompts = await sql`SELECT id,title,slug,category FROM prompts ORDER BY id DESC LIMIT ${perPage} OFFSET ${offset}`
      const r = await sql`SELECT COUNT(*) as c FROM prompts`
      count = Number(r[0].c)
    } else if (cat === 'Hero') {
      prompts = await sql`SELECT id,title,slug,category FROM prompts WHERE is_hero=true LIMIT ${perPage} OFFSET ${offset}`
      count = 100
    } else {
      prompts = await sql`SELECT id,title,slug,category FROM prompts WHERE category=${cat} LIMIT ${perPage} OFFSET ${offset}`
      const r = await sql`SELECT COUNT(*) as c FROM prompts WHERE category=${cat}`
      count = Number(r[0].c)
    }
  } catch (e) {
    console.error(e)
    prompts = []
  }

  return (
    <div className="min-h-screen bg-white p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-black">{count} Prompts</h1>
      <div className="flex gap-2 overflow-x-auto mt-4 pb-2">
        {CATS.map(c=> <Link key={c} href={`/prompts?cat=${c}`} className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap ${cat===c || (!cat && c==='All') ? 'bg-black text-white' : 'bg-white'}`}>{c}</Link>)}
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {prompts.map((p:any)=><Link key={p.id} href={`/prompts/${p.slug}`} className="border p-4 rounded-xl hover:border-black"><h3 className="font-semibold line-clamp-2">{p.title}</h3><p className="text-xs text-zinc-500 mt-1">{p.category}</p></Link>)}
      </div>
    </div>
  )
}