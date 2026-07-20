'use client';
import { useState } from 'react';
export default function YT(){
  const [url,setUrl]=useState(''); const [loading,setLoading]=useState(false);
  const handle=()=>{ if(!url.includes('youtube.com') &&!url.includes('youtu.be')){ alert('Enter valid YouTube URL'); return; } setLoading(true); setTimeout(()=>setLoading(false),1500); };
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8"><div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border">
      <h1 className="text-2xl md:text-3xl font-bold">YouTube Video Downloader</h1><p className="text-gray-600 mt-2">Paste YouTube link to download MP4 or MP3. Frontend ready.</p>
      <div className="flex gap-2 mt-6"><input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." className="flex-1 border rounded-lg px-4 py-3"/><button onClick={handle} disabled={loading} className="px-6 py-3 bg-red-600 text-white rounded-lg">{loading?'Checking...':'Get'}</button></div>
      <div className="mt-8 border-t pt-4"><h2 className="font-semibold mb-1">Important</h2><p className="text-sm text-gray-600">This is UI demo. Backend API for actual download needs to be connected with rate limiting and CORS. Only download videos you own or have permission. Respect copyright.</p></div>
    </div></main>
  );
}
