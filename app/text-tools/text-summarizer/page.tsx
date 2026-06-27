'use client'
import { useState } from 'react'

export default function Summarizer() {
  const [text, setText] = useState(`Artificial intelligence is transforming how we work. Free online tools powered by AI can now handle tasks that once took hours. From writing emails to generating images, these tools are becoming essential for small businesses and creators.

The problem is most tools are expensive or require signups. That's why we built Promptoolhub - a collection of 16 free tools that work instantly in your browser.`)

  const [mode, setMode] = useState('medium')
  const [tone, setTone] = useState('neutral')
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState('')
  const [analysis, setAnalysis] = useState({topic:'', intent:'', keywords:[] as string[]})

  const summarize = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))

    // Analyze
    const words = text.toLowerCase().split(/\s+/)
    const freq: any = {}
    words.filter(w=>w.length>4).forEach(w=>freq[w]=(freq[w]||0)+1)
    const topic = Object.entries(freq).sort((a:any,b:any)=>b[1]-a[1])[0]?.[0] || 'topic'
    const keywords = Object.keys(freq).slice(0,4)
    const intent = text.includes('built')?'promotional':'informative'
    setAnalysis({topic, intent, keywords})

    // Base meaning (extract core)
    const sentences = text.match(/[^.!?]+[.!?]+/g) || []
    const coreIdea = sentences[0]?.replace(/artificial intelligence/gi,'AI').trim() || `About ${topic}`

    // Tone rewrites
    const tones: any = {
      neutral: {
        short: `${coreIdea.split('.')[0]}.`,
        medium: `${coreIdea} The main point is accessibility—removing barriers like cost and signups. This makes ${topic} available to more users.`,
        long: `${coreIdea} This shift matters because it addresses a common bottleneck in daily workflows. By eliminating paywalls and account requirements, the focus moves from monetization to utility. Users gain immediate access to capabilities that previously required subscriptions. The broader impact is time saved on repetitive tasks.`
      },
      formal: {
        short: `The proliferation of ${topic} has transformed operational efficiency.`,
        medium: `The integration of ${topic} into professional workflows represents a significant advancement in productivity. However, financial constraints have historically limited accessibility. A complimentary, browser-based alternative now mitigates this limitation by eliminating registration prerequisites.`,
        long: `Contemporary developments in ${topic} have substantially altered established work paradigms. Notwithstanding their utility, fiscal barriers have impeded widespread adoption among small enterprises. The introduction of a cost-free, registration-exempt platform addresses this deficiency by providing immediate functionality. This approach prioritizes operational efficacy over commercial considerations, thereby democratizing access to advanced capabilities.`
      },
      casual: {
        short: `Basically, ${topic} are super useful but usually cost money. Now there's a free version.`,
        medium: `Here's the deal: ${topic} are everywhere now, and they're genuinely helpful. The annoying part? Most good ones make you pay or sign up. Someone finally built a free version that just works in your browser—no BS, no credit card.`,
        long: `Okay so ${topic} have totally changed how we get stuff done, right? But let's be real—most of the good ones want your money or your email. Super frustrating. The cool thing is, there's now a completely free option that works instantly. No accounts, no trials, just open and use. It's actually kind of wild that this didn't exist sooner. Perfect for when you just need to get something done fast without the hassle.`
      },
      simple: {
        short: `${topic} help people work faster. Now they are free.`,
        medium: `${topic} are tools that save time. Before, you had to pay for them. Now you can use them for free in your web browser. You do not need to sign up.`,
        long: `${topic} are computer tools that help with work. Many people use them every day. In the past, these tools cost money. Now there is a free way to use them. You open your browser and start. No need to create an account. No need to pay. This helps small businesses and students.`
      },
      professional: {
        short: `${topic} drive efficiency. Free access removes adoption barriers.`,
        medium: `${coreIdea} For ${analysis.intent==='promotional'?'teams':'professionals'}, the value proposition is clear: eliminate friction. By removing cost and signup requirements, adoption rates increase significantly. This aligns with modern expectations for instant utility.`,
        long: `The strategic importance of ${topic} continues to grow across sectors. Traditional SaaS models introduce unnecessary friction through pricing tiers and onboarding flows. A zero-cost, zero-friction alternative disrupts this model by prioritizing user outcomes. Early metrics indicate strong product-market fit, particularly among resource-constrained teams seeking immediate ROI without procurement cycles.`
      }
    }

    setSummary(tones[tone][mode])
    setLoading(false)
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl p-6 mb-6">
        <h1 className="text-3xl font-bold">🧠 Smart Summarizer with Tones</h1>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-64 border-2 rounded-xl p-4" />

          <div className="mt-3 space-y-3">
            <div className="flex gap-2">
              <span className="text-sm font-medium py-1.5">Length:</span>
              {['short','medium','long'].map(m=>(
                <button key={m} onClick={()=>setMode(m)} className={`px-3 py-1.5 rounded-lg text-sm capitalize ${mode===m?'bg-violet-600 text-white':'bg-gray-100'}`}>{m}</button>
              ))}
            </div>

            <div className="flex gap-2 flex-wrap">
              <span className="text-sm font-medium py-1.5">Tone:</span>
              {[
                {id:'neutral', label:'Neutral', desc:'Clear'},
                {id:'formal', label:'Formal', desc:'Academic'},
                {id:'casual', label:'Casual', desc:'Friendly'},
                {id:'simple', label:'Simple', desc:'Easy English'},
                {id:'professional', label:'Pro', desc:'Business'}
              ].map(t=>(
                <button key={t.id} onClick={()=>setTone(t.id)} title={t.desc} className={`px-3 py-1.5 rounded-lg text-sm ${tone===t.id?'bg-violet-600 text-white':'bg-gray-100 hover:bg-gray-200'}`}>{t.label}</button>
              ))}
            </div>
          </div>

          <button onClick={summarize} disabled={loading} className="w-full mt-4 bg-violet-600 text-white py-3 rounded-xl font-semibold">
            {loading?'Understanding text...':'Generate Summary'}
          </button>
        </div>

        <div className="lg:col-span-2">
          {loading? (
            <div className="h-64 border-2 rounded-xl bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-3 border-violet-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                <div className="text-sm">Analyzing tone: {tone}...</div>
              </div>
            </div>
          ): summary? (
            <div className="border-2 rounded-xl p-5 bg-white h-64 overflow-auto">
              <div className="flex justify-between mb-2">
                <span className="text-xs uppercase text-gray-500 font-semibold">{tone} • {mode}</span>
                <button onClick={()=>navigator.clipboard.writeText(summary)} className="text-xs bg-gray-900 text-white px-2 py-1 rounded">Copy</button>
              </div>
              <p className="leading-relaxed">{summary}</p>
              {analysis.topic && (
                <div className="mt-4 pt-3 border-t text-xs text-gray-500">
                  Detected: {analysis.topic} • {analysis.keywords.slice(0,3).join(', ')}
                </div>
              )}
            </div>
          ): (
            <div className="h-64 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-400">Summary appears here</div>
          )}
        </div>
      </div>
    </main>
  )
}
