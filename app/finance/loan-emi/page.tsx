'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const CURRENCIES = ['NPR','INR','USD','EUR']
export default function EMI() {
  useEffect(() => {
    document.title = 'Loan EMI Calculator Nepal India - EMI Calculator'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Free EMI calculator for home, car, personal loan. Calculate monthly EMI in NPR, INR, USD.')
  }, [])

export default function EMI() {
  const [principal, setPrincipal] = useState(1000000)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(5)
  const [currency, setCurrency] = useState('NPR')

  const monthlyRate = rate / 12 / 100
  const months = years * 12
  const emi = principal * monthlyRate * Math.pow(1+monthlyRate, months) / (Math.pow(1+monthlyRate, months)-1)
  const total = emi * months
  const interest = total - principal

  const fmt = (n:number) => new Intl.NumberFormat('en',{style:'currency',currency,maximumFractionDigits:0}).format(n)

  return (
    <main className="min-h-screen bg-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-indigo-600 hover:underline mb-4 inline-block">← Back</Link>
        <div className="bg-white rounded-2xl border border-indigo-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <h1 className="text-2xl font-bold">🏦 Loan EMI Calculator</h1>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <select value={currency} onChange={e=>setCurrency(e.target.value)} className="w-full p-3 border rounded-xl">
                {CURRENCIES.map(c=><option key={c}>{c}</option>)}
              </select>
              <input type="number" value={principal} onChange={e=>setPrincipal(+e.target.value)} placeholder="Loan Amount" className="w-full p-3 border rounded-xl" />
              <input type="number" step="0.1" value={rate} onChange={e=>setRate(+e.target.value)} placeholder="Interest %" className="w-full p-3 border rounded-xl" />
              <input type="number" value={years} onChange={e=>setYears(+e.target.value)} placeholder="Years" className="w-full p-3 border rounded-xl" />
            </div>
            <div className="bg-indigo-50 rounded-xl p-6">
              <div className="text-center">
                <div className="text-sm">Monthly EMI</div>
                <div className="text-3xl font-bold text-indigo-600 my-2">{fmt(emi)}</div>
                <div className="text-xs">Total interest: {fmt(interest)}</div>
                <div className="text-xs">Total payment: {fmt(total)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
