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

export default function StartupRunwayCalculator() {
  const [cashBalance, setCashBalance] = useState(5000000)
  const [monthlyBurn, setMonthlyBurn] = useState(400000)
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000)
  const [monthlyGrowth, setMonthlyGrowth] = useState(10)
  const [currency, setCurrency] = useState(currencies[0])
  
  const [netBurn, setNetBurn] = useState(0)
  const [runwayMonths, setRunwayMonths] = useState(0)
  const [zeroCashDate, setZeroCashDate] = useState('')
  const [runwayWithGrowth, setRunwayWithGrowth] = useState(0)

  useEffect(() => {
    const cash = Number(cashBalance)
    const burn = Number(monthlyBurn)
    const revenue = Number(monthlyRevenue)
    const growth = Number(monthlyGrowth) / 100

    const net = burn - revenue
    setNetBurn(Math.max(0, net))

    // Simple runway without growth
    if (net > 0) {
      const months = cash / net
      setRunwayMonths(months)
      
      const date = new Date()
      date.setMonth(date.getMonth() + Math.floor(months))
      setZeroCashDate(date.toLocaleDateString(currency.locale, { month: 'long', year: 'numeric' }))
    } else {
      setRunwayMonths(999)
      setZeroCashDate('Profitable')
    }

    // Runway with revenue growth
    if (growth > 0 && net > 0) {
      let remainingCash = cash
      let currentRevenue = revenue
      let months = 0
      
      while (remainingCash > 0 && months < 120) {
        const currentNetBurn = Math.max(0, burn - currentRevenue)
        remainingCash -= currentNetBurn
        currentRevenue = currentRevenue * (1 + growth)
        months++
        
        if (currentNetBurn <= 0) break
      }
      setRunwayWithGrowth(months)
    } else {
      setRunwayWithGrowth(Math.floor(cash / Math.max(1, net)))
    }
  }, [cashBalance, monthlyBurn, monthlyRevenue, monthlyGrowth, currency.locale])

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: ['JPY', 'KRW', 'IDR'].includes(currency.code)? 0 : 0
    }).format(num)
  }

  const getRunwayColor = (months: number) => {
    if (months < 6) return 'text-red-600 dark:text-red-400'
    if (months < 12) return 'text-orange-600 dark:text-orange-400'
    if (months < 18) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-green-600 dark:text-green-400'
  }

  const getRunwayStatus = (months: number) => {
    if (months < 6) return 'Critical - Raise now'
    if (months < 12) return 'Tight - Start fundraising'
    if (months < 18) return 'Healthy'
    return 'Strong'
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Link href="/finance" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 inline-block">
          ← Back to Finance Tools
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Startup Runway Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate how long your startup cash will last and when to raise next round</p>

        <div className="grid lg:grid-cols-2 gap-8">
          
          <section aria-labelledby="runway-inputs-heading">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 id="runway-inputs-heading" className="text-xl font-semibold">Current Financials</h2>
                
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
                  <label htmlFor="cash-balance" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Cash in Bank: {formatCurrency(cashBalance)}
                  </label>
                  <input
                    id="cash-balance"
                    type="range"
                    min="100000"
                    max="50000000"
                    step="100000"
                    value={cashBalance}
                    onChange={(e) => setCashBalance(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>

                <div>
                  <label htmlFor="monthly-burn" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Monthly Burn (Expenses): {formatCurrency(monthlyBurn)}
                  </label>
                  <input
                    id="monthly-burn"
                    type="range"
                    min="50000"
                    max="5000000"
                    step="10000"
                    value={monthlyBurn}
                    onChange={(e) => setMonthlyBurn(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>

                <div>
                  <label htmlFor="monthly-revenue" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Monthly Revenue: {formatCurrency(monthlyRevenue)}
                  </label>
                  <input
                    id="monthly-revenue"
                    type="range"
                    min="0"
                    max="2000000"
                    step="10000"
                    value={monthlyRevenue}
                    onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>

                <div>
                  <label htmlFor="growth-rate" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Expected Monthly Revenue Growth: {monthlyGrowth}%
                  </label>
                  <input
                    id="growth-rate"
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={monthlyGrowth}
                    onChange={(e) => setMonthlyGrowth(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="runway-results-heading">
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border border-purple-100 dark:border-purple-900 rounded-2xl p-6 shadow-sm">
              <h2 id="runway-results-heading" className="text-xl font-semibold mb-6">Runway Analysis</h2>
              
              <div className="space-y-5">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Runway</p>
                  <p className={`text-3xl font-bold ${getRunwayColor(runwayMonths)}`}>
                    {runwayMonths >= 999? '∞' : `${Math.floor(runwayMonths)} months`}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{getRunwayStatus(runwayMonths)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Net Burn Rate</p>
                    <p className="text-lg font-semibold text-red-600 dark:text-red-400">{formatCurrency(netBurn)}/mo</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Zero Cash Date</p>
                    <p className="text-lg font-semibold">{zeroCashDate}</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">With {monthlyGrowth}% Growth</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{runwayWithGrowth} months</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Runway extends due to revenue growth</p>
                </div>

                <div className="pt-4 border-t border-purple-200 dark:border-purple-800">
                  <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Fundraising Timeline:</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Start fundraising:</span>
                      <span className="font-medium">
                        {Math.max(0, Math.floor(runwayMonths - 6))} months left
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Must close by:</span>
                      <span className="font-medium text-orange-600 dark:text-orange-400">
                        {Math.max(0, Math.floor(runwayMonths - 3))} months left
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                      <div 
                        className={`h-2 rounded-full ${
                          runwayMonths < 6? 'bg-red-600 dark:bg-red-500' :
                          runwayMonths < 12? 'bg-orange-600 dark:bg-orange-500' :
                          runwayMonths < 18? 'bg-yellow-600 dark:bg-yellow-500' :
                          'bg-green-600 dark:bg-green-500'
                        }`}
                        style={{ width: `${Math.min(100, (runwayMonths / 24) * 100)}%` }}
                      ></div>
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
