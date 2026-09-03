import { sql } from '@/lib/db'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

const CAT_MAP: Record<string, string> = {
  'hero': 'HERO',
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
  'vfx': 'VFX Templates',
  'image': 'Image',
}

function safeSlug(col = 'slug') {
  return col // we use COALESCE in query
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const rawCat = searchParams.get('cat') || searchParams.get('category') || ''
  const limit = parseInt(searchParams.get('limit') || '24')
  const offset = parseInt(searchParams.get('offset') || '0')
  const search = searchParams.get('search')?.trim()

  const catKey = rawCat.toLowerCase().trim()
  const dbCat = CAT_MAP[catKey] || rawCat // fallback to raw

  try {
    let rows: any[] = []

    if (search) {
      // search + optional cat filter
      if (catKey && catKey!== 'all') {
        if (catKey === 'hero') {
          rows = await sql`
            SELECT id, title, COALESCE(slug, id::text) as slug, category, prompt_content
            FROM prompts
            WHERE is_hero = true
            AND (title ILIKE ${'%' + search + '%'} OR prompt_content ILIKE ${'%' + search + '%'})
            ORDER BY id DESC
            LIMIT ${limit} OFFSET ${offset}
          `
        } else {
          rows = await sql`
            SELECT id, title, COALESCE(slug, id::text) as slug, category, prompt_content
            FROM prompts
            WHERE LOWER(TRIM(category)) = LOWER(TRIM(${dbCat}))
            AND (title ILIKE ${'%' + search + '%'} OR prompt_content ILIKE ${'%' + search + '%'})
            ORDER BY id DESC
            LIMIT ${limit} OFFSET ${offset}
          `
        }
      } else {
        rows = await sql`
          SELECT id, title, COALESCE(slug, id::text) as slug, category, prompt_content
          FROM prompts
          WHERE (title ILIKE ${'%' + search + '%'} OR prompt_content ILIKE ${'%' + search + '%'})
          ORDER BY id DESC
          LIMIT ${limit} OFFSET ${offset}
        `
      }
    } else if (catKey && catKey!== 'all') {
      if (catKey === 'hero') {
        try {
          rows = await sql`
            SELECT id, title, COALESCE(slug, id::text) as slug, category, prompt_content
            FROM prompts
            WHERE is_hero = true
            ORDER BY id DESC
            LIMIT ${limit} OFFSET ${offset}
          `
        } catch {
          // if is_hero column doesn't exist, fallback to all
          rows = await sql`
            SELECT id, title, COALESCE(slug, id::text) as slug, category, prompt_content
            FROM prompts
            ORDER BY id DESC
            LIMIT ${limit} OFFSET ${offset}
          `
        }
      } else {
        rows = await sql`
          SELECT id, title, COALESCE(slug, id::text) as slug, category, prompt_content
          FROM prompts
          WHERE LOWER(TRIM(category)) = LOWER(TRIM(${dbCat}))
          ORDER BY id DESC
          LIMIT ${limit} OFFSET ${offset}
        `
      }
    } else {
      // all
      rows = await sql`
        SELECT id, title, COALESCE(slug, id::text) as slug, category, prompt_content
        FROM prompts
        ORDER BY id DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    }

    return Response.json(rows)
  } catch (e: any) {
    console.error('API /prompts error:', e)
    return Response.json({ error: e.message }, { status: 500 })
  }
}