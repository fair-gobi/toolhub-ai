'use client'
import { useState, useEffect } from 'react'

const currencies = {
  NPR: 'Rs',
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AED: 'د.إ',
} as const

type Currency = keyof typeof currencies

export default function InflationCalculator() {
  const [amount, setAmount] = useState(100000)
  const [inflation, setInflation] = useState(6)
  const [years, setYears] = useState(10)
  const [futureValue, setFutureValue] = useState(0)
  const [currency, setCurrency] = useState<Currency>('NPR')

  const symbol = currencies[currency]

  useEffect(() => {
    const fv = amount * Math.pow(1 + inflation / 100, years)
    setFutureValue(fv)
  }, [amount, inflation, years])

  const format = (num: number) => `${symbol} ${Math.round(num).toLocaleString()}`
  const purchasingPower = amount - (amount * 100 / (100 + inflation * years / 2))

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">📈 Inflation Calculator</h1>
          <p className="text-gray-600">See how inflation erodes your money's value</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          {/* Currency */}
          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700">Currency</label>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value as Currency)}
              className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(currencies).map(([code, sym]) => (
                <option key={code} value={code}>{sym} {code}</option>
              ))}
            </select>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">Today's Amount</label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-2.5 text-gray-500">{symbol}</span>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Inflation Rate (% per year)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inflation}
                  onChange={e => setInflation(Number(e.target.value))}
                  className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Time Period (years)</label>
                <input
                  type="number"
                  value={years}
                  onChange={e => setYears(Number(e.target.value))}
                  className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mt-8 pt-6 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-xl p-5 text-center">
                <div className="text-2xl font-bold text-red-700">{format(futureValue)}</div>
                <div className="text-xs text-gray-600 mt-1">You'll need in {years} years</div>
                <div className="text-xs text-gray-500 mt-1">to buy what {format(amount)} buys today</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-5 text-center">
                <div className="text-2xl font-bold text-orange-700">{format(futureValue - amount)}</div>
                <div className="text-xs text-gray-600 mt-1">Extra money needed</div>
                <div className="text-xs text-gray-500 mt-1">due to inflation</div>
              </div>
            </div>

            <div className="mt-5 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Purchasing power loss</span>
                <span className="font-medium text-red-600">
                  {((futureValue - amount) / futureValue * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Nepal average inflation: 6-8% • India: 5-6% • US: 2-3%
          </p>
        </div>
      </div>
    </main>
  )
}
