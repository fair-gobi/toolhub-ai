"use client";
import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs`;

export default function PdfSummarizerPage() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const onFile = async (e: any) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    setLoading(true);
    setSummary("");

    try {
      const buf = await f.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      let t = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const p = await pdf.getPage(i);
        const c = await p.getTextContent();
        t += (c.items as any[]).map(x => x.str).join(" ") + " ";
      }

      const res = await fetch("/api/pdf-summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: t.slice(0, 12000), sentences: 6 })
      });
      const j = await res.json();
      if (j.error) throw new Error(j.error);
      setSummary(j.summary);
    } catch (err: any) {
      setSummary("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">PDF Summarizer (AI)</h1>
      <p className="text-sm text-gray-500">{fileName}</p>
      <input type="file" accept="application/pdf" onChange={onFile} className="mt-4 block" />
      {loading && <p className="mt-4 text-purple-600 animate-pulse">Extracting + AI Summarizing...</p>}
      {summary && <div className="mt-4 border p-4 rounded bg-gray-50 whitespace-pre-wrap leading-7">{summary}</div>}
    </main>
  );
}
