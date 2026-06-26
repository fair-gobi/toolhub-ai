'use client'
import { useState } from 'react'

export default function EmailWriter() {
  const [type, setType] = useState('cold outreach')
  const [to, setTo] = useState('potential client')
  const [purpose, setPurpose] = useState('introduce our free tools')

  const templates: any = {
    'cold outreach': `Subject: Quick question about ${to}

Hi [Name],

I noticed you're working on [relevant topic]. I wanted to reach out because ${purpose}.

We help people like you save 5+ hours per week with our free tools – no signup required.

Would you be open to a quick 10-minute chat next week?

Best,
[Your Name]`,

    'follow up': `Subject: Following up

Hi [Name],

Just following up on my previous email about ${purpose}.

I know you're busy, so here's the TL;DR:
• Free tool that does X in 30 seconds
• Used by 10,000+ people
• No credit card needed

Worth a look?

Thanks,
[Your Name]`,

    'thank you': `Subject: Thank you!

Hi [Name],

Thank you for ${purpose}. It was great connecting with you.

As promised, here's the link: [link]

Let me know if you have any questions.

Best regards,
[Your Name]`
  }

  const email = templates[type]

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📧 Email Writer</h1>

      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <select value={type} onChange={e=>setType(e.target.value)} className="border rounded-lg p-3">
          <option>cold outreach</option>
          <option>follow up</option>
          <option>thank you</option>
        </select>
        <input value={to} onChange={e=>setTo(e.target.value)} placeholder="Recipient" className="border rounded-lg p-3" />
        <input value={purpose} onChange={e=>setPurpose(e.target.value)} placeholder="Purpose" className="border rounded-lg p-3" />
      </div>

      <div className="bg-gray-50 border rounded-lg p-5 font-mono text-sm whitespace-pre-wrap">{email}</div>
      <button onClick={()=>navigator.clipboard.writeText(email)} className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-lg">Copy Email</button>
    </main>
  )
}
