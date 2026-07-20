// @ts-nocheck
'use client';
import { useState } from 'react';
import { saveAs } from 'file-saver';

export const dynamic = 'force-dynamic';

export default function PptToPdf(){
  const [msg,setMsg]=useState('');
  const [loading,setLoading]=useState(false);

  const onFile=async(e:any)=>{
    const f=e.target.files?.[0]; if(!f) return;
    try{
      setLoading(true); setMsg('Reading PPTX...');
      const JSZip = (await import('jszip')).default;
      const { default: jsPDF } = await import('jspdf');

      const zip = await JSZip.loadAsync(f);
      const slideFiles = Object.keys(zip.files)
       .filter(k=> /^ppt\/slides\/slide\d+\.xml$/.test(k))
       .sort((a,b)=>{
          const na = parseInt(a.match(/slide(\d+)/)![1]);
          const nb = parseInt(b.match(/slide(\d+)/)![1]);
          return na-nb;
        });

      if(!slideFiles.length) throw new Error('Not a valid PPTX');

      const doc = new jsPDF({ unit:'pt', format:'a4' });
      let firstPage = true;

      for(let sIdx=0; sIdx<slideFiles.length; sIdx++){
        const slidePath = slideFiles[sIdx];
        const slideNum = sIdx+1;
        setMsg(`Processing slide ${slideNum}/${slideFiles.length}...`);

        const xmlText = await zip.file(slidePath)!.async('text');
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, 'text/xml');
        const textNodes = Array.from(xml.getElementsByTagName('a:t') as any).map((n:any)=> n.textContent).filter(Boolean);

        // Add new PDF page per slide
        if(!firstPage) doc.addPage();
        firstPage = false;

        doc.setFontSize(12);
        doc.setFont('helvetica','bold');
        doc.text(`Slide ${slideNum}`, 40, 40);
        doc.setFont('helvetica','normal');
        doc.setFontSize(10);

        let y = 70;
        const pageHeight = doc.internal.pageSize.getHeight();

        // Write text with wrap
        for(const t of textNodes){
          const lines = doc.splitTextToSize(t, 500);
          if(y + lines.length*12 > pageHeight - 40){
            doc.addPage();
            y = 40;
          }
          doc.text(lines, 40, y);
          y += lines.length*12 + 8;
        }

        // Try to get images for this slide
        try{
          const relsPath = `ppt/slides/_rels/slide${slideNum}.xml.rels`;
          const relsFile = zip.file(relsPath);
          if(relsFile){
            const relsText = await relsFile.async('text');
            const relsXml = parser.parseFromString(relsText, 'text/xml');
            const rels = Array.from(relsXml.getElementsByTagName('Relationship') as any);
            for(const rel of rels){
              const type = rel.getAttribute('Type') || '';
              if(!type.includes('image')) continue;
              const target = rel.getAttribute('Target') || '';
              const imgPath = target.startsWith('..')? `ppt/slides/${target.replace('../','').replace('../','')}`.replace('ppt/slides/../','ppt/') : `ppt/media/${target.split('/').pop()}`;
              // normalize../media -> ppt/media
              const finalPath = target.includes('media')? `ppt/media/${target.split('/').pop()}` : imgPath;
              const imgFile = zip.file(finalPath);
              if(imgFile && y < pageHeight - 150){
                const base64 = await imgFile.async('base64');
                const ext = finalPath.endsWith('.png')? 'PNG':'JPEG';
                try{
                  doc.addImage(`data:image/${ext.toLowerCase()};base64,${base64}`, ext, 40, y, 200, 120);
                  y += 130;
                }catch{}
              }
            }
          }
        }catch{}
      }

      const blob = doc.output('blob');
      saveAs(blob, f.name.replace(/\.pptx?$/i,'')+'.pdf');
      setMsg(`✅ PDF done - ${slideFiles.length} slides converted`);

    }catch(err:any){
      console.error(err);
      setMsg('❌ Error: '+err.message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">PPT → PDF</h1>
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border space-y-3">
        <input type="file" accept=".pptx,.ppt" onChange={onFile} className="w-full"/>
        {loading && <p className="text-sm text-purple-600 animate-pulse">{msg}</p>}
        <p className="text-sm text-green-600">{msg}</p>
        <p className="text-xs text-gray-500">Client-side text+image extraction. For 100% design-perfect, you need server LibreOffice, but this works on phone without server.</p>
      </div>
    </main>
  );
}
