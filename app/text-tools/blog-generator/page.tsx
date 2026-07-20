'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BlogGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('seo');
  const [length, setLength] = useState('medium');
  const [blog, setBlog] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setBlog('');

    // This is the AI prompt — no templates
    const prompt = `Write a complete, original blog post about "${topic}".
Tone: ${tone}
Length: ${length === 'short' ? '300 words' : length === 'medium' ? '600 words' : '900 words'}
Format: Use markdown with H2 headings, bullet points where helpful, and a conclusion.
Write for 2026, make it helpful and not generic.`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      
      // This comes directly from Groq, not templates
      setBlog(data.text || 'No response from AI');
    } catch (err) {
      setBlog('Error: Could not connect to Groq API. Check your /api/generate route and GROQ_API_KEY in .env.local');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm mb-4 inline-block">← Back</Link>
        <h1 className="text-3xl font-bold mb-6">AI Blog Generator</h1>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border space-y-4">
          <input
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="Enter topic: e.g., Best free AI tools for students in Nepal"
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800"
          />
          
          <div className="flex gap-3">
            <select value={tone} onChange={e => setTone(e.target.value)} className="flex-1 p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <option value="seo">SEO</option>
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
            </select>
            <select value={length} onChange={e => setLength(e.target.value)} className="flex-1 p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>

          <button onClick={generate} disabled={loading || !topic} className="w-full bg-indigo-600 text-white py-3 rounded-lg disabled:opacity-50">
            {loading ? 'Generating with Groq...' : 'Generate with AI'}
          </button>
        </div>

        {blog && (
          <div className="mt-6 bg-white dark:bg-gray-900 p-6 rounded-xl border">
            <div className="flex justify-between mb-3">
              <h2 className="font-semibold">Result</h2>
              <button onClick={() => navigator.clipboard.writeText(blog)} className="text-xs px-2 py-1 bg-black text-white rounded">Copy</button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{blog}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
