import { sql } from '@/lib/db'
import Link from 'next/link'
import { CopyButton } from '@/components/CopyButton'

export const dynamic = 'force-dynamic'

const CATEGORIES = [
  { key: 'all', label: 'All', count: 8240, color: '#111', db: null },
  { key: 'hero', label: '⭐ Hero 100', count: 100, color: '#f59e0b', db: 'Hero' },
  { key: 'image-prompt', label: 'Image', count: 1650, color: '#E8990A', db: 'Image Prompt' },
  { key: 'video-prompt', label: 'Video', count: 1150, color: '#6366f1', db: 'Video Prompt' },
  { key: 'marketing', label: 'Marketing', count: 560, color: '#0F6B5C', db: 'Marketing' },
  { key: 'design', label: 'Design', count: 560, color: '#ec4899', db: 'Design' },
  { key: 'social-media', label: 'Social', count: 560, color: '#06b6d4', db: 'Social Media' },
  { key: 'productivity', label: 'Productivity', count: 560, color: '#52525b', db: 'Productivity' },
  { key: 'business', label: 'Business', count: 310, color: '#16a34a', db: 'Business' },
  { key: 'coding', label: 'Coding', count: 310, color: '#0ea5e9', db: 'Coding' },
  { key: 'writing', label: 'Writing', count: 310, color: '#8b5cf6', db: 'Writing' },
  { key: 'seo', label: 'SEO', count: 310, color: '#f97316', db: 'SEO' },
  { key: 'sales', label: 'Sales', count: 310, color: '#e11d48', db: 'Sales' },
  { key: 'education', label: 'Education', count: 310, color: '#a855f7', db: 'Education' },
  { key: 'chatgpt-prompt', label: 'ChatGPT', count: 310, color: '#10b981', db: 'ChatGPT Prompt' },
  { key: 'claude-prompt', label: 'Claude', count: 310, color: '#d97706', db: 'Claude Prompt' },
  { key: 'gemini-prompt', label: 'Gemini', count: 310, color: '#2563eb', db: 'Gemini Prompt' },
  { key: 'developer-prompt', label: 'Developer', count: 310, color: '#000', db: 'Developer Prompt' },
]

const MAP: Record<string, any> = {}
CATEGORIES.forEach(c=> MAP[c.key]=c)

