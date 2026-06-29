'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const currencies = [
  { code: 'NPR', symbol: 'Rs', locale: 'ne-NP', name: 'Nepali Rupee' },
  { code: 'INR', symbol: '₹', locale: 'en-IN', name: 'Indian Rupee' },
  { code: 'PKR', symbol: '₨', locale: 'ur-PK', name: 'Pakistani Rupee' },
  { code: 'BDT', symbol: '৳', locale: 'bn-BD', name: 'Bangladeshi Taka' },
  { code: 'LKR', symbol: '₨', locale: 'si-LK', name: 'Sri Lankan Rupee' },
  { code: 'BTN', symbol: 'Nu.', locale: 'dz-BT', name: 'Bhutanese Ngultrum' },
  { code: 'MVR', symbol: 'Rf', locale: 'dv-MV', name: 'Maldivian Rufiyaa' },
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

export default function InflationCalculator() {
  const [amount, setAmount] = useState(100000)
  const [inflation, setInflation] = useState(6)
  const [years, setYears] = useState(10)
  const [futureValue, setFutureValue] = useState(0)
  const [currency, setCurrency] = useState(currencies[0])

  useEffect(() => {
    const fv = amount * Math.pow(1 + inflation / 100, years)
    setFutureValue(fv)
  }, [amount, inflation, years])

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: ['JPY', 'KRW', 'IDR'].includes(currency.code)? 0 : 0
    }).format(Math.round(num))
  }

  const lossPercent = ((futureValue - amount) / futureValue * 100)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Link href="/finance" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 inline-block">
          ← Back to Finance Tools
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">📈 Inflation Calculator</h1>
          <p className="text-gray-600 dark:text-gray-400">See how inflation erodes your money's value</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          
          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Currency</label>
            <select
              value={currency.code}
              onChange={e => setCurrency(currencies.find(c => c.code === e.target.value) || currencies[0])}
              className="w-full mt-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
            >
              <optgroup label="South Asia">
                {currencies.slice(0, 7).map(c => (
                  <option key={c.code} value={c.code}>{c.symbol} {c.code} - {c.name}</option>
                ))}
              </optgroup>
              <optgroup label="Global">
                {currencies.slice(7).map(c => (
                  <option key={c.code} value={c.code}>{c.symbol} {c.code} - {c.name}</option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Today's Amount</label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400">{currency.symbol}</span>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Inflation Rate (% per year)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inflation}
                  onChange={e => setInflation(Number(e.target.value))}
                  className="w-full mt-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Period (years)</label>
                <input
                  type="number"
                  value={years}
                  onChange={e => setYears(Number(e.target.value))}
                  className="w-full mt-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 text-center border border-red-100 dark:border-red-900">
                <div className="text-2xl font-bold text-red-700 dark:text-red-400">{formatCurrency(futureValue)}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">You'll need in {years} years</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">to buy what {formatCurrency(amount)} buys today</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-950/30 rounded-xl p-5 text-center border border-orange-100 dark:border-orange-900">
                <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">{formatCurrency(futureValue - amount)}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Extra money needed</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">due to inflation</div>
              </div>
            </div>

            <div className="mt-5 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Purchasing power loss</span>
                <span className="font-medium text-red-600 dark:text-red-400">
                  {lossPercent.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-red-600 dark:bg-red-500 h-2 rounded-full transition-all" 
                  style={{ width: `${lossPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Nepal avg: 6-8% • India: 5-6% • US: 2-3% • UAE: 2-4%
          </p>
        </div>
      </div>
    </main>
  )
}
