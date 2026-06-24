'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CryptoProfit() {
  useEffect(() => {
    document.title = 'Crypto Profit Calculator - Bitcoin & Altcoin Profit with Fees'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Free crypto profit calculator for Bitcoin, Ethereum. Calculate trade profit, ROI, fees, and net returns. Works for all cryptocurrencies.')
  }, [])

  const [buy, setBuy] = useState(30000)
  const [sell, setSell] = useState(45000)
  const [qty, setQty] = useState(0.5)
  const [fee, setFee] = useState(0.1)
  const [buyFee, setBuyFee] = useState(0.1)
  const [sellFee, setSellFee] = useState(0.1)

  const invested = buy * qty
  const buyFees = invested * buyFee / 100
  const gross = sell * qty
  const sellFees = gross * sellFee / 100
  const totalFees = buyFees + sellFees
  const profit = gross - invested - totalFees
  const roi = invested > 0 ? (profit / invested) * 100 : 0
  const profitPerCoin = sell - buy

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-yellow-600 hover:underline mb-4 inline-block">← Back to Finance Tools</Link>
        
        <div className="bg-white rounded-2xl border border-yellow-100 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">₿</div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Crypto Profit Calculator</h1>
                <p className="text-yellow-100 text-sm mt-1">Calculate Bitcoin, Ethereum & altcoin trade profits with fees</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Buy Price (USD)</label>
                    <input type="number" value={buy} onChange={e=>setBuy(+e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent" placeholder="30000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Sell Price (USD)</label>
                    <input type="number" value={sell} onChange={e=>setSell(+e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent" placeholder="45000" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity / Coins</label>
                  <input type="number" step="0.0001" value={qty} onChange={e=>setQty(+e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent" placeholder="0.5" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Buy Fee (%)</label>
                    <input type="number" step="0.01" value={buyFee} onChange={e=>setBuyFee(+e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Sell Fee (%)</label>
                    <input type="number" step="0.01" value={sellFee} onChange={e=>setSellFee(+e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200 sticky top-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Profit Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-yellow-200/50">
                      <span className="text-sm text-gray-600">Total Invested</span>
                      <span className="font-medium">${invested.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-yellow-200/50">
                      <span className="text-sm text-gray-600">Gross Sale</span>
                      <span className="font-medium">${gross.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-yellow-200/50">
                      <span className="text-sm text-gray-600">Total Fees</span>
                      <span className="font-medium text-red-600">-${totalFees.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-3 bg-white rounded-xl px-3 mt-3">
                      <span className="font-semibold">Net Profit</span>
                      <span className={`text-xl font-bold ${profit>=0 ? 'text-green-600' : 'text-red-600'}`}>
                        {profit>=0 ? '+' : ''}${profit.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-yellow-200">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-white rounded-xl p-3">
                        <div className="text-xs text-gray-500">ROI</div>
                        <div className={`text-lg font-bold ${roi>=0 ? 'text-green-600' : 'text-red-600'}`}>{roi.toFixed(1)}%</div>
                      </div>
                      <div className="bg-white rounded-xl p-3">
                        <div className="text-xs text-gray-500">Per Coin</div>
                        <div className="text-lg font-bold">${profitPerCoin.toFixed(0)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-medium text-sm mb-2">How to use:</h4>
              <p className="text-xs text-gray-600">Enter your buy price, sell price, and quantity. Add exchange fees (Binance 0.1%, Coinbase ~0.5%). Works for BTC, ETH, SOL, and any crypto.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}