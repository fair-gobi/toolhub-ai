// @ts-nocheck
'use client'; import { useState } from 'react'; import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc=`https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs`;
export default function PdfOcr(){
  const [text,setText]=useState(''); const [loading,setLoading]=useState(false);
  const onFile=async(e:any)=>{
    const f=e.target.files?.[0]; if(!f) return; setLoading(true); setText('');
    const buf=await f.arrayBuffer(); const pdf=await pdfjsLib.getDocument({data:buf}).promise; let full='';
    const { createWorker } = await import('tesseract.js'); const worker=await createWorker('eng');
    for(let i=1;i<=pdf.numPages;i++){ const page=await pdf.getPage(i); const vp=page.getViewport({scale:2}); const canvas=document.createElement('canvas'); canvas.width=vp.width; canvas.height=vp.height; await page.render({canvasContext:canvas.getContext('2d'),viewport:vp} as any).promise; const {data:{text:t}}=await worker.recognize(canvas); full+=`\n--- Page ${i} ---\n`+t; setText(full); }
    await worker.terminate(); setLoading(false);
  };
  const downloadTxt=()=>{ const blob=new Blob([text],{type:'text/plain'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='ocr.txt'; a.click(); };
  return <main className="max-w-3xl mx-auto p-6"><h1 className="text-2xl font-bold mb-4">PDF OCR - Extract Text from Scanned PDF</h1><div className="bg-white p-6 rounded-xl border space-y-3"><input type="file" accept="application/pdf" onChange={onFile}/>{loading&&<p className="text-sm text-purple-600">OCR running... keep tab open</p>}{text&&<><textarea value={text} readOnly className="w-full h-64 border p-2 text-sm"/><button onClick={downloadTxt} className="w-full bg-black text-white py-2 rounded">Download.txt</button></>}</div></main>;
}
