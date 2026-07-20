'use client';
import { useState } from 'react';
export default function YTThumb() {
  const [url,setUrl]=useState(''); const id = url.match(/(?:v=|\.be\/)([^&]+)/)?.[1];
  const sizes = ['maxresdefault','sddefault','hqdefault','mqdefault','default'];
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">YouTube Thumbnail Downloader</h1>
        <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Paste YouTube URL" className="w-full border rounded-lg px-4 py-3 mb-6" />
        {id && <div className="grid md:grid-cols-3 gap-4">{sizes.map(s=>(<div key={s} className="border rounded-lg p-2 text-center"><img src={`https://img.youtube.com/vi/${id}/${s}.jpg`} className="w-full rounded" /><p className="text-sm mt1">{s}</p><a href={`https://img.youtube.com/vi/${id}/${s}.jpg`} download className="text-blue-600 text-sm">Download HD</a></div>))}</div>}
      </div>
    </main>
  );
}
