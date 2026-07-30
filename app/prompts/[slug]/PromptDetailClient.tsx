"use client"
import { PromptActions } from "@/components/PromptActions"
import { promptData } from '../../../data/prompts-data'
import { useState } from 'react'
import Link from 'next/link'

export default function PromptDetailClient({ slug }: { slug: string }){
  const p:any = promptData.find((x:any)=> x.slug === slug)
  const [copied, setCopied] = useState(false)

  if(!p) return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-2xl font-bold">Prompt not found</h1>
      <p className="text-sm text-gray-500 mt-2">Slug: {slug}</p>
      <Link href="/prompts" className="mt-4 inline-block border px-4 py-2 rounded">← Back to Library</Link>
    </div>
  )

  const copy = ()=>{
    navigator.clipboard.writeText(p.content)
    setCopied(true)
    setTimeout(()=>setCopied(false), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link href="/prompts" className="text-sm text-gray-500 hover:underline">← Back to Library</Link>
      <h1 className="text-3xl font-bold mt-4">{p.title}</h1>
      <p className="text-sm text-gray-500 mt-1">{p.category} • {p.slug}</p>
      <div className="mt-6 p-5 bg-gray-50 dark:bg-gray-900 rounded-xl border">
        <p className="whitespace-pre-wrap leading-relaxed">{p.content}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={copy} className="px-5 py-2.5 bg-black text-white rounded-full font-medium">
          {copied? "✅ Copied!" : "📋 Copy Prompt"}
        </button>
      </div>
      <PromptActions prompt={p.content} />
      <div className="mt-10 p-4 bg-blue-50 rounded-xl text-sm">
        <b>Pro Tip:</b> Click "Try in" to open this prompt directly in ChatGPT, Claude, or Gemini. For prompt library visit <Link href="/prompts" className="font-semibold">promptoolhub.com/prompts</Link>
      </div>
    </div>
  )
}