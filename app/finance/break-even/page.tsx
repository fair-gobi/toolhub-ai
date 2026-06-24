'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const CURRENCIES = ['NPR','INR','USD','EUR','GBP']

export default function BreakEven() {
  useEffect(() => {
    document.title = 'Break Even Calculator - Find Break Even Point'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Calculate break-even point for business. How many units to sell to cover costs.')
  }, [])

export default function BreakEven() {
  const [fixed, setFixed] = useState(50000)
  const [variable, setVariable] = useState(100)
  const [price, setPrice] = useState(250)
  const [currency, setCurrency] = useState('NPR')

  const units = price > variable ? fixed / (price - variable) : 0
  const revenue = units * price

  const fmt = (n: number) => new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n)

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-green-600 hover:underline mb-4 inline-block">← Back</Link>
        <div className="bg-white rounded-2xl border border-green-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
            <h1 className="text-2xl font-bold flex items-center gap-2">⚖️ Break-even Calculator</h1>
            <p className="text-green-100 text-sm">Find units needed to cover all costs</p>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <select value={currency} onChange={e=>setCurrency(e.target.value)} className="w-full p-3 border rounded-xl">
                {CURRENCIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <div>
                <label className="text-sm">Fixed Costs (monthly)</label>
                <input type="number" value={fixed} onChange={e=>setFixed(+e.target.value)} className="w-full p-3 border rounded-xl mt-1" />
              </div>
              <div>
                <label className="text-sm">Variable Cost per Unit</label>
                <input type="number" value={variable} onChange={e=>setVariable(+e.target.value)} className="w-full p-3 border rounded-xl mt-1" />
              </div>
              <div>
                <label className="text-sm">Selling Price per Unit</label>
                <input type="number" value={price} onChange={e=>setPrice(+e.target.value)} className="w-full p-3 border rounded-xl mt-1" />
              </div>
            </div>
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100 flex flex-col justify-center text-center">
              <div className="text-sm text-gray-600">Break-even Point</div>
              <div className="text-5xl font-bold text-green-600 my-3">{Math.ceil(units)}</div>
              <div className="text-sm text-gray-600">units</div>
              <div className="mt-4 pt-4 border-t border-green-200">
                <div className="text-xs text-gray-500">Revenue needed</div>
                <div className="font-semibold">{fmt(revenue)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}