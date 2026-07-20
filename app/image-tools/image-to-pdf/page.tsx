
'use client';
import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function ImageToPdf(){
  const [files,setFiles]=useState<File[]>([]); const [url,setUrl]=useState<string|null>(null); const [loading,setLoading]=useState(false);
  const convert = async()=>{
    setLoading(true); const pdf=await PDFDocument.create();
    for(const file of files){
      const imgEl=new Image(); const src=URL.createObjectURL(file); imgEl.src=src; await new Promise(r=>imgEl.onload=r);
      const canvas=document.createElement('canvas'); canvas.width=imgEl.width; canvas.height=imgEl.height;
      canvas.getContext('2d')!.drawImage(imgEl,0,0);
      const jpgBytes=await new Promise<ArrayBuffer>(res=>canvas.toBlob(async b=>res(await b!.arrayBuffer()),'image/jpeg',0.9));
      const jpg=await pdf.embedJpg(jpgBytes); const page=pdf.addPage([jpg.width,jpg.height]); page.drawImage(jpg,{x:0,y:0,width:jpg.width,height:jpg.height});
    }
    const bytes=await pdf.save(); const blob=new Blob([bytes as any],{type:'application/pdf'}); setUrl(URL.createObjectURL(blob)); setLoading(false);
  };
  return (<main className="max-w-3xl mx-auto p-6"><h1 className="text-3xl font-bold mb-6">Image to PDF</h1>
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border space-y-4">
  <input type="file" accept="image/*" multiple onChange={e=>setFiles(Array.from(e.target.files||[]))} className="w-full"/>
  <button onClick={convert} disabled={files.length===0||loading} className="w-full bg-red-600 text-white py-3 rounded-lg disabled:opacity-50">{loading?'Creating PDF...':`Create PDF from ${files.length} images`}</button>
  {url && <a href={url} download="images.pdf" className="block text-center bg-green-600 text-white py-2 rounded">Download PDF</a>}</div></main>);
}
