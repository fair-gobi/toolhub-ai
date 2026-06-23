'use client'
import { useState } from 'react'

export default function EMICalculator() {
  const [p, setP] = useState('1000000')
  const [r, setR] = useState('12')
  const [n, setN] = useState('60')
  const [emi, setEmi] = useState<number|null>(null)

  const calc = () => {
    const principal = parseFloat(p), rate = parseFloat(r)/12/100, months = parseFloat(n)
    const e = principal * rate * Math.pow(1+rate, months) / (Math.pow(1+rate, months)-1)
    setEmi(Math.round(e))
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Loan EMI Calculator</h1>
        <p className="text-gray-600 mb-6">Monthly installment calculator</p>
        <div className="bg-white p-6 rounded-2xl border">
          <div className="space-y-4">
            <div><label className="text-sm">Loan Amount</label><input type="number" value={p} onChange={e=>setP(e.target.value)} className="w-full p-3 border rounded-xl mt-1" /></div>
            <div><label className="text-sm">Interest % per year</label><input type="number" value={r} onChange={e=>setR(e.target.value)} className="w-full p-3 border rounded-xl mt-1" /></div>
            <div><label className="text-sm">Tenure (months)</label><input type="number" value={n} onChange={e=>setN(e.target.value)} className="w-full p-3 border rounded-xl mt-1" /></div>
          </div>
          <button onClick={calc} className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl">Calculate EMI</button>
          {emi && <div className="mt-6 p-4 bg-green-50 rounded-xl text-center"><div className="text-3xl font-bold">Rs. {emi.toLocaleString()}</div><div className="text-sm text-gray-600">per month</div></div>}
        </div>
      </div>
    </main>
  )
}
