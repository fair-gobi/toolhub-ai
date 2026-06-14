'use client'
import { useState } from 'react'
import Link from 'next/link'

// Simple BS-AD conversion (using nepali-date-converter logic)
const bsMonths = ['बैशाख','जेठ','असार','साउन','भदौ','असोज','कार्तिक','मंसिर','पुष','माघ','फाल्गुन','चैत']

export default function NepaliDate() {
  const [adDate, setAdDate] = useState('')
  const [bsResult, setBsResult] = useState('')

  const convertToBS = () => {
    if (!adDate) return
    const date = new Date(adDate)
    // Approximate conversion (2079 BS ≈ 2022 AD, add 56 years 8 months)
    const bsYear = date.getFullYear() + 57
    const bsMonth = (date.getMonth() + 9) % 12
    const bsDay = date.getDate()
    setBsResult(`${bsYear} ${bsMonths[bsMonth]} ${bsDay}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600">← Back</Link>
        <h1 className="text-3xl font-bold mt-4 mb-2">Nepali Date Converter</h1>
        <p className="text-gray-600 mb-6">AD to BS (वि.सं.) converter</p>
        
        <div className="bg-white p-6 rounded-xl shadow">
          <label className="block mb-2 font-medium">Select AD Date:</label>
          <input 
            type="date" 
            value={adDate}
            onChange={(e) => setAdDate(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />
          <button 
            onClick={convertToBS}
            className="w-full bg-red-600 text-white py-3 rounded font-medium"
          >
            Convert to BS
          </button>
          
          {bsResult && (
            <div className="mt-6 p-4 bg-red-50 rounded text-center">
              <div className="text-sm text-gray-600">विक्रम संवत</div>
              <div className="text-2xl font-bold text-red-700">{bsResult}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
