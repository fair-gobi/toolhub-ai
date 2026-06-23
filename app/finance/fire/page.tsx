'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function FIRE() {
  const [expenses, setExpenses] = useState(600000)
  const [current, setCurrent] = useState(1000000)
  const [monthly, setMonthly] = useState(50000)
  const [rate, setRate] = useState(12)

  const fireNumber = expenses * 25
  const years = Math.log((fireNumber * rate/1200 + monthly) / (current * rate/1200 + monthly)) / Math.log(1 + rate/1200) / 12

  const fmt = (n: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n)

  return (
    <main className="min-h-screen bg-pink-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/finance" className="text-pink-600 text-sm">← Back</Link>
        <h1 className="text-2xl font-bold mt-4 mb-2">🔥 FIRE Calculator</h1>
        <p className="text-gray-600 mb-6">Financial Independence Retire Early</p>
        
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div>
            <label className="text-sm">Annual Expenses: ₹{fmt(expenses)}</label>
            <input type="range" min="100000" max="5000000" step="50000" value={expenses} onChange={e=>setExpenses(+e.target.value)} className="w-full" />
          </div>
          <div>
            <label className="text-sm">Current Savings: ₹{fmt(current)}</label>
            <input type="range" min="0" max="10000000" step="100000" value={current} onChange={e=>setCurrent(+e.target.value)} className="w-full" />
          </div>
          <div>
            <label className="text-sm">Monthly Saving: ₹{fmt(monthly)}</label>
            <input type="range" min="5000" max="200000" step="5000" value={monthly} onChange={e=>setMonthly(+e.target.value)} className="w-full" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-6 rounded-xl mt-6 text-center">
          <div className="text-sm opacity-90">FIRE Number (25x expenses)</div>
          <div className="text-3xl font-bold my-2">₹{fmt(fireNumber)}</div>
          <div className="text-sm">Years to FIRE: {years > 0 ? years.toFixed(1) : '0'}</div>
        </div>
      </div>
    </main>
  )
}
