"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Props = {
  initialCategory?: string
  initialCat?: string
  initialQ?: string
  initialPrompts?: any[]
}

export function PromptInfinite({ initialCategory, initialCat, initialQ, initialPrompts = [] }: Props) {
  const rawCat = initialCategory || initialCat || ''
  const cat = rawCat === 'all'? '' : rawCat

  const [prompts, setPrompts] = useState<any[]>(initialPrompts)
  const [offset, setOffset] = useState(initialPrompts.length)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialPrompts.length >= 18)
  const [error, setError] = useState('')

  const load = async (reset = false) => {
    if (loading) return
    setLoading(true)
    setError('')
    try {
      const o = reset? 0 : offset
      const params = new URLSearchParams()
      if (cat) params.set('cat', cat)
      if (initialQ) params.set('search', initialQ)
      params.set('limit', '24')
      params.set('offset', String(o))

      const res = await fetch(`/api/prompts?${params.toString()}`)
      const data = await res.json()
      if (!Array.isArray(data)) throw new Error(data.error || 'Invalid response')
      if (data.length === 0) {
        if (reset) setPrompts([])
        setHasMore(false)
      } else {
        setPrompts(prev => reset? data : [...prev,...data])
        setOffset(o + data.length)
        if (data.length < 24) setHasMore(false)
      }
    } catch (e: any) {
      setError(e.message)
      setHasMore(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    setPrompts(initialPrompts)
    setOffset(initialPrompts.length)
    setHasMore(initialPrompts.length >= 18)
    setError('')
    if (initialPrompts.length === 0) load(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat, initialQ])

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prompts.map((p: any) => (
          <Link key={p.slug || p.id} href={`/prompts/${p.slug}`} className="bg-white border rounded-xl p-4 hover:shadow-md block">
            <div className="text- font-bold uppercase text-violet-600 mb-2">{p.category}</div>
            <h3 className="font-bold line-clamp-2">{p.title}</h3>
          </Link>
        ))}
      </div>
      {hasMore && <div className="mt-8 flex justify-center"><button onClick={()=>load(false)} disabled={loading} className="px-6 py-2 bg-black text-white rounded-full text-sm">{loading?'Loading...':'Load More'}</button></div>}
      {!hasMore && prompts.length>0 && <p className="text-center text-xs text-zinc-400 mt-8">End — {prompts.length} loaded</p>}
      {!loading && prompts.length===0 && <p className="text-center py-20 text-zinc-500">{error || `No prompts in ${rawCat || 'all'}`}</p>}
    </div>
  )
}

export default PromptInfinite