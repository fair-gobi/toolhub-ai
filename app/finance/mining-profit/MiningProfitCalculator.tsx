'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const currencies = [
  { code: 'USD', symbol: '$', locale: 'en-US', name: 'US Dollar' },
  { code: 'INR', symbol: '₹', locale: 'en-IN', name: 'Indian Rupee' },
  { code: 'NPR', symbol: '₨', locale: 'ne-NP', name: 'Nepali Rupee' },
  { code: 'PKR', symbol: '₨', locale: 'ur-PK', name: 'Pakistani Rupee' },
  { code: 'BDT', symbol: '৳', locale: 'bn-BD', name: 'Bangladeshi Taka' },
  { code: 'LKR', symbol: '₨', locale: 'si-LK', name: 'Sri Lankan Rupee' },
  { code: 'BTN', symbol: 'Nu.', locale: 'dz-BT', name: 'Bhutanese Ngultrum' },
  { code: 'MVR', symbol: 'Rf', locale: 'dv-MV', name: 'Maldivian Rufiyaa' },
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

export default function MiningProfitCalculator() {
  const [hashrate, setHashrate] = useState(100) // TH/s
  const [power, setPower] = useState(3250) // Watts
  const [electricityCost, setElectricityCost] = useState(0.10) // $/kWh
  const [poolFee, setPoolFee] = useState(1) // %
  const [btcPrice, setBtcPrice] = useState(65000)
  const [networkDifficulty, setNetworkDifficulty] = useState(80) // T
  const [currency, setCurrency] = useState(currencies[0])
  
  const [dailyRevenue, setDailyRevenue] = useState(0)
  const [dailyCost, setDailyCost] = useState(0)
  const [dailyProfit, setDailyProfit] = useState(0)
  const [monthlyProfit, setMonthlyProfit] = useState(0)
  const [yearlyProfit, setYearlyProfit] = useState(0)

  useEffect(() => {
    const hr = Number(hashrate) * 1e12 // Convert TH/s to H/s
    const diff = Number(networkDifficulty) * 1e12
    const price = Number(btcPrice)
    const powerKw = Number(power) / 1000
    const elecCost = Number(electricityCost)
    const fee = Number(poolFee) / 100

    // Simplified Bitcoin mining calculation
    // Blocks per day = 144, reward = 3.125 BTC (post-halving)
    const blocksPerDay = 144
    const blockReward = 3.125
    
    // Probability of finding block = hashrate / (difficulty * 2^32)
    const networkHashrate = diff * Math.pow(2, 32) / 600 // ~10 min block time
    const userShare = hr / networkHashrate
    const dailyBtc = userShare * blocksPerDay * blockReward * (1 - fee)
    
    const revenue = dailyBtc * price
    const cost = powerKw * 24 * elecCost
    const profit = revenue - cost

    setDailyRevenue(Number(revenue.toFixed(2)))
    setDailyCost(Number(cost.toFixed(2)))
    setDailyProfit(Number(profit.toFixed(2)))
    setMonthlyProfit(Number((profit * 30).toFixed(2)))
    setYearlyProfit(Number((profit * 365).toFixed(2)))
  }, [hashrate, power, electricityCost, poolFee, btcPrice, networkDifficulty])

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: ['JPY', 'KRW', 'IDR'].includes(currency.code)? 0 : 2
    }).format(num)
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Link href="/finance" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 inline-block">
          ← Back to Finance Tools
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Mining Profit Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate crypto mining profitability based on hashrate, power, and electricity costs</p>

        <div className="grid lg:grid-cols-2 gap-8">
          <section aria-labelledby="mining-inputs-heading">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 id="mining-inputs-heading" className="text-xl font-semibold">Miner Specifications</h2>
                
                <select
                  value={currency.code}
                  onChange={(e) => setCurrency(currencies.find(c => c.code === e.target.value) || currencies[0])}
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500/20"
                >
                  <optgroup label="South Asia">
                    {currencies.slice(1, 8).map(c => (
                      <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Global">
                    {[currencies[0],...currencies.slice(8)].map(c => (
                      <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="hashrate" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Hashrate: {hashrate} TH/s
                  </label>
                  <input
                    id="hashrate"
                    type="range"
                    min="10"
                    max="500"
                    step="5"
                    value={hashrate}
                    onChange={(e) => setHashrate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>

                <div>
                  <label htmlFor="power" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Power Consumption: {power} W
                  </label>
                  <input
                    id="power"
                    type="range"
                    min="500"
                    max="5000"
                    step="50"
                    value={power}
                    onChange={(e) => setPower(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>

                <div>
                  <label htmlFor="electricity" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Electricity Cost: {currency.symbol}{electricityCost.toFixed(3)}/kWh
                  </label>
                  <input
                    id="electricity"
                    type="range"
                    min="0.03"
                    max="0.30"
                    step="0.01"
                    value={electricityCost}
                    onChange={(e) => setElectricityCost(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>

                <div>
                  <label htmlFor="pool-fee" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Pool Fee: {poolFee}%
                  </label>
                  <input
                    id="pool-fee"
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={poolFee}
                    onChange={(e) => setPoolFee(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Network Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="btc-price" className="block text-sm mb-1 text-gray-700 dark:text-gray-300">BTC Price: {formatCurrency(btcPrice)}</label>
                      <input
                        id="btc-price"
                        type="range"
                        min="20000"
                        max="150000"
                        step="1000"
                        value={btcPrice}
                        onChange={(e) => setBtcPrice(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="difficulty" className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Network Difficulty: {networkDifficulty}T</label>
                      <input
                        id="difficulty"
                        type="range"
                        min="50"
                        max="120"
                        step="1"
                        value={networkDifficulty}
                        onChange={(e) => setNetworkDifficulty(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="mining-results-heading">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-100 dark:border-amber-900 rounded-2xl p-6 shadow-sm">
              <h2 id="mining-results-heading" className="text-xl font-semibold mb-6">Profitability Analysis</h2>
              
              <div className="space-y-5">
                <div className={`rounded-xl p-4 shadow-sm border ${dailyProfit >= 0? 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800' : 'bg-red-50 dark:bg-red-950/30 border-red-100 dark:border-red-900'}`}>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Daily Profit</p>
                  <p className={`text-3xl font-bold ${dailyProfit >= 0? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
                    {formatCurrency(dailyProfit)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Revenue: {formatCurrency(dailyRevenue)} - Cost: {formatCurrency(dailyCost)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly Profit</p>
                    <p className={`text-xl font-bold ${monthlyProfit >= 0? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {formatCurrency(monthlyProfit)}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Yearly Profit</p>
                    <p className={`text-xl font-bold ${yearlyProfit >= 0? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {formatCurrency(yearlyProfit)}
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Efficiency Metrics</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Power Efficiency:</span>
                      <span className="font-medium">{(power / hashrate).toFixed(1)} W/TH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Daily Power Cost:</span>
                      <span className="font-medium">{formatCurrency(dailyCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Break-even Elec. Price:</span>
                      <span className="font-medium">{currency.symbol}{(dailyRevenue / (power/1000*24)).toFixed(3)}/kWh</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  {dailyProfit > 0? (
                    <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg">
                      <p className="text-sm text-green-800 dark:text-green-300">✓ Profitable at current settings</p>
                    </div>
                  ) : (
                    <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg">
                      <p className="text-sm text-red-800 dark:text-red-300">✗ Not profitable - reduce power cost or increase efficiency</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
