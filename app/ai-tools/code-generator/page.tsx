"use client";
import { useState } from "react";

export default function CodeGen() {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [prompt, setPrompt] = useState("");
  const [lang, setLang] = useState("JavaScript");

  async function gen(){
    setLoading(true);
    const res = await fetch("/api/code-generate", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ prompt, lang })
    });
    const data = await res.json();
    setCode(data.result);
    setLoading(false);
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">AI Code Generator 💻</h1>
      <div className="mt-6 border p-5 rounded-xl bg-white grid gap-3">
        <select className="border p-2.5 rounded" onChange={e=>setLang(e.target.value)}>
          <option>JavaScript</option><option>Python</option><option>React</option><option>Next.js</option><option>HTML/CSS</option><option>Node.js</option><option>PHP</option>
        </select>
        <textarea placeholder="What code do you want? e.g. Create a todo app in React" className="border p-2.5 rounded h-28" onChange={e=>setPrompt(e.target.value)}/>
        <button onClick={gen} className="bg-black text-white p-3 rounded font-semibold">{loading?"Coding...":"Generate Code"}</button>
      </div>
      {code && <pre className="whitespace-pre-wrap border p-5 mt-6 rounded bg-gray-900 text-green-400 text-sm overflow-x-auto">{code}</pre>}
    </main>
  )
}