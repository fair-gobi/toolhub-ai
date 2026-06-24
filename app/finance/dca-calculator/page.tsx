'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const CURRENCIES = ['NPR','INR','USD','EUR','GBP','JPY','AUD','CAD','CHF','CNY','SGD','AED']
export default function DCA() {
  useEffect(() => {
    document.title = 'DCA Calculator - Dollar Cost Averaging Calculator'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Dollar cost averaging calculator for crypto and stocks. See returns from regular investing.')
  }, [])

  const [amount, setAmount] = useState(100)
  const [freq, setFreq] = useState(12)
  const [years, setYears] = useState(3)
  const [startPrice, setStartPrice] = useState(30000)
  const [endPrice, setEndPrice] = useState(45000)

  const totalInvested = amount * freq * years
  const avgPrice = (startPrice + endPrice) / 2
  const coins = totalInvested / avgPrice
  const finalValue = coins * endPrice
  const profit = finalValue - totalInvested

  return (
    <main className="min-h-screen bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-blue-600 hover:underline mb-4 inline-block">← Back</Link>
        <div className="bg-white rounded-2xl border border-blue-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
            <h1 className="text-2xl font-bold">📉 DCA Calculator</h1>
            <p className="text-blue-100 text-sm">Dollar Cost Averaging returns</p>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <input type="number" value={amount} onChange={e=>setAmount(+e.target.value)} placeholder="Amount per buy" className="w-full p-3 border rounded-xl" />
              <input type="number" value={freq} onChange={e=>setFreq(+e.target.value)} placeholder="Buys per year" className="w-full p-3 border rounded-xl" />
              <input type="number" value={years} onChange={e=>setYears(+e.target.value)} placeholder="Years" className="w-full p-3 border rounded-xl" />
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="text-center">
                <div className="text-sm">Total Invested</div>
                <div className="text-2xl font-bold">${totalInvested.toLocaleString()}</div>
                <div className="mt-3 text-sm">Final Value</div>
                <div className="text-2xl font-bold text-green-600">${finalValue.toFixed(0)}</div>
                <div className="text-xs mt-2">Profit: ${profit.toFixed(0)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
