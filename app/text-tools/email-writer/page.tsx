'use client'
import { useState } from 'react'

export default function EmailWriter() {
  const [sender, setSender] = useState('Gobinda Subedi')
  const [receiver, setReceiver] = useState('')
  const [company, setCompany] = useState('Promptoolhub')
  const [senderEmail, setSenderEmail] = useState('gobinda@promptoolhub.com')
  const [senderPhone, setSenderPhone] = useState('')
  const [topic, setTopic] = useState('follow up on our project')
  const [tone, setTone] = useState('professional')

  const generateEmail = () => {
    const greeting = receiver? `Dear ${receiver},` : 'Hello,'

    const bodies: any = {
      professional: `I hope this email finds you well.\n\nI am writing to ${topic}. Please let me know if you need any additional information from ${company? `our team at ${company}` : 'us'}.\n\nI look forward to your response.`,
      friendly: `Hope you're doing great!\n\nJust wanted to ${topic}. ${company? `We're excited at ${company} to help.` : ''} Let me know what you think!`,
      formal: `I trust you are well.\n\nThe purpose of this correspondence is to ${topic}. ${company? `On behalf of ${company},` : ''} I would appreciate your prompt attention.\n\nThank you for your consideration.`,
      apologetic: `I hope you're well.\n\nI apologize for the delay in ${topic}. ${company? `The team at ${company}` : 'We'} are addressing this now.\n\nThank you for your understanding.`
    }

    const signature = [
      'Best regards,',
      sender,
      company,
      senderEmail,
      senderPhone
    ].filter(Boolean).join('\n')

    return `${greeting}\n\n${bodies[tone]}\n\n${signature}`
  }

  const email = generateEmail()
  const subject = topic.charAt(0).toUpperCase() + topic.slice(1)

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 mb-6">
        <h1 className="text-3xl font-bold">✉️ Pro Email Writer</h1>
      </div>

      <div className="bg-white border rounded-xl p-5 mb-6">
        <h3 className="font-semibold mb-3">Sender Details</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <input value={sender} onChange={e=>setSender(e.target.value)} placeholder="Your full name" className="border rounded-lg p-3" />
          <input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Company name" className="border rounded-lg p-3" />
          <input value={senderEmail} onChange={e=>setSenderEmail(e.target.value)} placeholder="Your email" className="border rounded-lg p-3" />
          <input value={senderPhone} onChange={e=>setSenderPhone(e.target.value)} placeholder="Phone (optional)" className="border rounded-lg p-3" />
        </div>
      </div>

      <div className="bg-white border rounded-xl p-5 mb-6">
        <h3 className="font-semibold mb-3">Receiver & Message</h3>
        <div className="grid md:grid-cols-2 gap-3 mb-3">
          <input value={receiver} onChange={e=>setReceiver(e.target.value)} placeholder="Receiver name (e.g., Mr. Sharma)" className="border rounded-lg p-3" />
          <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Purpose (e.g., request meeting)" className="border rounded-lg p-3" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['professional','friendly','formal','apologetic'].map(t => (
            <button key={t} onClick={()=>setTone(t)} className={`px-4 py-2 rounded-lg capitalize text-sm ${tone===t?'bg-blue-600 text-white':'bg-gray-100'}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-xs text-gray-500">SUBJECT</div>
            <div className="font-semibold text-lg">{subject}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>navigator.clipboard.writeText(email)} className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm">Copy Body</button>
            <button onClick={()=>navigator.clipboard.writeText(`Subject: ${subject}\n\n${email}`)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Copy Full</button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap font-mono text-sm leading-relaxed">
          {email}
        </div>
      </div>
    </main>
  )
}

