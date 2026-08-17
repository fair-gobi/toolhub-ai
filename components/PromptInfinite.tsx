"use client"
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { CopyButton } from './CopyButton'
import PromptCardWithPreview from './CategoryPreview'
export function PromptInfinite({ initialPrompts, initialCat, initialQ }: { initialPrompts: any[], initialCat: string, initialQ: string }) {
  const [prompts, setPrompts] = useState(initialPrompts)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialPrompts.length === 18)
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setPrompts(initialPrompts)
    setPage(1)
    setHasMore(initialPrompts.length === 18)
  }, [initialCat, initialQ, initialPrompts])

  useEffect(() => {
    const obs = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting && hasMore &&!loading) {
        setLoading(true)
        const next = page + 1
        const res = await fetch(`/api/prompts?cat=${initialCat}&q=${encodeURIComponent(initialQ)}&page=${next}`)
        const data = await res.json()
        if (data.prompts.length === 0) setHasMore(false)
        else {
          setPrompts(p => [...p,...data.prompts])
          setPage(next)
          if (data.prompts.length < 18) setHasMore(false)
        }
        setLoading(false)
      }
    }, { threshold: 0.1 })
    if (loaderRef.current) obs.observe(loaderRef.current)
    return () => obs.disconnect()
  }, [page, hasMore, loading, initialCat, initialQ])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prompts.map((p: any) => (
          <PromptCardWithPreview key={`${p.id}-${p.slug}`} prompt={p} />
        ))}
      </div>
      <div ref={loaderRef} className="py-10 text-center">
        {loading? <span className="text-sm text-zinc-500">Loading more...</span> : hasMore? <span className="text-xs text-zinc-400">Scroll for more ↓</span> : <span className="text-xs text-zinc-400">End — {prompts.length} loaded</span>}
      </div>
    </>
  )
}