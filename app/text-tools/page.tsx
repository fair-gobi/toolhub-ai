import Link from "next/link";
const tools = [
  "Word Counter","Character Counter","Case Converter","Text Compare","Slug Generator",
  "Duplicate Line Remover","Reading Time Calculator","Text Cleaner","Random Text Generator","Keyword Density Checker"
].map(n=>({name:n, href:`/${n.toLowerCase().replace(/\s+/g,'-')}`}));
export default function TextTools(){return(<main className="max-w-4xl mx-auto p-8"><h1 className="text-3xl font-bold mb-6">Text Tools</h1><div className="grid md:grid-cols-2 gap-4">{tools.map(t=>(<Link key={t.href} href={t.href} className="p-5 bg-white rounded-xl border"><h2 className="font-semibold">{t.name}</h2></Link>))}</div></main>);}
