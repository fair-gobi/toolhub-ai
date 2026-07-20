'use client'
import { useState } from 'react'
const currencies = [{code:'USD',symbol:'$'},{code:'NPR',symbol:'रू'},{code:'INR',symbol:'₹'},{code:'EUR',symbol:'€'}]

export default function LTVCalculator(){
  const [avg, setAvg] = useState(100)
  const [freq, setFreq] = useState(12)
  const [years, setYears] = useState(3)
  const [currency, setCurrency] = useState('USD')
  const curr = currencies.find(c=>c.code===currency)?.symbol||'$'
  const ltv = avg * freq * years
  
  return (<main className="container mx-auto p-6 max-w-3xl">
    <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl p-6 mb-6"><div className="flex items-center gap-3"><span className="text-4xl">💎</span><div><h1 className="text-2xl font-bold">LTV Calculator</h1></div></div></div>
    <div className="bg-white border rounded-xl p-6">
      <select value={currency} onChange={e=>setCurrency(e.target.value)} className="border rounded px-3 py-2 mb-4">{currencies.map(c=><option key={c.code} value={c.code}>{c.code}</option>)}</select>
      <div className="grid grid-cols-3 gap-3">
        <div><label className="text-xs">Avg Order</label><input type="number" value={avg} onChange={e=>setAvg(Number(e.target.value))} className="w-full border rounded px-2 py-2"/></div>
        <div><label className="text-xs">Orders/Year</label><input type="number" value={freq} onChange={e=>setFreq(Number(e.target.value))} className="w-full border rounded px-2 py-2"/></div>
        <div><label className="text-xs">Years</label><input type="number" value={years} onChange={e=>setYears(Number(e.target.value))} className="w-full border rounded px-2 py-2"/></div>
      </div>
      <div className="mt-6 text-center p-6 bg-amber-50 rounded-xl"><p>LTV</p><p className="text-4xl font-bold text-amber-700">{curr}{ltv.toLocaleString()}</p></div>
    </div>
  </main>)
}
