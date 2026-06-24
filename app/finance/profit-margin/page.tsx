'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const CURRENCIES = ['NPR','INR','USD','EUR','GBP','JPY','AUD','CAD']
export default function ProfitMargin() {
  useEffect(() => {
    document.title = 'Profit Margin Calculator - Calculate Markup & Margin'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Free profit margin calculator for business. Calculate gross margin and markup percentage.')
  }, [])

export default function ProfitMargin() {
  const [cost, setCost] = useState(100)
  const [price, setPrice] = useState(150)
  const [currency, setCurrency] = useState('NPR')

  const profit = price - cost
  const margin = price > 0 ? (profit / price) * 100 : 0
  const markup = cost > 0 ? (profit / cost) * 100 : 0

  const fmt = (n: number) => new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n)

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-blue-600 hover:underline mb-4 inline-block">← Back to Finance Tools</Link>
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">💹</div>
              <div>
                <h1 className="text-2xl font-bold">Profit Margin Calculator</h1>
                <p className="text-blue-100 text-sm">Calculate gross margin, markup, and profit</p>
              </div>
            </div>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Currency</label>
                <select value={currency} onChange={e=>setCurrency(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl">
                  {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Cost Price: {fmt(cost)}</label>
                <input type="range" min="10" max="10000" value={cost} onChange={e=>setCost(+e.target.value)} className="w-full accent-blue-600" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Selling Price: {fmt(price)}</label>
                <input type="range" min="10" max="20000" value={price} onChange={e=>setPrice(+e.target.value)} className="w-full accent-blue-600" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-semibold mb-4">Results</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4">
                  <div className="text-xs text-gray-500 uppercase">Profit per unit</div>
                  <div className="text-xl font-bold text-green-600 mt-1">{fmt(profit)}</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-xs text-gray-500 uppercase">Profit Margin</div>
                  <div className="text-2xl font-bold text-blue-600 mt-1">{margin.toFixed(1)}%</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-xs text-gray-500 uppercase">Markup</div>
                  <div className="text-xl font-bold mt-1">{markup.toFixed(1)}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}