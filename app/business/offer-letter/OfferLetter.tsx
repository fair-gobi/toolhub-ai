'use client'
import { useState } from 'react'

export default function OfferLetter() {
  const [candidate, setCandidate] = useState('Candidate Name')
  const [position, setPosition] = useState('Marketing Executive')
  const [company, setCompany] = useState('Your Company')
  const [salary, setSalary] = useState('50000')
  const [startDate, setStartDate] = useState('')
  const [currency, setCurrency] = useState('NPR')

  const symbols: any = {NPR:'रू',INR:'₹',USD:'$',EUR:'€',GBP:'£',PKR:'₨',BDT:'৳'}
  const curr = symbols[currency] || 'रू'

  const letter = `${company}
Date: ${new Date().toLocaleDateString()}

Dear ${candidate},

We are pleased to offer you the position of ${position} at ${company}.

Your starting salary will be ${curr}${salary} per month, with a start date of ${startDate || '[date]'}.

We look forward to having you on our team.

Sincerely,
HR Department
${company}`

  return (
    <main className="container mx-auto p-6 max-w-3xl">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-6 mb-6 print:hidden">
        <h1 className="text-3xl font-bold flex items-center gap-2">🤝 Offer Letter</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-4 print:hidden mb-6">
        <input value={candidate} onChange={e=>setCandidate(e.target.value)} className="border rounded px-3 py-2" placeholder="Candidate" />
        <input value={position} onChange={e=>setPosition(e.target.value)} className="border rounded px-3 py-2" placeholder="Position" />
        <input value={company} onChange={e=>setCompany(e.target.value)} className="border rounded px-3 py-2" placeholder="Company" />
        <input value={salary} onChange={e=>setSalary(e.target.value)} className="border rounded px-3 py-2" placeholder="Salary" />
        <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} className="border rounded px-3 py-2" />
        <select value={currency} onChange={e=>setCurrency(e.target.value)} className="border rounded px-3 py-2">
          <option>NPR</option><option>INR</option><option>USD</option><option>PKR</option><option>BDT</option>
        </select>
      </div>

      <div className="bg-white border rounded-xl p-8 whitespace-pre-wrap font-serif leading-relaxed">
        {letter}
      </div>

      <button onClick={()=>window.print()} className="w-full mt-6 bg-indigo-600 text-white rounded-lg py-3 print:hidden">Download PDF</button>
    </main>
  )
}
