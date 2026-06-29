'use client';
import { useState, useEffect } from 'react';
import { ADToBS, BSToAD } from 'bikram-sambat-js';
export default function NepaliDate() {
  const [bs, setBs] = useState('2082-03-08'); const [ad, setAd] = useState('2025-06-22'); const [mode, setMode] = useState('bs2ad'); const [err, setErr] = useState('');
  useEffect(()=>{ if(mode!=='bs2ad')return; try{ setAd(BSToAD(bs)); setErr(''); }catch{ setErr('Invalid BS date'); } },[bs,mode]);
  useEffect(()=>{ if(mode!=='ad2bs')return; try{ setBs(ADToBS(ad)); setErr(''); }catch{ setErr('Invalid AD date'); } },[ad,mode]);
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border">
        <h1 className="text-2xl md:text-3xl font-bold">Nepali Date Converter (BS to AD)</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Convert Bikram Sambat to English date and vice versa. Works offline for 2000 to 2090 BS.</p>
        <div className="flex gap-2 my-5"><button onClick={()=>setMode('bs2ad')} className={`px-4 py-2 rounded-lg ${mode==='bs2ad'?'bg-blue-600 text-white':'bg-gray-100'}`}>BS → AD</button><button onClick={()=>setMode('ad2bs')} className={`px-4 py-2 rounded-lg ${mode==='ad2bs'?'bg-blue-600 text-white':'bg-gray-100'}`}>AD → BS</button></div>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="text-sm font-medium">Bikram Sambat</label><input value={bs} onChange={e=>{setBs(e.target.value);setMode('bs2ad')}} className="w-full mt-1 border rounded-lg px-4 py-3 font-mono text-lg" placeholder="2082-03-08"/></div>
          <div><label className="text-sm font-medium">English Date (AD)</label><input type="date" value={ad} onChange={e=>{setAd(e.target.value);setMode('ad2bs')}} className="w-full mt-1 border rounded-lg px-4 py-3 text-lg"/></div>
        </div>
        {err && <p className="text-red-600 text-sm mt-2">{err}</p>}
        <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl text-center"><div className="text-xl font-semibold">{bs} BS</div><div className="my-1 text-gray-400">⇅</div><div className="text-xl font-semibold">{ad} AD</div></div>
        <div className="mt-8 border-t pt-4"><h2 className="font-semibold mb-1">About Bikram Sambat</h2><p className="text-sm text-gray-600 dark:text-gray-400">Nepal's official calendar is approximately 56 years 8 months ahead of Gregorian. This tool helps for citizenship, school forms, and government documents. Months: Baishakh, Jestha, Ashar, Shrawan, Bhadra, Ashwin, Kartik, Mangsir, Poush, Magh, Falgun, Chaitra.</p></div>
      </div>
    </main>
  );
}
