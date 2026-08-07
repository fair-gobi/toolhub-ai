import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET(_:Request, {params}:{params: Promise<{slug:string}>}){
  const {slug} = await params
  const clean = slug.toLowerCase().replace(/-/g,'%')
  try{
    const [article] = await sql`
      SELECT * FROM tool_articles
      WHERE LOWER(slug) = LOWER(${slug})
      OR LOWER(slug) LIKE LOWER(${'%' + slug + '%'})
      OR LOWER(${slug}) LIKE '%'||LOWER(slug)||'%'
      OR LOWER(tool_name) ILIKE ${'%' + clean + '%'}
      LIMIT 1
    `
    return NextResponse.json(article || null)
  }catch(e){
    return NextResponse.json(null)
  }
}