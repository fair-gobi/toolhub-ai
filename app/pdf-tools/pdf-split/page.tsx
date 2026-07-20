'use client';
import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function PdfSplit(){
  const [file,setFile]=useState<File|null>(null); const [count,setCount]=useState(0); const [range,setRange]=useState('1-3'); const [urls,setUrls]=useState<{name:string,url:string}[]>([]);

  const onFile=async(f:File)=>{
    setFile(f); const buf=await f.arrayBuffer(); const pdf=await PDFDocument.load(buf); setCount(pdf.getPageCount());
  };

  const parseRange=(str:string, max:number)=>{
    const pages:number[]=[]; str.split(',').forEach(part=>{
      if(part.includes('-')){ const [a,b]=part.split('-').map(n=>parseInt(n.trim())); for(let i=a;i<=b && i<=max;i++) pages.push(i-1); }
      else{ const n=parseInt(part.trim()); if(n>=1 && n<=max) pages.push(n-1); }
    }); return [...new Set(pages)].sort((a,b)=>a-b);
  };

  const split=async()=>{
    if(!file) return; const buf=await file.arrayBuffer(); const src=await PDFDocument.load(buf);
    if(range.toLowerCase()==='all'){
      const out=[]; for(let i=0;i<count;i++){ const doc=await PDFDocument.create(); const [p]=await doc.copyPages(src,[i]); doc.addPage(p); const b=await doc.save(); out.push({name:`page-${i+1}.pdf`,url:URL.createObjectURL(new Blob([b as any],{type:'application/pdf'}))}); } setUrls(out);
    } else {
      const idx=parseRange(range,count); const doc=await PDFDocument.create(); const pages=await doc.copyPages(src,idx); pages.forEach(p=>doc.addPage(p)); const b=await doc.save(); setUrls([{name:`split-${range}.pdf`,url:URL.createObjectURL(new Blob([b as any],{type:'application/pdf'}))}]);
    }
  };

  return (<main className="max-w-3xl mx-auto p-6"><h1 className="text-3xl font-bold mb-6">✂️ PDF Split</h1>
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border space-y-4">
  <input type="file" accept="application/pdf" onChange={e=>{const f=e.target.files?.[0]; if(f) onFile(f);}} className="w-full"/>
  {count>0 && <p className="text-sm text-gray-500">Pages: {count}</p>}
  <input value={range} onChange={e=>setRange(e.target.value)} placeholder="e.g. 1-3,5 or 'all'" className="w-full border p-2 rounded"/>
  <button onClick={split} disabled={!file} className="w-full bg-red-600 text-white py-3 rounded-lg">Split PDF</button>
  {urls.map(u=><a key={u.name} href={u.url} download={u.name} className="block bg-green-600 text-white text-center py-2 rounded">{u.name}</a>)}</div></main>);
}
