"use client"

import Link from 'next/link'
import { useState } from 'react'

const tools = [
  { name: 'Nepali Date Converter', desc: 'BS ? AD calendar', href: '/utility/nepali-date-converter', icon: '??' },
  { name: 'GPA Calculator', desc: 'TU/PU CGPA calculator', href: '/gpa-calculator', icon: '??' },
  { name: 'QR Generator', desc: 'Custom QR codes', href: '/qr-generator', icon: '??' },
  { name: 'Payment QR', desc: 'eSewa/Khalti QR', href: '/payment-qr', icon: '??' },
  { name: 'QR Scanner', desc: 'Scan QR from image', href: '/qr-scanner', icon: '??' },
  { name: 'Age Calculator', desc: 'Exact age in years/months', href: '/age-calculator', icon: '??' },
  { name: 'Percentage Calculator', desc: 'X% of Y, % change', href: '/percentage-calculator', icon: '??' },
  { name: 'BMI Calculator', desc: 'Body mass index', href: '/bmi-calculator', icon: '?' },
  { name: 'Currency Converter', desc: 'Live exchange rates', href: '/currency-converter', icon: '??' },
  { name: 'Unit Converter', desc: 'Length, weight, temp', href: '/unit-converter', icon: '??' },
  { name: 'Time Zone Converter', desc: 'World time zones', href: '/time-zone-converter', icon: '??' },
  { name: 'Date Difference', desc: 'Days between dates', href: '/date-difference', icon: '??' },
  { name: 'EMI Calculator', desc: 'Loan monthly payment', href: '/utility/emi-calculator', icon: '??' },
  { name: 'GST/VAT Calculator', desc: 'Nepal 13% VAT', href: '/gst-calculator', icon: '??' },
  { name: 'YouTube Thumbnail', desc: 'Download HD thumbnails', href: '/youtube-thumbnail', icon: '??' },
]

export default function Utility() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
            ? Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">??</div>
          <h1 className="text-4xl font-bold mb-3">Utility Tools</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            15 free tools No signup  Works offline
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">??</span>
            <input 
              type="search" 
              placeholder="Search utility tools..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <Link 
              key={tool.href} 
              href={tool.href} 
              className="group bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl group-hover:scale-110 transition-transform">{tool.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tool.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No tools found for "{searchQuery}"
          </div>
        )}
      </div>
    </main>
  )
}
