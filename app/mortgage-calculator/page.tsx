"use client"
import { useState } from "react"

export default function Mortgage() {
  const [price,setPrice]=useState(300000); const [down,setDown]=useState(20); const [rate,setRate]=useState(6.5); const [years,setYears]=useState(30)
  const loan = price*(1-down/100); const monthly = rate/100/12; const n = years*12
  const payment = loan*monthly*Math.pow(1+monthly,n)/(Math.pow(1+monthly,n)-1)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">Mortgage Calculator</h1>
      <p className="text-gray-600 mb-8">US, UK, Canada, Australia home loans</p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <div><label>Home Price</label><input type="number" value={price} onChange={e=>setPrice(+e.target.value)} className="w-full p-3 border-2 rounded-xl"/></div>
          <div><label>Down Payment %</label><input type="number" value={down} onChange={e=>setDown(+e.target.value)} className="w-full p-3 border-2 rounded-xl"/></div>
          <div><label>Interest Rate %</label><input type="number" step="0.1" value={rate} onChange={e=>setRate(+e.target.value)} className="w-full p-3 border-2 rounded-xl"/></div>
          <div><label>Loan Term (years)</label><select value={years} onChange={e=>setYears(+e.target.value)} className="w-full p-3 border-2 rounded-xl"><option>15</option><option>20</option><option>30</option></select></div>
        </div>
        <div className="bg-blue-600 text-white rounded-2xl p-8">
          <div className="text-sm">Monthly Payment</div>
          <div className="text-5xl font-bold">${payment.toFixed(0)}</div>
          <div className="mt-4 text-sm opacity-90">Loan amount: ${loan.toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}
