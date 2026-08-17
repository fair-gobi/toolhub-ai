"use client"
import Link from 'next/link'

export function PromptCard({ prompt }: { prompt: any }) {
  return (
    <Link href={`/prompts/${prompt.slug}`} className="group border rounded-xl p-4 hover:shadow-md transition-all bg-white block">
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-violet-600">{prompt.title}</h3>
        <span className="text- px-2 py-1 rounded-full bg-zinc-100 whitespace-nowrap">{prompt.category}</span>
      </div>
      <p className="text-xs text-zinc-500 line-clamp-3 mt-2">
        {(prompt.prompt_content || '').slice(0, 150)}...
      </p>
    </Link>
  )
}
export default PromptCard