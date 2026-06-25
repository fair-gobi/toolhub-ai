'use client'
import { useState } from 'react'
const currencies = [{code:'NPR',symbol:'रू'},{code:'INR',symbol:'₹'},{code:'USD',symbol:'$'},{code:'EUR',symbol:'€'},{code:'GBP',symbol:'£'},{code:'PKR',symbol:'₨'},{code:'BDT',symbol:'৳'},{code:'LKR',symbol:'Rs'},{code:'AUD',symbol:'A$'},{code:'CAD',symbol:'C$'},{code:'SGD',symbol:'S$'},{code:'AED',symbol:'د.إ'},{code:'SAR',symbol:'﷼'},{code:'JPY',symbol:'¥'},{code:'CNY',symbol:'¥'},{code:'KRW',symbol:'₩'},{code:'THB',symbol:'฿'},{code:'MYR',symbol:'RM'},{code:'IDR',symbol:'Rp'},{code:'PHP',symbol:'₱'},{code:'NZD',symbol:'NZ$'},{code:'CHF',symbol:'CHF'},{code:'ZAR',symbol:'R'},{code:'BTN',symbol:'Nu.'},{code:'MVR',symbol:'Rf'}]

export default function SalaryCalculator(){
  const [gross, setGross] = useState(50000)
  const [tax, setTax] = useState(10)
  const [pf, setPf] = useState(10)
  const [currency, setCurrency] = useState('NPR')
  const curr = currencies.find(c=>c.code===currency)?.symbol||'रू'
  const taxAmt = gross*tax/100
  const pfAmt = gross*pf/100
  const net = gross - taxAmt - pfAmt
  
  return (<main className="container mx-auto p-6 max-w-3xl">
    <div className="bg-gradient-to-r from-slate-600 to-zinc-700 text-white rounded-xl p-6 mb-6"><div className="flex items-center gap-3"><span className="text-4xl">💼</span><div><h1 className="text-2xl font-bold">Salary Calculator</h1><p className="opacity-90">Net take-home pay</p></div></div></div>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white border rounded-xl p-6">
        <select value={currency} onChange={e=>setCurrency(e.target.value)} className="w-full border rounded px-3 py-2 mb-3">{currencies.map(c=><option key={c.code} value={c.code}>{c.code}</option>)}</select>
        <label className="text-sm">Gross Salary</label><input type="number" value={gross} onChange={e=>setGross(Number(e.target.value))} className="w-full border rounded px-3 py-2 mb-3"/>
        <label className="text-sm">Tax %: {tax}</label><input type="range" min="0" max="30" value={tax} onChange={e=>setTax(Number(e.target.value))} className="w-full mb-3"/>
        <label className="text-sm">PF/SSF %: {pf}</label><input type="range" min="0" max="20" value={pf} onChange={e=>setPf(Number(e.target.value))} className="w-full"/>
      </div>
      <div className="bg-white border rounded-xl p-6">
        <div className="text-center mb-4"><p className="text-sm text-gray-600">Net Salary</p><p className="text-3xl font-bold">{curr}{net.toLocaleString()}</p></div>
        <div className="space-y-2 text-sm"><div className="flex justify-between"><span>Gross</span><span>{curr}{gross.toLocaleString()}</span></div><div className="flex justify-between text-red-600"><span>Tax</span><span>-{curr}{taxAmt.toLocaleString()}</span></div><div className="flex justify-between text-orange-600"><span>PF</span><span>-{curr}{pfAmt.toLocaleString()}</span></div></div>
      </div>
    </div>
  </main>)
}
