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

export default function SavingsGoalCalculator() {
  const [targetAmount, setTargetAmount] = useState(1000000)
  const [currentSavings, setCurrentSavings] = useState(100000)
  const [years, setYears] = useState(5)
  const [rate, setRate] = useState(7)
  const [currency, setCurrency] = useState(currencies[0])
  const [monthlyNeeded, setMonthlyNeeded] = useState(0)
  const [totalContribution, setTotalContribution] = useState(0)
  const [interestEarned, setInterestEarned] = useState(0)

  useEffect(() => {
    const fv = Number(targetAmount)
    const pv = Number(currentSavings)
    const r = Number(rate) / 100 / 12
    const n = Number(years) * 12

    if (fv > 0 && n > 0) {
      const futureValueOfCurrent = pv * Math.pow(1 + r, n)
      const remainingNeeded = fv - futureValueOfCurrent
      
      let pmt = 0
      if (remainingNeeded > 0 && r > 0) {
        pmt = (remainingNeeded * r) / (Math.pow(1 + r, n) - 1)
      } else if (remainingNeeded > 0) {
        pmt = remainingNeeded / n
      }

      const totalContrib = pmt * n
      const totalInterest = fv - pv - totalContrib

      setMonthlyNeeded(Math.max(0, Math.round(pmt)))
      setTotalContribution(Math.round(totalContrib))
      setInterestEarned(Math.max(0, Math.round(totalInterest)))
    }
  }, [targetAmount, currentSavings, years, rate])

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

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Savings Goal Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Find out how much you need to save monthly to reach your financial target</p>

        <div className="grid lg:grid-cols-2 gap-8">
          
          <section aria-labelledby="goal-inputs-heading">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 id="goal-inputs-heading" className="text-xl font-semibold">Goal Details</h2>
                
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
                  <label htmlFor="target-amount" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Target Amount: {formatCurrency(targetAmount)}
                  </label>
                  <input
                    id="target-amount"
                    type="range"
                    min="50000"
                    max="10000000"
                    step="10000"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>

                <div>
                  <label htmlFor="current-savings" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Current Savings: {formatCurrency(currentSavings)}
                  </label>
                  <input
                    id="current-savings"
                    type="range"
                    min="0"
                    max="5000000"
                    step="5000"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>

                <div>
                  <label htmlFor="time-to-goal" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Time to Goal: {years} Years
                  </label>
                  <input
                    id="time-to-goal"
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>

                <div>
                  <label htmlFor="expected-return" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Expected Return: {rate}% p.a.
                  </label>
                  <input
                    id="expected-return"
                    type="range"
                    min="0"
                    max="15"
                    step="0.5"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="goal-results-heading">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border border-teal-100 dark:border-teal-900 rounded-2xl p-6 shadow-sm">
              <h2 id="goal-results-heading" className="text-xl font-semibold mb-6">Savings Plan</h2>
              
              <div className="space-y-5">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly Savings Needed</p>
                  <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">{formatCurrency(monthlyNeeded)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">For {years} years</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Your Contributions</p>
                    <p className="text-lg font-semibold">{formatCurrency(totalContribution)}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Interest Earned</p>
                    <p className="text-lg font-semibold text-teal-600 dark:text-teal-400">{formatCurrency(interestEarned)}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Starting Amount</p>
                    <p className="text-lg font-semibold">{formatCurrency(currentSavings)}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-teal-200 dark:border-teal-800">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Total at Goal</span>
                    <span className="font-bold">{formatCurrency(targetAmount)}</span>
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
