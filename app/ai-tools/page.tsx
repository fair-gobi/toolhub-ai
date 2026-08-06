"use client"
import Link from "next/link"
import { useState } from "react"

const TOOLS = [
  { slug: "resume-builder", name: "AI Resume Builder", desc: "Create ATS resume in 30 sec" },
  { slug: "cover-letter", name: "AI Cover Letter", desc: "Job-winning cover letters" },
  { slug: "code-generator", name: "AI Code Generator", desc: "Generate code in any language" },
  { slug: "bug-finder", name: "AI Bug Finder", desc: "Find & fix bugs instantly" },
  { slug: "image-generator", name: "AI Image Generator", desc: "Text to image — unlimited free" },
  { slug: "video-generator", name: "AI Video Generator", desc: "Text to video — 100% free" },
]

const CATS = [
  { key:'ai', label:'AI Tools', href:'/ai-tools' },
  { key:'pdf', label:'PDF Tools', href:'/pdf-tools' },
  { key:'image', label:'Image Tools', href:'/image-tools' },
  { key:'dev', label:'Developer Tools', href:'/dev-tools' },
  { key:'text', label:'Text Tools', href:'/text-tools' },
  { key:'business', label:'Business Tools', href:'/business' },
  { key:'finance', label:'Finance Tools', href:'/finance' },
  { key:'utility', label:'Utility Tools', href:'/utility' },
]

export default function AIToolsPage(){
  const [search,setSearch]=useState("")
  const filtered = TOOLS.filter(t=>(t.name+t.desc).toLowerCase().includes(search.toLowerCase()))

  return(
    <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
      :root{--bg:#EEF0EC;--bg-alt:#E4E7E0;--ink:#14181A;--ink-soft:#52585A;--line:#D2D6CC;--card:#FCFDFB;--teal:#0F6B5C;--tint:#E4EEEC}
      *{box-sizing:border-box;margin:0;padding:0} body{background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif}
      .mono{font-family:'IBM Plex Mono',monospace} a{color:inherit;text-decoration:none}
      .wrap{max-width:1180px;margin:0 auto;padding:0 24px} @media(max-width:600px){.wrap{padding:0 16px}}
      header{border-bottom:1px solid var(--line);background:var(--bg);position:sticky;top:0;z-index:50}
      .header-inner{display:flex;align-items:center;justify-content:space-between;height:68px}
      .logo{display:flex;align-items:center;gap:10px;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.15rem}
      .logo-mark{width:32px;height:32px;border-radius:8px;background:var(--ink);display:grid;place-items:center;color:white;font-weight:900}
      .nav-links{display:flex;gap:22px;font-size:.9rem;font-weight:500;color:var(--ink-soft)} .nav-links a:hover{color:var(--ink)}
      .switcher{border-bottom:1px solid var(--line);background:var(--card);overflow-x:auto;white-space:nowrap}
      .switcher-inner{display:flex;gap:8px;padding:12px 24px}
      .switch-pill{font-family:'IBM Plex Mono';font-size:.78rem;font-weight:600;padding:8px 14px;border-radius:20px;border:1px solid var(--line);background:var(--bg);color:var(--ink-soft);cursor:pointer;flex-shrink:0}
      .switch-pill.active{background:var(--ink);color:var(--bg);border-color:var(--ink)}
      .cat-hero{padding:40px 0 28px;border-bottom:1px solid var(--line)}
      .back-link{font-size:.85rem;font-weight:600;color:var(--ink-soft);margin-bottom:18px;display:inline-flex;gap:6px}
      .cat-head-row{display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start}
      .cat-icon{width:52px;height:52px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:var(--tint);color:var(--teal)}
      .cat-count{font-family:'IBM Plex Mono';font-size:.72rem;font-weight:600;padding:4px 10px;border-radius:3px;background:var(--tint);color:var(--teal);border:1px solid #0F6B5C33;margin-left:auto;align-self:center}
      .search-row{padding:20px 0} .search-box{display:flex;gap:10px;background:var(--card);border:1px solid var(--line);border-radius:8px;padding:12px 16px;max-width:420px}
      .search-box input{border:none;background:none;outline:none;font-size:.92rem;width:100%;font-family:'Inter'}
      .section{padding:8px 0 64px} .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px} @media(max-width:1180px){.grid{grid-template-columns:repeat(3,1fr)}} @media(max-width:860px){.grid{grid-template-columns:repeat(2,1fr)}} @media(max-width:520px){.grid{grid-template-columns:1fr}}
      .tool-card{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:18px;display:flex;flex-direction:column;gap:10px;transition:.15s} .tool-card:hover{border-color:var(--ink-soft);transform:translateY(-2px)}
      .ic{width:36px;height:36px;border-radius:7px;display:flex;align-items:center;justify-content:center;background:var(--tint)}
      footer{border-top:1px solid var(--line);padding:32px 0}
    `}</style>

    <header>
      <div className="wrap header-inner">
        <Link href="/" className="logo"><span className="logo-mark">P</span>Promptoolhub</Link>
        <div className="nav-links hidden md:flex"><Link href="/prompts">Prompts</Link><Link href="/ai-tools">Tools</Link><Link href="/business">Business</Link><Link href="/finance">Finance</Link><Link href="/image-tools">Image Tools</Link><Link href="/text-tools">Text Tools</Link><Link href="/utility">Utility Tools</Link><Link href="/dev-tools">Developer Tools</Link><Link href="/pdf-tools">PDF Tools</Link></div>
        <Link href="/prompts" className="hidden md:flex text-sm font-semibold">🔍 Search</Link>
      </div>
    </header>

    <div className="switcher">
      <div className="switcher-inner wrap">
        {CATS.map(c=>(
          <Link key={c.key} href={c.href} className={`switch-pill ${c.key==='ai'?'active':''}`}>{c.label}</Link>
        ))}
      </div>
    </div>

    <section className="cat-hero">
      <div className="wrap">
        <Link href="/" className="back-link">← Back to all tools</Link>
        <div className="cat-head-row">
          <div className="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26"><path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"/></svg></div>
          <div><h1 style={{fontFamily:'Space Grotesk',fontSize:'clamp(1.6rem,3.4vw,2.2rem)',fontWeight:700}}>AI Tools</h1><p style={{color:'#52585A'}}>AI-powered generators for resumes, code, images and video. 100% in-browser.</p></div>
          <span className="cat-count mono">6 TOOLS</span>
        </div>
      </div>
    </section>

    <div className="wrap search-row">
      <div className="search-box"><span>🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search tools in this category..." /></div>
    </div>

    <section className="section wrap">
      <div className="grid">
        {filtered.map(t=>(
          <Link key={t.slug} href={`/ai-tools/${t.slug}`} className="tool-card">
            <div className="ic"><span>✨</span></div>
            <h3 style={{fontFamily:'Space Grotesk',fontWeight:600}}>{t.name}</h3>
            <p style={{fontSize:'.84rem',color:'#52585A',flex:1}}>{t.desc}</p>
            <span style={{fontSize:'.8rem',fontWeight:600,color:'#0F6B5C'}}>Open tool →</span>
          </Link>
        ))}
      </div>
      {filtered.length===0 && <div style={{padding:48,textAlign:'center',color:'#52585A'}}>No tools match your search.</div>}
    </section>

    <footer><div className="wrap" style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:16}}><div className="logo"><span className="logo-mark">P</span>Promptoolhub</div><div className="mono" style={{fontSize:'.75rem',color:'#52585A'}}>© 2026 Promptoolhub · AI Tools</div></div></footer>
    </>
  )
}