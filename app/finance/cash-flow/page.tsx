'use client'
import { useState } from 'react'
import Link from 'next/link'

const CURRENCIES = ['NPR','INR','USD','EUR','GBP']

export default function CashFlow() {
  const [inflow, setInflow] = useState(200000)
  const [outflow, setOutflow] = useState(150000)
  const [currency, setCurrency] = useState('NPR')

  const net = inflow - outflow
  const fmt = (n: number) => new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n)

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-orange-600 hover:underline mb-4 inline-block">← Back</Link>
        <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6 text-white">
            <h1 className="text-2xl font-bold">💵 Cash Flow Calculator</h1>
            <p className="text-orange-100 text-sm">Monthly inflow vs outflow</p>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <select value={currency} onChange={e=>setCurrency(e.target.value)} className="w-full p-3 border rounded-xl">
                {CURRENCIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <div>
                <label className="text-sm">Monthly Inflow</label>
                <input type="number" value={inflow} onChange={e=>setInflow(+e.target.value)} className="w-full p-3 border rounded-xl mt-1" />
              </div>
              <div>
                <label className="text-sm">Monthly Outflow</label>
                <input type="number" value={outflow} onChange={e=>setOutflow(+e.target.value)} className="w-full p-3 border rounded-xl mt-1" />
              </div>
            </div>
            <div className={`rounded-2xl p-6 border flex flex-col justify-center text-center ${net >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="text-sm text-gray-600">Net Cash Flow</div>
              <div className={`text-4xl font-bold my-2 ${net >= 0 ? 'text-green-600' : 'text-red-600'}`}>{fmt(net)}</div>
              <div className="text-sm">{net >= 0 ? 'Positive ✓' : 'Negative ⚠'}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
