import Link from "next/link";
const tools = [
  { name: "Invoice Generator", href: "/invoice-generator", desc: "Nepali invoice" },
  { name: "PAN Checker", href: "/pan-checker", desc: "VAT/PAN valid" },
  { name: "eSewa Parser", href: "/esewa-parser", desc: "Statement to CSV" },
  { name: "Routine Maker", href: "/routine-maker", desc: "Class routine" },
  { name: "Notes Converter", href: "/notes-converter", desc: "TXT/MD/PDF" },
];
export default function Business(){return(<main className="max-w-4xl mx-auto p-8"><h1 className="text-3xl font-bold mb-2">Business Tools</h1><div className="grid md:grid-cols-2 gap-4">{tools.map(t=>(<Link key={t.href} href={t.href} className="p-6 bg-white rounded-xl border"><h2 className="font-semibold">{t.name}</h2><p className="text-sm text-gray-500">{t.desc}</p></Link>))}</div></main>);}
