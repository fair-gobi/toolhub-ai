'use client';
import { useState } from 'react';
export default function PngToJpg(){
  const [file,setFile]=useState<File|null>(null); const [url,setUrl]=useState<string|null>(null);
  const convert = async()=>{
    if(!file) return; const img=new Image(); const src=URL.createObjectURL(file); img.src=src;
    await new Promise(r=>img.onload=r); const c=document.createElement('canvas'); c.width=img.width; c.height=img.height;
    const ctx=c.getContext('2d')!; ctx.fillStyle='#FFFFFF'; ctx.fillRect(0,0,c.width,c.height); ctx.drawImage(img,0,0);
    c.toBlob(b=>{ if(b) setUrl(URL.createObjectURL(b)); },'image/jpeg',0.92);
  };
  return (<main className="max-w-3xl mx-auto p-6"><h1 className="text-3xl font-bold mb-6">PNG to JPG</h1>
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border space-y-4">
  <input type="file" accept="image/png" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full"/>
  <p className="text-xs text-gray-500">Transparent background will become white</p>
  <button onClick={convert} disabled={!file} className="w-full bg-purple-600 text-white py-3 rounded-lg disabled:opacity-50">Convert to JPG</button>
  {url && <><img src={url} className="max-w-full rounded border"/><a href={url} download="converted.jpg" className="block text-center bg-green-600 text-white py-2 rounded mt-3">Download JPG</a></>}</div></main>);
}
