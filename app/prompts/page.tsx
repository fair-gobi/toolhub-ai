import { sql } from '@/lib/db'
import Link from 'next/link'
import { CopyButton } from '@/components/CopyButton'
export const dynamic = 'force-dynamic'

const CATEGORIES = [
  { key: 'all', label: 'All', color: '#111', db: null },
  { key: 'hero', label: '⭐ Hero 100', color: '#f59e0b', db: 'Hero' },
  { key: 'image-prompt', label: 'Image', color: '#E8990A', db: 'Image Prompt' },
  { key: 'video-prompt', label: 'Video', color: '#6366f1', db: 'Video Prompt' },
  { key: 'marketing', label: 'Marketing', color: '#0F6B5C', db: 'Marketing' },
  { key: 'design', label: 'Design', color: '#ec4899', db: 'Design' },
  { key: 'social-media', label: 'Social', color: '#06b6d4', db: 'Social Media' },
  { key: 'productivity', label: 'Productivity', color: '#52525b', db: 'Productivity' },
  { key: 'business', label: 'Business', color: '#16a34a', db: 'Business' },
  { key: 'coding', label: 'Coding', color: '#0ea5e9', db: 'Coding' },
  { key: 'writing', label: 'Writing', color: '#8b5cf6', db: 'Writing' },
  { key: 'seo', label: 'SEO', color: '#f97316', db: 'SEO' },
  { key: 'sales', label: 'Sales', color: '#e11d48', db: 'Sales' },
  { key: 'education', label: 'Education', color: '#a855f7', db: 'Education' },
  { key: 'chatgpt-prompt', label: 'ChatGPT', color: '#10b981', db: 'ChatGPT Prompt' },
  { key: 'claude-prompt', label: 'Claude', color: '#d97706', db: 'Claude Prompt' },
  { key: 'gemini-prompt', label: 'Gemini', color: '#2563eb', db: 'Gemini Prompt' },
  { key: 'developer-prompt', label: 'Developer', color: '#000', db: 'Developer Prompt' },
]
const MAP: Record<string, any> = {}
CATEGORIES.forEach(c=> MAP[c.key]=c)

export default async function Page({ searchParams }: { searchParams: Promise<{ cat?: string, q?: string, page?: string }> }) {
  const { cat: rawCat, q: rawQ, page: pg } = await searchParams
  const activeKey = rawCat || 'all'
  const active = MAP[activeKey] || MAP['all']
  const q = (rawQ || '').trim()
  const page = Math.max(1, parseInt(pg || '1') || 1)
  const perPage = 18
  const offset = (page-1)*perPage
  let prompts: any[] = []
  let count = 8240
  let errMsg = ""

  try {
    const like = `%${q}%`
    if (active.db === 'Hero') {
      prompts = await sql`SELECT id, title, slug, category, prompt_content FROM prompts WHERE is_hero=true ORDER BY id LIMIT ${perPage} OFFSET ${offset}`
      count = 100
    } else if (active.db) {
      if (q) {
        prompts = await sql`SELECT id, title, slug, category, prompt_content FROM prompts WHERE category=${active.db} AND title ILIKE ${like} LIMIT ${perPage} OFFSET ${offset}`
        const r = await sql`SELECT COUNT(*) as c FROM prompts WHERE category=${active.db} AND title ILIKE ${like}`
        count = Number(r[0].c)
      } else {
        prompts = await sql`SELECT id, title, slug, category, prompt_content FROM prompts WHERE category=${active.db} LIMIT ${perPage} OFFSET ${offset}`
        const r = await sql`SELECT COUNT(*) as c FROM prompts WHERE category=${active.db}`
        count = Number(r[0].c)
      }
    } else {
      if (q) {
        prompts = await sql`SELECT id, title, slug, category, prompt_content FROM prompts WHERE title ILIKE ${like} LIMIT ${perPage} OFFSET ${offset}`
        const r = await sql`SELECT COUNT(*) as c FROM prompts WHERE title ILIKE ${like}`
        count = Number(r[0].c)
      } else {
        prompts = await sql`SELECT id, title, slug, category, prompt_content FROM prompts ORDER BY id DESC LIMIT ${perPage} OFFSET ${offset}`
        const r = await sql`SELECT COUNT(*) as c FROM prompts`
        count = Number(r[0].c)
      }
    }
  } catch (e: any) {
    errMsg = String(e?.message || e)
    console.error("PROMPTS FAIL", e)
  }

  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      <div className="mx-auto max-w- px-4 py-6">
        <h1 className="text-3xl font-black">Prompt Library - {count} prompts {errMsg && <span className="text-red-500 text-xs">{errMsg}</span>}</h1>

        <div className="mt-4 flex gap-2 overflow-x-auto">
          {CATEGORIES.map(c=> <Link key={c.key} href={`/prompts?cat=${c.key}`} className={`h-8 px-4 rounded-full border text-xs flex items-center gap-1.5 whitespace-nowrap ${activeKey===c.key?'bg-black text-white':'bg-white'}`}><span className="h-2 w-2 rounded-full" style={{background:c.color}}></span>{c.label}</Link>)}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prompts.map((p:any)=>(
            <div key={p.id} className="bg-white border rounded- p-5">
              <div className="flex justify-between items-center"><span className="text- uppercase text-zinc-500">{p.category}</span><CopyButton text={p.prompt_content || ''} /></div>
              <Link href={`/prompts/${p.slug}`}><h3 className="font-semibold mt-2 line-clamp-2 hover:text-violet-600">{p.title}</h3></Link>
            </div>
          ))}
        </div>

        {prompts.length===0 && <div className="py-20 text-center text-zinc-500">No prompts — error: {errMsg || "empty result, check Neon is_hero column exists"}</div>}

        <div className="mt-10 flex justify-center gap-2">
          {page>1 && <Link href={`/prompts?cat=${activeKey}&page=${page-1}`} className="h-9 px-4 rounded-full border bg-white text-sm">← Prev</Link>}
          <span className="text-xs py-2">{page} / {Math.ceil(count/perPage)}</span>
          {page < Math.ceil(count/perPage) && <Link href={`/prompts?cat=${activeKey}&page=${page+1}`} className="h-9 px-4 rounded-full bg-black text-white text-sm">Next →</Link>}
        </div>
      </div>
    </div>
  )
}