import { sql } from '@/lib/db'
export const dynamic = 'force-dynamic'

const CAT_MAP: Record<string,string> = {
  'image-prompt': 'Image Prompt',
  'video-prompt': 'Video Prompt',
  'marketing': 'Marketing',
  'design': 'Design',
  'social-media': 'Social Media',
  'productivity': 'Productivity',
  'business': 'Business',
  'coding': 'Coding',
  'writing': 'Writing',
  'seo': 'SEO',
  'sales': 'Sales',
  'education': 'Education',
  'chatgpt-prompt': 'ChatGPT Prompt',
  'claude-prompt': 'Claude Prompt',
  'gemini-prompt': 'Gemini Prompt',
  'developer-prompt': 'Developer Prompt',
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const cat = searchParams.get('cat') || 'all'
  const q = (searchParams.get('q') || '').trim()
  const page = Math.max(1, parseInt(searchParams.get('page') || '1') || 1)
  const perPage = 18
  const offset = (page-1)*perPage
  let prompts: any[] = []
  try {
    const like = `%${q}%`
    if (cat === 'hero') {
      prompts = await sql`SELECT id,title,slug,category,prompt_content FROM prompts WHERE is_hero=true ORDER BY id LIMIT ${perPage} OFFSET ${offset}` as any[]
    } else if (cat === 'all') {
      prompts = q
      ? await sql`SELECT id,title,slug,category,prompt_content FROM prompts WHERE title ILIKE ${like} LIMIT ${perPage} OFFSET ${offset}` as any[]
       : await sql`SELECT id,title,slug,category,prompt_content FROM prompts ORDER BY id DESC LIMIT ${perPage} OFFSET ${offset}` as any[]
    } else {
      const dbCat = CAT_MAP[cat] || cat
      prompts = q
      ? await sql`SELECT id,title,slug,category,prompt_content FROM prompts WHERE category=${dbCat} AND title ILIKE ${like} LIMIT ${perPage} OFFSET ${offset}` as any[]
       : await sql`SELECT id,title,slug,category,prompt_content FROM prompts WHERE category=${dbCat} LIMIT ${perPage} OFFSET ${offset}` as any[]
    }
  } catch { prompts = [] }
  return Response.json({ prompts, page })
}