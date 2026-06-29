'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const currencies = [
  { code: 'NPR', symbol: 'Rs', locale: 'ne-NP', name: 'Nepali Rupee' },
  { code: 'INR', symbol: '₹', locale: 'en-IN', name: 'Indian Rupee' },
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

export default function LoanEmiCalculator() {
  const [principal, setPrincipal] = useState(500000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(5)
  const [emi, setEmi] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [currency, setCurrency] = useState(currencies[0])

  useEffect(() => {
    const monthlyRate = rate / 12 / 100
    const months = tenure * 12
    const emiCalc = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
    const total = emiCalc * months
    const interest = total - principal

    setEmi(emiCalc)
    setTotalAmount(total)
    setTotalInterest(interest)
  }, [principal, rate, tenure])

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: ['JPY', 'KRW', 'IDR'].includes(currency.code)? 0 : 0
    }).format(Math.round(num))
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Link href="/finance" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 inline-block">
          ← Back to Finance Tools
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">💰 Loan EMI Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate your Equated Monthly Installment for any loan</p>
        
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          
          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Currency</label>
            <select
              value={currency.code}
              onChange={e => setCurrency(currencies.find(c => c.code === e.target.value) || currencies[0])}
              className="w-full mt-1 px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
            >
              <optgroup label="South Asia">
                {currencies.slice(0, 7).map(c => (
                  <option key={c.code} value={c.code}>{c.symbol} {c.code} - {c.name}</option>
                ))}
              </optgroup>
              <optgroup label="Global">
                {currencies.slice(7).map(c => (
                  <option key={c.code} value={c.code}>{c.symbol} {c.code} - {c.name}</option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Loan Amount</label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400 text-sm">{currency.symbol}</span>
                <input
                  type="number"
                  value={principal}
                  onChange={e => setPrincipal(Number(e.target.value))}
                  className="w-full pl-10 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Interest Rate (% p.a.)</label>
                <input
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={e => setRate(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tenure (years)</label>
                <input
                  type="number"
                  value={tenure}
                  onChange={e => setTenure(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg text-center border border-blue-100 dark:border-blue-900">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{formatCurrency(emi)}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Monthly EMI</div>
              </div>
              <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg text-center border border-green-100 dark:border-green-900">
                <div className="text-xl font-bold text-green-700 dark:text-green-400">{formatCurrency(totalAmount)}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Total Payment</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg text-center border border-orange-100 dark:border-orange-900">
                <div className="text-xl font-bold text-orange-700 dark:text-orange-400">{formatCurrency(totalInterest)}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Total Interest</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}