'use client'
import { useState, useMemo } from 'react'

const CURRENCIES = [
  'NPR','INR','USD','EUR','GBP','JPY','AUD','CAD','CHF','CNY',
  'SGD','AED','SAR','PKR','BDT','IDR','MYR','THB','PHP','VND',
  'KRW','ZAR','BRL','MXN','TRY','RUB'
]

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState(5000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)
  const [currency, setCurrency] = useState('NPR')

  const result = useMemo(() => {
    const r = rate / 100 / 12
    const n = years * 12
    const fv = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
    const invested = monthly * n
    return { fv, invested, gains: fv - invested }
  }, [monthly, rate, years])

  const fmt = (v: number) => new Intl.NumberFormat('en', { 
    style: 'currency', 
    currency,
    maximumFractionDigits: 0 
  }).format(v)

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">SIP Calculator</h1>
        
        <div className="bg-white p-6 rounded-2xl border mb-6 space-y-4">
          <div>
            <label className="text-sm text-gray-600">Currency</label>
            <select value={currency} onChange={e=>setCurrency(e.target.value)} className="w-full mt-1 p-3 border rounded-lg">
              {CURRENCIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600">Monthly Investment: {fmt(monthly)}</label>
            <input type="range" min="500" max="100000" step="500" value={monthly} onChange={e=>setMonthly(+e.target.value)} className="w-full" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Expected Return: {rate}%</label>
            <input type="range" min="1" max="30" step="0.5" value={rate} onChange={e=>setRate(+e.target.value)} className="w-full" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Time Period: {years} years</label>
            <input type="range" min="1" max="40" value={years} onChange={e=>setYears(+e.target.value)} className="w-full" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-gray-600">Invested</div>
              <div className="text-xl font-bold">{fmt(result.invested)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Est. Returns</div>
              <div className="text-xl font-bold text-green-600">{fmt(result.gains)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Total Value</div>
              <div className="text-xl font-bold text-blue-600">{fmt(result.fv)}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
