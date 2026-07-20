// @ts-nocheck
'use client';
import { useState } from 'react';
import { saveAs } from 'file-saver';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/legacy/build/pdf.worker.min.mjs`;

export const dynamic = 'force-dynamic';

export default function PdfToPpt(){
  const [msg,setMsg]=useState('');
  const [loading,setLoading]=useState(false);

  const onFile=async(e:any)=>{
    const f=e.target.files?.[0]; if(!f) return;
    try{
      setLoading(true); setMsg('Reading PDF...');
      const PptxGenJS = (await import('pptxgenjs')).default;
      const buf = await f.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({data:buf}).promise;

      const pptx = new PptxGenJS();
      pptx.layout = 'LAYOUT_WIDE'; // 13.33x7.5

      for(let i=1;i<=pdf.numPages;i++){
        setMsg(`Converting page ${i}/${pdf.numPages} to slide...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({scale: 1.5}); // 1.5 = phone safe, 2 = better quality

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({canvasContext: context, viewport}).promise;
        const imgData = canvas.toDataURL('image/jpeg', 0.85);

        const slide = pptx.addSlide();
        // Full slide image = perfect look like PDF
        slide.addImage({ data: imgData, x:0, y:0, w:'100%', h:'100%' });

        // Clean canvas for phone RAM
        canvas.width = 0;
      }

      setMsg('Building PPTX...');
      const blob = await pptx.write({outputType:'blob'}) as Blob;
      saveAs(blob, f.name.replace(/\.pdf$/i,'')+'.pptx');
      setMsg(`✅ PPT downloaded - ${pdf.numPages} slides`);

    }catch(err:any){
      console.error(err);
      setMsg('❌ Error: '+err.message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">PDF → PPT (Phone Fixed)</h1>
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border space-y-3">
        <input type="file" accept=".pdf,application/pdf" onChange={onFile} className="w-full"/>
        {loading && <p className="text-sm text-purple-600 animate-pulse">{msg}</p>}
        <p className="text-sm text-green-600">{msg}</p>
        <p className="text-xs text-gray-500">Renders each PDF page as slide image → 100% layout kept. Uses saveAs() so works on iPhone/Android.</p>
      </div>
    </main>
  );
}
