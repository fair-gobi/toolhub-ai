'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const currencies = [
  { code: 'INR', symbol: '₹', locale: 'en-IN', name: 'Indian Rupee' },
  { code: 'NPR', symbol: '₨', locale: 'ne-NP', name: 'Nepali Rupee' },
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

export default function DcaCalculator() {
  const [initialAmount, setInitialAmount] = useState(10000)
  const [monthlyContribution, setMonthlyContribution] = useState(2000)
  const [investmentPeriod, setInvestmentPeriod] = useState(5)
  const [avgReturn, setAvgReturn] = useState(10)
  const [volatility, setVolatility] = useState(15)
  const [currency, setCurrency] = useState(currencies[0])
  
  const [lumpSumValue, setLumpSumValue] = useState(0)
  const [dcaValue, setDcaValue] = useState(0)
  const [totalInvested, setTotalInvested] = useState(0)
  const [dcaProfit, setDcaProfit] = useState(0)
  const [dcaRoi, setDcaRoi] = useState(0)

  useEffect(() => {
    const initial = Number(initialAmount)
    const monthly = Number(monthlyContribution)
    const years = Number(investmentPeriod)
    const annualRate = Number(avgReturn) / 100
    const monthlyRate = annualRate / 12
    const months = years * 12

    if (initial >= 0 && months > 0) {
      // Lump Sum: FV = PV * (1 + r)^n
      const lumpSumFV = initial * Math.pow(1 + annualRate, years)
      
      // DCA: FV of annuity + initial lump sum growth
      const dcaFV = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
      const initialGrowth = initial * Math.pow(1 + annualRate, years)
      const totalDcaValue = dcaFV + initialGrowth
      
      const totalInvestedAmount = initial + (monthly * months)
      const profit = totalDcaValue - totalInvestedAmount
      const roiPercent = (profit / totalInvestedAmount) * 100

      setLumpSumValue(Math.round(lumpSumFV))
      setDcaValue(Math.round(totalDcaValue))
      setTotalInvested(Math.round(totalInvestedAmount))
      setDcaProfit(Math.round(profit))
      setDcaRoi(Number(roiPercent.toFixed(2)))
    }
  }, [initialAmount, monthlyContribution, investmentPeriod, avgReturn])

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: ['JPY', 'KRW', 'IDR'].includes(currency.code)? 0 : 0
    }).format(num)
  }

  const advantage = dcaValue - lumpSumValue

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Link href="/finance" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 inline-block">
          ← Back to Finance Tools
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">DCA Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Compare Dollar Cost Averaging vs Lump Sum investing to reduce volatility risk</p>

        <div className="grid lg:grid-cols-2 gap-8">
          
          <section aria-labelledby="dca-inputs-heading">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 id="dca-inputs-heading" className="text-xl font-semibold">Investment Strategy</h2>
                
                <select
                  value={currency.code}
                  onChange={(e) => setCurrency(currencies.find(c => c.code === e.target.value) || currencies[0])}
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-cyan-500/20"
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
                    min="0"
                    max="1000000"
                    step="1000"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Lump sum at start</p>
                </div>

                <div>
                  <label htmlFor="monthly-contribution" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Monthly Contribution: {formatCurrency(monthlyContribution)}
                  </label>
                  <input
                    id="monthly-contribution"
                    type="range"
                    min="0"
                    max="50000"
                    step="500"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">DCA amount per month</p>
                </div>

                <div>
                  <label htmlFor="investment-period" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Investment Period: {investmentPeriod} Years
                  </label>
                  <input
                    id="investment-period"
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={investmentPeriod}
                    onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                  />
                </div>

                <div>
                  <label htmlFor="avg-return" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Expected Annual Return: {avgReturn}%
                  </label>
                  <input
                    id="avg-return"
                    type="range"
                    min="1"
                    max="30"
                    step="0.5"
                    value={avgReturn}
                    onChange={(e) => setAvgReturn(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                  />
                </div>

                <div>
                  <label htmlFor="volatility" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Market Volatility: {volatility}%
                  </label>
                  <input
                    id="volatility"
                    type="range"
                    min="5"
                    max="50"
                    step="1"
                    value={volatility}
                    onChange={(e) => setVolatility(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Higher = more benefit from DCA</p>
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="dca-results-heading">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border border-cyan-100 dark:border-cyan-900 rounded-2xl p-6 shadow-sm">
              <h2 id="dca-results-heading" className="text-xl font-semibold mb-6">DCA vs Lump Sum</h2>
              
              <div className="space-y-5">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">DCA Strategy Value</p>
                  <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">{formatCurrency(dcaValue)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total invested: {formatCurrency(totalInvested)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Lump Sum Value</p>
                    <p className="text-lg font-semibold">{formatCurrency(lumpSumValue)}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">DCA Advantage</p>
                    <p className={`text-lg font-semibold ${advantage >= 0? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {advantage >= 0? '+' : ''}{formatCurrency(advantage)}
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">DCA ROI</p>
                    <p className={`text-xl font-bold ${dcaRoi >= 0? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {dcaRoi}%
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Net Profit</p>
                    <p className={`text-lg font-semibold ${dcaProfit >= 0? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {formatCurrency(dcaProfit)}
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Why DCA Works</h3>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1.5">
                    <li>• Buys more shares when prices are low</li>
                    <li>• Buys fewer shares when prices are high</li>
                    <li>• Reduces impact of market volatility</li>
                    <li>• Removes emotional timing decisions</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}
