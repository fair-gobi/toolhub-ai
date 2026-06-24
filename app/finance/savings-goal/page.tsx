'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
const CURRENCIES = ['NPR','INR','USD','EUR','GBP','JPY','AUD','CAD']
export default function SavingsGoal() {
  useEffect(() => {
    document.title = 'Savings Goal Calculator - How Much to Save Monthly'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Reverse SIP calculator. Enter target amount to find exact monthly savings needed.')
  }, [])

export default function SavingsGoal() {
  const [target, setTarget] = useState(2000000)
  const [years, setYears] = useState(5)
  const [rate, setRate] = useState(10)
  const [currency, setCurrency] = useState('NPR')

  const monthly = target * (rate/1200) / ((Math.pow(1 + rate/1200, years*12) - 1) * (1 + rate/1200))
  
  const fmt = (n: number) => new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n)

  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-teal-600 hover:underline mb-4 inline-block">← Back</Link>
        
        <div className="bg-white rounded-2xl border border-teal-100 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">🎯</div>
              <div>
                <h1 className="text-2xl font-bold">Savings Goal Calculator</h1>
                <p className="text-teal-100 text-sm">Find monthly SIP needed to reach your target</p>
              </div>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <select value={currency} onChange={e=>setCurrency(e.target.value)} className="w-full p-3 border rounded-xl">
                {CURRENCIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <div>
                <label className="text-sm font-medium">Target Amount: {fmt(target)}</label>
                <input type="range" min="100000" max="10000000" step="50000" value={target} onChange={e=>setTarget(+e.target.value)} className="w-full accent-teal-600" />
              </div>
              <div>
                <label className="text-sm font-medium">Years: {years}</label>
                <input type="range" min="1" max="30" value={years} onChange={e=>setYears(+e.target.value)} className="w-full accent-teal-600" />
              </div>
              <div>
                <label className="text-sm font-medium">Expected Return: {rate}%</label>
                <input type="range" min="5" max="18" value={rate} onChange={e=>setRate(+e.target.value)} className="w-full accent-teal-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100 flex items-center">
              <div className="w-full text-center">
                <div className="text-sm text-gray-600 mb-2">Monthly Investment Needed</div>
                <div className="text-4xl font-bold text-teal-600">{fmt(monthly)}</div>
                <div className="text-xs text-gray-500 mt-2">Total invested: {fmt(monthly * years * 12)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
