import { sql } from '@/lib/db'
import Link from 'next/link'
import PromptInfinite from '@/components/PromptInfinite'
import AdminAddButton from '@/components/AdminAddButton'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const CATEGORIES = [
  { key: 'all', label: 'All', color: '#111', db: null },
  { key: 'hero', label: '⭐ Hero 300', color: '#f59e0b', db: 'HERO' },
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

function safeCount(r:any){ return Number(r?.[0]?.total?? r?.[0]?.c?? r?.[0]?.count?? 0) }

export default async function Page({ searchParams }: { searchParams: Promise<{ cat?: string, q?: string }> }) {
  const { cat: rawCat, q: rawQ } = await searchParams
  const activeKey = rawCat || 'all'
  const active = MAP[activeKey] || MAP['all']
  const q = (rawQ || '').trim()
  const perPage = 18
  let prompts: any[] = []
  let count = 0
  let errMsg = ""

  try {
    const like = `%${q}%`
    if (activeKey === 'hero') {
      // hero uses is_hero flag
      try {
        if (q) {
          prompts = await sql`SELECT id, title, COALESCE(slug, id::text) as slug, category, prompt_content FROM prompts WHERE is_hero=true AND title ILIKE ${like} ORDER BY id DESC LIMIT ${perPage}`
          const r = await sql`SELECT COUNT(*) as total FROM prompts WHERE is_hero=true AND title ILIKE ${like}`
          count = safeCount(r)
        } else {
          prompts = await sql`SELECT id, title, COALESCE(slug, id::text) as slug, category, prompt_content FROM prompts WHERE is_hero=true ORDER BY id DESC LIMIT ${perPage}`
          const r = await sql`SELECT COUNT(*) as total FROM prompts WHERE is_hero=true`
          count = safeCount(r)
        }
      } catch {
        // fallback if is_hero column missing - use Image category as hero
        prompts = await sql`SELECT id, title, COALESCE(slug, id::text) as slug, category, prompt_content FROM prompts ORDER BY id DESC LIMIT ${perPage}`
        const r = await sql`SELECT COUNT(*) as total FROM prompts`
        count = safeCount(r)
      }
    } else if (active.db) {
      if (q) {
        prompts = await sql`SELECT id, title, COALESCE(slug, id::text) as slug, category, prompt_content FROM prompts WHERE LOWER(TRIM(category)) = LOWER(TRIM(${active.db})) AND title ILIKE ${like} ORDER BY id DESC LIMIT ${perPage}`
        const r = await sql`SELECT COUNT(*) as total FROM prompts WHERE LOWER(TRIM(category)) = LOWER(TRIM(${active.db})) AND title ILIKE ${like}`
        count = safeCount(r)
      } else {
        prompts = await sql`SELECT id, title, COALESCE(slug, id::text) as slug, category, prompt_content FROM prompts WHERE LOWER(TRIM(category)) = LOWER(TRIM(${active.db})) ORDER BY id DESC LIMIT ${perPage}`
        const r = await sql`SELECT COUNT(*) as total FROM prompts WHERE LOWER(TRIM(category)) = LOWER(TRIM(${active.db}))`
        count = safeCount(r)
      }
    } else {
      if (q) {
        prompts = await sql`SELECT id, title, COALESCE(slug, id::text) as slug, category, prompt_content FROM prompts WHERE title ILIKE ${like} ORDER BY id DESC LIMIT ${perPage}`
        const r = await sql`SELECT COUNT(*) as total FROM prompts WHERE title ILIKE ${like}`
        count = safeCount(r)
      } else {
        prompts = await sql`SELECT id, title, COALESCE(slug, id::text) as slug, category, prompt_content FROM prompts ORDER BY id DESC LIMIT ${perPage}`
        const r = await sql`SELECT COUNT(*) as total FROM prompts`
        count = safeCount(r)
      }
    }
  } catch (e: any) {
    errMsg = String(e?.message || e)
    console.error("PROMPTS FAIL", e)
  }

  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="text-3xl font-black">Prompt Library - {count} prompts {errMsg && <span className="text-red-500 text-xs ml-2">{errMsg}</span>}</h1>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map(c=> <Link key={c.key} href={`/prompts?cat=${c.key}`} className={`h-8 px-4 rounded-full border text-xs flex items-center gap-1.5 whitespace-nowrap ${activeKey===c.key?'bg-black text-white':'bg-white'}`}><span className="h-2 w-2 rounded-full" style={{background:c.color}}></span>{c.label}</Link>)}
        </div>
        <div className="flex items-center gap-3 mt-4">
          <h1 className="text-xl font-bold">Prompts</h1>
          <AdminAddButton />
        </div>
        <div className="mt-6">
          <PromptInfinite initialPrompts={prompts} initialCat={activeKey} initialQ={q} />
        </div>
      </div>
    </div>
  )
}