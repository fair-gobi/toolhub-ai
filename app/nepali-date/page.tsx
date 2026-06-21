"use client"
import { useState, useEffect } from "react"

const nepaliMonths = ["Baishakh","Jestha","Ashadh","Shrawan","Bhadra","Ashwin","Kartik","Mangsir","Poush","Magh","Falgun","Chaitra"]
const englishMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"]

function adToBs(adDate: Date) {
  // Simplified conversion - approximate for 2024-2026
  const baseAD = new Date(2024, 3, 13) // 2024-04-13 = 2081-01-01
  const baseBS = { y: 2081, m: 1, d: 1 }
  const diffDays = Math.floor((adDate.getTime() - baseAD.getTime()) / (1000*60*60*24))
  
  let y = baseBS.y, m = baseBS.m, d = baseBS.d + diffDays
  
  const daysInMonth = [31,31,32,31,31,31,30,29,30,29,30,30] // 2081
  while (d > daysInMonth[m-1]) { d -= daysInMonth[m-1]; m++; if (m>12) { m=1; y++ } }
  
  return { year: y, month: m, day: d }
}

export default function NepaliDate() {
  const [today, setToday] = useState(new Date())
  const [bs, setBs] = useState({year: 2081, month: 1, day: 1})

  useEffect(() => {
    setToday(new Date())
    setBs(adToBs(new Date()))
    const t = setInterval(() => setToday(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-3">Nepali Date Converter (Bikram Sambat)</h1>
      <p className="text-gray-600 mb-8 text-lg">Today's date in BS and AD. Convert English to Nepali calendar instantly.</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl p-8 shadow-lg">
          <p className="text-red-100 text-sm uppercase tracking-wide">Bikram Sambat</p>
          <div className="mt-4">
            <div className="text-6xl font-bold">{bs.day}</div>
            <div className="text-2xl mt-2">{nepaliMonths[bs.month-1]} {bs.year}</div>
            <div className="text-red-100 mt-1">{bs.year} साल</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8 shadow-lg">
          <p className="text-blue-100 text-sm uppercase tracking-wide">English Date (AD)</p>
          <div className="mt-4">
            <div className="text-6xl font-bold">{today.getDate()}</div>
            <div className="text-2xl mt-2">{englishMonths[today.getMonth()]} {today.getFullYear()}</div>
            <div className="text-blue-100 mt-1">{today.toLocaleDateString('en-US', { weekday: 'long' })}</div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white border rounded-xl p-6">
        <div className="text-center">
          <div className="text-3xl font-mono font-bold">{today.toLocaleTimeString('en-US', { hour12: true })}</div>
          <p className="text-gray-600 mt-1">Nepal Time (NPT, UTC+5:45)</p>
        </div>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        <div className="border rounded-xl p-5">
          <h3 className="font-bold text-lg mb-2">Government Forms</h3>
          <p className="text-gray-600 text-sm">Use BS date for citizenship, passport, and loksewa applications.</p>
        </div>
        <div className="border rounded-xl p-5">
          <h3 className="font-bold text-lg mb-2">Festivals 2082</h3>
          <p className="text-gray-600 text-sm">Dashain: Ashwin, Tihar: Kartik, Holi: Falgun</p>
        </div>
        <div className="border rounded-xl p-5">
          <h3 className="font-bold text-lg mb-2">Banking</h3>
          <p className="text-gray-600 text-sm">Nepal Rastra Bank uses BS for fiscal year.</p>
        </div>
      </div>
    </div>
  )
}