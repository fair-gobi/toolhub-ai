"use client";
import { useState } from "react";

export default function StartupIdeas() {
  const [skill, setSkill] = useState("");
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `Generate 7 startup ideas for someone skilled in "${skill}". For each: 1) Name, 2) One-sentence problem, 3) Target customer in Nepal/India, 4) How to make first $100. Keep it practical, low-cost. Return as numbered list.`,
      }),
    });
    const data = await res.json();
    setIdeas(data.text.split("\n").filter((l:string)=>l.trim()));
    setLoading(false);
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">🚀 Startup Idea Generator</h1>
      <p className="text-gray-600 mb-6">Turn your skill into a business today</p>
      
      <div className="flex gap-2 mb-6">
        <input 
          value={skill} 
          onChange={e=>setSkill(e.target.value)} 
          placeholder="e.g., video editing, cooking, coding, teaching"
          className="flex-1 border rounded-lg px-4 py-3"
        />
        <button 
          onClick={generate} 
          disabled={loading || !skill}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {loading ? "..." : "Generate"}
        </button>
      </div>

      <div className="space-y-3">
        {ideas.map((idea,i)=>(
          <div key={i} className="p-4 border rounded-lg bg-white">
            {idea}
          </div>
        ))}
      </div>
    </main>
  );
}
