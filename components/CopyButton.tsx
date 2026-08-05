"use client"
import { useState } from "react"

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(()=>setCopied(false), 1500)
  }
  return (
    <button
      onClick={copy}
      className="h-8 w-8 grid place-items-center rounded-full border bg-white text- font-bold transition border-zinc-200 hover:border-black hover:text-black text-zinc-500"
      title={copied? "Copied!" : "Copy"}
    >
      {copied? "✓" : "⎙"}
    </button>
  )
}