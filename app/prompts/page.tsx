import Link from "next/link";
const categories = [
  "ChatGPT Prompts", "Gemini Prompts", "Claude Prompts", "Business Prompts",
  "Marketing Prompts", "SEO Prompts", "Coding Prompts", "Education Prompts",
  "YouTube Prompts", "Social Media Prompts"
];
export default function Prompts() { return (
  <main className="max-w-4xl mx-auto p-8">
    <h1 className="text-3xl font-bold mb-2">Prompt Library</h1>
    <p className="text-gray-600 mb-8">500+ curated prompts — coming soon</p>
    <div className="grid md:grid-cols-2 gap-4">{categories.map(c=>(
      <div key={c} className="p-6 bg-white rounded-xl border">
        <h2 className="font-semibold">{c}</h2>
        <p className="text-sm text-gray-500 mt-1">50 prompts</p>
        <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded mt-2 inline-block">Building</span>
      </div>))}</div>
  </main>);}
