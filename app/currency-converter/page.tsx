"use client"
import { useState, useEffect } from "react"

const defaultRates: any = { USD: 133.50, EUR: 144.20, GBP: 169.80, AED: 36.35, AUD: 88.50, INR: 1.60, NPR: 1 }

export default function CurrencyConverter() {
  const [rates, setRates] = useState(defaultRates)
  const [amt, setAmt] = useState(100)
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("NPR")
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('npr-rates')
    if (saved) setRates(JSON.parse(saved))
  }, [])

  const saveRates = () => {
    localStorage.setItem('npr-rates', JSON.stringify(rates))
    setEditMode(false)
  }

  const nprValue = amt * rates[from]
  const result = nprValue / rates[to]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold">NPR Currency Converter</h1>
          <p className="text-gray-600 mt-1">Update rates daily for remittance</p>
        </div>
        <button onClick={() => setEditMode(!editMode)} className={`px-4 py-2 rounded-lg font-medium ${editMode? 'bg-green-600 text-white' : 'bg-gray-100'}`}>
          {editMode? 'Save Rates' : 'Edit Rates'}
        </button>
      </div>

      {editMode && (
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-5 mb-6">
          <h3 className="font-bold mb-3">Update Today's Rates (1 unit = NPR)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.keys(rates).filter(k => k!== 'NPR').map(cur => (
              <div key={cur}>
                <label className="text-xs">{cur}</label>
                <input type="number" step="0.01" value={rates[cur]} onChange={e => setRates({...rates, [cur]: +e.target.value})} className="w-full p-2 border rounded" />
              </div>
            ))}
          </div>
          <button onClick={saveRates} className="mt-3 bg-yellow-600 text-white px-4 py-1.5 rounded text-sm">Save to Browser</button>
        </div>
      )}

      <div className="bg-white border-2 rounded-2xl p-8 shadow-sm">
        <input type="number" value={amt} onChange={e => setAmt(+e.target.value)} className="w-full text-5xl font-bold text-center p-4 border-b-2 focus:outline-none focus:border-blue-500" />

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div>
            <label className="text-sm text-gray-600">From</label>
            <select value={from} onChange={e => setFrom(e.target.value)} className="w-full p-4 border-2 rounded-xl text-xl font-medium mt-1">
              {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600">To</label>
            <select value={to} onChange={e => setTo(e.target.value)} className="w-full p-4 border-2 rounded-xl text-xl font-medium mt-1">
              {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-10 text-center">
          <div className="text-6xl font-bold text-green-600">{result.toLocaleString('en-IN', {maximumFractionDigits: 2})}</div>
          <div className="text-gray-600 mt-2 text-lg">{amt} {from} = {result.toFixed(2)} {to}</div>
          <div className="mt-4 inline-block bg-gray-100 px-4 py-1.5 rounded-full text-sm">
            1 {from} = {(rates[from]/rates[to]).toFixed(4)} {to}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs">
        {Object.entries(rates).filter(([k]) => k!== 'NPR').map(([cur, rate]) => (
          <div key={cur} className="bg-gray-50 p-2 rounded">
            <div className="font-bold">{cur}</div>
            <div>{rate as number}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
