'use client'
import { useState } from 'react'

export default function LinkedInGen() {
  const [topic, setTopic] = useState('building tools in public')
  const [sender, setSender] = useState('Gobinda Subedi')
  const [receiver, setReceiver] = useState('founders')
  const [tone, setTone] = useState('inspiring')
  const [goal, setGoal] = useState('engagement')

  const generate = () => {
    const templates: any = {
      inspiring: `I used to think ${topic} was only for big teams.\n\nI was wrong.\n\nLast month, I built 12 tools alone. No funding. No team.\n\nHere's what I learned:\n\n→ Start small\n→ Ship daily\n→ Listen to users\n\nTo every ${receiver} reading this: you don't need permission to start.\n\nWhat's stopping you?\n\n— ${sender}\n#buildinpublic #${topic.replace(/\s/g,'')}`,

      educational: `3 lessons from ${topic}:\n\n1️⃣ Consistency beats talent\n2️⃣ Feedback > perfection\n3️⃣ Tools should solve real problems\n\nI've applied this while building for ${receiver}.\n\nResult? 10x faster workflow.\n\nSave this post if you're a ${receiver}.\n\n— ${sender}`,

      story: `Two years ago, I was stuck.\n\nToday, I'm helping ${receiver} with ${topic}.\n\nThe turning point? I stopped consuming and started creating.\n\nIf you're on the fence, this is your sign.\n\nHappy to answer questions below 👇\n\n${sender}`
    }
    return templates[tone]
  }

  const post = generate()

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">💼 LinkedIn Post Generator</h1>

      <div className="grid gap-3 mb-4">
        <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Topic" className="border rounded p-3" />
        <div className="grid grid-cols-2 gap-3">
          <input value={sender} onChange={e=>setSender(e.target.value)} placeholder="Your name" className="border rounded p-2" />
          <input value={receiver} onChange={e=>setReceiver(e.target.value)} placeholder="Audience (founders, marketers)" className="border rounded p-2" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <select value={tone} onChange={e=>setTone(e.target.value)} className="border rounded p-2">
            <option value="inspiring">Inspiring</option>
            <option value="educational">Educational</option>
            <option value="story">Story</option>
          </select>
          <select value={goal} onChange={e=>setGoal(e.target.value)} className="border rounded p-2">
            <option value="engagement">Max Engagement</option>
            <option value="leads">Generate Leads</option>
            <option value="authority">Build Authority</option>
          </select>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">{sender[0]}</div>
          <div><div className="font-semibold">{sender}</div><div className="text-xs text-gray-500">Now • 🌐</div></div>
        </div>
        <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed">{post}</pre>
        <div className="mt-4 pt-3 border-t text-xs text-gray-500">{post.split(' ').length} words • ~{Math.ceil(post.split(' ').length/200)} min read</div>
      </div>

      <button onClick={()=>navigator.clipboard.writeText(post)} className="mt-4 w-full bg-[#0A66C2] text-white py-3 rounded-lg font-medium">Copy LinkedIn Post</button>
    </main>
  )
}

