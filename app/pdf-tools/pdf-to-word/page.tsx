'use client';
import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Document, Packer, Paragraph } from 'docx';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import mammoth from 'mammoth';

// FIXED: hardcoded version, not ${pdfjsLib.version}
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs`;

export default function PdfWordConverter(){
  const [tab,setTab]=useState<'pdf2word'|'word2pdf'>('pdf2word');
  const [loading,setLoading]=useState(false);
  const [msg,setMsg]=useState('');

  const pdfToWord = async(e:any)=>{
    const f=e.target.files?.[0]; if(!f) return; setLoading(true); setMsg('');
    try{
      const buf=await f.arrayBuffer();
      const pdf=await pdfjsLib.getDocument({data:buf}).promise;
      const paras:Paragraph[]=[];
      for(let i=1;i<=pdf.numPages;i++){
        const page=await pdf.getPage(i);
        const c=await page.getTextContent();
        const t=(c.items as any[]).map((it:any)=>it.str).join(' ');
        paras.push(new Paragraph(`--- Page ${i} ---`));
        t.split(/(.{0,90}\s)/).filter(Boolean).forEach((chunk:string)=>paras.push(new Paragraph(chunk)));
      }
      const doc=new Document({sections:[{children:paras}]});
      const blob=await Packer.toBlob(doc);
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a'); a.href=url; a.download=f.name.replace(/\.pdf$/i,'')+'.docx'; a.click();
      setMsg('Word file downloaded!');
    }catch{ setMsg('Failed to convert PDF'); }
    setLoading(false);
  };

  const wordToPdf = async(e:any)=>{
    const f=e.target.files?.[0]; if(!f) return; setLoading(true); setMsg('');
    try{
      const buf=await f.arrayBuffer();
      const {value}=await mammoth.extractRawText({arrayBuffer:buf} as any);
      const pdfDoc=await PDFDocument.create();
      const font=await pdfDoc.embedFont(StandardFonts.Helvetica);
      let page=pdfDoc.addPage([595,842]); let y=800;
      value.split('\n').forEach((line:string)=>{
        const txt=line.slice(0,90)||' ';
        page.drawText(txt,{x:40,y,font,size:11}); y-=18;
        if(y<50){ page=pdfDoc.addPage([595,842]); y=800; }
      });
      const bytes=await pdfDoc.save();
      const blob=new Blob([bytes as any],{type:'application/pdf'});
      const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=f.name.replace(/\.docx$/i,'')+'.pdf'; a.click();
      setMsg('PDF downloaded!');
    }catch{ setMsg('Failed to convert Word'); }
    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">PDF ? Word Converter</h1>
      <div className="flex gap-2 mb-4">
        <button onClick={()=>setTab('pdf2word')} className={`flex-1 py-2 rounded border ${tab==='pdf2word'?'bg-purple-600 text-white':''}`}>PDF to Word</button>
        <button onClick={()=>setTab('word2pdf')} className={`flex-1 py-2 rounded border ${tab==='word2pdf'?'bg-purple-600 text-white':''}`}>Word to PDF</button>
      </div>
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border space-y-4">
        {tab==='pdf2word'?<><input type="file" accept="application/pdf" onChange={pdfToWord} className="w-full"/><p className="text-xs text-gray-500">PDF ? editable.docx</p></>:<><input type="file" accept=".docx" onChange={wordToPdf} className="w-full"/><p className="text-xs text-gray-500">.docx ? PDF</p></>}
        {loading&&<p className="text-sm text-purple-600">Converting...</p>}
        {msg&&<p className="text-sm text-green-600">{msg}</p>}
      </div>
    </main>
  );
}
