"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

type Cat = 'All'|'Image'|'Video'|'Writing'|'Code'|'Voice'|'Business'|'Productivity'
type Tool = { slug:string; name:string; desc:string; cat:Cat; external?:string; hot?:boolean; new?:boolean }

const ORIGINALS: Tool[] = [
  { slug:"resume-builder", name:"AI Resume Builder", desc:"Create ATS resume in 30 sec", cat:"Writing", hot:true },
  { slug:"cover-letter", name:"AI Cover Letter", desc:"Job-winning cover letters", cat:"Writing" },
  { slug:"code-generator", name:"AI Code Generator", desc:"Generate code in any language", cat:"Code", hot:true },
  { slug:"bug-finder", name:"AI Bug Finder", desc:"Find & fix bugs instantly", cat:"Code" },
  { slug:"image-generator", name:"AI Image Generator", desc:"Text to image — unlimited free", cat:"Image", hot:true },
  { slug:"video-generator", name:"AI Video Generator", desc:"Text to video — 100% free", cat:"Video" },
]

const FALLBACK_EXTERNAL: Tool[] = [
  { slug:"midjourney", name:"Midjourney", desc:"Best AI image generator", cat:"Image", external:"https://midjourney.com", hot:true },
  { slug:"runway", name:"Runway ML", desc:"Video generation & editing", cat:"Video", external:"https://runwayml.com", hot:true },
  { slug:"elevenlabs", name:"ElevenLabs", desc:"Realistic AI voice", cat:"Voice", external:"https://elevenlabs.io", hot:true },
]

const CATS: {key:Cat, label:string, icon:string}[] = [
  {key:'All', label:'All Tools', icon:'◍'},
  {key:'Image', label:'Image', icon:'🖼'},
  {key:'Video', label:'Video', icon:'🎬'},
  {key:'Writing', label:'Writing', icon:'✍️'},
  {key:'Code', label:'Code', icon:'💻'},
  {key:'Voice', label:'Voice', icon:'🎙'},
  {key:'Business', label:'Business', icon:'💼'},
  {key:'Productivity', label:'Productivity', icon:'⚡'},
]

