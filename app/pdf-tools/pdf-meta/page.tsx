'use client';
import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function PdfMeta(){
  const [file,setFile]=useState<File|null>(null); const [meta,setMeta]=useState({title:'',author:'',subject:'',keywords:''}); const [url,setUrl]=useState<string|null>(null);
  const load=async(f:File)=>{
    setFile(f); const pdf=await PDFDocument.load(await f.arrayBuffer());
    setMeta({title:pdf.getTitle()||'',author:pdf.getAuthor()||'',subject:pdf.getSubject()||'',keywords:pdf.getKeywords()||''});
  };
  const save=async()=>{
    if(!file) return; const pdf=await PDFDocument.load(await file.arrayBuffer());
    pdf.setTitle(meta.title); pdf.setAuthor(meta.author); pdf.setSubject(meta.subject); pdf.setKeywords(meta.keywords.split(','));
    const b=await pdf.save(); setUrl(URL.createObjectURL(new Blob([b as any],{type:'application/pdf'})));
  };
  return (<main className="max-w-3xl mx-auto p-6"><h1 className="text-3xl font-bold mb-6">🏷️ PDF Metadata Editor</h1>
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border space-y-4">
  <input type="file" accept="application/pdf" onChange={e=>{const f=e.target.files?.[0]; if(f) load(f);}} className="w-full"/>
  <input placeholder="Title" value={meta.title} onChange={e=>setMeta({...meta,title:e.target.value})} className="w-full border p-2 rounded"/>
  <input placeholder="Author" value={meta.author} onChange={e=>setMeta({...meta,author:e.target.value})} className="w-full border p-2 rounded"/>
  <input placeholder="Subject" value={meta.subject} onChange={e=>setMeta({...meta,subject:e.target.value})} className="w-full border p-2 rounded"/>
  <input placeholder="Keywords (comma separated)" value={meta.keywords} onChange={e=>setMeta({...meta,keywords:e.target.value})} className="w-full border p-2 rounded"/>
  <button onClick={save} disabled={!file} className="w-full bg-red-600 text-white py-3 rounded-lg">Save Metadata</button>
  {url && <a href={url} download="meta-edited.pdf" className="block bg-green-600 text-white text-center py-2 rounded">Download PDF</a>}</div></main>);
}
