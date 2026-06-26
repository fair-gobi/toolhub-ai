'use client'
import { useState } from 'react'

export default function LinkedInGen() {
  const [topic, setTopic] = useState('building free tools')
  const [style, setStyle] = useState('story')

  const posts: any = {
    story: `3 months ago, I was frustrated paying $50/month for tools.

So I built my own.

Today, 10,000+ people use them daily. For free.

Here's what I learned about ${topic}:

1. Start small – solve your own problem first
2. Ship fast – perfection kills momentum
3. Listen – users will tell you what to build next

The best part? It's 100% free. No paywall.

What tool do you wish existed? 👇

#buildinpublic #${topic.replace(/\s+/g,'')}`,

    tips: `5 lessons from ${topic}:

→ Consistency > intensity
→ Free tools build trust faster than ads
→ Community feedback is gold
→ Document everything
→ Launch before you're ready

Which one resonates most?

P.S. I'm giving away my toolkit – comment "TOOLS" and I'll DM it.`,

    achievement: `🚀 Milestone unlocked!

We just hit 10K users for our ${topic} platform.

No funding. No ads. Just solving real problems.

Grateful for this community. Next stop: 100K

What's your 2026 goal?`
  }

  const post = posts[style]

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">💼 LinkedIn Post Generator</h1>

      <div className="flex gap-3 mb-4">
        <input value={topic} onChange={e=>setTopic(e.target.value)} className="flex-1 border rounded-lg p-3" placeholder="Topic..." />
        <select value={style} onChange={e=>setStyle(e.target.value)} className="border rounded-lg px-4">
          <option value="story">Story</option>
          <option value="tips">Tips</option>
          <option value="achievement">Achievement</option>
        </select>
      </div>

      <div className="bg-[#f3f2ef] border border-[#e0dfdc] rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">Y</div>
          <div>
            <div className="font-semibold">You</div>
            <div className="text-xs text-gray-600">Now • 🌐</div>
          </div>
        </div>
        <div className="whitespace-pre-wrap text-[15px] leading-relaxed">{post}</div>
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={()=>navigator.clipboard.writeText(post)} className="bg-[#0a66c2] text-white px-6 py-2 rounded-full font-medium">Copy Post</button>
        <span className="text-sm text-gray-600 self-center">{post.length} chars • ~{Math.ceil(post.split(' ').length/200)} min read</span>
      </div>
    </main>
  )
}
