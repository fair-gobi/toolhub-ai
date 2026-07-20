'use client'
import { useState } from 'react'

export default function GSTCalculator() {
  const [amt, setAmt] = useState('1000')
  const [rate, setRate] = useState('13')
  const [type, setType] = useState('add')
  const [res, setRes] = useState<any>(null)

  const calc = () => {
    const a = parseFloat(amt), r = parseFloat(rate)
    if (type==='add') {
      const tax = a*r/100, total = a+tax
      setRes({ tax, total, base: a })
    } else {
      const base = a/(1+r/100), tax = a-base
      setRes({ tax, total: a, base })
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">GST/VAT Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Nepal VAT 13% & India GST</p>
        <div className="bg-white p-6 rounded-2xl border">
          <input type="number" value={amt} onChange={e=>setAmt(e.target.value)} className="w-full p-3 border rounded-xl mb-3" placeholder="Amount" />
          <select value={rate} onChange={e=>setRate(e.target.value)} className="w-full p-3 border rounded-xl mb-3">
            <option value="13">13% (Nepal VAT)</option><option value="5">5% GST</option><option value="12">12% GST</option><option value="18">18% GST</option><option value="28">28% GST</option>
          </select>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button onClick={()=>setType('add')} className={`py-2 rounded-lg ${type==='add'?'bg-blue-600 text-white':'bg-gray-100'}`}>Add Tax</button>
            <button onClick={()=>setType('remove')} className={`py-2 rounded-lg ${type==='remove'?'bg-blue-600 text-white':'bg-gray-100'}`}>Remove Tax</button>
          </div>
          <button onClick={calc} className="w-full bg-blue-600 text-white py-3 rounded-xl">Calculate</button>
          {res && (
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-gray-50 rounded">Base: <span>Rs. {res.base.toFixed(2)}</span></div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">Tax: <span>Rs. {res.tax.toFixed(2)}</span></div>
              <div className="flex justify-between p-2 bg-blue-50 rounded font-semibold">Total: <span>Rs. {res.total.toFixed(2)}</span></div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
