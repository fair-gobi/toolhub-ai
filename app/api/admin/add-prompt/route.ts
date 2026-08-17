import { sql } from '@/lib/db'
export const dynamic = 'force-dynamic'

function slugify(s: string) { 
  return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0, 80) 
}

function checkAuth(req: Request) { 
  const incoming = req.headers.get('x-admin-key')?.trim()
  const expected = process.env.ADMIN_KEY?.trim()
  if (!expected) console.error("❌ ADMIN_KEY env is missing on Vercel!")
  return !!incoming && !!expected && incoming === expected
}

export async function GET(req: Request) {
  if (!checkAuth(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').trim()
  const perPage = 20
  let prompts: any[] = q
    ? await sql`SELECT * FROM prompts WHERE title ILIKE ${`%${q}%`} ORDER BY id DESC LIMIT ${perPage}` as any[]
    : await sql`SELECT * FROM prompts ORDER BY id DESC LIMIT ${perPage}` as any[]
  return Response.json({ prompts })
}

export async function POST(req: Request) {
  if (!checkAuth(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { title, category, prompt_content } = await req.json()
  const slug = slugify(title) + '-' + Date.now().toString().slice(-5)
  const id = crypto.randomUUID()
  await sql`INSERT INTO prompts (id, title, slug, category, prompt_content, is_hero, created_at) VALUES (${id}, ${title}, ${slug}, ${category}, ${prompt_content}, false, NOW())`
  return Response.json({ success: true, slug })
}

export async function PUT(req: Request) {
  if (!checkAuth(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, title, category, prompt_content } = await req.json()
  await sql`UPDATE prompts SET title=${title}, category=${category}, prompt_content=${prompt_content} WHERE id=${id}`
  return Response.json({ success: true })
}