'use client'
import { useState } from 'react'
const currencies = [{code:'USD',symbol:'$'},{code:'NPR',symbol:'रू'},{code:'INR',symbol:'₹'}]

export default function LeadValue(){
  const [value, setValue] = useState(1000)
  const [rate, setRate] = useState(5)
  const [currency, setCurrency] = useState('USD')
  const curr = currencies.find(c=>c.code===currency)?.symbol||'$'
  const leadValue = value * (rate/100)
  
  return (<main className="container mx-auto p-6 max-w-3xl">
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl p-6 mb-6"><div className="flex items-center gap-3"><span className="text-4xl">🎯</span><div><h1 className="text-2xl font-bold">Lead Value Calculator</h1></div></div></div>
    <div className="bg-white border rounded-xl p-6">
      <select value={currency} onChange={e=>setCurrency(e.target.value)} className="border rounded px-3 py-2 mb-4">{currencies.map(c=><option key={c.code} value={c.code}>{c.code}</option>)}</select>
      <div className="grid md:grid-cols-2 gap-4">
        <div><label className="text-sm">Customer Value</label><input type="number" value={value} onChange={e=>setValue(Number(e.target.value))} className="w-full border rounded px-3 py-2"/></div>
        <div><label className="text-sm">Close Rate %: {rate}</label><input type="range" min="1" max="50" value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full"/></div>
      </div>
      <div className="mt-6 text-center p-6 bg-emerald-50 rounded-xl"><p>Each Lead Worth</p><p className="text-4xl font-bold text-emerald-700">{curr}{leadValue.toFixed(2)}</p></div>
    </div>
  </main>)
}
