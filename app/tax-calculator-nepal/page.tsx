"use client"
import { useState } from "react"

export default function TaxCalculator() {
  const [income, setIncome] = useState(1200000)

  // 2026 Budget: 5 slabs
  const calculateTax = (inc: number) => {
    let tax = 0
    let breakdown: any[] = []

    // Slab 1: Up to 10 lakh - 1%
    const s1 = Math.min(inc, 1000000)
    const t1 = s1 * 0.01
    tax += t1
    breakdown.push({ slab: "Up to 10L", rate: "1%", amount: t1 })

    // Slab 2: 10L-15L - 10%
    if (inc > 1000000) {
      const s2 = Math.min(inc - 1000000, 500000)
      const t2 = s2 * 0.10
      tax += t2
      breakdown.push({ slab: "10L-15L", rate: "10%", amount: t2 })
    }

    // Slab 3: 15L-25L - 20%
    if (inc > 1500000) {
      const s3 = Math.min(inc - 1500000, 1000000)
      const t3 = s3 * 0.20
      tax += t3
      breakdown.push({ slab: "15L-25L", rate: "20%", amount: t3 })
    }

    // Slab 4: 25L-40L - 27%
    if (inc > 2500000) {
      const s4 = Math.min(inc - 2500000, 1500000)
      const t4 = s4 * 0.27
      tax += t4
      breakdown.push({ slab: "25L-40L", rate: "27%", amount: t4 })
    }

    // Slab 5: Above 40L - 29%
    if (inc > 4000000) {
      const s5 = inc - 4000000
      const t5 = s5 * 0.29
      tax += t5
      breakdown.push({ slab: "Above 40L", rate: "29%", amount: t5 })
    }

    return { tax, breakdown }
  }

  const { tax, breakdown } = calculateTax(income)
  const net = income - tax
  const effective = income > 0? (tax / income) * 100 : 0

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">Nepal Income Tax Calculator 2026</h1>
      <p className="text-gray-600 mb-2">Based on 2026 Federal Budget - New 5-slab system</p>
      <p className="text-sm text-green-700 bg-green-50 inline-block px-3 py-1 rounded-full mb-8">
        Peak rate reduced from 39% to 29%
      </p>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium mb-2">Annual Taxable Income (NPR)</label>
          <input
            type="number"
            value={income}
            onChange={e => setIncome(+e.target.value)}
            className="w-full p-5 border-2 rounded-xl text-2xl font-bold"
            step="10000"
          />
          <div className="flex gap-2 mt-3 flex-wrap">
            {[500000, 1000000, 1500000, 2500000, 4000000].map(v => (
              <button key={v} onClick={() => setIncome(v)} className="px-3 py-1 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">
                {v/100000}L
              </button>
            ))}
          </div>

          <div className="mt-8 bg-gray-50 rounded-xl p-5">
            <h3 className="font-bold mb-3">2026 Tax Slabs</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Up to 10,00,000</span><span className="font-medium">1%</span></div>
              <div className="flex justify-between"><span>10,00,001 - 15,00,000</span><span className="font-medium">10%</span></div>
              <div className="flex justify-between"><span>15,00,001 - 25,00,000</span><span className="font-medium">20%</span></div>
              <div className="flex justify-between"><span>25,00,001 - 40,00,000</span><span className="font-medium">27%</span></div>
              <div className="flex justify-between"><span>Above 40,00,000</span><span className="font-medium">29%</span></div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl p-8">
            <div className="text-sm opacity-90">Total Annual Tax</div>
            <div className="text-5xl font-bold mt-1">Rs {tax.toLocaleString('en-IN', {maximumFractionDigits:0})}</div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm border-t border-white/20 pt-4">
              <div><div className="opacity-80">Monthly</div><div className="text-xl font-bold">Rs {(tax/12).toLocaleString('en-IN', {maximumFractionDigits:0})}</div></div>
              <div><div className="opacity-80">Net Income</div><div className="text-xl font-bold">Rs {net.toLocaleString('en-IN', {maximumFractionDigits:0})}</div></div>
              <div><div className="opacity-80">Effective Rate</div><div className="text-xl font-bold">{effective.toFixed(1)}%</div></div>
              <div><div className="opacity-80">Take Home</div><div className="text-xl font-bold">{((net/income)*100).toFixed(0)}%</div></div>
            </div>
          </div>

          <div className="mt-6 bg-white border rounded-xl p-5">
            <h4 className="font-bold mb-3 text-sm">Tax Breakdown</h4>
            {breakdown.map((b, i) => (
              <div key={i} className="flex justify-between py-1.5 text-sm border-b last:border-0">
                <span>{b.slab} @ {b.rate}</span>
                <span className="font-medium">Rs {b.amount.toLocaleString('en-IN', {maximumFractionDigits:0})}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
