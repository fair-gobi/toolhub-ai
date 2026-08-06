"use client"
import Link from "next/link"
import { useState } from "react"

const categories = [
  { name:'Prompt Library', count:'8235+', desc:'Copy-paste prompts for ChatGPT, Claude & Gemini.', tab:'#E8990A', href:'/prompts',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="#E8990A" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> },
  { name:'AI Tools', count:'6', desc:'Generators and AI-powered utilities.', tab:'#0F6B5C', href:'/ai-tools',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="#0F6B5C" strokeWidth="1.8"><path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"/></svg> },
  { name:'PDF Tools', count:'15', desc:'Merge, split, compress and protect PDFs.', tab:'#6B4C7A', href:'/pdf-tools',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="#6B4C7A" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg> },
  { name:'Image Tools', count:'9', desc:'Compress, resize, convert and upscale.', tab:'#B0542B', href:'/image-tools',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="#B0542B" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg> },
  { name:'Developer Tools', count:'22', desc:'JSON, Base64, formatters and validators.', tab:'#2E5C8A', href:'/dev-tools',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="#2E5C8A" strokeWidth="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { name:'Text Tools', count:'15', desc:'Grammar checks, paraphrasing and summaries.', tab:'#E8990A', href:'/text-tools',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="#E8990A" strokeWidth="1.8"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg> },
  { name:'Business Tools', count:'17', desc:'Name generators, invoices and more.', tab:'#0F6B5C', href:'/business',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="#0F6B5C" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg> },
  { name:'Finance Tools', count:'16', desc:'SIP, crypto, loan and EMI calculators.', tab:'#6B4C7A', href:'/finance',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="#6B4C7A" strokeWidth="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
  { name:'Utility Tools', count:'15', desc:'Nepali tools and everyday helpers.', tab:'#B0542B', href:'/utility',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="#B0542B" strokeWidth="1.8"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94z"/></svg> },
]

export default function Home(){
  const [mobileOpen,setMobileOpen]=useState(false)
  const [text,setText]=useState("This runs entirely in your browser.")
  const toTitle=(s:string)=>s.replace(/\w\S*/g,t=>t.charAt(0).toUpperCase()+t.slice(1).toLowerCase())
  const words=text.trim()?text.trim().split(/\s+/).length:0
  const [searchQ,setSearchQ]=useState("")
  const [searchOpen,setSearchOpen]=useState(false)
 
  return(
    <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
      :root{--bg:#EEF0EC;--bg-alt:#E4E7E0;--ink:#14181A;--ink-soft:#52585A;--accent:#E8990A;--teal:#0F6B5C;--line:#D2D6CC;--card:#FCFDFB;}
      *{box-sizing:border-box} body{background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif}
      .display{font-family:'Space Grotesk',sans-serif} .mono{font-family:'IBM Plex Mono',monospace}
      .wrap{max-width:1180px;margin:0 auto;padding:0 24px} @media(max-width:600px){.wrap{padding:0 16px}}
      header{border-bottom:1px solid var(--line);background:var(--bg);position:sticky;top:0;z-index:50}
      .header-inner{display:flex;align-items:center;justify-content:space-between;height:68px}
      .logo{display:flex;align-items:center;gap:10px;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.15rem}
      .logo-mark{width:32px;height:32px;border-radius:8px;background:var(--ink);position:relative}
      .nav-links{display:flex;gap:22px;font-size:.9rem;font-weight:500;color:var(--ink-soft)} .nav-links a:hover{color:var(--ink)}
      .icon-btn{width:40px;height:40px;border-radius:6px;display:flex;align-items:center;justify-content:center;border:1px solid var(--line);background:var(--card);cursor:pointer}
      .hero{padding:72px 0 88px;border-bottom:1px solid var(--line)}
      .hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center}
      .eyebrow{display:inline-flex;gap:8px;font-family:'IBM Plex Mono';font-size:.72rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;background:#FCEAC0;border:1px solid #E8C776;padding:5px 10px;border-radius:3px;margin-bottom:22px}
      h1{font-family:'Space Grotesk';font-size:clamp(2.4rem,4.4vw,3.6rem);font-weight:700;letter-spacing:-.02em;line-height:1.05;margin-bottom:20px} .hi{color:var(--teal)}
      .hero-sub{font-size:1.08rem;color:var(--ink-soft);max-width:46ch;margin-bottom:28px}
      .trust-row{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:34px} .trust-chip{font-family:'IBM Plex Mono';font-size:.78rem;padding:6px 11px;border:1px solid var(--line);border-radius:3px;background:var(--card);color:var(--ink-soft)}
      .btn{font-weight:600;font-size:.95rem;padding:12px 22px;border-radius:5px;display:inline-flex;gap:8px;border:1px solid transparent;cursor:pointer} .btn-primary{background:var(--ink);color:var(--bg)} .btn-secondary{background:transparent;border-color:var(--line)}
      .demo-card{background:var(--card);border:1px solid var(--line);border-radius:8px;overflow:hidden}
      .demo-topbar{display:flex;justify-content:space-between;padding:10px 16px;border-bottom:1px solid var(--line);background:var(--bg-alt);font-family:'IBM Plex Mono';font-size:.72rem;color:var(--ink-soft)}
      .demo-body{padding:18px} .demo-body textarea{width:100%;min-height:78px;border:1px solid var(--line);border-radius:5px;padding:12px;background:var(--bg)} .demo-body textarea:focus{border-color:var(--teal);outline:none}
      .demo-outputs{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px} .demo-out{background:var(--bg);border:1px solid var(--line);border-radius:5px;padding:10px 12px}
      .demo-out label{font-family:'IBM Plex Mono';font-size:.66rem;text-transform:uppercase;color:var(--teal);font-weight:600;display:block;margin-bottom:5px}
      .section{padding:64px 0} .section-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:32px;flex-wrap:wrap;gap:20px}
      .section-head h2{font-family:'Space Grotesk';font-size:1.7rem;font-weight:700}
      .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px} @media(max-width:1024px){.grid{grid-template-columns:repeat(2,1fr)}} @media(max-width:600px){.grid{grid-template-columns:1fr} .hero-grid{grid-template-columns:1fr} .hero{padding:48px 0 56px}}
      .tool-card{background:var(--card);border:1px solid var(--line);border-radius:6px;overflow:hidden;transition:.15s} .tool-card:hover{border-color:var(--ink-soft);transform:translateY(-2px)}
      .tab{height:5px;width:100%} .tool-inner{padding:20px 20px 18px} .tool-top{display:flex;justify-content:space-between;margin-bottom:14px}
      .tool-icon{width:38px;height:38px;border-radius:6px;display:flex;align-items:center;justify-content:center;background:var(--bg-alt)} .count-tag{font-family:'IBM Plex Mono';font-size:.7rem;font-weight:600;color:var(--ink-soft);background:var(--bg-alt);border:1px solid var(--line);padding:3px 7px;border-radius:3px}
      footer{border-top:1px solid var(--line);padding:40px 0 32px;margin-top:20px}
    `}</style>

    <header>
  <div className="wrap header-inner">
    <Link href="/" className="logo"><span className="logo-mark"><svg viewBox="0 0 72 72"><rect width="72" height="72" rx="16" fill="#14181A"/><path d="M22 14 h16 a14 14 0 010 28 h-6 v16 h-10 z" fill="#EEF0EC"/><path d="M32 24 h6 a4 4 0 010 8 h-6 z" fill="#E8990A"/></svg></span>Promptoolhub</Link>

    <nav className="hidden md:flex items-center gap-7">
      <div className="nav-links"><Link href="/prompts">Prompts</Link><Link href="/ai-tools">Tools</Link><Link href="/business">Business</Link><Link href="/finance">Finance</Link></div>
    </nav>

    <div className="flex gap-2 items-center">
      <button onClick={()=>setSearchOpen(!searchOpen)} className="icon-btn" aria-label="Search">
        {searchOpen? '✕' : '🔍'}
      </button>
      <button onClick={()=>setMobileOpen(!mobileOpen)} className="icon-btn md:hidden" aria-label="Menu">
        {mobileOpen? '✕' : '☰'}
      </button>
    </div>
  </div>

  {/* Search bar */}
  {searchOpen && (
    <div className="border-t border-[#D2D6CC] bg-[#E4E7E0] p-3">
      <div className="wrap">
        <input
          autoFocus
          value={searchQ}
          onChange={e=>setSearchQ(e.target.value)}
          onKeyDown={e=>{
            if(e.key==='Enter' && searchQ.trim()){
              window.location.href=`/prompts?q=${encodeURIComponent(searchQ)}`
            }
          }}
          placeholder="Search 8235 prompts, tools..."
          className="w-full h-11 px-4 rounded- border border-[#D2D6CC] bg-white outline-none focus:border-[#0F6B5C]"
        />
      </div>
    </div>
  )}

  {/* Mobile menu */}
  {mobileOpen && (
    <div className="md:hidden border-t border-[#D2D6CC] bg-[#EEF0EC] p-4 flex flex-col gap-1">
      <Link href="/prompts" onClick={()=>setMobileOpen(false)} className="py-3 px-2 font-semibold border-b border-[#D2D6CC]">Prompts</Link>
      <Link href="/ai-tools" onClick={()=>setMobileOpen(false)} className="py-3 px-2 font-semibold border-b border-[#D2D6CC]">Tools</Link>
      <Link href="/business" onClick={()=>setMobileOpen(false)} className="py-3 px-2 font-semibold border-b border-[#D2D6CC]">Business</Link>
      <Link href="/finance" onClick={()=>setMobileOpen(false)} className="py-3 px-2 font-semibold">Finance</Link>
    </div>
  )}
</header>

    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">Live in your browser right now</span>
          <h1 className="display">Tools that <span className="hi">just work.</span><br/>No account required.</h1>
          <p className="hero-sub">8235+ prompts and 130+ free utilities for writing, coding, finance and design — everything runs client-side, so nothing you type ever leaves your browser.</p>
          <div className="trust-row"><span className="trust-chip mono">$ no-signup</span><span className="trust-chip mono">$ no-uploads</span><span className="trust-chip mono">$ 100%-private</span><span className="trust-chip mono">$ 8235+-prompts</span></div>
          <div className="flex gap-3 flex-wrap"><Link href="/ai-tools" className="btn btn-primary display">Browse all tools →</Link><Link href="/prompts" className="btn btn-secondary display">Explore 8235 prompts</Link></div>
        </div>
        <div className="demo-card">
          <div className="demo-topbar"><span>text-tools / case-converter.live</span><span>●●●</span></div>
          <div className="demo-body">
            <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Type or paste anything…"></textarea>
            <div className="demo-outputs">
              <div className="demo-out"><label>Uppercase</label><div style={{fontSize:'.85rem',wordBreak:'break-word',color:'#52585A'}}>{text.toUpperCase()}</div></div>
              <div className="demo-out"><label>Title Case</label><div style={{fontSize:'.85rem',wordBreak:'break-word',color:'#52585A'}}>{toTitle(text)}</div></div>
            </div>
            <div className="mono" style={{display:'flex',gap:16,marginTop:14,fontSize:'.78rem',color:'#52585A'}}><span><b style={{color:'#14181A'}}>{words}</b> words</span><span><b style={{color:'#14181A'}}>{text.length}</b> chars</span><span><b style={{color:'#14181A'}}>{Math.max(1,Math.round(words/200*60))}</b>s read</span></div>
          </div>
          <div className="demo-topbar" style={{borderTop:'1px solid #D2D6CC',borderBottom:0}}>↑ This is a real tool, not a screenshot. Try typing.</div>
        </div>
      </div>
    </section>

    <section className="section wrap">
      <div className="section-head"><h2 className="display">Every tool, organized like a real workbench</h2><p className="text-[#52585A] text-[0.95rem]">9 categories · 130+ tools · updated regularly</p></div>
      <div className="grid">
        {categories.map(c=>(
          <Link key={c.name} href={c.href} className="tool-card">
            <div className="tab" style={{background:c.tab}}></div>
            <div className="tool-inner">
              <div className="tool-top"><div className="tool-icon">{c.icon}</div><span className="count-tag">{c.count} TOOLS</span></div>
              <h3 className="display" style={{fontSize:'1.12rem',fontWeight:600,marginBottom:6}}>{c.name}</h3>
              <p style={{fontSize:'.87rem',color:'#52585A',marginBottom:14}}>{c.desc}</p>
              <span className="tool-link" style={{fontSize:'.83rem',fontWeight:600,display:'inline-flex',alignItems:'center',gap:5}}>Open category →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <footer><div className="wrap" style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:16}}><div className="logo"><span className="logo-mark"><svg viewBox="0 0 72 72"><rect width="72" height="72" rx="16" fill="#14181A"/><path d="M22 14 h16 a14 14 0 010 28 h-6 v16 h-10 z" fill="#EEF0EC"/><path d="M32 24 h6 a4 4 0 010 8 h-6 z" fill="#E8990A"/></svg></span>Promptoolhub</div><div className="mono" style={{fontSize:'.75rem',color:'#52585A'}}>© 2026 Promptoolhub · Built in Nepal · 8235 prompts live</div></div></footer>
    </>
  )
}