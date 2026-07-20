'use client';
import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function Merger() {
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const merge = async () => {
    setLoading(true);
    const mergedPdf = await PDFDocument.create();
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(p => mergedPdf.addPage(p));
    }
    const mergedBytes = await mergedPdf.save();
    const blob = new Blob([mergedBytes as any], { type: 'application/pdf' });
    setUrl(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📄 PDF Merger</h1>
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border space-y-4">
        <input type="file" accept="application/pdf" multiple onChange={e => setFiles(Array.from(e.target.files || []))} className="w-full" />
        <button onClick={merge} disabled={files.length < 2 || loading} className="w-full bg-red-600 text-white py-3 rounded-lg disabled:opacity-50">
          {loading? 'Merging...' : `Merge ${files.length} PDFs`}
        </button>
        {url && <a href={url} download="merged.pdf" className="block text-center bg-green-600 text-white py-2 rounded">Download Merged PDF</a>}
      </div>
    </main>
  );
}

