"use client"
import { useState } from "react"

export function PromptActions({ prompt }: { prompt: string }) {
  const [saved, setSaved] = useState(false)
  const [showTry, setShowTry] = useState(false)
  const [copied, setCopied] = useState(false)
  const encoded = encodeURIComponent(prompt)

  const tryLinks = [
    // Chat
    { name: "ChatGPT", url: `https://chatgpt.com/?q=${encoded}`, icon: "💬", cat: "Chat" },
    { name: "Claude", url: `https://claude.ai/new`, icon: "🤖", cat: "Chat" },
    { name: "Gemini", url: `https://gemini.google.com/app`, icon: "✨", cat: "Chat" },
    { name: "Perplexity", url: `https://www.perplexity.ai/search/new?q=${encoded}`, icon: "🔍", cat: "Chat" },
    { name: "Meta AI", url: `https://www.meta.ai/`, icon: "💙", cat: "Chat" },
    { name: "Grok", url: `https://x.com/i/grok?q=${encoded}`, icon: "⚡", cat: "Chat" },
    // Image
    { name: "Midjourney", url: `https://www.midjourney.com/imagine`, icon: "🎨", cat: "Image" },
    { name: "Leonardo AI", url: `https://app.leonardo.ai/`, icon: "🖼", cat: "Image" },
    { name: "Ideogram", url: `https://ideogram.ai/`, icon: "🌈", cat: "Image" },
    { name: "Firefly", url: `https://firefly.adobe.com/`, icon: "🔥", cat: "Image" },
    { name: "DALL·E 3", url: `https://chatgpt.com/?q=${encoded}`, icon: "🖌", cat: "Image" },
    { name: "Flux AI", url: `https://flux-ai.io/`, icon: "⚙", cat: "Image" },
    // Video
    { name: "RunwayML", url: `https://app.runwayml.com/`, icon: "🎬", cat: "Video" },
    { name: "Pika", url: `https://pika.art/`, icon: "📹", cat: "Video" },
    { name: "Luma Dream", url: `https://lumalabs.ai/dream-machine`, icon: "🌙", cat: "Video" },
    { name: "Sora", url: `https://sora.com/`, icon: "🎥", cat: "Video" },
    { name: "Kling AI", url: `https://kling.kuaishou.com/`, icon: "🎞", cat: "Video" },
    { name: "Hailuo AI", url: `https://hailuoai.video/`, icon: "🎞", cat: "Video" },
    // Code
    { name: "Cursor", url: `https://cursor.sh/`, icon: "💻", cat: "Code" },
    { name: "v0.dev", url: `https://v0.dev/?q=${encoded}`, icon: "▲", cat: "Code" },
    { name: "Bolt.new", url: `https://bolt.new/?q=${encoded}`, icon: "⚡", cat: "Code" },
  ]

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const savePrompt = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]")
    if (!favs.includes(prompt)) {
      favs.push(prompt)
      localStorage.setItem("favorites", JSON.stringify(favs))
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const shareAsImage = async () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!
    canvas.width = 1080
    canvas.height = 1350
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#38bdf8"
    ctx.font = "bold 40px sans-serif"
    ctx.fillText("PromptoolHub.com", 50, 80)
    ctx.fillStyle = "#ffffff"
    ctx.font = "28px sans-serif"
    const lines: string[] = []
    let current = ""
    prompt.split(" ").forEach(word => {
      if ((current + word).length > 45) {
        lines.push(current)
        current = word + " "
      } else {
        current += word + " "
      }
    })
    lines.push(current)
    lines.slice(0, 18).forEach((line, i) => {
      ctx.fillText(line, 50, 150 + i * 42)
    })
    const link = document.createElement("a")
    link.download = "promptoolhub-prompt.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="flex flex-wrap gap-2 mt-5">
      <button onClick={copyPrompt} className="px-5 py-2.5 bg-black text-white rounded-full font-bold hover:bg-zinc-800 transition">
        {copied ? "✅ Copied" : "📋 Copy"}
      </button>

      <button onClick={savePrompt} className="px-5 py-2.5 bg-yellow-400 rounded-full font-bold text-black hover:bg-yellow-500 transition">
        {saved ? "✅ Saved" : "🔥 Save"}
      </button>

      <button onClick={shareAsImage} className="px-5 py-2.5 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition">
        📤 Share as Image
      </button>

      <div className="relative">
        <button onClick={() => setShowTry(!showTry)} className="px-5 py-2.5 bg-violet-600 text-white rounded-full font-bold hover:bg-violet-700 transition">
          🤖 Try in {showTry ? "▲" : "▼"}
        </button>
        {showTry && (
          <div className="absolute left-0 top-12 bg-white shadow-2xl rounded-xl p-2 z-50 w-64 border max-h-80 overflow-y-auto">
            <p className="text-xs font-bold text-gray-400 px-2 py-1">CHAT</p>
            {tryLinks.filter(t => t.cat === "Chat").map(t => (
              <a key={t.name} href={t.url} target="_blank" className="flex gap-2 p-2.5 hover:bg-gray-100 rounded-lg text-sm text-black">
                <span>{t.icon}</span> {t.name}
              </a>
            ))}
            <p className="text-xs font-bold text-gray-400 px-2 py-1 mt-2">IMAGE</p>
            {tryLinks.filter(t => t.cat === "Image").map(t => (
              <a key={t.name} href={t.url} target="_blank" className="flex gap-2 p-2.5 hover:bg-gray-100 rounded-lg text-sm text-black">
                <span>{t.icon}</span> {t.name}
              </a>
            ))}
            <p className="text-xs font-bold text-gray-400 px-2 py-1 mt-2">VIDEO</p>
            {tryLinks.filter(t => t.cat === "Video").map(t => (
              <a key={t.name} href={t.url} target="_blank" className="flex gap-2 p-2.5 hover:bg-gray-100 rounded-lg text-sm text-black">
                <span>{t.icon}</span> {t.name}
              </a>
            ))}
            <p className="text-xs font-bold text-gray-400 px-2 py-1 mt-2">CODE</p>
            {tryLinks.filter(t => t.cat === "Code").map(t => (
              <a key={t.name} href={t.url} target="_blank" className="flex gap-2 p-2.5 hover:bg-gray-100 rounded-lg text-sm text-black">
                <span>{t.icon}</span> {t.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}