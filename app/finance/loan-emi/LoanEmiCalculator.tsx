'use client'

import { useEffect, useState } from 'react'

const currencies = {
  NPR: 'Rs',
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AED: 'د.إ',
} as const

type Currency = keyof typeof currencies

export default function LoanEmiCalculator() {
  const [principal, setPrincipal] = useState(500000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(5)
  const [emi, setEmi] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [currency, setCurrency] = useState<Currency>('NPR')

  const symbol = currencies[currency]

  useEffect(() => {
    const monthlyRate = rate / 12 / 100
    const months = tenure * 12
    const emiCalc = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
    const total = emiCalc * months
    const interest = total - principal

    setEmi(emiCalc)
    setTotalAmount(total)
    setTotalInterest(interest)
  }, [principal, rate, tenure])

  const format = (num: number) => `${symbol} ${Math.round(num).toLocaleString()}`

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">💰 Loan EMI Calculator</h1>
      
      <div className="bg-white p-6 rounded-xl border space-y-4">
        {/* Currency Selector - NEW */}
        <div>
          <label className="text-sm font-medium text-gray-700">Currency</label>
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value as Currency)}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="NPR">{currencies.NPR} - Nepalese Rupee</option>
            <option value="INR">{currencies.INR} - Indian Rupee</option>
            <option value="USD">{currencies.USD} - US Dollar</option>
            <option value="EUR">{currencies.EUR} - Euro</option>
            <option value="GBP">{currencies.GBP} - British Pound</option>
            <option value="AED">{currencies.AED} - UAE Dirham</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Loan Amount</label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-2.5 text-gray-500 text-sm">{symbol}</span>
            <input
              type="number"
              value={principal}
              onChange={e => setPrincipal(Number(e.target.value))}
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Interest Rate (% p.a.)</label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={e => setRate(Number(e.target.value))}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Tenure (years)</label>
            <input
              type="number"
              value={tenure}
              onChange={e => setTenure(Number(e.target.value))}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Results */}
        <div className="pt-6 mt-6 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-700">{format(emi)}</div>
              <div className="text-xs text-gray-600 mt-1">Monthly EMI</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-xl font-bold text-green-700">{format(totalAmount)}</div>
              <div className="text-xs text-gray-600 mt-1">Total Payment</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-xl font-bold text-orange-700">{format(totalInterest)}</div>
              <div className="text-xs text-gray-600 mt-1">Total Interest</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
