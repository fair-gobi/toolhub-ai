'use client'
import { useState, useEffect } from 'react'

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('1')
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('NPR')
  const [result, setResult] = useState('')
  const [rates, setRates] = useState<any>({})

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
     .then(r => r.json()).then(d => setRates(d.rates)).catch(()=>{})
  }, [])

  const convert = () => {
    if (!rates[from] ||!rates[to]) return
    const usdAmount = parseFloat(amount) / rates[from]
    const converted = usdAmount * rates[to]
    setResult(`${amount} ${from} = ${converted.toFixed(2)} ${to}`)
  }

  const currencies = ['USD','EUR','GBP','INR','NPR','JPY','AUD','CAD']

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Currency Converter</h1>
        <p className="text-gray-600 mb-6">Live exchange rates</p>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} className="w-full p-3 border rounded-xl mb-4 text-xl" />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <select value={from} onChange={e=>setFrom(e.target.value)} className="p-3 border rounded-xl">{currencies.map(c=><option key={c}>{c}</option>)}</select>
            <select value={to} onChange={e=>setTo(e.target.value)} className="p-3 border rounded-xl">{currencies.map(c=><option key={c}>{c}</option>)}</select>
          </div>
          <button onClick={convert} className="w-full bg-green-600 text-white py-3 rounded-xl">Convert</button>
          {result && <div className="mt-4 p-4 bg-green-50 rounded-xl text-center text-xl font-semibold">{result}</div>}
        </div>
      </div>
    </main>
  )
}
