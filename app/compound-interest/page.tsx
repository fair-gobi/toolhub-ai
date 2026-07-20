"use client"
import { useState } from "react"

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState(10000)
  const [monthly, setMonthly] = useState(500)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(10)

  const n = 12
  const totalMonths = years * 12
  const monthlyRate = rate / 100 / n

  const futureValue = principal * Math.pow(1 + monthlyRate, totalMonths) +
    monthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)

  const totalInvested = principal + (monthly * totalMonths)
  const interestEarned = futureValue - totalInvested

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">Compound Interest Calculator</h1>
      <p className="text-gray-600 mb-8">See how your money grows worldwide</p>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Initial Investment ($)</label>
            <input type="number" value={principal} onChange={e=>setPrincipal(+e.target.value)}
              className="w-full p-4 border-2 rounded-xl text-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Monthly Contribution ($)</label>
            <input type="number" value={monthly} onChange={e=>setMonthly(+e.target.value)}
              className="w-full p-4 border-2 rounded-xl text-xl" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Annual Return (%)</label>
              <input type="number" step="0.1" value={rate} onChange={e=>setRate(+e.target.value)}
                className="w-full p-4 border-2 rounded-xl text-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Years</label>
              <input type="number" value={years} onChange={e=>setYears(+e.target.value)}
                className="w-full p-4 border-2 rounded-xl text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl p-8">
          <div className="text-sm opacity-90 uppercase tracking-wide">Future Value</div>
          <div className="text-5xl font-bold mt-2">${futureValue.toLocaleString('en-US', {maximumFractionDigits:0})}</div>

          <div className="mt-8 space-y-4 border-t border-white/20 pt-6">
            <div className="flex justify-between">
              <span className="opacity-80">Total Invested</span>
              <span className="font-semibold">${totalInvested.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-80">Interest Earned</span>
              <span className="font-semibold text-green-300">${interestEarned.toLocaleString('en-US', {maximumFractionDigits:0})}</span>
            </div>
            <div className="flex justify-between text-lg pt-2 border-t border-white/20">
              <span>Growth</span>
              <span className="font-bold">{((futureValue/totalInvested -1)*100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
