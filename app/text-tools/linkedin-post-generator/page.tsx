'use client';

import { useState } from 'react';

type Tone = 'story' | 'educational' | 'contrarian';

export default function LinkedInGen() {
  const [topic, setTopic] = useState<string>('building free tools in public');
  const [keywords, setKeywords] = useState<string>('buildinpublic, startup, productivity');
  const [achievement, setAchievement] = useState<string>('hit 10,000 users with zero ad spend');
  const [audience, setAudience] = useState<string>('founders and creators');
  const [tone, setTone] = useState<Tone>('story');
  const [sender, setSender] = useState<string>('Gobinda');
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<string[]>([]);

  const generate = async (): Promise<void> => {
    setLoading(true);
    setPosts([]);

    const prompt = `Write 3 different LinkedIn posts about: "${topic}"
Achievement to mention: ${achievement}
Audience: ${audience}
Tone: ${tone}
Author name: ${sender}
Hashtags: ${keywords}

Rules:
- Each post 120-180 words max
- Use LinkedIn formatting (line breaks, arrows →, numbers)
- ${tone === 'story'? 'Start with personal hook, share journey' : tone === 'educational'? 'Give 3-step framework' : 'Start with contrarian take'}
- End with question to drive comments
- Include hashtags at end
- Separate the 3 posts with "---"

Write in 2026 style, authentic voice, no corporate fluff.`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const text: string = data.text || '';

      // Split by --- and clean up
      const generated = text.split('---').map((p: string) => p.trim()).filter((p: string) => p.length > 20).slice(0, 3);
      setPosts(generated.length > 0? generated : [text]);
    } catch {
      setPosts(['Error: Could not connect to AI. Check your Groq API key.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-[#0A66C2] text-white rounded-xl p-6 mb-6">
          <h1 className="text-3xl font-bold">💼 LinkedIn Post AI</h1>
          <p className="opacity-90 text-sm mt-1">Powered by Groq — no templates</p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 mb-4 space-y-3">
          <input value={topic} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)} placeholder="Main topic" className="w-full border rounded-lg p-3 bg-transparent" />
          <input value={keywords} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeywords(e.target.value)} placeholder="Keywords (comma separated)" className="w-full border rounded-lg p-3 bg-transparent" />
          <input value={achievement} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAchievement(e.target.value)} placeholder="Your achievement/result" className="w-full border rounded-lg p-3 bg-transparent" />
          <div className="grid grid-cols-2 gap-3">
            <input value={audience} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAudience(e.target.value)} placeholder="Audience" className="border rounded-lg p-3 bg-transparent" />
            <input value={sender} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSender(e.target.value)} placeholder="Your name" className="border rounded-lg p-3 bg-transparent" />
          </div>
          <div className="flex gap-2">
            {(['story','educational','contrarian'] as Tone[]).map((t) => (
              <button key={t} onClick={() => setTone(t)} className={`px-4 py-2 rounded-lg capitalize text-sm ${tone === t? 'bg-[#0A66C2] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>{t}</button>
            ))}
          </div>
        </div>

        <button onClick={generate} disabled={loading ||!topic.trim()} className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white py-3 rounded-xl font-semibold mb-6 disabled:opacity-50">
          {loading? 'Generating with AI...' : 'Generate LinkedIn Posts'}
        </button>

        {loading && <div className="text-center py-8"><div className="animate-spin h-10 w-10 border-4 border-[#0A66C2] border-t-transparent rounded-full mx-auto"></div></div>}

        {posts.map((post, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 mb-4 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#0A66C2] rounded-full flex items-center justify-center text-white font-bold">{sender[0] || 'G'}</div>
              <div><div className="font-semibold">{sender}</div><div className="text-xs text-gray-500">Now • 🌐</div></div>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed">{post}</pre>
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-500">{post.split(/\s+/).length} words</span>
              <button onClick={() => navigator.clipboard.writeText(post)} className="bg-[#0A66C2] hover:bg-[#004182] text-white px-4 py-1.5 rounded-full text-sm">Copy</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

