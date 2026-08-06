import { ImageResponse } from 'next/og'
import { sql } from '@/lib/db'

export const runtime = 'edge'
export const alt = 'PromptoolHub'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let title = "Premium Prompt"
  let category = "Prompt"

  try {
    const rows = await sql`SELECT title, category FROM prompts WHERE slug=${slug} LIMIT 1`
    if (rows[0]) {
      title = rows[0].title.slice(0, 90)
      category = rows[0].category
    }
  } catch {}

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        background: '#0a0a0a', color: 'white', padding: '48px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'white', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 20 }}>P</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>PromptoolHub.com</div>
          </div>
          <div style={{ padding: '8px 16px', borderRadius: 100, background: '#222', border: '1px solid #333', fontSize: 14, letterSpacing: 1, textTransform: 'uppercase' }}>{category}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 54, fontWeight: 900, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
          <div style={{ fontSize: 18, color: '#a1a1aa' }}>8240+ Copy-ready prompts • Used by 50k+ creators</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #222', paddingTop: 24 }}>
          <div style={{ fontSize: 16, color: '#71717a' }}>Copy → Try → Ship</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: 100, background: '#E8990A' }}></div>
            <div style={{ width: 12, height: 12, borderRadius: 100, background: '#6366f1' }}></div>
            <div style={{ width: 12, height: 12, borderRadius: 100, background: '#ec4899' }}></div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}