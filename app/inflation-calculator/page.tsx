"use client"
import { useState } from "react"

export default function Inflation() {
  const [amount,setAmount]=useState(100); const [years,setYears]=useState(10); const [rate,setRate]=useState(3)
  const future = amount*Math.pow(1+rate/100, years)
  const past = amount/Math.pow(1+rate/100, years)

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">Inflation Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate purchasing power worldwide</p>
      <div className="bg-white border-2 rounded-2xl p-8">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div><label>Amount</label><input type="number" value={amount} onChange={e=>setAmount(+e.target.value)} className="w-full p-3 border-2 rounded-xl"/></div>
          <div><label>Years</label><input type="number" value={years} onChange={e=>setYears(+e.target.value)} className="w-full p-3 border-2 rounded-xl"/></div>
          <div><label>Inflation %</label><input type="number" value={rate} onChange={e=>setRate(+e.target.value)} className="w-full p-3 border-2 rounded-xl"/></div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <div className="text-sm text-red-700">In {years} years, ${amount} will be worth</div>
            <div className="text-3xl font-bold text-red-700">${past.toFixed(2)}</div>
            <div className="text-xs mt-1">today's money</div>
          </div>
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <div className="text-sm text-green-700">You'll need</div>
            <div className="text-3xl font-bold text-green-700">${future.toFixed(2)}</div>
            <div className="text-xs mt-1">to buy same thing</div>
          </div>
        </div>
      </div>
    </div>
  )
}
