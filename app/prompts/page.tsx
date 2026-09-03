import { sql } from '@/lib/db'
import Link from 'next/link'
import { PromptInfinite } from '@/components/PromptInfinite'
import AdminAddButton from '@/components/AdminAddButton'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const CATEGORIES = [
  { key: 'all', label: 'All', color: '#111', db: null },
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
  { key: 'vfx', label: 'VFX', color: '#ff6600', db: 'VFX Templates' },
]

const MAP: Record<string, any> = {}
CATEGORIES.forEach(c=> MAP[c.key]=c)
function safeCount(r:any){ return Number(r?.[0]?.total?? 0) }

export default async function Page({ searchParams }: { searchParams: Promise<{ cat?: string, q?: string }> }) {
  const { cat: rawCat, q: rawQ } = await searchParams
  const activeKey = rawCat || 'all'
  const active = MAP[activeKey] || MAP['all']
  const q = (rawQ || '').trim()
  const perPage = 18
  let prompts: any[] = []
  let count = 0

  try {
    const like = `%${q}%`
    if (active.db) {
      if (q) {
        prompts = await sql`SELECT id, title, COALESCE(slug, id::text) as slug, category, prompt_content FROM prompts WHERE LOWER(TRIM(category)) = LOWER(TRIM(${active.db})) AND (title ILIKE ${like} OR prompt_content ILIKE ${like} OR category ILIKE ${like}) ORDER BY id DESC LIMIT ${perPage}`
        const r = await sql`SELECT COUNT(*) as total FROM prompts WHERE LOWER(TRIM(category)) = LOWER(TRIM(${active.db})) AND (title ILIKE ${like} OR prompt_content ILIKE ${like} OR category ILIKE ${like})`
        count = safeCount(r)
      } else {
        prompts = await sql`SELECT id, title, COALESCE(slug, id::text) as slug, category, prompt_content FROM prompts WHERE LOWER(TRIM(category)) = LOWER(TRIM(${active.db})) ORDER BY id DESC LIMIT ${perPage}`
        const r = await sql`SELECT COUNT(*) as total FROM prompts WHERE LOWER(TRIM(category)) = LOWER(TRIM(${active.db}))`
        count = safeCount(r)
      }
    } else {
      if (q) {
        prompts = await sql`SELECT id, title, COALESCE(slug, id::text) as slug, category, prompt_content FROM prompts WHERE title ILIKE ${like} OR prompt_content ILIKE ${like} OR category ILIKE ${like} ORDER BY id DESC LIMIT ${perPage}`
        const r = await sql`SELECT COUNT(*) as total FROM prompts WHERE title ILIKE ${like} OR prompt_content ILIKE ${like} OR category ILIKE ${like}`
        count = safeCount(r)
      } else {
        prompts = await sql`SELECT id, title, COALESCE(slug, id::text) as slug, category, prompt_content FROM prompts ORDER BY id DESC LIMIT ${perPage}`
        const r = await sql`SELECT COUNT(*) as total FROM prompts`
        count = safeCount(r)
      }
    }
  } catch (e: any) {}

  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-black">Prompt Library - {count} prompts</h1>
          <form action="/prompts" method="GET" className="flex items-center gap-2 w-full md:w-auto">
            <input type="hidden" name="cat" value={activeKey} />
            <div className="relative flex-1 md:w-">
              <input name="q" defaultValue={q} placeholder="Search prompts..." className="w-full h-10 rounded-full border border-zinc-300 bg-white px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">🔍</span>
            </div>
            <button type="submit" className="h-10 px-6 rounded-full bg-black text-white text-sm font-bold">Search</button>
            {q && <Link href={`/prompts?cat=${activeKey}`} className="h-10 px-4 rounded-full border bg-white text-sm flex items-center">Clear</Link>}
          </form>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map(c=> <Link key={c.key} href={`/prompts?cat=${c.key}${q?`&q=${encodeURIComponent(q)}`:''}`} className={`h-8 px-4 rounded-full border text-xs flex items-center gap-1.5 whitespace-nowrap ${activeKey===c.key?'bg-black text-white border-black':'bg-white'}`}><span className="h-2 w-2 rounded-full" style={{background:c.color}}></span>{c.label}</Link>)}
        </div>
        <div className="flex items-center gap-3 mt-4">
          <h2 className="text-xl font-bold">Prompts {q && <span className="text-sm font-normal text-zinc-500">for "{q}"</span>}</h2>
          <AdminAddButton />
        </div>
        <div className="mt-6"><PromptInfinite initialPrompts={prompts} initialCat={activeKey} initialQ={q} /></div>
      </div>
    </div>
  )
}