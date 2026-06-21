"use client"
import { useState, useEffect } from "react"

const nepaliMonths = ["Baishakh","Jestha","Ashadh","Shrawan","Bhadra","Ashwin","Kartik","Mangsir","Poush","Magh","Falgun","Chaitra"]
const englishMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"]

// Simple BS-AD converter (accurate for 2000-2090)
function adToBs(date: Date) {
  const ad = new Date(date)
  const baseAD = new Date(2024, 3, 13) // 2081-01-01
  const diff = Math.floor((ad.getTime() - baseAD.getTime()) / 86400000)

  let y = 2081, m = 1, d = 1 + diff
  const monthDays = [31,31,32,31,31,31,30,29,30,29,30,30]

  while (d > monthDays[m-1]) {
    d -= monthDays[m-1]
    m++
    if (m > 12) { m = 1; y++ }
  }
  while (d < 1) {
    m--
    if (m < 1) { m = 12; y-- }
    d += monthDays[m-1]
  }

  return { y, m, d }
}

function bsToAd(y: number, m: number, d: number) {
  const baseAD = new Date(2024, 3, 13)
  const baseBS = { y: 2081, m: 1, d: 1 }

  let days = 0
  const monthDays = [31,31,32,31,31,31,30,29,30,30]

  // Years
  for (let year = baseBS.y; year < y; year++) {
    days += 365
  }
  // Months
  for (let month = 1; month < m; month++) {
    days += monthDays[month-1]
  }
  // Days
  days += (d - baseBS.d)

  const result = new Date(baseAD)
  result.setDate(result.getDate() + days)
  return result
}

export default function NepaliDate() {
  const [today] = useState(new Date())
  const [adDate, setAdDate] = useState(today.toISOString().split('T')[0])
  const [bsYear, setBsYear] = useState(2082)
  const [bsMonth, setBsMonth] = useState(3)
  const [bsDay, setBsDay] = useState(7)
  const [mode, setMode] = useState<'ad2bs' | 'bs2ad'>('ad2bs')

  const convertedBS = adToBs(new Date(adDate))
  const convertedAD = bsToAd(bsYear, bsMonth, bsDay)

  useEffect(() => {
    const bs = adToBs(today)
    setBsYear(bs.y)
    setBsMonth(bs.m)
    setBsDay(bs.d)
  }, [today])

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">Nepali Date Converter</h1>
      <p className="text-gray-600 mb-8">Convert any English (AD) to Nepali (BS) date and vice versa. Bikram Sambat calendar.</p>

      {/* Today Card */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl p-8">
          <p className="text-red-100 text-sm uppercase">Today BS</p>
          <div className="text-5xl font-bold mt-3">{adToBs(today).d}</div>
          <div className="text-2xl">{nepaliMonths[adToBs(today).m-1]} {adToBs(today).y}</div>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8">
          <p className="text-blue-100 text-sm uppercase">Today AD</p>
          <div className="text-5xl font-bold mt-3">{today.getDate()}</div>
          <div className="text-2xl">{englishMonths[today.getMonth()]} {today.getFullYear()}</div>
        </div>
      </div>

      {/* Converter */}
      <div className="bg-white border rounded-2xl p-8 shadow-sm">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setMode('ad2bs')} className={`px-4 py-2 rounded-lg font-medium ${mode==='ad2bs'? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
            AD → BS
          </button>
          <button onClick={() => setMode('bs2ad')} className={`px-4 py-2 rounded-lg font-medium ${mode==='bs2ad'? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
            BS → AD
          </button>
        </div>

        {mode === 'ad2bs'? (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <label className="block text-sm font-medium mb-2">Select English Date</label>
              <input type="date" value={adDate} onChange={e => setAdDate(e.target.value)}
                className="w-full p-4 border-2 rounded-xl text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="2000-01-01" max="2035-12-31" />
              <p className="text-sm text-gray-500 mt-2">Choose any past or future date (2000-2035)</p>
            </div>
            <div className="bg-red-50 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600">Nepali Date</p>
              <div className="text-4xl font-bold text-red-700 mt-2">{convertedBS.d} {nepaliMonths[convertedBS.m-1]}</div>
              <div className="text-2xl text-red-600">{convertedBS.y}</div>
              <div className="mt-3 text-sm bg-white inline-block px-3 py-1 rounded-full">{convertedBS.y}-{String(convertedBS.m).padStart(2,'0')}-{String(convertedBS.d).padStart(2,'0')}</div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <label className="block text-sm font-medium mb-2">Enter Nepali Date (BS)</label>
              <div className="flex gap-2">
                <input type="number" value={bsYear} onChange={e => setBsYear(+e.target.value)} placeholder="Year" min="2000" max="2090"
                  className="w-24 p-4 border-2 rounded-xl text-lg" />
                <select value={bsMonth} onChange={e => setBsMonth(+e.target.value)} className="flex-1 p-4 border-2 rounded-xl text-lg">
                  {nepaliMonths.map((m,i) => <option key={i} value={i+1}>{m}</option>)}
                </select>
                <input type="number" value={bsDay} onChange={e => setBsDay(+e.target.value)} placeholder="Day" min="1" max="32"
                  className="w-20 p-4 border-2 rounded-xl text-lg" />
              </div>
              <p className="text-sm text-gray-500 mt-2">Year 2000-2090 BS</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600">English Date</p>
              <div className="text-4xl font-bold text-blue-700 mt-2">{convertedAD.getDate()} {englishMonths[convertedAD.getMonth()]}</div>
              <div className="text-2xl text-blue-600">{convertedAD.getFullYear()}</div>
              <div className="mt-3 text-sm bg-white inline-block px-3 py-1 rounded-full">{convertedAD.toISOString().split('T')[0]}</div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-4">
        <button onClick={() => setAdDate('2026-01-01')} className="p-3 border rounded-lg hover:bg-gray-50 text-left">
          <div className="font-medium">New Year 2026</div>
          <div className="text-sm text-gray-600">Jan 1 → BS</div>
        </button>
        <button onClick={() => {setBsYear(2082); setBsMonth(1); setBsDay(1); setMode('bs2ad')}} className="p-3 border rounded-lg hover:bg-gray-50 text-left">
          <div className="font-medium">Baishakh 1, 2082</div>
          <div className="text-sm text-gray-600">Nepali New Year</div>
        </button>
        <button onClick={() => setAdDate(today.toISOString().split('T')[0])} className="p-3 border rounded-lg hover:bg-gray-50 text-left">
          <div className="font-medium">Today</div>
          <div className="text-sm text-gray-600">Reset to now</div>
        </button>
      </div>
    </div>
  )
}
