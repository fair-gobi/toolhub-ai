"use client"
import { useState } from "react"

export default function APRCalculator() {
  const [amount, setAmount] = useState(10000)
  const [rate, setRate] = useState(12)
  const [fees, setFees] = useState(200)
  const [years, setYears] = useState(3)

  const monthlyRate = rate / 100 / 12
  const n = years * 12
  const monthlyPayment = amount * monthlyRate * Math.pow(1 + monthlyRate, n) / (Math.pow(1 + monthlyRate, n) - 1)
  const totalPaid = monthlyPayment * n + fees
  const totalInterest = totalPaid - amount
  const apr = ((totalPaid / amount - 1) / years) * 100

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">APR Loan Comparison Calculator</h1>
        <p className="text-lg text-gray-600">Find the true cost of loans worldwide - includes fees and interest</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-gray-900">Loan Details</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-gray-500">$</span>
                <input type="number" value={amount} onChange={e=>setAmount(+e.target.value)}
                  className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl text-lg font-medium focus:border-blue-500 focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                <input type="number" step="0.1" value={rate} onChange={e=>setRate(+e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-lg font-medium focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (years)</label>
                <input type="number" value={years} onChange={e=>setYears(+e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-lg font-medium focus:border-blue-500 focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Fees ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-gray-500">$</span>
                <input type="number" value={fees} onChange={e=>setFees(+e.target.value)}
                  className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl text-lg font-medium focus:border-blue-500 focus:outline-none" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Processing, origination, or other fees</p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-2xl p-8 shadow-xl">
            <div className="text-sm uppercase tracking-wide opacity-90">True Annual Percentage Rate</div>
            <div className="text-6xl font-bold mt-2">{apr.toFixed(2)}<span className="text-3xl">%</span></div>
            <div className="mt-4 text-purple-100">Includes all fees and compound interest</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
              <div className="text-sm text-gray-600">Monthly Payment</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">${monthlyPayment.toFixed(0)}</div>
            </div>
            <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
              <div className="text-sm text-gray-600">Total Interest</div>
              <div className="text-2xl font-bold text-red-600 mt-1">${totalInterest.toFixed(0)}</div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h3 className="font-bold text-amber-900 mb-2">Total Cost Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Principal</span><span>${amount.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Interest</span><span>${(totalPaid - amount - fees).toFixed(0)}</span></div>
              <div className="flex justify-between"><span>Fees</span><span>${fees}</span></div>
              <div className="flex justify-between font-bold pt-2 border-t border-amber-300"><span>Total Paid</span><span>${totalPaid.toFixed(0)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
