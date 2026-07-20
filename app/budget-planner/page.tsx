"use client"
import { useState } from "react"

export default function Budget() {
  const [income,setIncome]=useState(50000)
  const needs = income*0.5; const wants = income*0.3; const savings = income*0.2

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">50/30/20 Budget Planner</h1>
      <p className="text-gray-600 mb-8">Nepali salary budgeting tool.</p>
      <div className="mb-8">
        <label>Monthly Income (Rs)</label>
        <input type="number" value={income} onChange={e=>setIncome(+e.target.value)} className="w-full p-4 border-2 rounded-xl text-2xl font-bold mt-2" />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-6 rounded-2xl border-2 border-blue-300">
          <div className="text-blue-800 font-bold">50% Needs</div>
          <div className="text-3xl font-bold mt-2">Rs {needs.toLocaleString()}</div>
          <div className="text-sm mt-2">Rent, food, transport</div>
        </div>
        <div className="bg-purple-100 p-6 rounded-2xl border-2 border-purple-300">
          <div className="text-purple-800 font-bold">30% Wants</div>
          <div className="text-3xl font-bold mt-2">Rs {wants.toLocaleString()}</div>
          <div className="text-sm mt-2">Entertainment, shopping</div>
        </div>
        <div className="bg-green-100 p-6 rounded-2xl border-2 border-green-300">
          <div className="text-green-800 font-bold">20% Savings</div>
          <div className="text-3xl font-bold mt-2">Rs {savings.toLocaleString()}</div>
          <div className="text-sm mt-2">Emergency, investment</div>
        </div>
      </div>
    </div>
  )
}
