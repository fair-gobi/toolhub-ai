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

export default function CryptoProfitCalculator() {
  const [buyPrice, setBuyPrice] = useState(30000)
  const [sellPrice, setSellPrice] = useState(45000)
  const [quantity, setQuantity] = useState(0.5)
  const [buyFee, setBuyFee] = useState(0.5)
  const [sellFee, setSellFee] = useState(0.5)
  const [currency, setCurrency] = useState(currencies[0])
  
  const [totalCost, setTotalCost] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [netProfit, setNetProfit] = useState(0)
  const [roi, setRoi] = useState(0)
  const [totalFees, setTotalFees] = useState(0)

  useEffect(() => {
    const buy = Number(buyPrice)
    const sell = Number(sellPrice)
    const qty = Number(quantity)
    const bFee = Number(buyFee) / 100
    const sFee = Number(sellFee) / 100

    if (buy > 0 && sell > 0 && qty > 0) {
      const grossBuyCost = buy * qty
      const grossSellRevenue = sell * qty
      const buyFeeAmount = grossBuyCost * bFee
      const sellFeeAmount = grossSellRevenue * sFee
      
      const totalInvested = grossBuyCost + buyFeeAmount
      const netRevenue = grossSellRevenue - sellFeeAmount
      const profit = netRevenue - totalInvested
      const roiPercent = (profit / totalInvested) * 100

      setTotalCost(Math.round(totalInvested))
      setTotalRevenue(Math.round(netRevenue))
      setNetProfit(Math.round(profit))
      setRoi(Number(roiPercent.toFixed(2)))
      setTotalFees(Math.round(buyFeeAmount + sellFeeAmount))
    }
  }, [buyPrice, sellPrice, quantity, buyFee, sellFee])

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: ['JPY', 'KRW', 'IDR'].includes(currency.code)? 0 : 2
    }).format(num)
  }

  const formatCrypto = (num: number) => {
    return num.toFixed(8).replace(/\.?0+$/, '')
  }

  const getProfitColor = () => {
    if (netProfit > 0) return 'text-green-600 dark:text-green-400'
    if (netProfit < 0) return 'text-red-600 dark:text-red-400'
    return 'text-gray-600 dark:text-gray-400'
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Link href="/finance" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 inline-block">
          ← Back to Finance Tools
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Crypto Profit Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate profit/loss from crypto trades including exchange fees</p>

        <div className="grid lg:grid-cols-2 gap-8">
          
          <section aria-labelledby="trade-inputs-heading">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 id="trade-inputs-heading" className="text-xl font-semibold">Trade Details</h2>
                
                <select
                  value={currency.code}
                  onChange={(e) => setCurrency(currencies.find(c => c.code === e.target.value) || currencies[0])}
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500/20"
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
                  <label htmlFor="buy-price" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Buy Price per Coin: {formatCurrency(buyPrice)}
                  </label>
                  <input
                    id="buy-price"
                    type="range"
                    min="1"
                    max="100000"
                    step="1"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>

                <div>
                  <label htmlFor="sell-price" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Sell Price per Coin: {formatCurrency(sellPrice)}
                  </label>
                  <input
                    id="sell-price"
                    type="range"
                    min="1"
                    max="200000"
                    step="1"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Quantity: {formatCrypto(quantity)} coins
                  </label>
                  <input
                    id="quantity"
                    type="range"
                    min="0.0001"
                    max="10"
                    step="0.0001"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <label htmlFor="buy-fee" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Buy Fee: {buyFee}%
                    </label>
                    <input
                      id="buy-fee"
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={buyFee}
                      onChange={(e) => setBuyFee(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="sell-fee" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Sell Fee: {sellFee}%
                    </label>
                    <input
                      id="sell-fee"
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={sellFee}
                      onChange={(e) => setSellFee(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="profit-results-heading">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border border-amber-100 dark:border-amber-900 rounded-2xl p-6 shadow-sm">
              <h2 id="profit-results-heading" className="text-xl font-semibold mb-6">Profit Summary</h2>
              
              <div className="space-y-5">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Net Profit / Loss</p>
                  <p className={`text-3xl font-bold ${getProfitColor()}`}>{formatCurrency(netProfit)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">ROI: {roi}%</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Invested</p>
                    <p className="text-lg font-semibold">{formatCurrency(totalCost)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Incl. fees</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Net Revenue</p>
                    <p className="text-lg font-semibold">{formatCurrency(totalRevenue)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">After fees</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                  <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Trade Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Buy Cost:</span>
                      <span>{formatCurrency(buyPrice * quantity)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Buy Fees:</span>
                      <span className="text-red-600 dark:text-red-400">-{formatCurrency((buyPrice * quantity * buyFee) / 100)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Sell Revenue:</span>
                      <span>{formatCurrency(sellPrice * quantity)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Sell Fees:</span>
                      <span className="text-red-600 dark:text-red-400">-{formatCurrency((sellPrice * quantity * sellFee) / 100)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2 font-medium">
                      <span>Total Fees:</span>
                      <span className="text-red-600 dark:text-red-400">{formatCurrency(totalFees)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2 font-bold">
                      <span>Net Profit:</span>
                      <span className={getProfitColor()}>{formatCurrency(netProfit)}</span>
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
