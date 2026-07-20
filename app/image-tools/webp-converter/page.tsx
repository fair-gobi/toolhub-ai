'use client';
import { useState } from 'react';
export default function WebpConverter(){
  const [file,setFile]=useState<File|null>(null); const [format,setFormat]=useState('image/webp'); const [quality,setQuality]=useState(0.8); const [url,setUrl]=useState<string|null>(null);
  const convert = async()=>{
    if(!file) return; const img=new Image(); const src=URL.createObjectURL(file); img.src=src; await new Promise(r=>img.onload=r);
    const c=document.createElement('canvas'); c.width=img.width; c.height=img.height; c.getContext('2d')!.drawImage(img,0,0);
    c.toBlob(b=>{ if(b) setUrl(URL.createObjectURL(b)); },format,quality);
  };
  return (<main className="max-w-3xl mx-auto p-6"><h1 className="text-3xl font-bold mb-6">WEBP Converter</h1>
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border space-y-4">
  <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full"/>
  <select value={format} onChange={e=>setFormat(e.target.value)} className="w-full border p-2 rounded"><option value="image/webp">To WEBP</option><option value="image/jpeg">To JPG</option><option value="image/png">To PNG</option></select>
  <div><label className="text-sm">Quality: {quality}</label><input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={e=>setQuality(Number(e.target.value))} className="w-full"/></div>
  <button onClick={convert} disabled={!file} className="w-full bg-purple-600 text-white py-3 rounded-lg">Convert</button>
  {url && <><img src={url} className="max-w-full rounded border"/><a href={url} download={`converted.${format.split('/')[1]}`} className="block text-center bg-green-600 text-white py-2 rounded mt-3">Download</a></>}</div></main>);
}
