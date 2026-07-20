'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const currencies = [
  // South Asian - 7 countries
  { code: 'INR', symbol: '₹', locale: 'en-IN', name: 'Indian Rupee' },
  { code: 'NPR', symbol: '₨', locale: 'ne-NP', name: 'Nepali Rupee' },
  { code: 'PKR', symbol: '₨', locale: 'ur-PK', name: 'Pakistani Rupee' },
  { code: 'BDT', symbol: '৳', locale: 'bn-BD', name: 'Bangladeshi Taka' },
  { code: 'LKR', symbol: '₨', locale: 'si-LK', name: 'Sri Lankan Rupee' },
  { code: 'BTN', symbol: 'Nu.', locale: 'dz-BT', name: 'Bhutanese Ngultrum' },
  { code: 'MVR', symbol: 'Rf', locale: 'dv-MV', name: 'Maldivian Rufiyaa' },
  
  // Global - 18 more
  { code: 'USD', symbol: '$', locale: 'en-US', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', locale: 'de-DE', name: 'Euro' },
  { code: 'GBP', symbol: '£', locale: 'en-GB', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', locale: 'ja-JP', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', locale: 'zh-CN', name: 'Chinese Yuan' },
  { code: 'AUD', symbol: 'A$', locale: 'en-AU', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', locale: 'en-CA', name: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'CHF', locale: 'de-CH', name: 'Swiss Franc' },
  { code: 'SGD', symbol: 'S$', locale: 'en-SG', name: 'Singapore Dollar' },
  { code: 'MYR', symbol: 'RM', locale: 'ms-MY', name: 'Malaysian Ringgit' },
  { code: 'THB', symbol: '฿', locale: 'th-TH', name: 'Thai Baht' },
  { code: 'IDR', symbol: 'Rp', locale: 'id-ID', name: 'Indonesian Rupiah' },
  { code: 'AED', symbol: 'د.إ', locale: 'ar-AE', name: 'UAE Dirham' },
  { code: 'SAR', symbol: '﷼', locale: 'ar-SA', name: 'Saudi Riyal' },
  { code: 'QAR', symbol: '﷼', locale: 'ar-QA', name: 'Qatari Riyal' },
  { code: 'KRW', symbol: '₩', locale: 'ko-KR', name: 'South Korean Won' },
  { code: 'BRL', symbol: 'R$', locale: 'pt-BR', name: 'Brazilian Real' },
  { code: 'ZAR', symbol: 'R', locale: 'en-ZA', name: 'South African Rand' },
]

export default function ProfitMarginCalculator() {
  const [cost, setCost] = useState(500)
  const [revenue, setRevenue] = useState(800)
  const [mode, setMode] = useState<'margin' | 'markup'>('margin')
  const [currency, setCurrency] = useState(currencies[0])
  
  const [profit, setProfit] = useState(0)
  const [margin, setMargin] = useState(0)
  const [markup, setMarkup] = useState(0)

  useEffect(() => {
    const c = Number(cost)
    const r = Number(revenue)

    if (c > 0 && r > 0) {
      const p = r - c
      const marginCalc = (p / r) * 100
      const markupCalc = (p / c) * 100

      setProfit(Math.round(p))
      setMargin(Number(marginCalc.toFixed(2)))
      setMarkup(Number(markupCalc.toFixed(2)))
    }
  }, [cost, revenue])

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: ['JPY', 'KRW', 'IDR'].includes(currency.code)? 0 : 0
    }).format(num)
  }

  const calculatePrice = (targetPercent: number) => {
    const c = Number(cost)
    if (mode === 'margin') {
      return c / (1 - targetPercent / 100)
    } else {
      return c * (1 + targetPercent / 100)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Link href="/finance" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 inline-block">
          ← Back to Finance Tools
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Profit Margin Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate gross profit margin, markup percentage, and optimal selling price</p>

        <div className="grid lg:grid-cols-2 gap-8">
          
          <section aria-labelledby="profit-inputs-heading">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 id="profit-inputs-heading" className="text-xl font-semibold">Cost & Revenue</h2>
                
                <select
                  value={currency.code}
                  onChange={(e) => setCurrency(currencies.find(c => c.code === e.target.value) || currencies[0])}
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <optgroup label="South Asia">
                    {currencies.slice(0, 7).map(c => (
                      <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Global">
                    {currencies.slice(7).map(c => (
                      <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="cost-price" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Cost Price: {formatCurrency(cost)}
                  </label>
                  <input
                    id="cost-price"
                    type="range"
                    min="10"
                    max="100000"
                    step="10"
                    value={cost}
                    onChange={(e) => setCost(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>

                <div>
                  <label htmlFor="selling-price" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Selling Price (Revenue): {formatCurrency(revenue)}
                  </label>
                  <input
                    id="selling-price"
                    type="range"
                    min="10"
                    max="200000"
                    step="10"
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Calculate Price From:</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="mode"
                        checked={mode === 'margin'}
                        onChange={() => setMode('margin')}
                        className="mr-2 accent-emerald-600"
                      />
                      Desired Margin
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="mode"
                        checked={mode === 'markup'}
                        onChange={() => setMode('markup')}
                        className="mr-2 accent-emerald-600"
                      />
                      Desired Markup
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[20, 30, 50].map((percent) => (
                    <button
                      key={percent}
                      onClick={() => setRevenue(Math.round(calculatePrice(percent)))}
                      className="p-2 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition border border-gray-200 dark:border-gray-700"
                    >
                      {percent}% {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="profit-results-heading">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-100 dark:border-emerald-900 rounded-2xl p-6 shadow-sm">
              <h2 id="profit-results-heading" className="text-xl font-semibold mb-6">Profit Analysis</h2>
              
              <div className="space-y-5">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Profit Amount</p>
                  <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(profit)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Profit Margin</p>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{margin}%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">(Profit ÷ Revenue)</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Markup</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{markup}%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">(Profit ÷ Cost)</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cost vs Profit</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{((cost / revenue) * 100).toFixed(0)}% / {((profit / revenue) * 100).toFixed(0)}%</p>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 flex overflow-hidden">
                    <div 
                      className="bg-gray-400 dark:bg-gray-500 h-3" 
                      style={{ width: `${(cost / revenue) * 100}%` }}
                      title="Cost"
                    ></div>
                    <div 
                      className="bg-emerald-500 dark:bg-emerald-400 h-3" 
                      style={{ width: `${(profit / revenue) * 100}%` }}
                      title="Profit"
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-600 dark:text-gray-400">Cost: {formatCurrency(cost)}</span>
                    <span className="text-emerald-600 dark:text-emerald-400">Profit: {formatCurrency(profit)}</span>
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
