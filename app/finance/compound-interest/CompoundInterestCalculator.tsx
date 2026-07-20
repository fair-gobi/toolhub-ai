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

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(5)
  const [compound, setCompound] = useState(1)
  const [currency, setCurrency] = useState(currencies[0])
  const [futureValue, setFutureValue] = useState(0)
  const [interest, setInterest] = useState(0)

  useEffect(() => {
    const p = Number(principal)
    const r = Number(rate) / 100
    const n = Number(compound)
    const t = Number(years)

    if (p > 0 && r > 0 && t > 0) {
      const fv = p * Math.pow(1 + r / n, n * t)
      const int = fv - p
      setFutureValue(Math.round(fv))
      setInterest(Math.round(int))
    }
  }, [principal, rate, years, compound])

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

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Compound Interest Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate how your investment grows with the power of compounding</p>

        <div className="grid lg:grid-cols-2 gap-8">
          
          <section aria-labelledby="ci-inputs-heading">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 id="ci-inputs-heading" className="text-xl font-semibold">Investment Details</h2>
                
                <select
                  value={currency.code}
                  onChange={(e) => setCurrency(currencies.find(c => c.code === e.target.value) || currencies[0])}
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-purple-500/20"
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
                  <label htmlFor="ci-principal" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Principal Amount: {formatCurrency(principal)}
                  </label>
                  <input
                    id="ci-principal"
                    type="range"
                    min="1000"
                    max="10000000"
                    step="1000"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>

                <div>
                  <label htmlFor="ci-rate" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Annual Interest Rate: {rate}%
                  </label>
                  <input
                    id="ci-rate"
                    type="range"
                    min="1"
                    max="25"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>

                <div>
                  <label htmlFor="ci-years" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Time Period: {years} Years
                  </label>
                  <input
                    id="ci-years"
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>

                <div>
                  <label htmlFor="ci-frequency" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Compounding Frequency</label>
                  <select 
                    id="ci-frequency"
                    value={compound} 
                    onChange={(e) => setCompound(Number(e.target.value))}
                    className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500/20"
                  >
                    <option value={1}>Yearly</option>
                    <option value={2}>Half-Yearly</option>
                    <option value={4}>Quarterly</option>
                    <option value={12}>Monthly</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="ci-results-heading">
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border border-purple-100 dark:border-purple-900 rounded-2xl p-6 shadow-sm">
              <h2 id="ci-results-heading" className="text-xl font-semibold mb-6">Growth Summary</h2>
              
              <div className="space-y-5">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Future Value</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{formatCurrency(futureValue)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Compounded {compoundLabels[compound]}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Principal Amount</p>
                    <p className="text-lg font-semibold">{formatCurrency(principal)}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Compound Interest</p>
                    <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">{formatCurrency(interest)}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-200 dark:border-purple-800">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Interest Earned</span>
                    <span className="font-medium">{((interest / principal) * 100 || 0).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-purple-600 dark:bg-purple-500 h-2.5 rounded-full transition-all" 
                      style={{ width: `${(interest / futureValue) * 100 || 0}%` }}
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
