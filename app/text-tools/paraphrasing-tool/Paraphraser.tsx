'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Tone = 'Standard' | 'Fluent' | 'Creative' | 'Formal' | 'Simple' | 'Academic';

export default function Paraphraser() {
  const router = useRouter();
  const [input, setInput] = useState<string>('');
  const [tone, setTone] = useState<Tone>('Fluent');
  const [count, setCount] = useState<number>(3);
  const [outputs, setOutputs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async (): Promise<void> => {
    if (!input.trim()) {
      setError('Please enter text to paraphrase.');
      return;
    }
    setLoading(true);
    setError('');
    setOutputs([]);

    const prompt = `You are an expert paraphrasing assistant.
Rewrite the following text in a ${tone.toLowerCase()} tone.
Keep the original meaning 100% intact. Provide exactly ${count} distinct versions, numbered 1 to ${count}.
Text: """${input}"""`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      const text: string = data.text || '';

      const versions = text
        .split(/\n?\d+\.\s/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0)
        .slice(0, count);

      setOutputs(versions.length ? versions : [text.trim()]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string, index: number): Promise<void> => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-semibold">Paraphraser</h1>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <textarea
            value={input}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
            placeholder="Paste text here..."
            rows={6}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <select
              value={tone}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTone(e.target.value as Tone)}
              className="p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent"
            >
              <option>Standard</option>
              <option>Fluent</option>
              <option>Creative</option>
              <option>Formal</option>
              <option>Simple</option>
              <option>Academic</option>
            </select>

            <select
              value={count}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCount(Number(e.target.value))}
              className="p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent"
            >
              <option value={1}>1 version</option>
              <option value={2}>2 versions</option>
              <option value={3}>3 versions</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-5 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium"
          >
            {loading ? 'Paraphrasing...' : 'Generate'}
          </button>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        {outputs.length > 0 && (
          <div className="mt-6 space-y-3">
            {outputs.map((out: string, i: number) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border p-4 flex justify-between gap-3">
                <p className="flex-1 whitespace-pre-wrap">{out}</p>
                <button
                  onClick={() => handleCopy(out, i)}
                  className="text-sm px-3 py-1.5 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {copiedIndex === i ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
