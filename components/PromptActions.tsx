"use client"
import { useState, useEffect, useRef } from "react"

export function PromptActions({ prompt }: { prompt: string }) {
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showTry, setShowTry] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const encoded = encodeURIComponent(prompt)

  const tryLinks = [
    { name: "ChatGPT", url: `https://chatgpt.com/?q=${encoded}`, icon: "💬", cat: "Chat" },
    { name: "Claude", url: `https://claude.ai/new`, icon: "🤖", cat: "Chat" },
    { name: "Gemini", url: `https://gemini.google.com/app`, icon: "✨", cat: "Chat" },
    { name: "Perplexity", url: `https://www.perplexity.ai/search/new?q=${encoded}`, icon: "🔍", cat: "Chat" },
    { name: "Meta AI", url: `https://www.meta.ai/`, icon: "💙", cat: "Chat" },
    { name: "Grok", url: `https://x.com/i/grok?q=${encoded}`, icon: "⚡", cat: "Chat" },
    { name: "Midjourney", url: `https://www.midjourney.com/imagine`, icon: "🎨", cat: "Image" },
    { name: "Leonardo AI", url: `https://app.leonardo.ai/`, icon: "🖼", cat: "Image" },
    { name: "Ideogram", url: `https://ideogram.ai/`, icon: "🌈", cat: "Image" },
    { name: "Firefly", url: `https://firefly.adobe.com/`, icon: "🔥", cat: "Image" },
    { name: "DALL·E 3", url: `https://chatgpt.com/?q=${encoded}`, icon: "🖌", cat: "Image" },
    { name: "Flux", url: `https://flux-ai.io/`, icon: "⚙", cat: "Image" },
    { name: "RunwayML", url: `https://app.runwayml.com/`, icon: "🎬", cat: "Video" },
    { name: "Pika", url: `https://pika.art/`, icon: "📹", cat: "Video" },
    { name: "Luma Dream", url: `https://lumalabs.ai/dream-machine`, icon: "🌙", cat: "Video" },
    { name: "Sora", url: `https://sora.com/`, icon: "🎥", cat: "Video" },
    { name: "Kling AI", url: `https://kling.kuaishou.com/`, icon: "🎞", cat: "Video" },
    { name: "Hailuo", url: `https://hailuoai.video/`, icon: "🎞", cat: "Video" },
    { name: "Cursor", url: `https://cursor.sh/`, icon: "💻", cat: "Code" },
    { name: "v0.dev", url: `https://v0.dev/?q=${encoded}`, icon: "▲", cat: "Code" },
    { name: "Bolt.new", url: `https://bolt.new/?q=${encoded}`, icon: "⚡", cat: "Code" },
  ]

  useEffect(()=>{
    const h = (e:MouseEvent)=>{ if(ref.current &&!ref.current.contains(e.target as Node)) setShowTry(false) }
    document.addEventListener('mousedown', h)
    return ()=> document.removeEventListener('mousedown', h)
  },[])

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(()=>setCopied(false),2000)
  }

  const savePrompt = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]")
    if (!favs.includes(prompt)) {
      favs.push(prompt)
      localStorage.setItem("favorites", JSON.stringify(favs))
    }
    setSaved(true)
    setTimeout(()=>setSaved(false),2000)
  }

  const shareAsImage = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!
    canvas.width = 1080
    canvas.height = 1350
    ctx.fillStyle = "#0a0a0a"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "#fff"
    ctx.font = "bold 42px sans-serif"
    ctx.fillText("PromptoolHub.com", 50, 90)
    ctx.fillStyle = "#a1a1aa"
    ctx.font = "24px sans-serif"
    ctx.fillText("8240 prompts • Copy → Try → Ship", 50, 130)
    ctx.fillStyle = "#fafafa"
    ctx.font = "26px sans-serif"
    const words = prompt.split(" ")
    let line="", y=200
    for(let w of words){
      if((line+w).length>48){ ctx.fillText(line,50,y); y+=38; line=w+" "; if(y>1200) break }
      else line+=w+" "
    }
    if(line) ctx.fillText(line,50,y)
    const a=document.createElement("a")
    a.download="promptoolhub-prompt.png"
    a.href=canvas.toDataURL()
    a.click()
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={copyPrompt} className="h-10 px-5 rounded-full bg-black text-white text-sm font-bold hover:bg-zinc-800 transition">
        {copied? "✓ Copied" : "⎙ Copy Prompt"}
      </button>

      <button onClick={savePrompt} className="h-10 px-5 rounded-full bg-zinc-100 border border-zinc-200 text-sm font-bold hover:border-black transition">
        {saved? "✓ Saved" : "🔥 Save"}
      </button>

      <button onClick={shareAsImage} className="h-10 px-5 rounded-full bg-white border border-zinc-200 text-sm font-medium hover:border-black transition">
        📤 Share
      </button>

      <div className="relative" ref={ref}>
        <button onClick={()=>setShowTry(!showTry)} className="h-10 px-5 rounded-full bg-violet-600 text-white text-sm font-bold hover:bg-violet-700 transition">
          🤖 Try in {showTry? "▲" : "▼"}
        </button>
        {showTry && (
          <div className="absolute left-0 top-12 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl p-2 z-50 w- border border-zinc-200 max-h- overflow-y-auto">
            {["Chat","Image","Video","Code"].map(cat=>(
              <div key={cat} className="mb-2 last:mb-0">
                <p className="text- font-bold tracking-widest text-zinc-400 px-2.5 py-1.5">{cat.toUpperCase()}</p>
                {tryLinks.filter(t=>t.cat===cat).map(t=>(
                  <a key={t.name} href={t.url} target="_blank" className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-zinc-50 rounded-xl text- font-medium">
                    <span>{t.icon}</span> {t.name}
                  </a>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}