'use client'
import { useState } from 'react'

export default function ResignationLetter() {
  const [name, setName] = useState('Your Name')
  const [position, setPosition] = useState('Software Engineer')
  const [company, setCompany] = useState('Company Name')
  const [manager, setManager] = useState('Manager Name')
  const [lastDay, setLastDay] = useState('')
  const [reason, setReason] = useState('personal growth')

  const letter = `${new Date().toLocaleDateString()}

${manager}
${company}

Dear ${manager},

I am writing to formally resign from my position as ${position} at ${company}, with my last working day being ${lastDay || '[date]'}.

This decision is due to ${reason}. I am grateful for the opportunities and support during my time here.

I will ensure a smooth handover of my responsibilities.

Thank you for your understanding.

Sincerely,
${name}`

  return (
    <main className="container mx-auto p-6 max-w-3xl">
      <div className="bg-gradient-to-r from-gray-700 to-slate-800 text-white rounded-xl p-6 mb-6 print:hidden">
        <h1 className="text-3xl font-bold flex items-center gap-2">📄 Resignation Letter</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-4 print:hidden mb-6">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" className="border rounded px-3 py-2" />
        <input value={position} onChange={e=>setPosition(e.target.value)} placeholder="Position" className="border rounded px-3 py-2" />
        <input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Company" className="border rounded px-3 py-2" />
        <input value={manager} onChange={e=>setManager(e.target.value)} placeholder="Manager" className="border rounded px-3 py-2" />
        <input type="date" value={lastDay} onChange={e=>setLastDay(e.target.value)} className="border rounded px-3 py-2" />
        <input value={reason} onChange={e=>setReason(e.target.value)} placeholder="Reason" className="border rounded px-3 py-2" />
      </div>

      <div className="bg-white border rounded-xl p-8 whitespace-pre-wrap font-serif leading-relaxed">
        {letter}
      </div>

      <button onClick={()=>window.print()} className="w-full mt-6 bg-gray-800 text-white rounded-lg py-3 print:hidden">Download PDF</button>
    </main>
  )
}
