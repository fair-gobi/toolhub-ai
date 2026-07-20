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

export default function RoiCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(100000)
  const [finalValue, setFinalValue] = useState(150000)
  const [investmentPeriod, setInvestmentPeriod] = useState(3)
  const [additionalCosts, setAdditionalCosts] = useState(5000)
  const [currency, setCurrency] = useState(currencies[0])

  const [totalProfit, setTotalProfit] = useState(0)
  const [roi, setRoi] = useState(0)
  const [annualizedRoi, setAnnualizedRoi] = useState(0)
  const [totalCost, setTotalCost] = useState(0)

  useEffect(() => {
    const initial = Number(initialInvestment)
    const final = Number(finalValue)
    const costs = Number(additionalCosts)
    const years = Number(investmentPeriod)

    if (initial > 0) {
      const totalInvested = initial + costs
      const profit = final - totalInvested
      const roiPercent = (profit / totalInvested) * 100
      const annualized = years > 0? (Math.pow(final / totalInvested, 1 / years) - 1) * 100 : 0

      setTotalCost(totalInvested)
      setTotalProfit(Math.round(profit))
      setRoi(Number(roiPercent.toFixed(2)))
      setAnnualizedRoi(Number(annualized.toFixed(2)))
    }
  }, [initialInvestment, finalValue, investmentPeriod, additionalCosts])

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: ['JPY', 'KRW', 'IDR'].includes(currency.code)? 0 : 0
    }).format(num)
  }

  const getRoiColor = () => {
    if (roi > 15) return 'text-green-600 dark:text-green-400'
    if (roi > 0) return 'text-emerald-600 dark:text-emerald-400'
    if (roi === 0) return 'text-gray-600 dark:text-gray-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getRoiLabel = () => {
    if (roi > 20) return 'Excellent'
    if (roi > 15) return 'Good'
    if (roi > 10) return 'Average'
    if (roi > 0) return 'Low'
    if (roi === 0) return 'Break-even'
    return 'Loss'
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Link href="/finance" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 inline-block">
          ← Back to Finance Tools
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">ROI Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate return on investment (ROI) and annualized return for any investment</p>

        <div className="grid lg:grid-cols-2 gap-8">
          
          <section aria-labelledby="roi-inputs-heading">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 id="roi-inputs-heading" className="text-xl font-semibold">Investment Details</h2>
                
                <select
                  value={currency.code}
                  onChange={(e) => setCurrency(currencies.find(c => c.code === e.target.value) || currencies[0])}
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-violet-500/20"
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
                  <label htmlFor="initial-investment" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Initial Investment: {formatCurrency(initialInvestment)}
                  </label>
                  <input
                    id="initial-investment"
                    type="range"
                    min="1000"
                    max="10000000"
                    step="1000"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-violet-600"
                  />
                </div>

                <div>
                  <label htmlFor="final-value" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Final Value / Sale Price: {formatCurrency(finalValue)}
                  </label>
                  <input
                    id="final-value"
                    type="range"
                    min="0"
                    max="20000000"
                    step="1000"
                    value={finalValue}
                    onChange={(e) => setFinalValue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-violet-600"
                  />
                </div>

                <div>
                  <label htmlFor="additional-costs" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Additional Costs: {formatCurrency(additionalCosts)}
                  </label>
                  <input
                    id="additional-costs"
                    type="range"
                    min="0"
                    max="500000"
                    step="500"
                    value={additionalCosts}
                    onChange={(e) => setAdditionalCosts(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-violet-600"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Fees, taxes, maintenance, etc.</p>
                </div>

                <div>
                  <label htmlFor="investment-period" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Investment Period: {investmentPeriod} {investmentPeriod === 1? 'Year' : 'Years'}
                  </label>
                  <input
                    id="investment-period"
                    type="range"
                    min="0.25"
                    max="30"
                    step="0.25"
                    value={investmentPeriod}
                    onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-violet-600"
                  />
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="roi-results-heading">
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border border-violet-100 dark:border-violet-900 rounded-2xl p-6 shadow-sm">
              <h2 id="roi-results-heading" className="text-xl font-semibold mb-6">ROI Analysis</h2>
              
              <div className="space-y-5">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Return on Investment (ROI)</p>
                  <div className="flex items-baseline gap-3">
                    <p className={`text-3xl font-bold ${getRoiColor()}`}>{roi}%</p>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      roi > 0? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400' : roi < 0? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}>
                      {getRoiLabel()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Annualized ROI</p>
                    <p className={`text-xl font-bold ${getRoiColor()}`}>{annualizedRoi}%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">per year</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Profit</p>
                    <p className={`text-xl font-bold ${totalProfit >= 0? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {formatCurrency(totalProfit)}
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Investment Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Initial Investment:</span>
                      <span>{formatCurrency(initialInvestment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Additional Costs:</span>
                      <span>{formatCurrency(additionalCosts)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2 font-medium">
                      <span>Total Cost:</span>
                      <span>{formatCurrency(totalCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Final Value:</span>
                      <span className="text-green-600 dark:text-green-400">{formatCurrency(finalValue)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2 font-bold">
                      <span>Net Gain/Loss:</span>
                      <span className={totalProfit >= 0? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                        {formatCurrency(totalProfit)}
                      </span>
                    </div>
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
