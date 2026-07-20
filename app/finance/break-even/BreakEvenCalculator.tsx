'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const currencies = [
  { code: 'INR', symbol: '₹', locale: 'en-IN', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', locale: 'en-US', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', locale: 'de-DE', name: 'Euro' },
  { code: 'GBP', symbol: '£', locale: 'en-GB', name: 'British Pound' },
  { code: 'NPR', symbol: '₨', locale: 'en-IN', name: 'Nepali Rupee' },
  { code: 'JPY', symbol: '¥', locale: 'ja-JP', name: 'Japanese Yen' },
]

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState(50000)
  const [variableCostPerUnit, setVariableCostPerUnit] = useState(200)
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState(500)
  const [currency, setCurrency] = useState(currencies[0])
  
  const [breakEvenUnits, setBreakEvenUnits] = useState(0)
  const [breakEvenSales, setBreakEvenSales] = useState(0)
  const [contributionMargin, setContributionMargin] = useState(0)
  const [contributionMarginPercent, setContributionMarginPercent] = useState(0)

  useEffect(() => {
    const fixed = Number(fixedCosts)
    const variable = Number(variableCostPerUnit)
    const price = Number(sellingPricePerUnit)

    if (price > variable && fixed >= 0) {
      const cm = price - variable
      const cmPercent = (cm / price) * 100
      const beUnits = fixed / cm
      const beSales = beUnits * price

      setContributionMargin(Math.round(cm))
      setContributionMarginPercent(Number(cmPercent.toFixed(1)))
      setBreakEvenUnits(Math.ceil(beUnits))
      setBreakEvenSales(Math.round(beSales))
    } else {
      setBreakEvenUnits(0)
      setBreakEvenSales(0)
      setContributionMargin(0)
      setContributionMarginPercent(0)
    }
  }, [fixedCosts, variableCostPerUnit, sellingPricePerUnit])

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: currency.code === 'JPY'? 0 : 0
    }).format(num)
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <Link href="/finance" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 inline-block">
          ← Back to Finance Tools
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Break-Even Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate how many units you need to sell to cover all your costs</p>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Inputs */}
          <section aria-labelledby="be-inputs-heading">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 id="be-inputs-heading" className="text-xl font-semibold">Business Costs</h2>
                
                {/* Currency Selector */}
                <select
                  value={currency.code}
                  onChange={(e) => setCurrency(currencies.find(c => c.code === e.target.value) || currencies[0])}
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {currencies.map(c => (
                    <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="fixed-costs" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Fixed Costs (Monthly): {formatCurrency(fixedCosts)}
                  </label>
                  <input
                    id="fixed-costs"
                    type="range"
                    min="1000"
                    max="500000"
                    step="1000"
                    value={fixedCosts}
                    onChange={(e) => setFixedCosts(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Rent, salaries, insurance, etc.</p>
                </div>

                <div>
                  <label htmlFor="variable-cost" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Variable Cost per Unit: {formatCurrency(variableCostPerUnit)}
                  </label>
                  <input
                    id="variable-cost"
                    type="range"
                    min="10"
                    max="5000"
                    step="10"
                    value={variableCostPerUnit}
                    onChange={(e) => setVariableCostPerUnit(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Materials, packaging, commission</p>
                </div>

                <div>
                  <label htmlFor="selling-price" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Selling Price per Unit: {formatCurrency(sellingPricePerUnit)}
                  </label>
                  <input
                    id="selling-price"
                    type="range"
                    min="10"
                    max="10000"
                    step="10"
                    value={sellingPricePerUnit}
                    onChange={(e) => setSellingPricePerUnit(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Price you charge customers</p>
                </div>

                {sellingPricePerUnit <= variableCostPerUnit && (
                  <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-700 dark:text-red-400">⚠ Selling price must be higher than variable cost to break even</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Results */}
          <section aria-labelledby="be-results-heading">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900 rounded-2xl p-6 shadow-sm">
              <h2 id="be-results-heading" className="text-xl font-semibold mb-6">Break-Even Analysis</h2>
              
              <div className="space-y-5">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Break-Even Point</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{breakEvenUnits.toLocaleString(currency.locale)} units</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Units you must sell</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Break-Even Sales</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(breakEvenSales)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Revenue needed to break even</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Contribution Margin</p>
                    <p className="text-lg font-semibold">{formatCurrency(contributionMargin)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">per unit</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Margin %</p>
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{contributionMarginPercent}%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">of selling price</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-blue-200 dark:border-blue-800">
                  <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Profit at different sales levels:</h3>
                  <div className="space-y-2 text-sm">
                    {[
                      Math.floor(breakEvenUnits * 0.5),
                      breakEvenUnits,
                      Math.ceil(breakEvenUnits * 1.5),
                      Math.ceil(breakEvenUnits * 2)
                    ].map((units) => {
                      const profit = (units * contributionMargin) - fixedCosts
                      return (
                        <div key={units} className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{units.toLocaleString(currency.locale)} units:</span>
                          <span className={profit >= 0? 'text-green-600 dark:text-green-400 font-medium' : 'text-red-600 dark:text-red-400 font-medium'}>
                            {formatCurrency(profit)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}
