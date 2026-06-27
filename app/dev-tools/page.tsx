import Link from "next/link";
const tools = [
  {name:'JSON Formatter', href:'/dev-tools/json-formatter'},
  {name:'JSON Validator', href:'/dev-tools/json-validator'},
  {name:'XML Formatter', href:'/dev-tools/xml-formatter'},
  {name:'XML Validator', href:'/dev-tools/xml-validator'},
  {name:'HTML Formatter', href:'/dev-tools/html-formatter'},
  {name:'CSS Minifier', href:'/dev-tools/css-minifier'},
  {name:'JS Minifier', href:'/dev-tools/js-minifier'},
  {name:'SQL Formatter', href:'/dev-tools/sql-formatter'},
  {name:'Base64', href:'/dev-tools/base64', desc:'Encode/decode'},
  {name:'URL Encoder', href:'/dev-tools/url-encoder', desc:'Encode URLs'},
  {name:'JWT Decoder', href:'/dev-tools/jwt-decoder', desc:'Decode tokens'},
  {name:'Hash Generator', href:'/dev-tools/hash-generator', desc:'SHA hashes'},
  {name:'UUID Generator', href:'/dev-tools/uuid-generator', desc:'Generate UUIDs'},
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
