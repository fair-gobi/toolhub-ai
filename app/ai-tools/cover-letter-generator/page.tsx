"use client";
import { useState } from "react";

export default function CoverLetterGen() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [form, setForm] = useState({ name:"", role:"", company:"", skills:"", exp:"" });

  async function gen(){
    setLoading(true);
    const res = await fetch("/api/cover-letter-generate", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Cover Letter Generator ✉️</h1>
      <div className="grid gap-3 mt-6 border p-5 rounded-xl bg-white">
        <input placeholder="Your Name" className="border p-2.5 rounded" onChange={e=>setForm({...form, name:e.target.value})}/>
        <input placeholder="Job Role" className="border p-2.5 rounded" onChange={e=>setForm({...form, role:e.target.value})}/>
        <input placeholder="Company Name" className="border p-2.5 rounded" onChange={e=>setForm({...form, company:e.target.value})}/>
        <input placeholder="Your Top Skills" className="border p-2.5 rounded" onChange={e=>setForm({...form, skills:e.target.value})}/>
        <textarea placeholder="Experience summary" className="border p-2.5 rounded h-24" onChange={e=>setForm({...form, exp:e.target.value})}/>
        <button onClick={gen} className="bg-black text-white p-3 rounded font-semibold">{loading?"Generating...":"Generate Cover Letter"}</button>
      </div>
      {result && <pre className="whitespace-pre-wrap border p-5 mt-6 rounded bg-gray-50">{result}</pre>}
    </main>
  )
}