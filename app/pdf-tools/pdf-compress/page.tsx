'use client';
import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function PdfCompress(){
  const [file,setFile]=useState<File|null>(null);
  const [info,setInfo]=useState('');
  const [url,setUrl]=useState<string|null>(null);
  const compress=async()=>{
    if(!file) return;
    const buf=await file.arrayBuffer();
    const pdf=await PDFDocument.load(buf);
    const bytes=await pdf.save({useObjectStreams:true});
    const blob=new Blob([bytes as any],{type:'application/pdf'});
    setInfo(`${(file.size/1024).toFixed(0)}KB → ${(blob.size/1024).toFixed(0)}KB`);
    setUrl(URL.createObjectURL(blob));
  };
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🗜️ PDF Compressor</h1>
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border space-y-4">
        <input type="file" accept="application/pdf" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full"/>
        <button onClick={compress} disabled={!file} className="w-full bg-red-600 text-white py-3 rounded-lg">Compress PDF</button>
        {info && <p className="text-sm text-green-600 font-medium">{info}</p>}
        {url && <a href={url} download="compressed.pdf" className="block bg-green-600 text-white text-center py-2 rounded">Download Compressed PDF</a>}
      </div>
    </main>
  );
}
