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

export default function CashFlowCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(200000)
  const [monthlyExpenses, setMonthlyExpenses] = useState(150000)
  const [capex, setCapex] = useState(20000)
  const [currentCash, setCurrentCash] = useState(500000)
  const [taxRate, setTaxRate] = useState(25)
  const [currency, setCurrency] = useState(currencies[0])

  const [operatingCashFlow, setOperatingCashFlow] = useState(0)
  const [freeCashFlow, setFreeCashFlow] = useState(0)
  const [monthlyBurn, setMonthlyBurn] = useState(0)
  const [runwayMonths, setRunwayMonths] = useState(0)
  const [netProfit, setNetProfit] = useState(0)

  useEffect(() => {
    const revenue = Number(monthlyRevenue)
    const expenses = Number(monthlyExpenses)
    const capitalExp = Number(capex)
    const cash = Number(currentCash)
    const tax = Number(taxRate) / 100

    const ebit = revenue - expenses
    const taxAmount = Math.max(0, ebit * tax)
    const profit = ebit - taxAmount
    const operatingCF = profit + (expenses * 0.1)
    const freeCF = operatingCF - capitalExp
    const burn = Math.max(0, expenses - revenue)
    const runway = burn > 0? cash / burn : 999

    setNetProfit(Math.round(profit))
    setOperatingCashFlow(Math.round(operatingCF))
    setFreeCashFlow(Math.round(freeCF))
    setMonthlyBurn(Math.round(burn))
    setRunwayMonths(runway)
  }, [monthlyRevenue, monthlyExpenses, capex, currentCash, taxRate])

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: ['JPY', 'KRW', 'IDR'].includes(currency.code)? 0 : 0
    }).format(num)
  }

  const formatRunway = (months: number) => {
    if (months >= 999) return 'Profitable'
    if (months < 1) return '< 1 month'
    const y = Math.floor(months / 12)
    const m = Math.round(months % 12)
    return y > 0? `${y}y ${m}m` : `${m} months`
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Link href="/finance" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 inline-block">
          ← Back to Finance Tools
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Cash Flow Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate operating cash flow, free cash flow, and how long your cash will last</p>

        <div className="grid lg:grid-cols-2 gap-8">
          
          <section aria-labelledby="cf-inputs-heading">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 id="cf-inputs-heading" className="text-xl font-semibold">Monthly Business Figures</h2>
                
                <select
                  value={currency.code}
                  onChange={(e) => setCurrency(currencies.find(c => c.code === e.target.value) || currencies[0])}
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20"
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
                  <label htmlFor="revenue" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Monthly Revenue: {formatCurrency(monthlyRevenue)}
                  </label>
                  <input
                    id="revenue"
                    type="range"
                    min="0"
                    max="2000000"
                    step="10000"
                    value={monthlyRevenue}
                    onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="expenses" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Monthly Operating Expenses: {formatCurrency(monthlyExpenses)}
                  </label>
                  <input
                    id="expenses"
                    type="range"
                    min="0"
                    max="2000000"
                    step="10000"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="capex" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Monthly CAPEX: {formatCurrency(capex)}
                  </label>
                  <input
                    id="capex"
                    type="range"
                    min="0"
                    max="500000"
                    step="5000"
                    value={capex}
                    onChange={(e) => setCapex(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Equipment, software, etc.</p>
                </div>

                <div>
                  <label htmlFor="cash" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Current Cash Balance: {formatCurrency(currentCash)}
                  </label>
                  <input
                    id="cash"
                    type="range"
                    min="0"
                    max="5000000"
                    step="25000"
                    value={currentCash}
                    onChange={(e) => setCurrentCash(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="tax" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Tax Rate: {taxRate}%
                  </label>
                  <input
                    id="tax"
                    type="range"
                    min="0"
                    max="40"
                    step="1"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="cf-results-heading">
            <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h2 id="cf-results-heading" className="text-xl font-semibold mb-6">Cash Flow Analysis</h2>
              
              <div className="space-y-5">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border-l-4 border-blue-500 dark:border-blue-400">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Operating Cash Flow</p>
                  <p className={`text-2xl font-bold ${operatingCashFlow >= 0? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
                    {formatCurrency(operatingCashFlow)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">per month</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border-l-4 border-green-500 dark:border-green-400">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Free Cash Flow</p>
                  <p className={`text-2xl font-bold ${freeCashFlow >= 0? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {formatCurrency(freeCashFlow)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">After CAPEX</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly Burn</p>
                    <p className={`text-lg font-semibold ${monthlyBurn > 0? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'}`}>
                      {monthlyBurn > 0? formatCurrency(monthlyBurn) : formatCurrency(0)}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Cash Runway</p>
                    <p className={`text-lg font-semibold ${runwayMonths < 6? 'text-red-600 dark:text-red-400' : runwayMonths < 12? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'}`}>
                      {formatRunway(runwayMonths)}
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Monthly P&L Snapshot</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Revenue</span>
                      <span className="font-medium text-green-600 dark:text-green-400">+{formatCurrency(monthlyRevenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Expenses</span>
                      <span className="font-medium text-red-600 dark:text-red-400">-{formatCurrency(monthlyExpenses)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-1">
                      <span className="text-gray-700 dark:text-gray-300">Net Profit</span>
                      <span className={`font-bold ${netProfit >= 0? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {formatCurrency(netProfit)}
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
