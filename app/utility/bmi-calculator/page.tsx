'use client'
import { useState } from 'react'

export default function BMICalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState<number|null>(null)

  const calculate = () => {
    const h = parseFloat(height)/100, w = parseFloat(weight)
    if (h && w) setBmi(parseFloat((w/(h*h)).toFixed(1)))
  }

  const category = bmi? bmi < 18.5? 'Underweight' : bmi < 25? 'Normal' : bmi < 30? 'Overweight' : 'Obese' : ''
  const color = bmi? bmi < 18.5? 'text-blue-600' : bmi < 25? 'text-green-600' : bmi < 30? 'text-yellow-600' : 'text-red-600' : ''

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
        <p className="text-gray-600 mb-6">Body Mass Index calculator (WHO standard)</p>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div><label className="text-sm">Height (cm)</label><input type="number" value={height} onChange={e=>setHeight(e.target.value)} className="w-full p-3 border rounded-xl mt-1" /></div>
            <div><label className="text-sm">Weight (kg)</label><input type="number" value={weight} onChange={e=>setWeight(e.target.value)} className="w-full p-3 border rounded-xl mt-1" /></div>
          </div>
          <button onClick={calculate} className="w-full bg-blue-600 text-white py-3 rounded-xl">Calculate BMI</button>

          {bmi && (
            <div className="mt-6 text-center">
              <div className={`text-4xl font-bold ${color}`}>{bmi}</div>
              <div className={`text-lg ${color} mt-1`}>{category}</div>
              <div className="mt-4 text-xs text-gray-500">18.5-24.9 Normal  25-29.9 Overweight  30+ Obese</div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
