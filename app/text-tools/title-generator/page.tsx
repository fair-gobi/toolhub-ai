'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TitleGenerator() {
  const [content, setContent] = useState('')
  const [tone, setTone] = useState('seo')
  const [keywords, setKeywords] = useState('')
  const [titles, setTitles] = useState<string[]>([])
  const [copied, setCopied] = useState<number | null>(null)

  const tones = [
    { value: 'seo', label: 'SEO Optimized', desc: 'Rank better on Google' },
    { value: 'viral', label: 'Viral/Clickbait', desc: 'High CTR' },
    { value: 'professional', label: 'Professional', desc: 'Business tone' },
    { value: 'youtube', label: 'YouTube', desc: 'Video titles' },
    { value: 'news', label: 'News Headline', desc: 'Journalistic' },
    { value: 'academic', label: 'Academic', desc: 'Research style' },
  ]

  const generate = () => {
    if (!content.trim()) return

    const topic = keywords || content.split(' ').slice(0, 4).join(' ')
    const year = new Date().getFullYear()
    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

    const templates: Record<string, string[]> = {
      seo: [
        `${cap(topic)}: Complete Guide ${year}`,
        `How to ${topic} - Step by Step Tutorial`,
        `Best ${topic} Strategies That Actually Work in ${year}`,
        `${cap(topic)} for Beginners: Everything You Need to Know`,
        `Top 10 ${topic} Mistakes to Avoid`
      ],
      viral: [
        `This ${cap(topic)} Secret Will Blow Your Mind`,
        `Why Everyone is Wrong About ${cap(topic)}`,
        `I Tried ${cap(topic)} for 30 Days - Here's What Happened`,
        `The ${cap(topic)} Hack That Changed Everything`,
        `Stop Doing ${cap(topic)} Like This (You're Wasting Time)`
      ],
      professional: [
        `Strategic Analysis: ${cap(topic)} in ${year}`,
        `Leveraging ${cap(topic)} for Competitive Advantage`,
        `${cap(topic)}: Industry Best Practices and Insights`,
        `The Business Impact of ${cap(topic)}`,
        `${cap(topic)} Implementation: A Comprehensive Guide`
      ],
      youtube: [
        `${cap(topic)} Explained in 5 Minutes`,
        `I Tested ${cap(topic)} So You Don't Have To`,
        `${cap(topic)} Tutorial: From Beginner to Pro`,
        `The ONLY ${cap(topic)} Video You Need to Watch`,
        `${cap(topic)} - Everything You Must Know in ${year}`
      ],
      news: [
        `Breaking: ${cap(topic)} Sees Major Development`,
        `${cap(topic)} Update: What You Need to Know Now`,
        `Report: ${cap(topic)} Trends and Analysis for ${year}`,
        `In-Depth: The Future of ${cap(topic)}`,
        `${cap(topic)}: Key Findings and Implications`
      ],
      academic: [
        `A Comprehensive Study of ${cap(topic)}`,
        `${cap(topic)}: Theoretical Framework and Practical Applications`,
        `Empirical Analysis of ${cap(topic)} in Contemporary Context`,
        `${cap(topic)}: A Systematic Literature Review ${year}`,
        `Methodological Approaches to ${cap(topic)} Research`
      ]
    }

    const results = (templates[tone] || templates.seo).map(t =>
      t.length > 60? t.slice(0, 57) + '...' : t
    )

    setTitles(results)
  }

  const copyTitle = (title: string, idx: number) => {
    navigator.clipboard.writeText(title)
    setCopied(idx)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/text-tools" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 inline-block">
          ← Back to Text Tools
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">✨ AI Title Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate viral, SEO, and professional titles instantly</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Content or Topic</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Enter your blog post topic, video idea, or paste content..."
                rows={4}
                className="w-full mt-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{content.length} characters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title Style</label>
                <select
                  value={tone}
                  onChange={e => setTone(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                >
                  {tones.map(t => (
                    <option key={t.value} value={t.value}>{t.label} - {t.desc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Keywords <span className="text-gray-400">(optional)</span></label>
                <input
                  type="text"
                  value={keywords}
                  onChange={e => setKeywords(e.target.value)}
                  placeholder="e.g., dropshipping, Nepal, 2024"
                  className="w-full mt-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>
            </div>

            <button
              onClick={generate}
              disabled={!content.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 dark:disabled:from-gray-700 dark:disabled:to-gray-700 text-white font-semibold py-3.5 rounded-lg transition-all disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
            >
              ✨ Generate 5 Titles
            </button>
          </div>

          {titles.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Generated Titles</h3>
              <div className="space-y-3">
                {titles.map((title, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                  >
                    <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base font-medium leading-snug break-words">{title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{title.length}/60 chars {title.length <= 60? '✓' : '⚠'}</p>
                    </div>
                    <button
                      onClick={() => copyTitle(title, idx)}
                      className="flex-shrink-0 px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all"
                    >
                      {copied === idx? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={generate}
                className="w-full mt-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                🔄 Generate New Variations
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
