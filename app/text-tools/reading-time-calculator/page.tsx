'use client'
import { useState, useMemo } from 'react'

export default function ReadingTime() {
  const [text, setText] = useState('Paste your article here. This advanced calculator counts words, images, and even code blocks.\n\nFor example, readers slow down for technical content.')
  const [wpm, setWpm] = useState(225)
  const [includeImages, setIncludeImages] = useState(true)
  const [imageCount, setImageCount] = useState(3)
  const [language, setLanguage] = useState('english')

  const stats = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(Boolean).length
    const chars = text.length
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length
    
    // Language adjustment
    const langMultiplier = language === 'nepali' ? 0.85 : language === 'technical' ? 0.7 : 1
    const adjustedWpm = wpm * langMultiplier
    
    // Base reading time
    let minutes = words / adjustedWpm
    
    // Add image time (12 seconds per image - Nielsen Norman Group)
    if (includeImages) {
      minutes += (imageCount * 12) / 60
    }
    
    // Add code block penalty (slower reading)
    const codeBlocks = (text.match(/```/g) || []).length / 2
    minutes += codeBlocks * 0.5
    
    const totalSeconds = Math.ceil(minutes * 60)
    const readMinutes = Math.floor(totalSeconds / 60)
    const readSecs = totalSeconds % 60
    
    // Speak time (150 wpm average)
    const speakMinutes = Math.ceil(words / 150)
    
    // Difficulty
    const avgWordsPerSentence = words / Math.max(sentences, 1)
    const difficulty = avgWordsPerSentence > 20 ? 'Hard' : avgWordsPerSentence > 15 ? 'Medium' : 'Easy'

    return {
      words, chars, sentences, paragraphs,
      readMinutes, readSecs, totalSeconds,
      speakMinutes, difficulty, adjustedWpm: Math.round(adjustedWpm)
    }
  }, [text, wpm, includeImages, imageCount, language])

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl p-6 mb-6">
        <h1 className="text-3xl font-bold">⏱️ Advanced Reading Time</h1>
        <p className="opacity-90">With images, code, and language support</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <textarea 
            value={text} 
            onChange={e=>setText(e.target.value)} 
            className="w-full h-80 border-2 border-gray-200 rounded-xl p-4 text-base focus:border-teal-500 outline-none" 
            placeholder="Paste your article, blog post, or essay..."
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{stats.words} words • {stats.chars} chars</span>
            <button onClick={()=>setText('')} className="text-red-600">Clear</button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Settings */}
          <div className="bg-white border rounded-xl p-4">
            <h3 className="font-semibold mb-3">Settings</h3>
            
            <label className="text-xs text-gray-600">Reading Speed</label>
            <select value={wpm} onChange={e=>setWpm(Number(e.target.value))} className="w-full border rounded-lg p-2 mb-3 text-sm">
              <option value={180}>Slow (180 wpm)</option>
              <option value={225}>Average (225 wpm)</option>
              <option value={265}>Fast (265 wpm)</option>
              <option value={300}>Speed reader (300 wpm)</option>
            </select>

            <label className="text-xs text-gray-600">Language/Content</label>
            <select value={language} onChange={e=>setLanguage(e.target.value)} className="w-full border rounded-lg p-2 mb-3 text-sm">
              <option value="english">English</option>
              <option value="nepali">Nepali / Hindi</option>
              <option value="technical">Technical / Code</option>
            </select>

            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" checked={includeImages} onChange={e=>setIncludeImages(e.target.checked)} id="img" />
              <label htmlFor="img" className="text-sm">Include images</label>
            </div>
            {includeImages && (
              <input type="number" value={imageCount} onChange={e=>setImageCount(Number(e.target.value))} min="0" max="50" className="w-full border rounded p-1 text-sm" placeholder="Number of images" />
            )}
          </div>

          {/* Results */}
          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-xl p-6 text-center">
            <div className="text-5xl font-bold">{stats.readMinutes}</div>
            <div className="text-lg">min {stats.readSecs}s</div>
            <div className="text-xs opacity-80 mt-1">reading time</div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="font-bold text-lg">{stats.speakMinutes}m</div>
              <div className="text-xs text-gray-600">Speak time</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="font-bold text-lg">{stats.difficulty}</div>
              <div className="text-xs text-gray-600">Difficulty</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {[
          {label: 'Words', value: stats.words},
          {label: 'Sentences', value: stats.sentences},
          {label: 'Paragraphs', value: stats.paragraphs},
          {label: 'WPM used', value: stats.adjustedWpm},
        ].map(s => (
          <div key={s.label} className="bg-white border rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-teal-600">{s.value}</div>
            <div className="text-xs text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button 
          onClick={()=>navigator.clipboard.writeText(`${stats.readMinutes} min read • ${stats.words} words`)}
          className="text-sm bg-teal-600 text-white px-4 py-2 rounded-lg"
        >
          Copy "X min read"
        </button>
      </div>
    </main>
  )
}
