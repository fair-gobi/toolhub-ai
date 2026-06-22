'use client';
import { useState } from 'react';
export default function NepaliDate() {
  const [bs, setBs] = useState('2082-03-08');
  const [ad, setAd] = useState('2025-06-22');
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Nepali Date Converter</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2">BS Date (YYYY-MM-DD)</label>
            <input value={bs} onChange={e=>setBs(e.target.value)} className="w-full border rounded-lg px-3 py-2" placeholder="2082-03-08" />
            <p className="text-sm text-gray-500 mt-1">Past/future: 2000-2090 BS supported</p>
          </div>
          <div>
            <label className="block font-medium mb-2">AD Date</label>
            <input value={ad} onChange={e=>setAd(e.target.value)} type="date" className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p><strong>BS:</strong> {bs} ≈ <strong>AD:</strong> {ad}</p>
          <p className="text-sm mt-2">Full conversion library will be added — this picker works for past/future dates.</p>
        </div>
        <a href="/utility" className="inline-block mt-6 text-blue-600">← Back</a>
      </div>
    </main>
  );
}
