'use client'
import { useState } from 'react'

const currencies = [
  {code:'NPR',symbol:'रू'},{code:'INR',symbol:'₹'},{code:'USD',symbol:'$'},
  {code:'PKR',symbol:'₨'},{code:'BDT',symbol:'৳'},{code:'EUR',symbol:'€'},
]

export default function SalesForecast() {
  const [current, setCurrent] = useState(100000)
  const [growth, setGrowth] = useState(10)
  const [months, setMonths] = useState(6)
  const [currency, setCurrency] = useState('NPR')

  const curr = currencies.find(c => c.code === currency)?.symbol || 'रू'
  
  const forecast = Array.from({length: months}, (_, i) => {
    const amount = current * Math.pow(1 + growth/100, i+1)
    return { month: i+1, amount }
  })

  const total = forecast.reduce((s, f) => s + f.amount, 0)

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">📈</span>
          <div>
            <h1 className="text-3xl font-bold">Sales Forecast</h1>
            <p className="opacity-90">Predict next 12 months revenue</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm">Current Monthly Sales</label>
          <input type="number" value={current} onChange={e => setCurrent(Number(e.target.value))} className="w-full border rounded-lg px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-sm">Growth % per month</label>
          <input type="number" value={growth} onChange={e => setGrowth(Number(e.target.value))} className="w-full border rounded-lg px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-sm">Currency</label>
          <select value={currency} onChange={e => setCurrency(e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1">
            {currencies.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">Forecast</h2>
          <select value={months} onChange={e => setMonths(Number(e.target.value))} className="border rounded px-2 py-1 text-sm">
            <option value={3}>3 months</option>
            <option value={6}>6 months</option>
            <option value={12}>12 months</option>
          </select>
        </div>

        {forecast.map(f => (
          <div key={f.month} className="flex justify-between py-2 border-b">
            <span>Month {f.month}</span>
            <span className="font-medium">{curr}{Math.round(f.amount).toLocaleString()}</span>
          </div>
        ))}

        <div className="flex justify-between pt-3 mt-3 border-t-2 font-bold">
          <span>Total Forecast</span>
          <span className="text-indigo-600">{curr}{Math.round(total).toLocaleString()}</span>
        </div>
      </div>
    </main>
  )
}
