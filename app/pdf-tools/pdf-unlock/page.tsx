// @ts-nocheck
'use client';
import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs`;

export default function PdfUnlock(){
  const [file,setFile]=useState<File|null>(null);
  const [pass,setPass]=useState('');
  const [loading,setLoading]=useState(false);
  const [msg,setMsg]=useState('');

  const unlock=async()=>{
    if(!file) return; if(!pass){ setMsg('Enter password'); return; }
    setLoading(true); setMsg('Unlocking...');
    try{
      // 1. Try qpdf-wasm first (perfect decrypt if API matches)
      try{
        const qpdfMod:any = await import('qpdf-wasm');
        const qpdf = await (qpdfMod.default? qpdfMod.default() : qpdfMod.QPDF?.());
        if(qpdf?.decryptPDF || qpdf?.decrypt){
          const buf = new Uint8Array(await file.arrayBuffer());
          const decryptFn = qpdf.decryptPDF || qpdf.decrypt || qpdf.decryptBuffer;
          const out = await decryptFn.call(qpdf, buf, pass);
          const blob = new Blob([out],{type:'application/pdf'});
          const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=file.name.replace(/\.pdf$/i,'')+'-unlocked.pdf'; a.click();
          setMsg('Unlocked with qpdf-wasm!'); setLoading(false); return;
        }
      }catch(e){ /* fall through to canvas method */ }

      // 2. Fallback: pdfjs-dist can OPEN encrypted PDF with password, then we re-create it
      const data = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data, password: pass }).promise;
      const newPdf = await PDFDocument.create();

      for(let i=1;i<=pdf.numPages;i++){
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width; canvas.height = viewport.height;
        const ctx = canvas.getContext('2d')!;
        await page.render({ canvasContext: ctx, viewport } as any).promise;

        const dataUrl = canvas.toDataURL('image/png');
        const b64 = dataUrl.split(',')[1];
        const pngBytes = Uint8Array.from(atob(b64), c=>c.charCodeAt(0));
        const png = await newPdf.embedPng(pngBytes);
        const newPage = newPdf.addPage([viewport.width/2, viewport.height/2]);
        newPage.drawImage(png,{ x:0, y:0, width: newPage.getWidth(), height: newPage.getHeight() });
      }

      const bytes = await newPdf.save();
      const blob = new Blob([bytes as any],{type:'application/pdf'});
      const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=file.name.replace(/\.pdf$/i,'')+'-unlocked.pdf'; a.click();
      setMsg(`Unlocked! ${pdf.numPages} pages`);
    }catch(err:any){
      if(err?.name==='PasswordException' || err?.message?.includes('password')) setMsg('Wrong password');
      else setMsg('Failed: '+err?.message);
    }
    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">🔓 PDF Unlock - Remove Password</h1>
      <p className="text-sm text-gray-500 mb-6">Enter password to get a password-free PDF. Works 100% in browser.</p>
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border space-y-4">
        <input type="file" accept="application/pdf" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full"/>
        <input type="password" placeholder="Enter PDF password" value={pass} onChange={e=>setPass(e.target.value)} className="w-full border p-3 rounded"/>
        <button onClick={unlock} disabled={!file||!pass||loading} className="w-full bg-green-600 text-white py-3 rounded-lg disabled:opacity-50">
          {loading?'Unlocking...':'Unlock & Download'}
        </button>
        {msg && <p className="text-sm text-center">{msg}</p>}
      </div>
    </main>
  );
}
