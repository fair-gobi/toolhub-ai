"use client"
import { useState } from "react"

export function PromptActions({ prompt }: { prompt: string }) {
  const [saved, setSaved] = useState(false)
  const [showTry, setShowTry] = useState(false)
  const encoded = encodeURIComponent(prompt)

  const tryLinks = [
    { name: "ChatGPT", url: `https://chatgpt.com/?q=${encoded}`, icon: "💬" },
    { name: "Claude", url: `https://claude.ai/new`, icon: "🤖" },
    { name: "Gemini", url: `https://gemini.google.com/app`, icon: "✨" },
    { name: "Perplexity", url: `https://www.perplexity.ai/search/new?q=${encoded}`, icon: "🔍" },
    { name: "Leonardo AI", url: `https://app.leonardo.ai/`, icon: "🖼️" },
    { name: "RunwayML", url: `https://app.runwayml.com/`, icon: "🎬" },
  ]

  const savePrompt = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]")
    if (!favs.includes(prompt)) {
      favs.push(prompt)
      localStorage.setItem("favorites", JSON.stringify(favs))
    }
    setSaved(true)
    setTimeout(()=>setSaved(false), 2000)
  }

  const shareAsImage = async () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!
    canvas.width = 1080
    canvas.height = 1350
    // background
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // brand
    ctx.fillStyle = "#38bdf8"
    ctx.font = "bold 40px sans-serif"
    ctx.fillText("PromptoolHub.com", 50, 80)
    // text
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
      <button onClick={savePrompt} className="px-4 py-2 bg-yellow-400 rounded-full font-bold text-black">
        {saved ? "✅ Saved" : "🔥 Save"}
      </button>

      <button onClick={shareAsImage} className="px-4 py-2 bg-pink-500 text-white rounded-full font-medium">
        📤 Share as Image
      </button>

      <div className="relative">
        <button onClick={()=>setShowTry(!showTry)} className="px-4 py-2 bg-black text-white rounded-full">
          🤖 Try in ▼
        </button>
        {showTry && (
          <div className="absolute left-0 top-12 bg-white shadow-2xl rounded-xl p-2 z-50 w-56 border">
            {tryLinks.map((t) => (
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