import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  try {
    const [article] = await sql`SELECT * FROM tool_articles WHERE slug=${slug} LIMIT 1`
    return NextResponse.json(article || null)
  } catch {
    return NextResponse.json(null)
  }
}