'use client';

import { useState } from 'react';
import Link from 'next/link';

type Platform = 'facebook' | 'google' | 'instagram' | 'tiktok';
type Tone = 'persuasive' | 'casual' | 'urgent' | 'professional';

export default function AdCopyGeneratorPage() {
  const [product, setProduct] = useState('');
  const [audience, setAudience] = useState('');
  const [platform, setPlatform] = useState<Platform>('facebook');
  const [tone, setTone] = useState<Tone>('persuasive');
  const [copies, setCopies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!product.trim()) return;
    setLoading(true);
    setCopies([]);

    const prompt = `Write 5 high-converting ad copies for:
Product/Service: ${product}
Target audience: ${audience || 'general consumers'}
Platform: ${platform}
Tone: ${tone}
Year: 2026

Requirements:
- Each ad: 1 headline (max 40 chars) + 1 primary text (max 125 chars) + 1 CTA
- Make them platform-native for ${platform}
- No hashtags unless Instagram/TikTok
- Return as numbered list, each ad separated by ---`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const text = data.text || '';
      const ads = text.split('---').map((a: string) => a.trim()).filter(Boolean).slice(0, 5);
      setCopies(ads);
    } catch {
      setCopies(['Error generating ads. Check your Groq API.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto p-6">
        <Link href="/" className="text-sm text-gray-600 hover:text-blue-600 mb-4 inline-block">← Back</Link>
        
        <h1 className="text-3xl font-bold mb-2">🎯 AI Ad Copy Generator</h1>
        <p className="text-gray-600 mb-6">Powered by Groq — Facebook, Google, Instagram ready</p>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border space-y-4">
          <input value={product} onChange={e => setProduct(e.target.value)} placeholder="Product: e.g., Free AI tools for Nepali students" className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
          
          <input value={audience} onChange={e => setAudience(e.target.value)} placeholder="Audience (optional): e.g., small business owners in Kathmandu" className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />

          <div className="grid grid-cols-2 gap-3">
            <select value={platform} onChange={e => setPlatform(e.target.value as Platform)} className="p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <option value="facebook">Facebook Ads</option>
              <option value="instagram">Instagram</option>
              <option value="google">Google Ads</option>
              <option value="tiktok">TikTok</option>
            </select>
            <select value={tone} onChange={e => setTone(e.target.value as Tone)} className="p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <option value="persuasive">Persuasive</option>
              <option value="urgent">Urgent/FOMO</option>
              <option value="casual">Casual</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          <button onClick={generate} disabled={loading || !product} className="w-full bg-gradient-to-r from-pink-600 to-orange-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50">
            {loading ? 'Writing ads...' : 'Generate 5 Ad Copies'}
          </button>
        </div>

        {copies.length > 0 && (
          <div className="mt-6 space-y-3">
            {copies.map((ad, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 p-4 rounded-xl border">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold bg-pink-600 text-white px-2 py-1 rounded">Ad {i+1}</span>
                  <button onClick={() => navigator.clipboard.writeText(ad)} className="text-xs px-2 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">Copy</button>
                </div>
                <pre className="whitespace-pre-wrap font-sans text-sm">{ad}</pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
