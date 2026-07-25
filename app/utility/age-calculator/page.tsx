'use client'
import { useState } from 'react'

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [age, setAge] = useState<any>(null)

  const calculate = () => {
    if (!birthDate) return
    const birth = new Date(birthDate)
    const today = new Date()
    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    let days = today.getDate() - birth.getDate()

    if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate() }
    if (months < 0) { years--; months += 12 }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000*60*60*24))
    setAge({ years, months, days, totalDays })
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Age Calculator</h1>
        <p className="text-gray-600 mb-6">Calculate exact age in years, months, days</p>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border mb-6">
          <label className="block text-sm font-medium mb-2">Date of Birth</label>
          <input type="date" value={birthDate} onChange={e=>setBirthDate(e.target.value)} className="w-full p-3 border rounded-xl mb-4" />
          <button onClick={calculate} className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700">Calculate Age</button>
          
          {age && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div><div className="text-2xl font-bold text-blue-600">{age.years}</div><div className="text-sm">Years</div></div>
                <div><div className="text-2xl font-bold text-blue-600">{age.months}</div><div className="text-sm">Months</div></div>
                <div><div className="text-2xl font-bold text-blue-600">{age.days}</div><div className="text-sm">Days</div></div>
              </div>
              <p className="text-center mt-3 text-gray-600">Total: {age.totalDays.toLocaleString()} days</p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="font-semibold mb-2">About Age Calculator</h2>
          <p className="text-sm text-gray-600">Free tool to calculate precise age for forms, eligibility, and birthdays. Works offline, no data stored.</p>
        </div>
      </div>
    </main>
  )
}
