'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function InvestmentReturn() {
  const [initial, setInitial] = useState(100000)
  const [final, setFinal] = useState(250000)
  const [years, setYears] = useState(5)

  const cagr = (Math.pow(final / initial, 1 / years) - 1) * 100
  const profit = final - initial

  const fmt = (n: number) => new Intl.NumberFormat('en-IN').format(n)

  return (
    <main className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/finance" className="text-orange-600 text-sm">← Back</Link>
        <h1 className="text-2xl font-bold mt-4 mb-2">📊 Investment Return</h1>
        
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <input type="number" value={initial} onChange={e=>setInitial(+e.target.value)} placeholder="Initial" className="w-full p-3 border rounded" />
          <input type="number" value={final} onChange={e=>setFinal(+e.target.value)} placeholder="Final Value" className="w-full p-3 border rounded" />
          <input type="number" value={years} onChange={e=>setYears(+e.target.value)} placeholder="Years" className="w-full p-3 border rounded" />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-xl text-center">
            <div className="text-xs text-gray-500">CAGR</div>
            <div className="text-2xl font-bold text-orange-600">{cagr.toFixed(2)}%</div>
          </div>
          <div className="bg-white p-4 rounded-xl text-center">
            <div className="text-xs text-gray-500">Profit</div>
            <div className="text-xl font-bold">₹{fmt(profit)}</div>
          </div>
          <div className="bg-white p-4 rounded-xl text-center">
            <div className="text-xs text-gray-500">Multiple</div>
            <div className="text-2xl font-bold">{(final/initial).toFixed(1)}x</div>
          </div>
        </div>
      </div>
    </main>
  )
}
