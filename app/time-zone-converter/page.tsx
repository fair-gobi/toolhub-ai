'use client'
import { useState, useEffect } from 'react'

export default function TimeZoneConverter() {
  const [time, setTime] = useState('')
  const [from, setFrom] = useState('Asia/Kathmandu')
  const [to, setTo] = useState('America/New_York')
  const [result, setResult] = useState('')

  useEffect(()=>{ setTime(new Date().toISOString().slice(0,16)) },[])

  const convert = () => {
    const date = new Date(time)
    const options: any = { timeZone: to, year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' }
    setResult(new Intl.DateTimeFormat('en-US', options).format(date))
  }

  const zones = ['Asia/Kathmandu','Asia/Kolkata','America/New_York','Europe/London','Asia/Dubai','Australia/Sydney','Asia/Tokyo']

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Time Zone Converter</h1>
        <p className="text-gray-600 mb-6">Convert time across world zones</p>
        <div className="bg-white p-6 rounded-2xl border">
          <input type="datetime-local" value={time} onChange={e=>setTime(e.target.value)} className="w-full p-3 border rounded-xl mb-4" />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <select value={from} onChange={e=>setFrom(e.target.value)} className="p-3 border rounded-xl">{zones.map(z=><option key={z}>{z}</option>)}</select>
            <select value={to} onChange={e=>setTo(e.target.value)} className="p-3 border rounded-xl">{zones.map(z=><option key={z}>{z}</option>)}</select>
          </div>
          <button onClick={convert} className="w-full bg-blue-600 text-white py-3 rounded-xl">Convert</button>
          {result && <div className="mt-4 p-4 bg-blue-50 rounded-xl text-center text-lg font-semibold">{result}</div>}
        </div>
      </div>
    </main>
  )
}
