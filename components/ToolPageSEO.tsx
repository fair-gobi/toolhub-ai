"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

export function ToolPageSEO({ name, cat, path, slug }: any) {
  const effectiveSlug = slug || path.split('/').filter(Boolean).pop() || ''
  const [a, setA] = useState<any>(null)

  useEffect(()=>{
    fetch(`/api/tool-articles/${effectiveSlug}?t=${Date.now()}`, { cache: 'no-store' })
     .then(r=>r.json())
     .then(d=>{ console.log("ARTICLE FETCHED:", d); if(d && d.slug) setA(d) })
     .catch(()=>{})
  },[effectiveSlug])

  const displayName = a?.tool_name || name || effectiveSlug
  const displayCat = cat || a?.category || 'Utility'

  if(!a){
    return <div className="max-w-4xl mx-auto mt-12 p-6">Loading SEO... Check console F12 → should log ARTICLE FETCHED</div>
  }

  return (
    <section className="max-w-4xl mx-auto mt-12 px-6 py-10 bg-white border rounded-2xl">
      <h2 className="text-2xl font-bold">What is {displayName}?</h2>
      <p className="mt-3 leading-7">{a.intro}</p>

      <h2 className="text-xl font-bold mt-8">How to Use {displayName}?</h2>
      <ol className="list-decimal pl-6 mt-3 space-y-2">
        {a.steps?.map((s:string,i:number)=><li key={i}>{s}</li>)}
      </ol>

      <h2 className="text-xl font-bold mt-8">How {displayName} Works?</h2>
      <p className="mt-3 leading-7">{a.logic}</p>

      <h2 className="text-xl font-bold mt-8">Key Features</h2>
      <ul className="list-disc pl-6 mt-3 space-y-2">
        {a.features?.map((f:string,i:number)=><li key={i}>{f}</li>)}
      </ul>

      <div className="mt-10">
        <Link href="/ai-tools" className="text-violet-600">← Back to AI Tools</Link>
      </div>
    </section>
  )
}