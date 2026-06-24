'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
const CURRENCIES = ['NPR','INR','USD','EUR','GBP','JPY','AUD','CAD']
export default function InvestmentReturn() {
  useEffect(() => {
    document.title = 'CAGR Calculator - Calculate Investment Returns'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Free CAGR calculator to find annualized returns on stocks, mutual funds, property.')
  }, [])

export default function InvestmentReturn() {
  const [initial, setInitial] = useState(100000)
  const [final, setFinal] = useState(250000)
  const [years, setYears] = useState(5)
  const [currency, setCurrency] = useState('NPR')

  const cagr = (Math.pow(final / initial, 1 / years) - 1) * 100
  const profit = final - initial
  const absReturn = ((final - initial) / initial) * 100

  const fmt = (n: number) => new Intl.NumberFormat('en', { 
    style: 'currency', 
    currency, 
    maximumFractionDigits: 0 
  }).format(n)

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-orange-600 hover:underline mb-4 inline-block">← Back to Finance Tools</Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">📊</div>
              <div>
                <h1 className="text-2xl font-bold">Investment Return Calculator</h1>
                <p className="text-orange-100 text-sm">Calculate CAGR, absolute returns, and profit</p>
              </div>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Currency</label>
                <select value={currency} onChange={e=>setCurrency(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl">
                  {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Initial Investment</label>
                <input type="number" value={initial} onChange={e=>setInitial(+e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Current Value</label>
                <input type="number" value={final} onChange={e=>setFinal(+e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Investment Period (Years)</label>
                <input type="number" value={years} onChange={e=>setYears(+e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
              <h3 className="font-semibold mb-4 text-gray-900">Your Returns</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">CAGR (Annualized)</div>
                  <div className="text-2xl font-bold text-orange-600 mt-1">{cagr.toFixed(2)}%</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Absolute Return</div>
                  <div className="text-2xl font-bold text-green-600 mt-1">{absReturn.toFixed(1)}%</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Total Profit</div>
                  <div className="text-xl font-bold mt-1">{fmt(profit)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6">
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
              <p className="text-sm text-gray-700"><strong>How it works:</strong> {fmt(initial)} grew to {fmt(final)} in {years} years = {cagr.toFixed(2)}% CAGR. This beats inflation if above 6-7%.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}