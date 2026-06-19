import Link from "next/link";
const tools = [
  "JSON Formatter","JSON Validator","Base64 Encoder","Base64 Decoder","UUID Generator",
  "JWT Decoder","Regex Tester","Password Generator","SQL Formatter","XML Formatter",
  "HTML Formatter","CSS Minifier","JS Minifier","Hash Generator","Lorem Ipsum"
].map(name => ({ name, href: `/${name.toLowerCase().replace(/\s+/g,'-')}`, desc: "Developer utility" }));
export default function DevTools() { return (
  <main className="max-w-4xl mx-auto p-8">
    <h1 className="text-3xl font-bold mb-2">Developer Tools</h1>
    <p className="text-gray-600 mb-8">15 essential dev utilities</p>
    <div className="grid md:grid-cols-3 gap-3">{tools.map(t=>(
      <Link key={t.href} href={t.href} className="p-4 bg-white rounded-lg border hover:shadow">
        <h3 className="font-medium text-sm">{t.name}</h3>
      </Link>))}</div>
  </main>);}
