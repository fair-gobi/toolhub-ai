'use client'
import { useState } from 'react'
import Link from 'next/link'

const CURRENCIES = ['NPR','INR','USD','EUR','GBP']

export default function ROI() {
  const [invest, setInvest] = useState(100000)
  const [returns, setReturns] = useState(150000)
  const [currency, setCurrency] = useState('NPR')

  const profit = returns - invest
  const roi = invest > 0 ? (profit / invest) * 100 : 0

  const fmt = (n: number) => new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n)

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-purple-600 hover:underline mb-4 inline-block">← Back</Link>
        <div className="bg-white rounded-2xl border border-purple-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-6 text-white">
            <h1 className="text-2xl font-bold">📈 ROI Calculator</h1>
            <p className="text-purple-100 text-sm">Return on Investment percentage</p>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <select value={currency} onChange={e=>setCurrency(e.target.value)} className="w-full p-3 border rounded-xl">
                {CURRENCIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <div>
                <label className="text-sm">Initial Investment</label>
                <input type="number" value={invest} onChange={e=>setInvest(+e.target.value)} className="w-full p-3 border rounded-xl mt-1" />
              </div>
              <div>
                <label className="text-sm">Final Value</label>
                <input type="number" value={returns} onChange={e=>setReturns(+e.target.value)} className="w-full p-3 border rounded-xl mt-1" />
              </div>
            </div>
            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100 text-center flex flex-col justify-center">
              <div className="text-sm text-gray-600">ROI</div>
              <div className={`text-5xl font-bold my-3 ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>{roi.toFixed(1)}%</div>
              <div className="text-sm">Profit: {fmt(profit)}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
