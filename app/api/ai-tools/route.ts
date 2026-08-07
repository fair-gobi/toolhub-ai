import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET(){
  const tools = await sql`SELECT * FROM ai_tools ORDER BY is_original DESC, created_at DESC`
  return NextResponse.json(tools)
}

export async function POST(req:Request){
  const { name, desc, cat, url } = await req.json()
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
  const [tool] = await sql`
    INSERT INTO ai_tools (slug, name, description, category, external_url, is_original, is_new)
    VALUES (${slug}, ${name}, ${desc}, ${cat}, ${url}, false, true)
    ON CONFLICT (slug) DO UPDATE SET description=${desc}, external_url=${url}
    RETURNING *
  `
  return NextResponse.json(tool)
}