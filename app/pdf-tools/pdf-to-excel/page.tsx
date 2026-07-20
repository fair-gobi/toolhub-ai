"use client";
import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import * as XLSX from 'xlsx';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export default function PdfToExcel() {
  const [loading, setLoading] = useState(false);

  const handleFile = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const buf = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      let allRows: any[][] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        // Group by Y, keep X position
        const yMap = new Map<number, {x:number, str:string}[]>();
        for (const item of content.items as any[]) {
          const y = Math.round(item.transform[5]);
          const x = item.transform[4];
          if (!yMap.has(y)) yMap.set(y, []);
          yMap.get(y)!.push({ x, str: item.str });
        }

        const sortedY = Array.from(yMap.keys()).sort((a,b)=>b-a);
        for (const y of sortedY) {
          const cols = yMap.get(y)!.sort((a,b)=>a.x-b.x).map(c=>c.str.trim()).filter(s=>s);
          if(cols.length) allRows.push(cols);
        }
        allRows.push([]);
      }

      const ws = XLSX.utils.aoa_to_sheet(allRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, file.name.replace('.pdf','') + '.xlsx');
    } catch (err) {
      console.error(err);
      alert("Failed");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">PDF to Excel - Fixed</h1>
      <input type="file" accept=".pdf" onChange={handleFile} className="border p-2 w-full" />
      {loading && <p className="mt-4">Converting...</p>}
    </div>
  );
}