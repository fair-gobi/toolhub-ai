'use client'
import { useState } from 'react'

export default function DateDifference() {
  const [d1, setD1] = useState('')
  const [d2, setD2] = useState('')
  const [diff, setDiff] = useState<any>(null)

  const calc = () => {
    const date1 = new Date(d1), date2 = new Date(d2)
    const ms = Math.abs(date2.getTime() - date1.getTime())
    const days = Math.floor(ms / (1000*60*60*24))
    const years = Math.floor(days/365)
    const months = Math.floor((days%365)/30)
    setDiff({ days, years, months, weeks: Math.floor(days/7) })
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Date Difference Calculator</h1>
        <p className="text-gray-600 mb-6">Days between two dates</p>
        <div className="bg-white p-6 rounded-2xl border">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input type="date" value={d1} onChange={e=>setD1(e.target.value)} className="p-3 border rounded-xl" />
            <input type="date" value={d2} onChange={e=>setD2(e.target.value)} className="p-3 border rounded-xl" />
          </div>
          <button onClick={calc} className="w-full bg-blue-600 text-white py-3 rounded-xl">Calculate</button>
          {diff && (
            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-gray-50 rounded-lg"><div className="text-2xl font-bold">{diff.days}</div><div className="text-sm">Days</div></div>
              <div className="p-3 bg-gray-50 rounded-lg"><div className="text-2xl font-bold">{diff.weeks}</div><div className="text-sm">Weeks</div></div>
              <div className="p-3 bg-gray-50 rounded-lg"><div className="text-2xl font-bold">{diff.months}</div><div className="text-sm">Months</div></div>
              <div className="p-3 bg-gray-50 rounded-lg"><div className="text-2xl font-bold">{diff.years}</div><div className="text-sm">Years</div></div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
