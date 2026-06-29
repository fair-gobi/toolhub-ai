'use client'

import { useState } from 'react'
import Link from 'next/link'

const tools = [
  { name: 'SIP Calculator', slug: 'sip-calculator', desc: 'Calculate returns on your Systematic Investment Plan', icon: '📈' },
  { name: 'Compound Interest Calculator', slug: 'compound-interest', desc: 'Calculate compound interest on investments', icon: '💹' },
  { name: 'Retirement Calculator', slug: 'retirement', desc: 'Plan your retirement savings', icon: '👴' },
  { name: 'Investment Return Calculator', slug: 'investment-return', desc: 'Calculate annualized return on investments', icon: '💰' },
  { name: 'FIRE Calculator', slug: 'fire', desc: 'Calculate Financial Independence number', icon: '🔥' },
  { name: 'Savings Goal Calculator', slug: 'savings-goal', desc: 'Find monthly savings needed for your goal', icon: '🎯' },
  { name: 'Profit Margin Calculator', slug: 'profit-margin', desc: 'Calculate gross, net, and operating margins', icon: '📊' },
  { name: 'Break Even Calculator', slug: 'break-even', desc: 'Find your break-even point', icon: '⚖️' },
  { name: 'ROI Calculator', slug: 'roi-calculator', desc: 'Calculate Return on Investment', icon: '💵' },
  { name: 'Cash Flow Calculator', slug: 'cash-flow', desc: 'Track business inflows and outflows', icon: '💸' },
  { name: 'Startup Runway Calculator', slug: 'startup-runway', desc: 'Calculate how long your cash will last', icon: '🚀' },
  { name: 'Crypto Profit Calculator', slug: 'crypto-profit', desc: 'Calculate profit/loss on crypto trades', icon: '₿' },
  { name: 'Mining Profit Calculator', slug: 'mining-profit', desc: 'Calculate crypto mining profitability', icon: '⛏️' },
  { name: 'DCA Calculator', slug: 'dca-calculator', desc: 'Calculate Dollar Cost Averaging', icon: '📉' },
  { name: 'Inflation Calculator', slug: 'inflation', desc: 'See how inflation impacts purchasing power', icon: '🎈' },
  { name: 'Loan EMI Calculator', slug: 'loan-emi', desc: 'Calculate your monthly EMI for loans', icon: '🏦' }
]

export default function FinancePage() {
  const [search, setSearch] = useState('')
  
  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(search.toLowerCase()) ||
    tool.desc.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
            ← Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💰</div>
          <h1 className="text-4xl font-bold mb-3">Finance Calculators</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            16 free tools to plan your money better
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="search"
              placeholder="Search calculators..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/finance/${tool.slug}`}
              className="group bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl group-hover:scale-110 transition-transform">{tool.icon}</div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tool.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No calculators found for "{search}"
          </div>
        )}
      </div>
    </main>
  )
}
