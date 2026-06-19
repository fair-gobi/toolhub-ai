import Link from "next/link";
const tools = [
  { name: "QR Generator", href: "/qr-generator", desc: "Create QR codes" },
  { name: "YT Thumbnail", href: "/yt-thumbnail", desc: "Download YouTube thumbs" },
  { name: "Payment QR 🇳🇵", href: "/payment-qr", desc: "eSewa/Khalti QR" },
  { name: "Nepali Date", href: "/nepali-date", desc: "BS ↔ AD" },
  { name: "GPA Calculator", href: "/gpa-calculator", desc: "TU/NEB GPA" },
];
export default function Utility(){return(<main className="max-w-4xl mx-auto p-8"><h1 className="text-3xl font-bold mb-2">Utility Tools</h1><p className="text-gray-600 mb-6">Nepal-focused utilities</p><div className="grid md:grid-cols-2 gap-4">{tools.map(t=>(<Link key={t.href} href={t.href} className="p-6 bg-white rounded-xl border"><h2 className="font-semibold">{t.name}</h2><p className="text-sm text-gray-500">{t.desc}</p></Link>))}</div></main>);}
