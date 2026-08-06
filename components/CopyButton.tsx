"use client"
import { useState } from "react"
export function CopyButton({ text }: { text: string }) {
  const [ok, setOk] = useState(false)
  return (
    <button onClick={async()=>{ await navigator.clipboard.writeText(text); setOk(true); setTimeout(()=>setOk(false),1200) }}
      className="h-8 w-8 grid place-items-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-black hover:text-black text-xs">
      {ok? "✓" : "⎙"}
    </button>
  )
}