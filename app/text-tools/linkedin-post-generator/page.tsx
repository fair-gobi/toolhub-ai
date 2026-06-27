'use client'
import { useState } from 'react'

export default function LinkedInGen() {
  const [topic, setTopic] = useState('building free tools in public')
  const [keywords, setKeywords] = useState('buildinpublic, startup, productivity')
  const [achievement, setAchievement] = useState('hit 10,000 users with zero ad spend')
  const [audience, setAudience] = useState('founders and creators')
  const [tone, setTone] = useState('story')
  const [sender, setSender] = useState('Gobinda')
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<string[]>([])

  const generate = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))

    const kw = keywords.split(',').map(k=>`#${k.trim().replace(/\s/g,'')}`).join(' ')
    const hook = topic.split(' ').slice(0,5).join(' ')

    const templates = {
      story: `I never thought ${topic} would work.

6 months ago, I was stuck.

Today: ${achievement}.

Here's the truth about ${topic} for ${audience}:

→ You don't need funding
→ You don't need a team  
→ You need to start

3 lessons:
1. Ship before ready
2. Listen to users daily
3. Build in public

What's stopping you?

— ${sender}

${kw}`,

      educational: `${topic.toUpperCase()} — what actually works:

After ${achievement}, here's my framework:

STEP 1: Identify pain
${audience} waste hours on tools that should be free.

STEP 2: Build solution
Focus on 1 problem. Not 10.

STEP 3: Share journey
${kw.split(' ')[0]} works because people root for builders.

Save this if you're building.

${sender}`,

      contrarian: `Unpopular opinion: ${topic} is overrated.

Everyone says "just build".

But here's what they don't tell ${audience}:

${achievement} didn't come from building.
It came from listening.

We spent 3 months talking to users before writing code.

Result? Product-market fit on day 1.

Agree or disagree? 👇

${kw}`
    }

    setPosts([templates[tone as keyof typeof templates]])
    // Generate 2 more variations
    setPosts(prev => [...prev, 
      `Quick win for ${audience}:\n\n${topic} → ${achievement}\n\nMy 3-step process:\n\n${keywords.split(',').map((k,i)=>`${i+1}. Focus on ${k.trim()}`).join('\n')}\n\nTry it this week.\n\n${sender}\n\n${kw}`,
      `POV: You're ${audience.split(' ')[0]} struggling with ${topic}\n\nI was too.\n\nUntil ${achievement}.\n\nThe secret? Not what you think.\n\nComment "GUIDE" and I'll DM my playbook.\n\n${kw}`
    ])
    setLoading(false)
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="bg-[#0A66C2] text-white rounded-xl p-6 mb-6">
        <h1 className="text-3xl font-bold">💼 LinkedIn Post AI</h1>
      </div>

      <div className="bg-white border rounded-xl p-5 mb-4 space-y-3">
        <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Main topic" className="w-full border rounded-lg p-3" />
        <input value={keywords} onChange={e=>setKeywords(e.target.value)} placeholder="Keywords (comma separated)" className="w-full border rounded-lg p-3" />
        <input value={achievement} onChange={e=>setAchievement(e.target.value)} placeholder="Your achievement/result" className="w-full border rounded-lg p-3" />
        <div className="grid grid-cols-2 gap-3">
          <input value={audience} onChange={e=>setAudience(e.target.value)} placeholder="Audience" className="border rounded-lg p-3" />
          <input value={sender} onChange={e=>setSender(e.target.value)} placeholder="Your name" className="border rounded-lg p-3" />
        </div>
        <div className="flex gap-2">
          {['story','educational','contrarian'].map(t=>(
            <button key={t} onClick={()=>setTone(t)} className={`px-4 py-2 rounded-lg capitalize text-sm ${tone===t?'bg-[#0A66C2] text-white':'bg-gray-100'}`}>{t}</button>
          ))}
        </div>
      </div>

      <button onClick={generate} disabled={loading} className="w-full bg-[#0A66C2] text-white py-3 rounded-xl font-semibold mb-6 disabled:opacity-50">
        {loading? 'Generating posts...' : 'Generate LinkedIn Posts'}
      </button>

      {loading && <div className="text-center py-8"><div className="animate-spin h-10 w-10 border-4 border-[#0A66C2] border-t-transparent rounded-full mx-auto"></div></div>}

      {posts.map((post,i)=>(
        <div key={i} className="bg-white border rounded-xl p-6 mb-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#0A66C2] rounded-full flex items-center justify-center text-white font-bold">{sender[0]}</div>
            <div><div className="font-semibold">{sender}</div><div className="text-xs text-gray-500">Now • 🌐</div></div>
          </div>
          <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed">{post}</pre>
          <div className="flex justify-between items-center mt-4 pt-3 border-t">
            <span className="text-xs text-gray-500">{post.split(' ').length} words • {Math.ceil(post.length/5)} chars</span>
            <button onClick={()=>navigator.clipboard.writeText(post)} className="bg-[#0A66C2] text-white px-4 py-1.5 rounded-full text-sm">Copy</button>
          </div>
        </div>
      ))}
    </main>
  )
}
