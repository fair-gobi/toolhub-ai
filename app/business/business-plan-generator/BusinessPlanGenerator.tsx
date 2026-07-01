'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function BusinessPlanGenerator() {
  const [idea, setIdea] = useState('')
  const [industry, setIndustry] = useState('SaaS')
  const [audience, setAudience] = useState('')
  const [budget, setBudget] = useState('')
  const [plan, setPlan] = useState('')
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    if (!idea) return
    setLoading(true)
    setPlan('')

    const prompt = `Create a concise 1-page business plan for:
Business idea: ${idea}
Industry: ${industry}
Target audience: ${audience || 'general consumers'}
Starting budget: ${budget || 'bootstrapped'}

Format in markdown with these sections:
# ${idea} - Business Plan
## 1. Executive Summary (2 sentences)
## 2. Problem (what pain)
## 3. Solution (how you solve it)
## 4. Target Market (size and who)
## 5. Business Model (how make money - pricing)
## 6. Go-to-Market (3 steps)
## 7. Financial Snapshot Year 1 (revenue, costs, profit)
## 8. Next Steps

Keep it practical for Nepal/India market, realistic numbers, no fluff.`

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })

    const data = await res.json()
    setPlan(data.text || 'Error generating plan')
    setLoading(false)
  }

  const copyPlan = () => navigator.clipboard.writeText(plan)
  const downloadPlan = () => {
    const blob = new Blob([plan], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${idea.replace(/\s+/g, '-').toLowerCase()}-business-plan.md`
    a.click()
  }

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <Link href="/business" className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-4">
        ← Back to Business Tools
      </Link>

      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">📋</span>
          <div>
            <h1 className="text-3xl font-bold">AI Business Plan Generator</h1>
            <p className="opacity-90">Generate investor-ready 1-page plan</p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Business Idea *</label>
            <input value={idea} onChange={e=>setIdea(e.target.value)} placeholder="e.g. AI note-taking app for students" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Industry</label>
            <select value={industry} onChange={e=>setIndustry(e.target.value)} className="w-full border rounded-lg px-3 py-2">
              {['SaaS','E-commerce','AI Tools','HealthTech','FinTech','EdTech','Local Service','Content'].map(i=> <option key={i}>{i}</option>)}
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <input value={audience} onChange={e=>setAudience(e.target.value)} placeholder="Target audience (e.g. college students)" className="border rounded-lg px-3 py-2" />
          <input value={budget} onChange={e=>setBudget(e.target.value)} placeholder="Budget (e.g. $5K, bootstrapped)" className="border rounded-lg px-3 py-2" />
        </div>
        <button onClick={generate} disabled={loading ||!idea} className="w-full bg-indigo-600 text-white rounded-lg py-3 font-medium hover:bg-indigo-700 disabled:opacity-50">
          {loading? 'Generating Plan...' : 'Generate Business Plan'}
        </button>
      </div>

      {plan && (
        <div className="bg-gray-50 border rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Your Business Plan</h2>
            <div className="flex gap-2">
              <button onClick={copyPlan} className="text-sm bg-gray-200 px-3 py-1.5 rounded hover:bg-gray-300">Copy</button>
              <button onClick={downloadPlan} className="text-sm bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700">Download.md</button>
            </div>
          </div>
          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed bg-white p-4 rounded border overflow-auto max-h-[600px]">{plan}</pre>
        </div>
      )}
    </main>
  )
}