export default function AIToolsPage(){
  const [active,setActive] = useState<Cat>('All')
  const [q,setQ] = useState("")
  const [externalTools,setExternalTools] = useState<Tool[]>(FALLBACK_EXTERNAL)
  const [showAdd,setShowAdd] = useState(false)
  const [form,setForm] = useState({name:"",desc:"",cat:"Image" as Cat,url:""})

  useEffect(()=>{
    fetch('/api/ai-tools').then(r=>r.json()).then((data:any[])=>{
      if(Array.isArray(data) && data.length>0){
        const ext = data.filter((t:any)=>!t.is_original).map((t:any)=>({
          slug:t.slug, name:t.name, desc:t.description, cat:t.category as Cat, external:t.external_url, hot:t.is_hot, new:t.is_new
        }))
        if(ext.length>0) setExternalTools(ext)
      }
    }).catch(()=>{})
  },[])

  const filterFn = (t:Tool)=> (active==='All' || t.cat===active) && (t.name+t.desc).toLowerCase().includes(q.toLowerCase())
  const originals = ORIGINALS.filter(filterFn)
  const externals = externalTools.filter(filterFn)

  const addTool = async ()=>{
    if(!form.name || !form.desc) return alert("Fill name & desc")
    const res = await fetch('/api/ai-tools',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:form.name,desc:form.desc,cat:form.cat,url:form.url})})
    const newTool = await res.json()
    const mapped:Tool = {slug:newTool.slug,name:newTool.name,desc:newTool.description,cat:newTool.category as Cat,external:newTool.external_url,new:true}
    setExternalTools([mapped, ...externalTools])
    setShowAdd(false)
    setForm({name:"",desc:"",cat:"Image",url:""})
  }

  return(
    <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
      :root{--bg:#EEF0EC;--ink:#14181A;--soft:#52585A;--line:#D2D6CC;--card:#FCFDFB;--teal:#0F6B5C;--tint:#E4EEEC}
      .wrap{max-width:1280px;margin:0 auto;padding:0 24px} *{box-sizing:border-box} body{background:var(--bg)}
      .mono{font-family:'IBM Plex Mono'} .display{font-family:'Space Grotesk'}
      header{border-bottom:1px solid var(--line);background:var(--bg);position:sticky;top:0;z-index:30}
      .layout{display:grid;grid-template-columns:240px 1fr;min-height:calc(100vh - 68px)} @media(max-width:900px){.layout{grid-template-columns:1fr}}
      .sidebar{border-right:1px solid var(--line);background:var(--card);position:sticky;top:68px;height:calc(100vh - 68px);padding:20px;overflow-y:auto} @media(max-width:900px){.sidebar{position:static;height:auto;border-right:none;border-bottom:1px solid var(--line);display:flex;gap:8px;overflow-x:auto;padding:12px 16px}}
      .cat-btn{width:100%;text-align:left;padding:10px 12px;border-radius:6px;border:1px solid transparent;font-size:.9rem;font-weight:500;color:var(--soft);cursor:pointer;display:flex;gap:8px;align-items:center;background:transparent} .cat-btn.active{background:var(--ink);color:var(--bg);border-color:var(--ink)} @media(max-width:900px){.cat-btn{white-space:nowrap;width:auto;border:1px solid var(--line);background:var(--bg)}}
      .main{padding:28px 24px} @media(max-width:600px){.main{padding:18px 16px}}
      .grid4{display:grid;grid-template-columns:repeat(3,1fr);gap:16px} @media(max-width:1100px){.grid4{grid-template-columns:repeat(2,1fr)}} @media(max-width:600px){.grid4{grid-template-columns:1fr}}
      .card{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:18px;display:flex;flex-direction:column;gap:10px;transition:.15s} .card:hover{transform:translateY(-2px);border-color:var(--soft)}
      .card.original{border:1.5px solid var(--ink)} .badge{font-size:.65rem;font-weight:700;padding:3px 7px;border-radius:4px} .badge-hot{background:#fee2e2;color:#dc2626} .badge-new{background:#dcfce7;color:#15803d}
      .modal{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:50;display:grid;place-items:center;padding:16px} .modal-card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:22px;width:min(480px,100%);display:flex;flex-direction:column;gap:12px}
      .input{height:44px;padding:0 12px;border:1px solid var(--line);border-radius:6px;background:var(--bg);outline:none;width:100%} .input:focus{border-color:var(--teal)}
    `}</style>

    <header><div className="wrap" style={{height:68,display:'flex',justifyContent:'space-between',alignItems:'center'}}><Link href="/" className="display" style={{fontWeight:700}}>P Promptoolhub</Link><button onClick={()=>setShowAdd(true)} className="display" style={{background:'var(--ink)',color:'var(--bg)',padding:'9px 16px',borderRadius:6,fontWeight:600,fontSize:'.9rem',border:'none',cursor:'pointer'}}>+ Add New Tool</button></div></header>

    <div className="layout">
      <aside className="sidebar">
        {CATS.map(c=>(
          <button key={c.key} onClick={()=>setActive(c.key)} className={`cat-btn ${active===c.key?'active':''}`}>
            <span>{c.icon}</span> {c.label} <span className="mono" style={{marginLeft:'auto',fontSize:'.7rem',opacity:.6}}>{c.key==='All'? ORIGINALS.length+externalTools.length : [...ORIGINALS,...externalTools].filter(t=>t.cat===c.key).length}</span>
          </button>
        ))}
        <div style={{marginTop:20}}><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." className="input" /></div>
      </aside>

      <main className="main">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:14}}><h2 className="display" style={{fontSize:'1.3rem',fontWeight:700}}>Your 6 Originals</h2><span className="mono" style={{fontSize:'.75rem',color:'var(--soft)'}}>BUILT IN-HOUSE</span></div>
        <div className="grid4" style={{marginBottom:36}}>
          {originals.map(t=>(
            <Link key={t.slug} href={`/ai-tools/${t.slug}`} className="card original">
              <div style={{display:'flex',justifyContent:'space-between'}}><div style={{width:36,height:36,borderRadius:8,background:'var(--ink)',color:'white',display:'grid',placeItems:'center',fontWeight:900}}>P</div>{t.hot && <span className="badge badge-hot">HOT</span>}</div>
              <h3 className="display" style={{fontWeight:600}}>{t.name}</h3>
              <p style={{fontSize:'.85rem',color:'var(--soft)',flex:1}}>{t.desc}</p>
              <span style={{fontSize:'.8rem',fontWeight:600}}>Open →</span>
            </Link>
          ))}
        </div>

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:14}}><h2 className="display" style={{fontSize:'1.3rem',fontWeight:700}}>External AI Directory</h2><span className="mono" style={{fontSize:'.75rem',color:'var(--soft)'}}>{externals.length} TOOLS</span></div>
        <div className="grid4">
          {externals.map(t=>(
            <a key={t.slug} href={t.external} target="_blank" className="card">
              <div style={{display:'flex',justifyContent:'space-between'}}><div style={{width:36,height:36,borderRadius:8,background:'var(--tint)',display:'grid',placeItems:'center'}}>✨</div><div style={{display:'flex',gap:6}}>{t.hot && <span className="badge badge-hot">HOT</span>}{t.new && <span className="badge badge-new">NEW</span>}</div></div>
              <h3 className="display" style={{fontWeight:600}}>{t.name}</h3>
              <p style={{fontSize:'.85rem',color:'var(--soft)',flex:1}}>{t.desc}</p>
              <div style={{display:'flex',justifyContent:'space-between'}}><span className="mono" style={{fontSize:'.7rem',background:'#EEF0EC',padding:'3px 8px',borderRadius:20}}>{t.cat}</span><span style={{fontSize:'.8rem',fontWeight:600,color:'var(--teal)'}}>Visit ↗</span></div>
            </a>
          ))}
        </div>
      </main>
    </div>

    {showAdd && (
      <div className="modal" onClick={()=>setShowAdd(false)}>
        <div className="modal-card" onClick={e=>e.stopPropagation()}>
          <h3 className="display" style={{fontWeight:700,fontSize:'1.2rem'}}>Add New Tool</h3>
          <input className="input" placeholder="Tool Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input className="input" placeholder="Description" value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} />
          <select className="input" value={form.cat} onChange={e=>setForm({...form,cat:e.target.value as Cat})}>
            <option>Image</option><option>Video</option><option>Writing</option><option>Code</option><option>Voice</option><option>Business</option><option>Productivity</option>
          </select>
          <input className="input" placeholder="External URL https://..." value={form.url} onChange={e=>setForm({...form,url:e.target.value})} />
          <div style={{display:'flex',gap:8,justifyContent:'flex-end',marginTop:8}}>
            <button onClick={()=>setShowAdd(false)} className="input" style={{width:'auto',cursor:'pointer'}}>Cancel</button>
            <button onClick={addTool} style={{background:'var(--ink)',color:'white',padding:'10px 18px',borderRadius:6,fontWeight:600,border:'none',cursor:'pointer'}}>Add Tool</button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}