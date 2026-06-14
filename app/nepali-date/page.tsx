'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ADToBS, BSToAD } from 'bikram-sambat-js'

export default function NepaliDate() {
  const [adDate, setAdDate] = useState('')
  const [bsDate, setBsDate] = useState('')
  const [result, setResult] = useState('')

  const convertADtoBS = () => {
    if (!adDate) return
    const [y, m, d] = adDate.split('-').map(Number)
    const bs = ADToBS(`${y}-${m}-${d}`)
    setResult(`वि.सं. ${bs}`)
  }

  const convertBStoAD = () => {
    if (!bsDate) return
    const ad = BSToAD(bsDate)
    setResult(`AD: ${ad}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600">← Back to ToolHub</Link>
        <h1 className="text-3xl font-bold mt-4 mb-2">Nepali Date Converter 🇳🇵</h1>
        <p className="text-gray-600 mb-6">Accurate BS ↔ AD converter</p>
        
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          <div>
            <label className="block mb-2 font-medium">AD to BS:</label>
            <input type="date" value={adDate} onChange={(e) => setAdDate(e.target.value)} className="w-full border p-3 rounded mb-2" />
            <button onClick={convertADtoBS} className="w-full bg-red-600 text-white py-2 rounded">Convert to BS</button>
          </div>

          <div>
            <label className="block mb-2 font-medium">BS to AD (YYYY-MM-DD):</label>
            <input type="text" placeholder="2081-03-31" value={bsDate} onChange={(e) => setBsDate(e.target.value)} className="w-full border p-3 rounded mb-2" />
            <button onClick={convertBStoAD} className="w-full bg-blue-600 text-white py-2 rounded">Convert to AD</button>
          </div>

          {result && (
            <div className="p-4 bg-gray-100 rounded text-center text-xl font-bold">{result}</div>
          )}
        </div>
      </div>
    </div>
  )
}
