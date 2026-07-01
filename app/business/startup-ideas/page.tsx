"use client";
import { useState } from "react";

export default function StartupIdeas() {
  const [skill, setSkill] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `Generate 7 practical startup ideas for someone with skill in "${skill}" targeting Nepal/India market. Format: 1. Name - Problem - Customer - First $100 step`,
      }),
    });
    const data = await res.json();
    setOutput(data.text || data.error);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🚀 Startup Idea Generator</h1>
      <input
        className="w-full border p-3 rounded mb-3"
        placeholder="Your skill (e.g., graphic design, cooking)"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
      />
      <button
        onClick={generate}
        disabled={loading || !skill}
        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Generating..." : "Generate Ideas"}
      </button>
      <pre className="whitespace-pre-wrap mt-4 bg-gray-50 p-4 rounded text-sm">
        {output}
      </pre>
    </div>
  );
}
