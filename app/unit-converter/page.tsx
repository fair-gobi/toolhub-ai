'use client'
import { useState } from 'react'

export default function UnitConverter() {
  const [value, setValue] = useState('1')
  const [type, setType] = useState('length')
  const [from, setFrom] = useState('m')
  const [to, setTo] = useState('ft')

  const units: any = {
    length: { m:1, km:1000, cm:0.01, mm:0.001, ft:0.3048, in:0.0254, mile:1609.34 },
    weight: { kg:1, g:0.001, lb:0.453592, oz:0.0283495 },
    temp: {}
  }

  const convert = () => {
    const v = parseFloat(value)
    if (type === 'temp') {
      if (from==='C' && to==='F') return (v*9/5+32).toFixed(2)
      if (from==='F' && to==='C') return ((v-32)*5/9).toFixed(2)
      return v
    }
    const base = v * units[type][from]
    return (base / units[type][to]).toFixed(4)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Unit Converter</h1>
        <p className="text-gray-600 mb-6">Length, weight, temperature</p>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <select value={type} onChange={e=>{setType(e.target.value); setFrom(Object.keys(units[e.target.value]||{C:'',F:''})[0])}} className="w-full p-3 border rounded-xl mb-4">
            <option value="length">Length</option><option value="weight">Weight</option><option value="temp">Temperature</option>
          </select>
          <input type="number" value={value} onChange={e=>setValue(e.target.value)} className="w-full p-3 border rounded-xl mb-4" />
          <div className="grid grid-cols-2 gap-4">
            <select value={from} onChange={e=>setFrom(e.target.value)} className="p-3 border rounded-xl">
              {type==='temp'? ['C','F'].map(u=><option key={u}>{u}</option>) : Object.keys(units[type]).map(u=><option key={u}>{u}</option>)}
            </select>
            <select value={to} onChange={e=>setTo(e.target.value)} className="p-3 border rounded-xl">
              {type==='temp'? ['C','F'].map(u=><option key={u}>{u}</option>) : Object.keys(units[type]).map(u=><option key={u}>{u}</option>)}
            </select>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-xl text-center">
            <div className="text-2xl font-bold">{value} {from} = {convert()} {to}</div>
          </div>
        </div>
      </div>
    </main>
  )
}
