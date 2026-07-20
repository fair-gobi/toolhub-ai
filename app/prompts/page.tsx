'use client'
import { promptData, categoryData } from '../../data/prompts-data'
import { useState } from 'react'
import Link from 'next/link'

const icons: any = {
  "marketing": "📈",
  "business": "💼",
  "coding": "💻",
  "writing": "✍️",
  "seo": "🔍",
  "social-media": "📱",
  "productivity": "⚡",
  "design": "🎨",
  "education": "📚",
  "sales": "💰",
  "image-prompt": "🖼️",
  "video-prompt": "🎬",
}

export default function PromptsPage(){
  const [cat, setCat] = useState('all')
  const [search, setSearch] = useState('')
  const [copiedId, setCopiedId] = useState<number|null>(null)
  const [page, setPage] = useState(1)
  const perPage = 30

  const filtered = promptData.filter((p:any)=>{
    const matchCat = cat==='all' || p.category.toLowerCase().replace(' ','-')===cat || p.slug.includes(cat)
    const matchSearch =!search || p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase()) || p.tags.join(' ').toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const paged = filtered.slice((page-1)*perPage, page*perPage)

  const copy = (p:any)=>{
    navigator.clipboard.writeText(p.content)
    setCopiedId(p.id)
    setTimeout(()=>setCopiedId(null), 1500)
  }

  return(
    <main className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">1500+ AI Prompts</h1>
          <p className="text-gray-500 mt-1">{filtered.length} prompts • {categoryData.length} categories</p>
        </div>
        <div className="relative w-full md:w-96">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input value={search} onChange={e=>{setSearch(e.target.value); setPage(1)}} placeholder="Search prompts, e.g. Midjourney, cold email..." className="w-full pl-10 pr-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-black outline-none" />
        </div>
      </div>

      {/* CATEGORY FILTER WITH ICONS */}
      <div className="flex gap-2 mt-6 flex-wrap">
        <button onClick={()=>{setCat('all'); setPage(1)}} className={`border px-4 py-2 rounded-full text-sm flex items-center gap-1 ${cat==='all'?'bg-black text-white':'bg-white hover:bg-black hover:text-white'}`}>
          🌟 All ({promptData.length})
        </button>
        {categoryData.map((c:any)=>{
          const count = promptData.filter((p:any)=>p.category===c.name).length
          const isImageVideo = c.slug==='image-prompt' || c.slug==='video-prompt'
          return(
            <button key={c.id} onClick={()=>{setCat(c.slug); setPage(1)}} className={`border px-4 py-2 rounded-full text-sm flex items-center gap-1.5 ${cat===c.slug?'bg-black text-white':'bg-white hover:bg-black hover:text-white'} ${isImageVideo?'ring-2 ring-blue-200':''}`}>
              <span>{icons[c.slug] || '📌'}</span> {c.name} <span className="opacity-60">({count})</span>
            </button>
          )
        })}
      </div>

      {/* SPECIAL IMAGE/VIDEO BAR */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button onClick={()=>{setCat('image-prompt'); setPage(1)}} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-2xl text-left hover:scale-[1.02] transition">
          <div className="text-2xl">🖼️</div>
          <div className="font-bold mt-1">250 Image Prompts</div>
          <div className="text-xs opacity-80">Midjourney, DALL-E, Logo, Product</div>
        </button>
        <button onClick={()=>{setCat('video-prompt'); setPage(1)}} className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-2xl text-left hover:scale-[1.02] transition">
          <div className="text-2xl">🎬</div>
          <div className="font-bold mt-1">250 Video Prompts</div>
          <div className="text-xs opacity-80">Runway, Luma, Sora, Pika</div>
        </button>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {paged.map((p:any)=>(
          <div key={p.id} className="border rounded-2xl p-4 bg-white hover:shadow-xl transition group">
            <div className="flex justify-between items-start">
              <span className="text- bg-gray-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                {icons[p.category.toLowerCase().replace(' ','-')] || '📌'} {p.category}
              </span>
              <button onClick={()=>copy(p)} className={`text-xs px-3 py-1.5 rounded-full border transition ${copiedId===p.id?'bg-green-600 text-white border-green-600':'bg-black text-white hover:bg-gray-800'}`}>
                {copiedId===p.id?'✓ Copied':'Copy'}
              </button>
            </div>
            <Link href={`/prompts/${p.slug}`}>
              <h3 className="font-bold mt-3 text- group-hover:text-blue-600 line-clamp-2">{p.title}</h3>
              <p className="text-xs text-gray-500 mt-2 line-clamp-3">{p.content.slice(0,160)}...</p>
            </Link>
            <div className="flex gap-1 mt-3 flex-wrap">
              {p.tags.slice(0,3).map((t:string)=>(<span key={t} className="text- bg-gray-50 border px-2 py-0.5 rounded-full">#{t}</span>))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length===0 && <div className="text-center py-20 text-gray-500">No prompts found for "{search}"</div>}

      <div className="flex gap-2 mt-10 justify-center items-center">
        <button disabled={page===1} onClick={()=>setPage(p=>p-1)} className="border px-5 py-2.5 rounded-xl bg-white disabled:opacity-50">Prev</button>
        <span className="text-sm px-3">Page {page} / {Math.ceil(filtered.length/perPage)} • {filtered.length} results</span>
        <button disabled={page>=Math.ceil(filtered.length/perPage)} onClick={()=>setPage(p=>p+1)} className="border px-5 py-2.5 rounded-xl bg-white disabled:opacity-50">Next</button>
      </div>
    </main>
  )
}