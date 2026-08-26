// app/ai-tools/[category]/page.jsx
// SEO Category Pages - Dynamic Route for /ai-tools/video-generators etc.
// Place this file at: app/ai-tools/[category]/page.jsx

import Link from "next/link"
import { EXTERNAL_TOOLS, CATEGORY_SEO } from "@/data/externalToolsWithAffiliates"

// Map URL slugs to internal category keys
const SLUG_MAP = {
  "video-generators": "video",
  "video": "video",
  "image-generators": "image",
  "image": "image",
  "image-editing-tools": "image-editing",
  "image-editing": "image-editing",
  "audio-tools": "audio",
  "audio": "audio",
  "music-tools": "audio",
  "business-tools": "business",
  "business": "business",
  "productivity-tools": "productivity",
  "productivity": "productivity",
}

export async function generateStaticParams() {
  return Object.keys(SLUG_MAP).map((category) => ({
    category: category,
  }))
}

export async function generateMetadata({ params }) {
  const catKey = SLUG_MAP[params.category] || params.category
  const seo = CATEGORY_SEO[catKey]
  if (!seo) return { title: "AI Tools | Promptoolhub" }
  
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://www.promptoolhub.com/ai-tools/${seo.url}`,
    },
    alternates: {
      canonical: `https://www.promptoolhub.com/ai-tools/${seo.url}`
    }
  }
}

export default function CategoryPage({ params }) {
  const catKey = SLUG_MAP[params.category] || params.category
  const seo = CATEGORY_SEO[catKey]
  const tools = EXTERNAL_TOOLS.filter(t => t.category === catKey)

  if (!seo) {
    return <div className="wrap" style={{padding:40}}>Category not found. <Link href="/ai-tools">Back to AI Tools</Link></div>
  }

  return (
    <>
      <style>{`
        :root{--bg:#EEF0EC;--ink:#14181A;--ink-soft:#52585A;--line:#D2D6CC;--card:#FCFDFB;--teal:#0F6B5C;--tint:#E4EEEC}
        *{box-sizing:border-box;margin:0;padding:0} body{background:var(--bg);font-family:'Inter',sans-serif}
        .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .hero{padding:40px 0 28px;border-bottom:1px solid var(--line);background:var(--card)}
        .breadcrumb{font-size:.85rem;color:var(--ink-soft);margin-bottom:16px}
        .badge{font-family:'IBM Plex Mono';font-size:.62rem;font-weight:600;padding:3px 7px;border-radius:4px;background:#FEF3C7;color:#92400E}
        .badge.free{background:#E6F4EA;color:#1E7A3A} .badge.paid{background:#FCE8E6;color:#A50E0E}
        .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px} @media(max-width:1000px){.grid{grid-template-columns:repeat(3,1fr)}} @media(max-width:700px){.grid{grid-template-columns:repeat(2,1fr)}} @media(max-width:500px){.grid{grid-template-columns:1fr}}
        .tool-card{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:16px;display:flex;flex-direction:column;gap:10px;transition:.15s}
        .tool-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.06)}
        .ic{width:36px;height:36px;border-radius:7px;background:var(--tint);display:grid;place-items:center;font-weight:700;color:var(--teal)}
        .cta{margin-top:auto;background:var(--ink);color:white;padding:9px 12px;border-radius:7px;text-align:center;font-size:.85rem;font-weight:600}
        .cta.affiliate{background:var(--teal)}
        .faq{margin-top:40px;padding:24px;background:var(--card);border:1px solid var(--line);border-radius:10px}
        .faq h3{margin-bottom:8px}
      `}</style>

      <div className="hero">
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/ai-tools">AI Tools</Link> / {seo.h1}</div>
          <h1 style={{fontFamily:'Space Grotesk',fontSize:'clamp(1.6rem,3vw,2.4rem)',fontWeight:700}}>{seo.h1}</h1>
          <p style={{color:'var(--ink-soft)',marginTop:8,maxWidth:720}}>{seo.description} All tools open in 1 click — no signup needed to browse.</p>
          <div style={{marginTop:12,fontFamily:'IBM Plex Mono',fontSize:'.75rem'}}>{tools.length} TOOLS • Updated 2026 • 1-Click Access</div>
        </div>
      </div>

      <div className="wrap" style={{paddingTop:24, paddingBottom:64}}>
        <div className="grid">
          {tools.map(t=>{
            const link = t.affiliateUrl || t.url
            return (
              <a key={t.slug} href={link} target="_blank" rel="nofollow noopener" className="tool-card">
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <div className="ic">{t.name[0]}</div>
                  <span className={`badge ${t.pricing.toLowerCase()}`}>{t.pricing}</span>
                </div>
                <div style={{fontWeight:600}}>{t.name} <span style={{fontSize:'.8rem',color:'var(--ink-soft)'}}>★ {t.rating}</span></div>
                <div style={{fontSize:'.85rem',color:'var(--ink-soft)',lineHeight:1.4}}>{t.desc}</div>
                {t.hasAffiliate && <div style={{fontSize:'.68rem',color:'var(--teal)',fontFamily:'IBM Plex Mono'}}>★ Recommended</div>}
                <div className={`cta ${t.hasAffiliate ? 'affiliate' : ''}`}>{t.hasAffiliate ? 'Try Free →' : 'Use Tool →'}</div>
              </a>
            )
          })}
        </div>

        {/* SEO Content - Important for Google ranking */}
        <div className="faq">
          <h3>What are {seo.h1}?</h3>
          <p style={{color:'var(--ink-soft)',fontSize:'.92rem',lineHeight:1.6}}>
            {seo.h1} use artificial intelligence to automate creative work. For example, {tools.slice(0,3).map(t=>t.name).join(', ')} 
            let you create professional content in seconds instead of hours. All {tools.length} tools above are tested and open in 1 click.
          </p>
          <h3 style={{marginTop:20}}>How to choose the best {seo.h1.toLowerCase()}?</h3>
          <p style={{color:'var(--ink-soft)',fontSize:'.92rem',lineHeight:1.6}}>
            1. For free options, start with {tools.filter(t=>t.pricing==='Free').slice(0,2).map(t=>t.name).join(' or ')}.<br/>
            2. For business use, {tools.filter(t=>t.hasAffiliate).slice(0,2).map(t=>t.name).join(' and ')} offer commercial licenses.<br/>
            3. Check pricing: {tools.filter(t=>t.pricing==='Freemium').length} freemium, {tools.filter(t=>t.pricing==='Free').length} completely free.
          </p>
          <div style={{marginTop:20}}>
            <Link href="/ai-tools" style={{color:'var(--teal)',fontWeight:600}}>← View all 146 AI tools</Link>
          </div>
        </div>
      </div>
    </>
  )
}
