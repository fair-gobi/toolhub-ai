import Link from "next/link";
const tools = [
  {name:"Loan EMI",href:"/loan-emi",icon:"??",desc:"Nepal"},
  {name:"Currency Converter",href:"/currency-converter",icon:"??",desc:"Live NPR"},
  {name:"Nepal Tax 2026",href:"/tax-calculator-nepal",icon:"??",desc:"New slabs"},
  {name:"SIP Calculator",href:"/sip-calculator",icon:"??",desc:"Nepal"},
  {name:"Budget Planner",href:"/budget-planner",icon:"??",desc:"50/30/20"},
  {name:"Compound Interest",href:"/compound-interest",icon:"??",desc:"Worldwide"},
  {name:"Retirement",href:"/retirement-calculator",icon:"??",desc:"401k style"},
  {name:"Mortgage",href:"/mortgage-calculator",icon:"??",desc:"US/UK"},
  {name:"Inflation",href:"/inflation-calculator",icon:"??",desc:"Purchasing power"},
  {name:"Crypto",href:"/crypto-converter",icon:"?",desc:"BTC/ETH live"},
  {name:"APR Compare",href:"/apr-calculator",icon:"??",desc:"True cost"},
];
export default function Page(){return(<main className="max-w-6xl mx-auto p-6"><Link href="/" className="text-blue-600">? Home</Link><h1 className="text-4xl font-bold mt-4 mb-6">?? Finance Tools (11)</h1><div className="grid md:grid-cols-3 gap-4">{tools.map(t=><Link key={t.href} href={t.href} className="p-6 bg-white rounded-xl border hover:shadow-lg"><div className="text-3xl">{t.icon}</div><div className="font-bold mt-2">{t.name}</div><div className="text-sm text-gray-500">{t.desc}</div></Link>)}</div></main>)}
