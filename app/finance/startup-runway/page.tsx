'use client'
import { useState } from 'react'
import Link from 'next/link'

const CURRENCIES = ['NPR','INR','USD','EUR','GBP']

export default function Runway() {
  const [cash, setCash] = useState(5000000)
  const [burn, setBurn] = useState(300000)
  const [currency, setCurrency] = useState('NPR')

  const months = burn > 0 ? cash / burn : 0
  const endDate = new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000)
  const fmt = (n: number) => new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n)

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-pink-600 hover:underline mb-4 inline-block">← Back</Link>
        <div className="bg-white rounded-2xl border border-pink-100 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-600 to-rose-600 p-6 text-white">
            <h1 className="text-2xl font-bold">🚀 Startup Runway Calculator</h1>
            <p className="text-pink-100 text-sm">Months until cash runs out</p>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <select value={currency} onChange={e=>setCurrency(e.target.value)} className="w-full p-3 border rounded-xl">
                {CURRENCIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <div>
                <label className="text-sm">Cash in Bank</label>
                <input type="number" value={cash} onChange={e=>setCash(+e.target.value)} className="w-full p-3 border rounded-xl mt-1" />
              </div>
              <div>
                <label className="text-sm">Monthly Burn Rate</label>
                <input type="number" value={burn} onChange={e=>setBurn(+e.target.value)} className="w-full p-3 border rounded-xl mt-1" />
              </div>
            </div>
            <div className="bg-pink-50 rounded-2xl p-6 border border-pink-100 text-center flex flex-col justify-center">
              <div className="text-sm text-gray-600">Runway</div>
              <div className="text-5xl font-bold text-pink-600 my-2">{months.toFixed(1)}</div>
              <div className="text-sm text-gray-600">months</div>
              <div className="mt-3 text-xs text-gray-500">Cash out: {endDate.toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
