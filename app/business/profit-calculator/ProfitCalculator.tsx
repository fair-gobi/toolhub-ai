'use client'

import { useState } from 'react'

const currencies = [
  {code:'USD',symbol:'$'},{code:'EUR',symbol:'€'},{code:'GBP',symbol:'£'},
  {code:'INR',symbol:'₹'},{code:'PKR',symbol:'₨'},{code:'BDT',symbol:'৳'},
  {code:'NPR',symbol:'रू'},{code:'LKR',symbol:'Rs'},{code:'BTN',symbol:'Nu.'},
  {code:'MVR',symbol:'Rf'},{code:'AUD',symbol:'A$'},{code:'CAD',symbol:'C$'},
  {code:'SGD',symbol:'S$'},{code:'AED',symbol:'د.إ'},{code:'SAR',symbol:'﷼'},
  {code:'JPY',symbol:'¥'},{code:'CNY',symbol:'¥'},{code:'KRW',symbol:'₩'},
  {code:'THB',symbol:'฿'},{code:'MYR',symbol:'RM'},{code:'IDR',symbol:'Rp'},
  {code:'PHP',symbol:'₱'},{code:'NZD',symbol:'NZ$'},{code:'CHF',symbol:'CHF'},
  {code:'ZAR',symbol:'R'},
]

export default function ProfitCalculator() {
  const [revenue, setRevenue] = useState(10000)
  const [cogs, setCogs] = useState(4000)
  const [expenses, setExpenses] = useState(2000)
  const [currency, setCurrency] = useState('USD')

  const curr = currencies.find(c => c.code === currency)?.symbol || '$'
  const grossProfit = revenue - cogs
  const netProfit = grossProfit - expenses
  const grossMargin = revenue ? (grossProfit / revenue) * 100 : 0
  const netMargin = revenue ? (netProfit / revenue) * 100 : 0

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">💰</span>
          <div>
            <h1 className="text-3xl font-bold">Profit Calculator</h1>
            <p className="opacity-90">Gross profit, net profit & margins instantly</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6">
          <label className="block text-sm font-medium mb-1">Currency</label>
          <select value={currency} onChange={e => setCurrency(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-4">
            {currencies.map(c => <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>)}
          </select>

          <label className="block text-sm font-medium mb-1">Revenue / Sales</label>
          <input type="number" value={revenue} onChange={e => setRevenue(Number(e.target.value))} className="w-full border rounded-lg px-3 py-2 mb-3" />

          <label className="block text-sm font-medium mb-1">Cost of Goods Sold (COGS)</label>
          <input type="number" value={cogs} onChange={e => setCogs(Number(e.target.value))} className="w-full border rounded-lg px-3 py-2 mb-3" />

          <label className="block text-sm font-medium mb-1">Operating Expenses</label>
          <input type="number" value={expenses} onChange={e => setExpenses(Number(e.target.value))} className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Results</h2>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>Gross Profit</span>
              <span className="font-bold text-green-600">{curr}{grossProfit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>Gross Margin</span>
              <span className="font-bold">{grossMargin.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>Net Profit</span>
              <span className="font-bold text-blue-600">{curr}{netProfit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between p-3 bg-cyan-50 rounded border border-cyan-200">
              <span>Net Margin</span>
              <span className="font-bold text-cyan-700">{netMargin.toFixed(1)}%</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm">
            {netMargin > 20 ? '✅ Healthy margin!' : netMargin > 10 ? '⚠️ Average margin' : '❌ Low margin - review costs'}
          </div>
        </div>
      </div>
    </main>
  )
}
