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

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)
  const [currency, setCurrency] = useState(currencies[0])
  const [futureValue, setFutureValue] = useState(0)
  const [invested, setInvested] = useState(0)
  const [returns, setReturns] = useState(0)

  useEffect(() => {
    const p = Number(monthlyInvestment)
    const r = Number(rate) / 100 / 12
    const n = Number(years) * 12

    if (p > 0 && r > 0 && n > 0) {
      const fv = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
      const totalInvested = p * n
      const totalReturns = fv - totalInvested

      setFutureValue(Math.round(fv))
      setInvested(Math.round(totalInvested))
      setReturns(Math.round(totalReturns))
    }
  }, [monthlyInvestment, rate, years])

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

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">SIP Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate returns on your Systematic Investment Plan and see how your wealth grows over time</p>

        <div className="grid lg:grid-cols-2 gap-8">
          
          <section aria-labelledby="investment-details-heading">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 id="investment-details-heading" className="text-xl font-semibold">Investment Details</h2>
                
                <select
                  value={currency.code}
                  onChange={(e) => setCurrency(currencies.find(c => c.code === e.target.value) || currencies[0])}
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-green-500/20"
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
                  <label htmlFor="monthly-sip" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Monthly Investment: {formatCurrency(monthlyInvestment)}
                  </label>
                  <input
                    id="monthly-sip"
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>{formatCurrency(500)}</span>
                    <span>{formatCurrency(100000)}</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="return-rate" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Expected Annual Return: {rate}%
                  </label>
                  <input
                    id="return-rate"
                    type="range"
                    min="1"
                    max="30"
                    step="0.5"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>1%</span>
                    <span>30%</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="time-period" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Investment Period: {years} Years
                  </label>
                  <input
                    id="time-period"
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>1 Yr</span>
                    <span>40 Yrs</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="wealth-summary-heading">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-100 dark:border-green-900 rounded-2xl p-6 shadow-sm">
              <h2 id="wealth-summary-heading" className="text-xl font-semibold mb-6">Wealth Summary</h2>
              
              <div className="space-y-5">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Expected Future Value</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{formatCurrency(futureValue)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Invested</p>
                    <p className="text-lg font-semibold">{formatCurrency(invested)}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Est. Returns</p>
                    <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(returns)}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-green-200 dark:border-green-800">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Total Returns</span>
                    <span className="font-medium">{((returns / invested) * 100 || 0).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 dark:bg-green-500 h-2.5 rounded-full transition-all" 
                      style={{ width: `${(returns / futureValue) * 100 || 0}%` }}
                    ></div>
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
