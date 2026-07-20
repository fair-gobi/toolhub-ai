"use client"
import { useState } from "react"

export default function Retirement() {
  const [age,setAge]=useState(30); const [retire,setRetire]=useState(65); const [current,setCurrent]=useState(50000); const [monthly,setMonthly]=useState(500); const [rate,setRate]=useState(7)
  const years = retire-age; const months = years*12
  const future = current*Math.pow(1+rate/100, years) + monthly*12*(((Math.pow(1+rate/100, years)-1)/(rate/100)))

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">Retirement Savings Calculator</h1>
      <p className="text-gray-600 mb-8">Plan your retirement worldwide</p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label>Current Age</label><input type="number" value={age} onChange={e=>setAge(+e.target.value)} className="w-full p-3 border-2 rounded-xl"/></div>
            <div><label>Retire Age</label><input type="number" value={retire} onChange={e=>setRetire(+e.target.value)} className="w-full p-3 border-2 rounded-xl"/></div>
          </div>
          <div><label>Current Savings</label><input type="number" value={current} onChange={e=>setCurrent(+e.target.value)} className="w-full p-3 border-2 rounded-xl"/></div>
          <div><label>Monthly Contribution</label><input type="number" value={monthly} onChange={e=>setMonthly(+e.target.value)} className="w-full p-3 border-2 rounded-xl"/></div>
          <div><label>Expected Return %</label><input type="number" value={rate} onChange={e=>setRate(+e.target.value)} className="w-full p-3 border-2 rounded-xl"/></div>
        </div>
        <div className="bg-green-600 text-white rounded-2xl p-8 flex flex-col justify-center">
          <div>At age {retire}</div>
          <div className="text-5xl font-bold my-2">${future.toFixed(0).toLocaleString()}</div>
          <div className="text-sm opacity-90">In {years} years with {rate}% return</div>
        </div>
      </div>
    </div>
  )
}