export default async function PromptsPage({ searchParams }: { searchParams: Promise<{ cat?: string, q?: string, page?: string }> }) {
  const { cat: rawCat, q: rawQ, page: pageParam } = await searchParams
  const activeKey = rawCat || 'all'
  const active = MAP[activeKey] || MAP['all']
  const q = (rawQ || '').trim()
  const page = Math.max(1, parseInt(pageParam || '1') || 1)
  const perPage = 18
  const offset = (page-1)*perPage

  let prompts: any[] = []
  let count = active.count || 0

  try {
    const like = `%${q}%`
    if (active.db === 'Hero') {
      if (q) {
        prompts = await sql`SELECT id, title, slug, category, prompt_content, seo_description, tags, is_hero FROM prompts WHERE is_hero=true AND (title ILIKE ${like} OR seo_description ILIKE ${like}) ORDER BY id LIMIT ${perPage} OFFSET ${offset}`
        const rows = await sql`SELECT COUNT(*) as c FROM prompts WHERE is_hero=true AND (title ILIKE ${like} OR seo_description ILIKE ${like})`
        count = Number(rows[0]?.c || 0)
      } else {
        prompts = await sql`SELECT id, title, slug, category, prompt_content, seo_description, tags, is_hero FROM prompts WHERE is_hero=true ORDER BY id LIMIT ${perPage} OFFSET ${offset}`
        count = 100
      }
    } else if (active.db) {
      if (q) {
        prompts = await sql`SELECT id, title, slug, category, prompt_content, seo_description, tags, is_hero FROM prompts WHERE category=${active.db} AND (title ILIKE ${like} OR seo_description ILIKE ${like}) ORDER BY is_hero DESC, id DESC LIMIT ${perPage} OFFSET ${offset}`
        const rows = await sql`SELECT COUNT(*) as c FROM prompts WHERE category=${active.db} AND (title ILIKE ${like} OR seo_description ILIKE ${like})`
        count = Number(rows[0]?.c || 0)
      } else {
        prompts = await sql`SELECT id, title, slug, category, prompt_content, seo_description, tags, is_hero FROM prompts WHERE category=${active.db} ORDER BY is_hero DESC, id DESC LIMIT ${perPage} OFFSET ${offset}`
        const rows = await sql`SELECT COUNT(*) as c FROM prompts WHERE category=${active.db}`
        count = Number(rows[0]?.c || 0)
      }
    } else {
      if (q) {
        prompts = await sql`SELECT id, title, slug, category, prompt_content, seo_description, tags, is_hero FROM prompts WHERE title ILIKE ${like} OR seo_description ILIKE ${like} ORDER BY is_hero DESC, id DESC LIMIT ${perPage} OFFSET ${offset}`
        const rows = await sql`SELECT COUNT(*) as c FROM prompts WHERE title ILIKE ${like} OR seo_description ILIKE ${like}`
        count = Number(rows[0]?.c || 0)
      } else {
        prompts = await sql`SELECT id, title, slug, category, prompt_content, seo_description, tags, is_hero FROM prompts ORDER BY is_hero DESC, id DESC LIMIT ${perPage} OFFSET ${offset}`
        const rows = await sql`SELECT COUNT(*) as c FROM prompts`
        count = Number(rows[0]?.c || 8240)
      }
    }
  } catch (e) {
    console.error("DB ERROR /prompts", e)
    prompts = []
    count = 0
  }

  const totalPages = Math.max(1, Math.ceil(count / perPage))

  return (
    <div className="min-h-screen bg-[#fcfcf9] text-zinc-900">
      <div className="border-b border-zinc-200 bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto max-w- px-4 md:px-6 h- flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-black text-white grid place-items-center font-black">P</div>
            <span className="font-bold tracking-tight">PromptoolHub</span>
            <span className="hidden md:inline-flex ml-2 text-xs bg-zinc-900 text-white px-2.5 py-1 rounded-full">{count.toLocaleString()} prompts</span>
          </div>
          <form method="GET" action="/prompts" className="hidden md:flex items-center gap-2">
            <input type="hidden" name="cat" value={activeKey} />
            <div className="relative">
              <input name="q" defaultValue={q} placeholder="Search 8240 prompts..." className="w- h-9 pl-9 pr-3 rounded-full bg-zinc-100 border border-zinc-200 text-sm focus:outline-none focus:bg-white focus:border-black" />
              <span className="absolute left-3 top-2.5 text-zinc-400 text-sm">⌕</span>
            </div>
          </form>
        </div>
      </div>

      <div className="md:hidden p-4 bg-white border-b border-zinc-200">
        <form method="GET" action="/prompts" className="flex gap-2">
          <input type="hidden" name="cat" value={activeKey} />
          <input name="q" defaultValue={q} placeholder="Search 8240 prompts..." className="flex-1 h-11 px-4 rounded-full bg-zinc-100 border border-zinc-200 text-" />
          <button className="h-11 px-5 rounded-full bg-black text-white text-sm font-bold">Search</button>
        </form>
      </div>

      <div className="mx-auto max-w- px-4 md:px-6 py-6 md:py-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text- md:text- font-black tracking-tight leading-none">Prompt Library</h1>
            <p className="text-zinc-500 text-sm md:text- mt-2">Copy → Try → Ship. {count.toLocaleString()} prompts for real work.</p>
          </div>
          <div className="text-xs text-zinc-500">Page {page} / {totalPages} • {count.toLocaleString()} results {q && `for "${q}"`}</div>
        </div>

        <div className="mt-6 -mx-4 md:mx-0 px-4 md:px-0 overflow-x-auto">
          <div className="flex gap-2 w-max">
            {CATEGORIES.map(c=>(
              <Link key={c.key} href={`/prompts?cat=${c.key}${q? `&q=${encodeURIComponent(q)}`:''}`}
                className={`h-8 px-4 rounded-full text- font-semibold border whitespace-nowrap flex items-center gap-1.5 ${activeKey===c.key? 'bg-black text-white border-black' : 'bg-white border-zinc-200 text-zinc-600 hover:border-black'}`}>
                <span className="h-2 w-2 rounded-full" style={{ background: c.color }}></span>{c.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {prompts.map((p:any)=>{
            const meta = CATEGORIES.find(x=>x.db===p.category) || { color: '#111', label: p.category }
            return (
              <div key={p.id} className={`group relative bg-white rounded- border p-5 flex flex-col gap-3 hover:shadow-xl hover:border-zinc-900 transition-all ${p.is_hero? 'border-amber-200 ring-1 ring-amber-100' : 'border-zinc-200'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: meta.color }}></span>
                    <span className="text- font-bold tracking-widest uppercase text-zinc-500">{meta.label}</span>
                    {p.is_hero && <span className="text- bg-amber-400 text-black px-2 py-0.5 rounded-full font-bold">HERO</span>}
                  </div>
                  <CopyButton text={p.prompt_content} />
                </div>
                <Link href={`/prompts/${p.slug}`} className="space-y-2">
                  <h3 className="font-semibold text- leading-[1.25] line-clamp-2 group-hover:text-violet-600">{p.title}</h3>
                  <p className="text- leading-[1.5] text-zinc-500 line-clamp-3">{p.seo_description || p.prompt_content?.slice(0,140)}</p>
                </Link>
                <div className="mt-auto flex gap-1.5 flex-wrap pt-2">
                  {(p.tags||[]).slice(0,3).map((t:string)=><span key={t} className="text- px-2 py-1 rounded-full bg-zinc-100 text-zinc-600">#{t}</span>)}
                </div>
              </div>
            )
          })}
        </div>

        {prompts.length===0 && (
          <div className="py-20 text-center">
            <p className="text-zinc-500">No prompts found or DB not connected.</p>
            <p className="text-xs text-zinc-400 mt-2">Check Vercel DATABASE_URL env variable.</p>
          </div>
        )}

        <div className="mt-10 flex items-center justify-center gap-2">
          {page>1? <Link href={`/prompts?cat=${activeKey}&q=${encodeURIComponent(q)}&page=${page-1}`} className="h-9 px-4 grid place-items-center rounded-full border border-zinc-200 bg-white text-sm hover:border-black">← Prev</Link> : <span className="h-9 px-4 grid place-items-center rounded-full border border-zinc-100 bg-zinc-50 text-sm text-zinc-300">← Prev</span>}
          <span className="text-xs text-zinc-500 px-2">{page} / {totalPages}</span>
          {page<totalPages? <Link href={`/prompts?cat=${activeKey}&q=${encodeURIComponent(q)}&page=${page+1}`} className="h-9 px-4 grid place-items-center rounded-full bg-black text-white text-sm">Next →</Link> : <span className="h-9 px-4 grid place-items-center rounded-full bg-zinc-100 text-sm text-zinc-300">Next →</span>}
        </div>
      </div>
    </div>
  )
}