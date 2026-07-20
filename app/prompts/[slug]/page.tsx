'use client'
import { promptData } from '../../../data/prompts-data'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function PromptDetail(){
  const params = useParams()
  const slug = decodeURIComponent(params.slug as string)
  const p:any = promptData.find((x:any)=> x.slug === slug)

  const [copied, setCopied] = useState(false)

  if(!p) return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-2xl font-bold">Prompt not found</h1>
      <p className="text-sm text-gray-500 mt-2">Slug: {slug}</p>
      <Link href="/prompts" className="mt-4 inline-block border px-4 py-2 rounded">← Back to Library</Link>
      <div className="mt-6 text-xs">Available example: {promptData[0]?.slug}</div>
    </div>
  )

  const copy = ()=>{
    navigator.clipboard.writeText(p.content)
    setCopied(true)
    setTimeout(()=>setCopied(false), 2000)
  }

  return(
    <main className="max-w-3xl mx-auto p-6">
      <Link href="/prompts" className="text-sm text-gray-500 hover:text-black">← Back</Link>
      <div className="mt-4 flex gap-2">
        <span className="text-xs bg-black text-white px-3 py-1 rounded-full">{p.category}</span>
        {p.tags?.map((t:string)=>(<span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{t}</span>))}
      </div>
      <h1 className="text-3xl font-bold mt-4">{p.title}</h1>

      <div className="mt-6 border p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 whitespace-pre-wrap leading-relaxed">
        {p.content}
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={copy} className="bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800">
          {copied? "✓ Copied!" : "Copy Prompt"}
        </button>
        <Link href="/prompts" className="border px-6 py-3 rounded-xl">Back to Library</Link>
      </div>

      <div className="mt-10 border-t pt-6">
        <h3 className="font-bold">Related prompts</h3>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {promptData.filter((x:any)=>x.category===p.category && x.id!==p.id).slice(0,4).map((r:any)=>(
            <Link key={r.id} href={`/prompts/${r.slug}`} className="border p-3 rounded-xl text-sm hover:shadow">
              {r.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}