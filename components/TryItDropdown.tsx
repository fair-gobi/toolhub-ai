"use client"
import { useState } from "react"

const TOOLS = {
  "Writing & Chat": [
    { name: "ChatGPT", url: (t:string) => `https://chat.openai.com/?q=${encodeURIComponent(t)}` },
    { name: "Claude", url: (t:string) => `https://claude.ai/new?q=${encodeURIComponent(t)}` },
    { name: "Gemini", url: (t:string) => `https://gemini.google.com/app?q=${encodeURIComponent(t)}` },
    { name: "Perplexity", url: (t:string) => `https://www.perplexity.ai/search?q=${encodeURIComponent(t)}` },
  ],
  "Image": [
    { name: "Midjourney", url: () => `https://www.midjourney.com/imagine` },
    { name: "DALL·E / ChatGPT", url: (t:string) => `https://chat.openai.com/?q=${encodeURIComponent(t)}` },
    { name: "Leonardo AI", url: () => `https://app.leonardo.ai/` },
    { name: "Adobe Firefly", url: () => `https://firefly.adobe.com/` },
  ],
  "Video": [
    { name: "Runway", url: () => `https://app.runwayml.com/` },
    { name: "Pika", url: () => `https://pika.art/` },
    { name: "Luma Dream Machine", url: () => `https://lumalabs.ai/dream-machine` },
    { name: "Sora", url: () => `https://sora.com/` },
  ],
  "Coding": [
    { name: "Cursor", url: () => `https://cursor.sh/` },
    { name: "v0 by Vercel", url: (t:string) => `https://v0.dev/?q=${encodeURIComponent(t)}` },
    { name: "GitHub Copilot", url: () => `https://github.com/features/copilot` },
    { name: "ChatGPT Code", url: (t:string) => `https://chat.openai.com/?q=${encodeURIComponent(t)}` },
  ],
}

export function TryItDropdown({ prompt }: { prompt: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="px-5 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-zinc-800 flex items-center gap-2">
        Try it ▾
      </button>
      {open && (
        <div className="absolute z-20 mt-2 w- rounded-xl border bg-white shadow-xl overflow-hidden">
          {Object.entries(TOOLS).map(([group, tools]) => (
            <div key={group} className="border-b last:border-0">
              <div className="px-3 py-1.5 bg-zinc-50 text- font-semibold uppercase tracking-wider text-zinc-500">{group}</div>
              {tools.map(t => (
                <a key={t.name} href={t.url(prompt)} target="_blank" onClick={()=>setOpen(false)} className="flex justify-between px-4 py-2.5 text-sm hover:bg-zinc-100">
                  {t.name} <span className="text-zinc-400">↗</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}