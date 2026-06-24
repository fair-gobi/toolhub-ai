'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MiningProfit() {
  useEffect(() => {
    document.title = 'Crypto Mining Profit Calculator - Bitcoin Mining Profitability 2025'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Calculate crypto mining profitability. Estimate daily, monthly Bitcoin mining profits based on hashrate, power consumption, and electricity cost.')
  }, [])

  const [hashrate, setHashrate] = useState(100)
  const [power, setPower] = useState(3250)
  const [cost, setCost] = useState(0.12)
  const [btcPrice, setBtcPrice] = useState(45000)
  const [poolFee, setPoolFee] = useState(1)
  const [difficulty, setDifficulty] = useState(80)

  // Simplified calculation - 100 TH/s ~ 0.0003 BTC/day at current difficulty
  const btcPerDay = (hashrate / 100) * 0.0003 * (80 / difficulty)
  const revenueUsd = btcPerDay * btcPrice
  const poolFeesUsd = revenueUsd * poolFee / 100
  const electricityCost = (power / 1000) * 24 * cost
  const dailyProfit = revenueUsd - electricityCost - poolFeesUsd
  const monthlyProfit = dailyProfit * 30
  const yearlyProfit = dailyProfit * 365

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-gray-600 hover:underline mb-4 inline-block">← Back to Finance Tools</Link>
        
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">⛏️</div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Mining Profit Calculator</h1>
                <p className="text-gray-300 text-sm mt-1">Estimate Bitcoin & crypto mining profitability daily</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Hashrate (TH/s)</label>
                    <input type="number" value={hashrate} onChange={e=>setHashrate(+e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800" />
                    <p className="text-xs text-gray-500 mt-1">Antminer S19 = 95 TH/s</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Power Consumption (Watts)</label>
                    <input type="number" value={power} onChange={e=>setPower(+e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Electricity Cost ($/kWh)</label>
                    <input type="number" step="0.001" value={cost} onChange={e=>setCost(+e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                    <p className="text-xs text-gray-500 mt-1">Nepal ~$0.10, India ~$0.08</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">BTC Price (USD)</label>
                    <input type="number" value={btcPrice} onChange={e=>setBtcPrice(+e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Pool Fee (%)</label>
                    <input type="number" step="0.1" value={poolFee} onChange={e=>setPoolFee(+e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Network Difficulty (T)</label>
                    <input type="number" value={difficulty} onChange={e=>setDifficulty(+e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 sticky top-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Profitability</h3>
                  
                  <div className="text-center mb-5">
                    <div className="text-sm text-gray-600">Daily Profit</div>
                    <div className={`text-4xl font-bold my-2 ${dailyProfit>=0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${dailyProfit.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">{btcPerDay.toFixed(6)} BTC/day</div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex justify-between text-sm py-2 border-b border-gray-200">
                      <span className="text-gray-600">Daily Revenue</span>
                      <span className="font-medium">${revenueUsd.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-gray-200">
                      <span className="text-gray-600">Electricity</span>
                      <span className="font-medium text-red-600">-${electricityCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2">
                      <span className="text-gray-600">Pool Fees</span>
                      <span className="font-medium text-red-600">-${poolFeesUsd.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-gray-200 grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-xl p-3 text-center">
                      <div className="text-xs text-gray-500">Monthly</div>
                      <div className={`font-bold ${monthlyProfit>=0 ? 'text-green-600' : 'text-red-600'}`}>${monthlyProfit.toFixed(0)}</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center">
                      <div className="text-xs text-gray-500">Yearly</div>
                      <div className={`font-bold ${yearlyProfit>=0 ? 'text-green-600' : 'text-red-600'}`}>${yearlyProfit.toFixed(0)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-xs text-amber-800"><strong>Note:</strong> Estimates based on current network conditions. Actual profits vary with BTC price, difficulty changes, and hardware efficiency. For Nepal/India, check local electricity rates.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
