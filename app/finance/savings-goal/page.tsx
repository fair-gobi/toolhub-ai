'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function SavingsGoal() {
  const [target, setTarget] = useState(2000000)
  const [years, setYears] = useState(5)
  const [rate, setRate] = useState(10)

  const monthly = target * (rate/1200) / ((Math.pow(1 + rate/1200, years*12) - 1) * (1 + rate/1200))
  const fmt = (n: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n)

  return (
    <main className="min-h-screen bg-teal-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/finance" className="text-teal-600 text-sm">← Back</Link>
        <h1 className="text-2xl font-bold mt-4 mb-2">🎯 Savings Goal</h1>
        
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div>
            <label className="text-sm">Target: ₹{fmt(target)}</label>
            <input type="range" min="100000" max="10000000" step="50000" value={target} onChange={e=>setTarget(+e.target.value)} className="w-full" />
          </div>
          <div>
            <label className="text-sm">Years: {years}</label>
            <input type="range" min="1" max="30" value={years} onChange={e=>setYears(+e.target.value)} className="w-full" />
          </div>
          <div>
            <label className="text-sm">Return: {rate}%</label>
            <input type="range" min="5" max="18" value={rate} onChange={e=>setRate(+e.target.value)} className="w-full" />
          </div>
        </div>

        <div className="bg-teal-600 text-white p-8 rounded-xl mt-6 text-center">
          <div className="text-sm opacity-90">Save monthly</div>
          <div className="text-4xl font-bold my-2">₹{fmt(monthly)}</div>
          <div className="text-sm opacity-75">for {years} years</div>
        </div>
      </div>
    </main>
  )
}
