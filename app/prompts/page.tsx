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
]

const MAP: Record<string, any> = {}
CATEGORIES.forEach(c=> MAP[c.key]=c)

export default async function PromptsPage({ searchParams }: { searchParams: Promise<{ cat?: string, q?: string, page?: string }> }) {
  const { cat: rawCat, q: rawQ, page: pg } = await searchParams
  const activeKey = rawCat || 'all'
  const active = MAP[activeKey] || MAP['all']
  const q = (rawQ || '').trim()
  const page = Math.max(1, parseInt(pg || '1') || 1)
  const perPage = 18
  const offset = (page-1)*perPage
  let prompts: any[] = []
  let count = 8240

  try {
    const like = `%${q}%`
    if (active.db === 'Hero') {
      prompts = q
       ? await sql`SELECT id,title,slug,category,prompt_content,seo_description,tags,is_hero FROM prompts WHERE is_hero=true AND title ILIKE ${like} LIMIT ${perPage} OFFSET ${offset}`
        : await sql`SELECT id,title,slug,category,prompt_content,seo_description,tags,is_hero FROM prompts WHERE is_hero=true LIMIT ${perPage} OFFSET ${offset}`
      count = 100
    } else if (active.db) {
      prompts = q
       ? await sql`SELECT id,title,slug,category,prompt_content,seo_description,tags,is_hero FROM prompts WHERE category=${active.db} AND title ILIKE ${like} ORDER BY is_hero DESC LIMIT ${perPage} OFFSET ${offset}`
        : await sql`SELECT id,title,slug,category,prompt_content,seo_description,tags,is_hero FROM prompts WHERE category=${active.db} ORDER BY is_hero DESC LIMIT ${perPage} OFFSET ${offset}`
      const r = q? await sql`SELECT COUNT(*) as c FROM prompts WHERE category=${active.db} AND title ILIKE ${like}` : await sql`SELECT COUNT(*) as c FROM prompts WHERE category=${active.db}`
      count = Number(r[0]?.c || 0)
    } else {
      prompts = q
       ? await sql`SELECT id,title,slug,category,prompt_content,seo_description,tags,is_hero FROM prompts WHERE title ILIKE ${like} ORDER BY id DESC LIMIT ${perPage} OFFSET ${offset}`
        : await sql`SELECT id,title,slug,category,prompt_content,seo_description,tags,is_hero FROM prompts ORDER BY is_hero DESC, id DESC LIMIT ${perPage} OFFSET ${offset}`
      const r = q? await sql`SELECT COUNT(*) as c FROM prompts WHERE title ILIKE ${like}` : await sql`SELECT COUNT(*) as c FROM prompts`
      count = Number(r[0]?.c || 8240)
    }
  } catch (e) {
    console.error("PROMPTS DB FAIL", e)
  }

  const totalPages = Math.max(1, Math.ceil(count / perPage))

  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      <div className="border-b bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto max-w- px-4 md:px-6 h- flex items-center justify-between">
          <div className="flex items-center gap-3"><div className="h-8 w-8 rounded-lg bg-black text-white grid place-items-center font-black">P</div><b>PromptoolHub</b><span className="hidden md:inline-flex ml-2 text-xs bg-black text-white px-2.5 py-1 rounded-full">{count} prompts</span></div>
          <form method="GET" action="/prompts" className="hidden md:flex gap-2"><input type="hidden" name="cat" value={activeKey} /><input name="q" defaultValue={q} placeholder="Search 8240..." className="w- h-9 pl-4 pr-3 rounded-full bg-zinc-100 border text-sm" /></form>
        </div>
      </div>

      <div className="mx-auto max-w- px-4 md:px-6 py-6">
        <h1 className="text- md:text- font-black tracking-tight">Prompt Library</h1>
        <div className="mt-4 -mx-4 md:mx-0 px-4 md:px-0 overflow-x-auto"><div className="flex gap-2 w-max">{CATEGORIES.map(c=> <Link key={c.key} href={`/prompts?cat=${c.key}`} className={`h-8 px-4 rounded-full text- font-semibold border flex items-center gap-1.5 ${activeKey===c.key? 'bg-black text-white border-black' : 'bg-white border-zinc-200'}`}><span className="h-2 w-2 rounded-full" style={{background:c.color}}></span>{c.label}</Link>)}</div></div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prompts.map((p:any)=>{
            const m = CATEGORIES.find(x=>x.db===p.category) || { color: '#111', label: p.category }
            return (
              <div key={p.id} className="bg-white rounded- border border-zinc-200 p-5 hover:border-black hover:shadow-lg transition">
                <div className="flex justify-between"><span className="text- font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{background:m.color}}></span>{m.label}</span><CopyButton text={p.prompt_content} /></div>
                <Link href={`/prompts/${p.slug}`}><h3 className="font-semibold text- mt-3 line-clamp-2 hover:text-violet-600">{p.title}</h3><p className="text- text-zinc-500 line-clamp-2 mt-1">{p.seo_description?.slice(0,120)}</p></Link>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {page>1 && <Link href={`/prompts?cat=${activeKey}&page=${page-1}`} className="h-9 px-4 rounded-full border bg-white text-sm">← Prev</Link>}
          <span className="h-9 px-4 grid place-items-center text-xs text-zinc-500">{page} / {totalPages}</span>
          {page<totalPages && <Link href={`/prompts?cat=${activeKey}&page=${page+1}`} className="h-9 px-4 rounded-full bg-black text-white text-sm">Next →</Link>}
        </div>
      </div>
    </div>
  )
}