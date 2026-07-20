"use client";
import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs`;

export default function PdfQaPage() {
  const [docText, setDocText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const onFile = async (e: any) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    setLoading(true);
    const buf = await f.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    let t = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const p = await pdf.getPage(i);
      const c = await p.getTextContent();
      t += (c.items as any[]).map(x => x.str).join(" ") + " ";
    }
    setDocText(t);
    setLoading(false);
  };

  const ask = async () => {
    if (!docText ||!question) return;
    setLoading(true);
    setAnswer("");
    const res = await fetch("/api/pdf-qa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: docText.slice(0, 12000), question })
    });
    const j = await res.json();
    setAnswer(j.answer || j.error);
    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">PDF Q&A (AI)</h1>
      <input type="file" accept="application/pdf" onChange={onFile} className="mt-4 block" />
      {fileName && <p className="text-sm mt-2">{fileName} - {docText.length} chars loaded</p>}
      {docText && (
        <div className="mt-6 flex gap-2">
          <input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask something from PDF..." className="flex-1 border p-2 rounded" />
          <button onClick={ask} className="bg-black text-white px-4 py-2 rounded">Ask</button>
        </div>
      )}
      {loading && <p className="mt-4 animate-pulse">Thinking...</p>}
      {answer && <div className="mt-4 border p-4 rounded bg-gray-50 whitespace-pre-wrap">{answer}</div>}
    </main>
  );
}
