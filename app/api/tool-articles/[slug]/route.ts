import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET(_:Request, {params}:{params:{slug:string}}){
  try{
    const [article] = await sql`SELECT * FROM tool_articles WHERE slug=${params.slug} LIMIT 1`
    return NextResponse.json(article || null)
  }catch(e){
    return NextResponse.json(null)
  }
}