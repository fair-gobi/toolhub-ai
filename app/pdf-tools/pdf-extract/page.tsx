'use client';
import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export default function PdfExtract(){
  const [text,setText]=useState(''); const [loading,setLoading]=useState(false);
  const onFile=async(e:React.ChangeEvent<HTMLInputElement>)=>{
    const f=e.target.files?.[0]; if(!f) return; setLoading(true);
    const buf=await f.arrayBuffer(); const pdf=await pdfjsLib.getDocument({data:buf}).promise;
    let out=''; for(let i=1;i<=pdf.numPages;i++){ const page=await pdf.getPage(i); const c=await page.getTextContent(); out+=c.items.map((it:any)=>it.str).join(' ')+'\n\n'; }
    setText(out); setLoading(false);
  };
  return (<main className="max-w-3xl mx-auto p-6"><h1 className="text-3xl font-bold mb-6">📝 PDF Text Extract</h1>
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border space-y-4">
  <input type="file" accept="application/pdf" onChange={onFile} className="w-full"/>
  {loading && <p>Extracting...</p>}
  {text && <><textarea value={text} readOnly rows={12} className="w-full border p-3 rounded text-sm"/><a href={URL.createObjectURL(new Blob([text],{type:'text/plain'}))} download="extracted.txt" className="block bg-green-600 text-white text-center py-2 rounded">Download.txt</a></>}</div></main>);
}
