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

export default function FireCalculator() {
  const [annualExpenses, setAnnualExpenses] = useState(600000)
  const [withdrawalRate, setWithdrawalRate] = useState(4)
  const [currentSavings, setCurrentSavings] = useState(500000)
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [currency, setCurrency] = useState(currencies[0])

  const [fireNumber, setFireNumber] = useState(0)
  const [yearsToFire, setYearsToFire] = useState(0)
  const [monthlyExpenses, setMonthlyExpenses] = useState(0)

  useEffect(() => {
    const expenses = Number(annualExpenses)
    const wr = Number(withdrawalRate) / 100
    const current = Number(currentSavings)
    const monthly = Number(monthlyInvestment)
    const ret = Number(expectedReturn) / 100 / 12

    const fire = expenses / wr
    setFireNumber(Math.round(fire))
    setMonthlyExpenses(Math.round(expenses / 12))

    if (monthly > 0 && ret > 0) {
      const months = Math.log((fire * ret + monthly) / (current * ret + monthly)) / Math.log(1 + ret)
      setYearsToFire(Math.max(0, months / 12))
    } else {
      setYearsToFire(0)
    }
  }, [annualExpenses, withdrawalRate, currentSavings, monthlyInvestment, expectedReturn])

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: ['JPY', 'KRW', 'IDR'].includes(currency.code)? 0 : 0
    }).format(num)
  }

  const formatYears = (years: number) => {
    if (years < 1) return `${Math.round(years * 12)} months`
    const y = Math.floor(years)
    const m = Math.round((years - y) * 12)
    return m > 0? `${y}y ${m}m` : `${y} years`
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Link href="/finance" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 inline-block">
          ← Back to Finance Tools
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">FIRE Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate your Financial Independence, Retire Early number and years to freedom</p>

        <div className="grid lg:grid-cols-2 gap-8">
          
          <section aria-labelledby="fire-inputs-heading">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 id="fire-inputs-heading" className="text-xl font-semibold">Your FIRE Details</h2>
                
                <select
                  value={currency.code}
                  onChange={(e) => setCurrency(currencies.find(c => c.code === e.target.value) || currencies[0])}
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500/20"
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
                  <label htmlFor="annual-expenses" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Annual Expenses: {formatCurrency(annualExpenses)}
                  </label>
                  <input
                    id="annual-expenses"
                    type="range"
                    min="120000"
                    max="5000000"
                    step="10000"
                    value={annualExpenses}
                    onChange={(e) => setAnnualExpenses(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Monthly: {formatCurrency(monthlyExpenses)}</p>
                </div>

                <div>
                  <label htmlFor="withdrawal-rate" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Safe Withdrawal Rate: {withdrawalRate}%
                  </label>
                  <input
                    id="withdrawal-rate"
                    type="range"
                    min="3"
                    max="6"
                    step="0.25"
                    value={withdrawalRate}
                    onChange={(e) => setWithdrawalRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">4% is standard (25x expenses)</p>
                </div>

                <div>
                  <label htmlFor="current-savings" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Current Savings: {formatCurrency(currentSavings)}
                  </label>
                  <input
                    id="current-savings"
                    type="range"
                    min="0"
                    max="10000000"
                    step="50000"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                </div>

                <div>
                  <label htmlFor="monthly-invest" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Monthly Investment: {formatCurrency(monthlyInvestment)}
                  </label>
                  <input
                    id="monthly-invest"
                    type="range"
                    min="1000"
                    max="200000"
                    step="1000"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                </div>

                <div>
                  <label htmlFor="expected-return" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Expected Return: {expectedReturn}% p.a.
                  </label>
                  <input
                    id="expected-return"
                    type="range"
                    min="6"
                    max="18"
                    step="0.5"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="fire-results-heading">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border border-orange-100 dark:border-orange-900 rounded-2xl p-6 shadow-sm">
              <h2 id="fire-results-heading" className="text-xl font-semibold mb-6">Your FIRE Path</h2>
              
              <div className="space-y-5">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Your FIRE Number</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{formatCurrency(fireNumber)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{(100 / withdrawalRate).toFixed(0)}x your annual expenses</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Years to FIRE</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{formatYears(yearsToFire)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">At current savings rate</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly FIRE Income</p>
                    <p className="text-lg font-semibold">{formatCurrency(monthlyExpenses)}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Withdrawal Rate</p>
                    <p className="text-lg font-semibold">{withdrawalRate}%</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-orange-200 dark:border-orange-800">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Progress to FIRE</span>
                    <span className="font-medium">{Math.min(100, ((currentSavings / fireNumber) * 100)).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-orange-600 dark:bg-orange-500 h-2.5 rounded-full transition-all" 
                      style={{ width: `${Math.min(100, (currentSavings / fireNumber) * 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">You need {formatCurrency(Math.max(0, fireNumber - currentSavings))} more</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}
