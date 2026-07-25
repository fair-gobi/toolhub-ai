'use client'
import { useState } from 'react'

export default function PercentageCalculator() {
  const [val1, setVal1] = useState('')
  const [val2, setVal2] = useState('')
  const [result, setResult] = useState('')

  const calc = (type: string) => {
    const a = parseFloat(val1), b = parseFloat(val2)
    if (isNaN(a) || isNaN(b)) return
    if (type === 'of') setResult(`${a}% of ${b} = ${(a*b/100).toFixed(2)}`)
    if (type === 'is') setResult(`${a} is ${(a/b*100).toFixed(2)}% of ${b}`)
    if (type === 'change') setResult(`Change: ${((b-a)/a*100).toFixed(2)}%`)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Percentage Calculator</h1>
        <p className="text-gray-600 mb-6">Find percentages, increases, decreases</p>

        <div className="bg-white p-6 rounded-2xl shadow-sm border mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input type="number" placeholder="Value 1" value={val1} onChange={e=>setVal1(e.target.value)} className="p-3 border rounded-xl" />
            <input type="number" placeholder="Value 2" value={val2} onChange={e=>setVal2(e.target.value)} className="p-3 border rounded-xl" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={()=>calc('of')} className="bg-blue-600 text-white py-2 rounded-lg text-sm">X% of Y</button>
            <button onClick={()=>calc('is')} className="bg-green-600 text-white py-2 rounded-lg text-sm">X is what %</button>
            <button onClick={()=>calc('change')} className="bg-purple-600 text-white py-2 rounded-lg text-sm">% Change</button>
          </div>
          {result && <div className="mt-4 p-3 bg-gray-50 rounded-lg font-mono text-center">{result}</div>}
        </div>
      </div>
    </main>
  )
}
