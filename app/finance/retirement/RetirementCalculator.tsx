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

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(60)
  const [currentMonthlyExpense, setCurrentMonthlyExpense] = useState(50000)
  const [inflationRate, setInflationRate] = useState(6)
  const [returnRate, setReturnRate] = useState(12)
  const [lifeExpectancy, setLifeExpectancy] = useState(85)
  const [currency, setCurrency] = useState(currencies[0])
  
  const [corpusRequired, setCorpusRequired] = useState(0)
  const [monthlyInvestment, setMonthlyInvestment] = useState(0)
  const [futureMonthlyExpense, setFutureMonthlyExpense] = useState(0)

  useEffect(() => {
    const yearsToRetire = Number(retirementAge) - Number(currentAge)
    const yearsPostRetire = Number(lifeExpectancy) - Number(retirementAge)
    const inf = Number(inflationRate) / 100
    const ret = Number(returnRate) / 100 / 12
    const monthlyExpense = Number(currentMonthlyExpense)

    if (yearsToRetire > 0 && yearsPostRetire > 0 && monthlyExpense > 0) {
      const futureExpense = monthlyExpense * Math.pow(1 + inf, yearsToRetire)
      setFutureMonthlyExpense(Math.round(futureExpense))

      const yearlyExpenseAtRetire = futureExpense * 12
      const corpus = yearlyExpenseAtRetire * yearsPostRetire
      setCorpusRequired(Math.round(corpus))

      const months = yearsToRetire * 12
      const monthlySip = corpus * ret / (Math.pow(1 + ret, months) - 1)
      setMonthlyInvestment(Math.round(monthlySip))
    }
  }, [currentAge, retirementAge, currentMonthlyExpense, inflationRate, returnRate, lifeExpectancy])

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: ['JPY', 'KRW', 'IDR'].includes(currency.code)? 0 : 0
    }).format(num)
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Link href="/finance" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 inline-block">
          ← Back to Finance Tools
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Retirement Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate your retirement corpus and plan monthly investments to retire comfortably</p>

        <div className="grid lg:grid-cols-2 gap-8">
          
          <section aria-labelledby="retirement-inputs-heading">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 id="retirement-inputs-heading" className="text-xl font-semibold">Your Details</h2>
                
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
                  <label htmlFor="current-age" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Current Age: {currentAge} years
                  </label>
                  <input
                    id="current-age"
                    type="range"
                    min="18"
                    max="55"
                    step="1"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                </div>

                <div>
                  <label htmlFor="retirement-age" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Retirement Age: {retirementAge} years
                  </label>
                  <input
                    id="retirement-age"
                    type="range"
                    min={currentAge + 1}
                    max="70"
                    step="1"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                </div>

                <div>
                  <label htmlFor="monthly-expense" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Current Monthly Expenses: {formatCurrency(currentMonthlyExpense)}
                  </label>
                  <input
                    id="monthly-expense"
                    type="range"
                    min="10000"
                    max="500000"
                    step="5000"
                    value={currentMonthlyExpense}
                    onChange={(e) => setCurrentMonthlyExpense(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                </div>

                <div>
                  <label htmlFor="inflation" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Expected Inflation: {inflationRate}%
                  </label>
                  <input
                    id="inflation"
                    type="range"
                    min="3"
                    max="10"
                    step="0.5"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                </div>

                <div>
                  <label htmlFor="return-rate" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Expected Return on Investment: {returnRate}% p.a.
                  </label>
                  <input
                    id="return-rate"
                    type="range"
                    min="6"
                    max="20"
                    step="0.5"
                    value={returnRate}
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                </div>

                <div>
                  <label htmlFor="life-expectancy" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Life Expectancy: {lifeExpectancy} years
                  </label>
                  <input
                    id="life-expectancy"
                    type="range"
                    min={retirementAge + 1}
                    max="100"
                    step="1"
                    value={lifeExpectancy}
                    onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="retirement-results-heading">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-100 dark:border-orange-900 rounded-2xl p-6 shadow-sm">
              <h2 id="retirement-results-heading" className="text-xl font-semibold mb-6">Retirement Plan</h2>
              
              <div className="space-y-5">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Corpus Required at Retirement</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{formatCurrency(corpusRequired)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">At age {retirementAge}</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly Investment Needed</p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(monthlyInvestment)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">For next {retirementAge - currentAge} years</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Future Monthly Expense</p>
                    <p className="text-lg font-semibold">{formatCurrency(futureMonthlyExpense)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">At retirement</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Retirement Years</p>
                    <p className="text-lg font-semibold">{lifeExpectancy - retirementAge} years</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Post retirement</p>
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
