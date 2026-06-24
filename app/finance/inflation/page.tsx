'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const CURRENCIES = ['NPR','INR','USD','EUR']
export default function Inflation() {
  useEffect(() => {
    document.title = 'Inflation Calculator Nepal India - Future Value of Money'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Calculate inflation impact. See how much money you will need in future with inflation.')
  }, [])
export default function Inflation() {
  const [amount, setAmount] = useState(100000)
  const [rate, setRate] = useState(6)
  const [years, setYears] = useState(10)

  const future = amount * Math.pow(1 + rate/100, years)
  const loss = future - amount

  return (
    <main className="min-h-screen bg-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-red-600 hover:underline mb-4 inline-block">← Back</Link>
        <div className="bg-white rounded-2xl border border-red-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 p-6 text-white">
            <h1 className="text-2xl font-bold">📉 Inflation Calculator</h1>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <input type="number" value={amount} onChange={e=>setAmount(+e.target.value)} placeholder="Today's amount" className="w-full p-3 border rounded-xl" />
              <input type="number" value={rate} onChange={e=>setRate(+e.target.value)} placeholder="Inflation %" className="w-full p-3 border rounded-xl" />
              <input type="number" value={years} onChange={e=>setYears(+e.target.value)} placeholder="Years" className="w-full p-3 border rounded-xl" />
            </div>
            <div className="bg-red-50 rounded-xl p-6 text-center">
              <div className="text-sm">Future cost</div>
              <div className="text-3xl font-bold text-red-600 my-2">₹{Math.round(future).toLocaleString()}</div>
              <div className="text-xs">You'll need {((future/amount-1)*100).toFixed(0)}% more</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
