'use client'
import { useState } from 'react'
const currencies = [{code:'USD',symbol:'$'},{code:'NPR',symbol:'रू'},{code:'INR',symbol:'₹'},{code:'EUR',symbol:'€'},{code:'GBP',symbol:'£'},{code:'PKR',symbol:'₨'},{code:'BDT',symbol:'৳'}]

export default function CACCalculator(){
  const [spend, setSpend] = useState(10000)
  const [customers, setCustomers] = useState(50)
  const [currency, setCurrency] = useState('USD')
  const curr = currencies.find(c=>c.code===currency)?.symbol||'$'
  const cac = customers ? spend/customers : 0
  
  return (<main className="container mx-auto p-6 max-w-3xl">
    <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl p-6 mb-6"><div className="flex items-center gap-3"><span className="text-4xl">👥</span><div><h1 className="text-2xl font-bold">CAC Calculator</h1><p className="opacity-90">Customer Acquisition Cost</p></div></div></div>
    <div className="bg-white border rounded-xl p-6">
      <select value={currency} onChange={e=>setCurrency(e.target.value)} className="border rounded px-3 py-2 mb-4">{currencies.map(c=><option key={c.code} value={c.code}>{c.code}</option>)}</select>
      <div className="grid md:grid-cols-2 gap-4">
        <div><label className="text-sm">Marketing Spend</label><input type="number" value={spend} onChange={e=>setSpend(Number(e.target.value))} className="w-full border rounded px-3 py-2"/></div>
        <div><label className="text-sm">New Customers</label><input type="number" value={customers} onChange={e=>setCustomers(Number(e.target.value))} className="w-full border rounded px-3 py-2"/></div>
      </div>
      <div className="mt-6 text-center p-6 bg-purple-50 rounded-xl"><p className="text-sm">CAC</p><p className="text-4xl font-bold text-purple-700">{curr}{cac.toFixed(2)}</p><p className="text-xs mt-2">per customer</p></div>
    </div>
  </main>)
}
