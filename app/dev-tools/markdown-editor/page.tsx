'use client'
import { useState } from 'react'

export default function MarkdownEditor(){
  const [md,setMd]=useState('# Hello\n\n**Bold** and *italic*\n\n- List item')

  const toHtml = (text:string) => {
    return text
     .replace(/^# (.*$)/gm, '<h1>$1</h1>')
     .replace(/^## (.*$)/gm, '<h2>$1</h2>')
     .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
     .replace(/\*(.*?)\*/g, '<em>$1</em>')
     .replace(/^- (.*$)/gm, '<li>$1</li>')
     .replace(/\n/g, '<br/>')
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Markdown Editor</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium mb-1">Markdown</div>
          <textarea value={md} onChange={e=>setMd(e.target.value)} className="w-full h-96 border-2 rounded p-3 font-mono text-sm"/>
        </div>
        <div>
          <div className="text-sm font-medium mb-1">Preview</div>
          <div className="w-full h-96 border-2 rounded p-3 bg-white overflow-auto" dangerouslySetInnerHTML={{__html: toHtml(md)}}/>
        </div>
      </div>
    </main>
  )
}
