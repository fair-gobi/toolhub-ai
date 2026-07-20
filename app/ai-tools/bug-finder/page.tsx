"use client";
import { useState } from "react";

export default function BugFinder(){
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState("");
  const [code,setCode]=useState("");
  const [lang,setLang]=useState("JavaScript");

  async function analyze(){
    setLoading(true);
    const res=await fetch("/api/bug-finder",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ code, lang })
    });
    const data=await res.json();
    setResult(data.result);
    setLoading(false);
  }

  return(
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">AI Bug Finder & Fixer 🐛</h1>
      <p className="text-gray-500">Paste buggy code → AI finds bugs + fixes</p>
      <div className="mt-6 border p-5 rounded-xl bg-white grid gap-3">
        <select className="border p-2.5 rounded" onChange={e=>setLang(e.target.value)}>
          <option>JavaScript</option><option>Python</option><option>React</option><option>Next.js</option><option>PHP</option><option>Java</option>
        </select>
        <textarea placeholder="Paste your buggy code here..." className="border p-3 rounded h-60 font-mono text-sm bg-gray-900 text-white" value={code} onChange={e=>setCode(e.target.value)}/>
        <button onClick={analyze} className="bg-red-600 text-white p-3 rounded font-semibold hover:bg-red-700">{loading?"Analyzing...":"🔍 Find & Fix Bugs"}</button>
      </div>
      {result && <pre className="whitespace-pre-wrap border p-5 mt-6 rounded bg-gray-50 text-sm leading-6">{result}</pre>}
    </main>
  )
}