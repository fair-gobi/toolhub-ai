'use client';

import { useState } from 'react';
import Link from 'next/link';

type Tone = 'seo' | 'viral' | 'professional' | 'youtube' | 'news' | 'academic';

export default function TitleGenerator() {
  const [content, setContent] = useState<string>('');
  const [tone, setTone] = useState<Tone>('seo');
  const [keywords, setKeywords] = useState<string>('');
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<number | null>(null);

  const tones = [
    { value: 'seo' as Tone, label: 'SEO Optimized', desc: 'Rank better on Google' },
    { value: 'viral' as Tone, label: 'Viral/Clickbait', desc: 'High CTR' },
    { value: 'professional' as Tone, label: 'Professional', desc: 'Business tone' },
    { value: 'youtube' as Tone, label: 'YouTube', desc: 'Video titles' },
    { value: 'news' as Tone, label: 'News Headline', desc: 'Journalistic' },
    { value: 'academic' as Tone, label: 'Academic', desc: 'Research style' },
  ];

  const generate = async (): Promise<void> => {
    if (!content.trim()) return;
    setLoading(true);
    setTitles([]);

    const year = new Date().getFullYear();
    const prompt = `Generate 5 compelling titles for this topic: "${content}"
Keywords: ${keywords || 'none'}
Style: ${tone}
Year: ${year}
Rules: max 60 characters each, no quotes, no numbering in output, make them ${tone === 'seo' ? 'SEO-friendly with keywords' : tone === 'viral' ? 'high click-through and curiosity-driven' : tone === 'youtube' ? 'optimized for YouTube' : 'clear and professional'}.
Return exactly 5 titles, one per line.`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const text: string = data.text || '';
      const lines = text.split('\n').map((l: string) => l.replace(/^\d+[\.\)]\s*/, '').trim()).filter((l: string) => l.length > 5).slice(0, 5);
      setTitles(lines);
    } catch (e) {
      setTitles(['Failed to generate. Try again.']);
    } finally {
      setLoading(false);
    }
  };

  const copyTitle = async (title: string, idx: number): Promise<void> => {
    await navigator.clipboard.writeText(title);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 mb-6 inline-block">← Back to Home</Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">✨ AI Title Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">Powered by Groq — instant SEO, viral, and YouTube titles</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium">Your Content or Topic</label>
              <textarea value={content} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} placeholder="Enter your blog post topic, video idea..." rows={4} className="w-full mt-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 resize-none" />
              <p className="text-xs text-gray-500 mt-1">{content.length} characters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title Style</label>
                <select value={tone} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTone(e.target.value as Tone)} className="w-full mt-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border rounded-lg outline-none">
                  {tones.map(t => <option key={t.value} value={t.value}>{t.label} - {t.desc}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Keywords <span className="text-gray-400">(optional)</span></label>
                <input type="text" value={keywords} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeywords(e.target.value)} placeholder="e.g., dropshipping, Nepal, 2024" className="w-full mt-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border rounded-lg outline-none" />
              </div>
            </div>

            <button onClick={generate} disabled={!content.trim() || loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-lg transition-all shadow-lg">
              {loading ? 'Generating...' : '✨ Generate 5 Titles'}
            </button>
          </div>

          {titles.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Generated Titles</h3>
              <div className="space-y-3">
                {titles.map((title: string, idx: number) => (
                  <div key={idx} className="group flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border hover:border-blue-300 transition-all">
                    <span className="w-7 h-7 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base font-medium break-words">{title}</p>
                      <p className="text-xs text-gray-500 mt-1">{title.length}/60 chars {title.length <= 60 ? '✓' : '⚠'}</p>
                    </div>
                    <button onClick={() => copyTitle(title, idx)} className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                      {copied === idx ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
