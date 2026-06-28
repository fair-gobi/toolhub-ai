'use client'
import { useState } from 'react'

export default function EMICalculator() {
  const [amount, setAmount] = useState(1000000)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(5)

  const monthlyRate = rate / 12 / 100
  const months = years * 12
  const emi = amount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
  const total = emi * months
  const interest = total - amount

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">🏦 EMI Calculator</h1>
        <p className="text-gray-600 mb-6">Calculate your loan monthly payment</p>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">Loan Amount (NPR)</label>
              <input 
                type="number" 
                value={amount} 
                onChange={e => setAmount(Number(e.target.value))} 
                className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Interest Rate (% per year)</label>
              <input 
                type="number" 
                step="0.1"
                value={rate} 
                onChange={e => setRate(Number(e.target.value))} 
                className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Loan Tenure (years)</label>
              <input 
                type="number" 
                value={years} 
                onChange={e => setYears(Number(e.target.value))} 
                className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">Rs {Math.round(emi).toLocaleString()}</div>
              <div className="text-xs text-gray-600 mt-1">Monthly EMI</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">Rs {Math.round(total).toLocaleString()}</div>
              <div className="text-xs text-gray-600 mt-1">Total Payment</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">Rs {Math.round(interest).toLocaleString()}</div>
              <div className="text-xs text-gray-600 mt-1">Total Interest</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
