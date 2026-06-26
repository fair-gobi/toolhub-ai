'use client'
import { useState } from 'react'
export default function Rewriter(){
  const [text, setText] = useState('This is very good')
  const rewrites = [
    text.replace('very good','excellent'),
    text.replace('very good','outstanding'),
    text.replace('very good','impressive'),
  ]
  return (<main className="container mx-auto p-6 max-w-3xl">
    <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl p-6 mb-6"><h1 className="text-3xl font-bold">✂️ Sentence Rewriter</h1></div>
    <input value={text} onChange={e=>setText(e.target.value)} className="w-full border rounded-lg p-3 mb-4" />
    <div className="space-y-2">{rewrites.map((r,i)=><div key={i} className="p-3 bg-orange-50 border rounded">{r}</div>)}</div>
  </main>)
}
