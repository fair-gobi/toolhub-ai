import Link from 'next/link'

const tools = [
  { 
    slug: 'sip-calculator', 
    name: 'SIP Calculator', 
    desc: 'Calculate returns on monthly SIP investments with compounding',
    longDesc: 'Plan your systematic investment. Enter monthly amount, expected return, and years to see total corpus, invested amount, and wealth gained.',
    icon: '📈',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  { 
    slug: 'compound-interest', 
    name: 'Compound Interest Calculator', 
    desc: 'Find maturity value with compounding frequency',
    longDesc: 'Calculate how your money grows with compound interest. Supports yearly, quarterly, and monthly compounding for accurate projections.',
    icon: '💰',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  { 
    slug: 'retirement', 
    name: 'Retirement Calculator', 
    desc: 'Plan your retirement corpus and monthly SIP needed',
    longDesc: 'Estimate how much you need to save monthly to retire comfortably. Factors in current age, retirement age, and expected returns.',
    icon: '🏖️',
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  { 
    slug: 'investment-return', 
    name: 'Investment Return Calculator', 
    desc: 'Calculate CAGR and absolute returns',
    longDesc: 'Find your annualized return (CAGR) between initial and final investment value. Perfect for stocks, mutual funds, and property.',
    icon: '📊',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  { 
    slug: 'fire', 
    name: 'FIRE Calculator', 
    desc: 'Financial Independence, Retire Early planning',
    longDesc: 'Calculate your FIRE number based on annual expenses and withdrawal rate. See how many years until financial freedom.',
    icon: '🔥',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200'
  },
  { 
    slug: 'savings-goal', 
    name: 'Savings Goal Calculator', 
    desc: 'How much to save monthly to reach target',
    longDesc: 'Reverse SIP calculator. Enter your target amount and timeline to find the exact monthly investment needed.',
    icon: '🎯',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200'
  },
  { 
    slug: 'profit-margin', 
    name: 'Profit Margin Calculator', 
    desc: 'Calculate gross margin, markup, and profit',
    longDesc: 'Perfect for pricing products. Enter cost and selling price to see margin %, markup %, and profit per unit.',
    icon: '💹',
    color: 'from-blue-600 to-indigo-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300'
  },
  { 
    slug: 'break-even', 
    name: 'Break-even Calculator', 
    desc: 'Find units needed to cover all costs',
    longDesc: 'Enter fixed costs, variable cost per unit, and selling price to find your break-even point.',
    icon: '⚖️',
    color: 'from-green-600 to-emerald-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300'
  },
  { 
    slug: 'roi-calculator', 
    name: 'ROI Calculator', 
    desc: 'Calculate return on investment percentage',
    longDesc: 'Measure profitability of investments. Enter initial investment and final return to get ROI % and profit.',
    icon: '📈',
    color: 'from-purple-600 to-violet-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300'
  },
  { 
    slug: 'cash-flow', 
    name: 'Cash Flow Calculator', 
    desc: 'Monthly inflow vs outflow analysis',
    longDesc: 'Track business cash flow. Enter monthly income and expenses to see net cash flow and runway.',
    icon: '💵',
    color: 'from-orange-600 to-amber-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-300'
  },
  { 
    slug: 'startup-runway', 
    name: 'Startup Runway Calculator', 
    desc: 'How many months until cash runs out',
    longDesc: 'For startups and businesses. Enter cash balance and monthly burn rate to calculate runway in months.',
    icon: '🚀',
    color: 'from-pink-600 to-rose-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-300'
  },
]

export default function Finance() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4">
            <span className="text-3xl">💰</span>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Finance Tools
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
  Free calculators for SIP, retirement, FIRE, profit margin, ROI, and business planning. 
  Works worldwide with 25+ currencies including NPR, INR, USD, EUR.
</p>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Free calculators for SIP, retirement, FIRE, and investments. 
            Works worldwide with 25+ currencies including NPR, INR, USD, EUR.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">✓ No signup</span>
            <span className="flex items-center gap-1">✓ 100% private</span>
            <span className="flex items-center gap-1">✓ Works offline</span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/finance/${tool.slug}`}>
              <div className={`group h-full bg-white rounded-2xl border-2 ${tool.borderColor} hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                {/* Colored Header */}
                <div className={`${tool.bgColor} p-6 border-b ${tool.borderColor}`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{tool.icon}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{tool.name}</h2>
                  <p className="text-sm text-gray-600">{tool.desc}</p>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {tool.longDesc}
                  </p>
                  <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    Use calculator
                  <div className="flex items-center gap-2"><span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">✓</span><span>Profit margin & markup calculator</span></div>
                  <div className="flex items-center gap-2"><span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">✓</span><span>Break-even point calculator</span></div>
                  <div className="flex items-center gap-2"><span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">✓</span><span>ROI calculator</span></div>
                  <div className="flex items-center gap-2"><span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">✓</span><span>Cash flow analyzer</span></div>
                   <div className="flex items-center gap-2"><span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">✓</span><span>Startup runway calculator</span></div>
                   <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Checklist Reminder Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">✓</span> Your Finance Checklist
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span><strong>SIP:</strong> Start with at least 10% of income, increase yearly</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span><strong>Emergency fund:</strong> 6 months expenses before investing</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span><strong>Retirement:</strong> Aim for 25x annual expenses</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span><strong>FIRE:</strong> 4% withdrawal rule for safety</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span><strong>Diversify:</strong> Don't put all in one asset</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span><strong>Review:</strong> Check portfolio every 6 months</span>
            </div>
          </div>
        </div>

        {/* Currency Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Supports: NPR, INR, USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, SGD, AED, SAR, PKR, BDT and more
          </p>
        </div>
      </div>
    </main>
  )
}
