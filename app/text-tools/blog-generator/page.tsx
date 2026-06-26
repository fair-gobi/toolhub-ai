'use client'
import { useState } from 'react'

export default function BlogGenerator() {
  const [topic, setTopic] = useState('free online tools')
  const [audience, setAudience] = useState('beginners')
  const [tone, setTone] = useState('friendly')
  const [length, setLength] = useState('medium')
  const [author, setAuthor] = useState('Gobinda')

  const generate = () => {
    const intros: any = {
      friendly: `Hey there! If you're ${audience}, you've probably wondered about ${topic}.`,
      professional: `In today's digital landscape, ${topic} has become essential for ${audience}.`,
      casual: `Let's talk about ${topic} – it's actually way simpler than you think.`
    }

    const bodies: any = {
      short: `1. What is ${topic}?\n2. Why it matters\n3. Quick tips to get started`,
      medium: `## Introduction\n${intros[tone]}\n\n## Why ${topic} Matters\nFor ${audience}, understanding ${topic} can save hours of work.\n\n## 3 Practical Steps\n1. Start with the basics\n2. Use free resources\n3. Practice consistently\n\n## Conclusion\n${topic} isn't complicated when broken down.`,
      long: `## Introduction\n${intros[tone]}\n\n## The Problem\nMost ${audience} struggle with ${topic} because they lack clear guidance.\n\n## Deep Dive\nHere's what actually works:\n- Step 1: Research thoroughly\n- Step 2: Test small\n- Step 3: Scale what works\n\n## Common Mistakes\nAvoid these pitfalls when working with ${topic}.\n\n## Final Thoughts\nBy ${author}, Promptoolhub`
    }

    return bodies[length]
  }

  const blog = generate()

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">✍️ Blog Generator</h1>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Topic" className="border rounded p-3" />
        <input value={audience} onChange={e=>setAudience(e.target.value)} placeholder="Audience (beginners, marketers)" className="border rounded p-3" />
        <select value={tone} onChange={e=>setTone(e.target.value)} className="border rounded p-3">
          <option value="friendly">Friendly</option>
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
        </select>
        <select value={length} onChange={e=>setLength(e.target.value)} className="border rounded p-3">
          <option value="short">Short (~150 words)</option>
          <option value="medium">Medium (~300 words)</option>
          <option value="long">Long (~500 words)</option>
        </select>
        <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Author name" className="border rounded p-3 md:col-span-2" />
      </div>

      <div className="bg-white border rounded-lg p-6 whitespace-pre-wrap font-serif leading-relaxed">
        {blog}
      </div>
      <button onClick={()=>navigator.clipboard.writeText(blog)} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">Copy Blog</button>
    </main>
  )
}

