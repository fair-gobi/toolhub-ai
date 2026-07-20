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

export default function InvestmentReturnCalculator() {
  const [initialAmount, setInitialAmount] = useState(100000)
  const [finalAmount, setFinalAmount] = useState(180000)
  const [years, setYears] = useState(5)
  const [currency, setCurrency] = useState(currencies[0])
  const [absoluteReturn, setAbsoluteReturn] = useState(0)
  const [cagr, setCagr] = useState(0)
  const [annualizedReturn, setAnnualizedReturn] = useState(0)

  useEffect(() => {
    const initial = Number(initialAmount)
    const final = Number(finalAmount)
    const y = Number(years)

    if (initial > 0 && final > 0 && y > 0) {
      const absReturn = ((final - initial) / initial) * 100
      const cagrCalc = (Math.pow(final / initial, 1 / y) - 1) * 100

      setAbsoluteReturn(Number(absReturn.toFixed(2)))
      setCagr(Number(cagrCalc.toFixed(2)))
      setAnnualizedReturn(Number(cagrCalc.toFixed(2)))
    }
  }, [initialAmount, finalAmount, years])

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: ['JPY', 'KRW', 'IDR'].includes(currency.code)? 0 : 0
    }).format(num)
  }

  const compoundLabels: Record<number, string> = {
    1: 'Yearly',
    2: 'Half-Yearly', 
    4: 'Quarterly',
    12: 'Monthly'
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Link href="/finance" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 inline-block">
          ← Back to Finance Tools
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Investment Return Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate CAGR, absolute return, and annualized return on your investments</p>

        <div className="grid lg:grid-cols-2 gap-8">
          
          <section aria-labelledby="investment-inputs-heading">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 id="investment-inputs-heading" className="text-xl font-semibold">Investment Details</h2>
                
                <select
                  value={currency.code}
                  onChange={(e) => setCurrency(currencies.find(c => c.code === e.target.value) || currencies[0])}
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20"
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
                  <label htmlFor="initial-amount" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Initial Investment: {formatCurrency(initialAmount)}
                  </label>
                  <input
                    id="initial-amount"
                    type="range"
                    min="1000"
                    max="10000000"
                    step="1000"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>

                <div>
                  <label htmlFor="final-amount" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Final Value: {formatCurrency(finalAmount)}
                  </label>
                  <input
                    id="final-amount"
                    type="range"
                    min="1000"
                    max="50000000"
                    step="1000"
                    value={finalAmount}
                    onChange={(e) => setFinalAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>

                <div>
                  <label htmlFor="investment-years" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Investment Duration: {years} Years
                  </label>
                  <input
                    id="investment-years"
                    type="range"
                    min="0.5"
                    max="50"
                    step="0.5"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="return-results-heading">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border border-teal-100 dark:border-teal-900 rounded-2xl p-6 shadow-sm">
              <h2 id="return-results-heading" className="text-xl font-semibold mb-6">Return Analysis</h2>
              
              <div className="space-y-5">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">CAGR / Annualized Return</p>
                  <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">{cagr}%</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Compound Annual Growth Rate</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Absolute Return</p>
                    <p className="text-lg font-semibold">{absoluteReturn}%</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Gain</p>
                    <p className="text-lg font-semibold text-teal-600 dark:text-teal-400">{formatCurrency(finalAmount - initialAmount)}</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Investment Growth</p>
                  <div className="flex items-end gap-2 h-16">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded" style={{ height: `${Math.max(10, (initialAmount / finalAmount) * 100)}%` }}>
                      <div className="text-xs text-center pt-1 text-gray-600 dark:text-gray-300">Initial</div>
                    </div>
                    <div className="flex-1 bg-teal-600 dark:bg-teal-500 rounded">
                      <div className="text-xs text-center pt-1 text-white">Final</div>
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
