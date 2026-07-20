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

export default function PricingCalculator() {
  const [cost, setCost] = useState(500)
  const [margin, setMargin] = useState(40)
  const [tax, setTax] = useState(13)
  const [currency, setCurrency] = useState('NPR')

  const curr = currencies.find(c => c.code === currency)?.symbol || 'रू'
  
  // Calculations
  const profit = cost * (margin / 100)
  const priceBeforeTax = cost + profit
  const taxAmount = priceBeforeTax * (tax / 100)
  const finalPrice = priceBeforeTax + taxAmount
  const markup = cost ? ((priceBeforeTax - cost) / cost) * 100 : 0

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <div className="bg-gradient-to-r from-slate-700 to-gray-800 text-white rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🏷️</span>
          <div>
            <h1 className="text-3xl font-bold">Pricing Calculator</h1>
            <p className="opacity-90">Set perfect prices with margin & tax</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6">
          <label className="block text-sm font-medium mb-1">Currency</label>
          <select value={currency} onChange={e => setCurrency(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-4">
            {currencies.map(c => <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>)}
          </select>

          <label className="block text-sm font-medium mb-1">Product Cost</label>
          <input type="number" value={cost} onChange={e => setCost(Number(e.target.value))} className="w-full border rounded-lg px-3 py-2 mb-4" />

          <label className="block text-sm font-medium mb-1">Desired Profit Margin: {margin}%</label>
          <input type="range" min="5" max="200" value={margin} onChange={e => setMargin(Number(e.target.value))} className="w-full mb-2" />
          
          <label className="block text-sm font-medium mb-1 mt-4">Tax / VAT: {tax}%</label>
          <input type="range" min="0" max="28" value={tax} onChange={e => setTax(Number(e.target.value))} className="w-full" />
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Your Price</h2>
          
          <div className="text-center p-6 bg-slate-50 rounded-xl mb-4">
            <p className="text-sm text-gray-600">Final Selling Price</p>
            <p className="text-4xl font-bold text-slate-800">{curr}{finalPrice.toFixed(0)}</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b">
              <span>Cost</span>
              <span>{curr}{cost}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Profit ({margin}%)</span>
              <span className="text-green-600">+{curr}{profit.toFixed(0)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Price before tax</span>
              <span>{curr}{priceBeforeTax.toFixed(0)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Tax ({tax}%)</span>
              <span className="text-orange-600">+{curr}{taxAmount.toFixed(0)}</span>
            </div>
            <div className="flex justify-between py-2 font-medium">
              <span>Markup</span>
              <span>{markup.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
