'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Mode = 'short' | 'medium' | 'long';
type Tone = 'neutral' | 'formal' | 'casual' | 'simple' | 'professional';
type Analysis = { topic: string; intent: string; keywords: string[] };

export default function Summarizer() {
  const router = useRouter();
  const [text, setText] = useState<string>(`Artificial intelligence is transforming how we work. Free online tools powered by AI can now handle tasks that once took hours. From writing emails to generating images, these tools are becoming essential for small businesses and creators.

The problem is most tools are expensive or require signups. That's why we built Promptoolhub - a collection of 16 free tools that work instantly in your browser.`);

  const [mode, setMode] = useState<Mode>('medium');
  const [tone, setTone] = useState<Tone>('neutral');
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>('');
  const [analysis, setAnalysis] = useState<Analysis>({ topic: '', intent: '', keywords: [] });
  const [error, setError] = useState<string>('');

  const summarize = async (): Promise<void> => {
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    setSummary('');

    // quick local analysis for keywords (TypeScript-safe)
    const words = text.toLowerCase().split(/\s+/);
    const freq: Record<string, number> = {};
    words.filter((w) => w.length > 4).forEach((w) => { freq[w] = (freq[w] || 0) + 1; });
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    const topic = sorted[0]?.[0] || 'topic';
    const keywords = sorted.slice(0, 4).map(([k]) => k);
    const intent = text.toLowerCase().includes('built') || text.toLowerCase().includes('we ')? 'promotional' : 'informative';
    setAnalysis({ topic, intent, keywords });

    const lengthMap: Record<Mode, string> = {
      short: '1 sentence, under 25 words',
      medium: '2-3 sentences, about 50 words',
      long: '5-6 sentences, about 120 words'
    };

    const prompt = `You are an expert summarizer. Summarize the text below.
- Tone: ${tone}
- Length: ${lengthMap[mode]}
- Preserve the core meaning about "${topic}"
- Do not add new information

Text: """${text}"""`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json();
      setSummary((data.text || '').trim());
    } catch (err: unknown) {
      setError(err instanceof Error? err.message : 'Failed to summarize');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.back()} className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-100 dark:hover:bg-gray-800">← Back</button>
          <h1 className="text-2xl font-semibold">Summarizer</h1>
        </div>

        <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold">🧠 Smart Summarizer with Tones</h2>
          <p className="text-violet-100 text-sm mt-1">Powered by Groq llama-3.1-8b-instant</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <textarea
              value={text}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
              className="w-full h-64 border-2 border-gray-200 dark:border-gray-800 rounded-xl p-4 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <div className="mt-3 space-y-3">
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium">Length:</span>
                {(['short','medium','long'] as Mode[]).map((m) => (
                  <button key={m} onClick={() => setMode(m)} className={`px-3 py-1.5 rounded-lg text-sm capitalize ${mode===m?'bg-violet-600 text-white':'bg-gray-100 dark:bg-gray-800'}`}>{m}</button>
                ))}
              </div>

              <div className="flex gap-2 flex-wrap items-center">
                <span className="text-sm font-medium">Tone:</span>
                {([
                  {id:'neutral', label:'Neutral'},
                  {id:'formal', label:'Formal'},
                  {id:'casual', label:'Casual'},
                  {id:'simple', label:'Simple'},
                  {id:'professional', label:'Pro'},
                ] as {id:Tone, label:string}[]).map((t) => (
                  <button key={t.id} onClick={() => setTone(t.id)} className={`px-3 py-1.5 rounded-lg text-sm ${tone===t.id?'bg-violet-600 text-white':'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200'}`}>{t.label}</button>
                ))}
              </div>
            </div>

            <button onClick={summarize} disabled={loading ||!text.trim()} className="w-full mt-4 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold">
              {loading? 'Summarizing...' : 'Generate Summary'}
            </button>
            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          </div>

          <div className="lg:col-span-2">
            {loading? (
              <div className="h-64 border-2 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin h-8 w-8 border-3 border-violet-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                  <div className="text-sm">Analyzing...</div>
                </div>
              </div>
            ) : summary? (
              <div className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-white dark:bg-gray-900 h-64 overflow-auto">
                <div className="flex justify-between mb-2">
                  <span className="text-xs uppercase text-gray-500 font-semibold">{tone} • {mode}</span>
                  <button onClick={() => navigator.clipboard.writeText(summary)} className="text-xs bg-gray-900 text-white px-2 py-1 rounded">Copy</button>
                </div>
                <p className="leading-relaxed">{summary}</p>
                {analysis.topic && (
                  <div className="mt-4 pt-3 border-t text-xs text-gray-500">
                    Detected: {analysis.topic} • {analysis.keywords.slice(0,3).join(', ')}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-64 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-400">Summary appears here</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
