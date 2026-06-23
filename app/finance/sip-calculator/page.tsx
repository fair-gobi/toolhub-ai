'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'

const CURRENCIES = ['NPR','INR','USD','EUR','GBP','JPY','AUD','CAD','CHF','CNY','SGD','AED','SAR','PKR','BDT','IDR','MYR','THB','PHP','VND','KRW','ZAR','BRL','MXN']

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

  const fmt = (v: number) => new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 0 }).format(v)

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-blue-600 hover:underline mb-4 inline-block">← Back to Finance Tools</Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-2xl">📈</div>
              <div>
                <h1 className="text-2xl font-bold">SIP Calculator</h1>
                <p className="text-blue-100 text-sm">Systematic Investment Plan returns calculator</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Currency</label>
                  <select value={currency} onChange={e=>setCurrency(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Monthly Investment: <span className="text-blue-600 font-bold">{fmt(monthly)}</span></label>
                  <input type="range" min="500" max="100000" step="500" value={monthly} onChange={e=>setMonthly(+e.target.value)} className="w-full accent-blue-600" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1"><span>500</span><span>1,00,000</span></div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Expected Annual Return: <span className="text-blue-600 font-bold">{rate}%</span></label>
                  <input type="range" min="1" max="30" step="0.5" value={rate} onChange={e=>setRate(+e.target.value)} className="w-full accent-blue-600" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Investment Period: <span className="text-blue-600 font-bold">{years} years</span></label>
                  <input type="range" min="1" max="40" value={years} onChange={e=>setYears(+e.target.value)} className="w-full accent-blue-600" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-semibold mb-4 text-gray-900">Results</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Total Invested</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">{fmt(result.invested)}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Estimated Returns</div>
                    <div className="text-2xl font-bold text-green-600 mt-1">{fmt(result.gains)}</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-4 text-white shadow-lg">
                    <div className="text-xs uppercase tracking-wide opacity-90">Total Value</div>
                    <div className="text-3xl font-bold mt-1">{fmt(result.fv)}</div>
                    <div className="text-xs opacity-75 mt-1">After {years} years</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h4 className="font-medium text-sm mb-2 text-blue-900">💡 How SIP works</h4>
              <p className="text-sm text-gray-700">SIP invests a fixed amount monthly. With {rate}% annual return, your {fmt(monthly)}/month grows to {fmt(result.fv)} in {years} years through compounding. Start early for maximum benefit.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}