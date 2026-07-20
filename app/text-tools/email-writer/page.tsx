'use client';
import { useState } from 'react';

export default function EmailWriter() {
  const [sender, setSender] = useState('Gobinda Subedi');
  const [receiver, setReceiver] = useState('');
  const [company, setCompany] = useState('Promptoolhub');
  const [senderEmail, setSenderEmail] = useState('gobinda@promptoolhub.com');
  const [senderPhone, setSenderPhone] = useState('');
  const [topic, setTopic] = useState('follow up on our project');
  const [tone, setTone] = useState('professional');
  const [emailBody, setEmailBody] = useState('');
  const [loading, setLoading] = useState(false);

  const generateEmail = async () => {
    setLoading(true);
    setEmailBody('');

    const prompt = `Write a ${tone} email body (no subject, no signature).
From: ${sender}${company ? ` at ${company}` : ''}
To: ${receiver || 'recipient'}
Purpose: ${topic}
Tone: ${tone}

Requirements:
- Start with appropriate greeting (${receiver ? `Dear ${receiver},` : 'Hello,'})
- 3-4 short paragraphs
- Clear, natural language, not generic template
- End before signature
- Year 2026 context`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const aiText = (data.text || '').trim();

      const signature = [
        '',
        'Best regards,',
        sender,
        company,
        senderEmail,
        senderPhone
      ].filter(Boolean).join('\n');

      const greeting = receiver ? `Dear ${receiver},` : 'Hello,';
      // Ensure AI didn't duplicate greeting
      const cleanBody = aiText.replace(/^Dear .*?,|^Hello,?/i, '').trim();
      
      setEmailBody(`${greeting}\n\n${cleanBody}\n\n${signature}`);
    } catch {
      setEmailBody('Failed to generate email. Check your Groq API key.');
    } finally {
      setLoading(false);
    }
  };

  const subject = topic.charAt(0).toUpperCase() + topic.slice(1);
  const fullEmail = emailBody;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 mb-6">
        <h1 className="text-3xl font-bold">✉ Pro Email Writer</h1>
        <p className="opacity-90 text-sm mt-1">Powered by Groq AI</p>
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
        <div className="flex gap-2 flex-wrap mb-4">
          {(['professional','friendly','formal','apologetic'] as const).map(t => (
            <button key={t} onClick={()=>setTone(t)} className={`px-4 py-2 rounded-lg capitalize text-sm ${tone===t?'bg-blue-600 text-white':'bg-gray-100'}`}>{t}</button>
          ))}
        </div>
        <button onClick={generateEmail} disabled={loading || !topic} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-lg font-semibold">
          {loading ? 'Writing with AI...' : 'Generate Email with AI'}
        </button>
      </div>

      {emailBody && (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
          <div className="flex justify-between items-center mb-3">
            <div>
              <div className="text-xs text-gray-500">SUBJECT</div>
              <div className="font-semibold text-lg">{subject}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>navigator.clipboard.writeText(emailBody)} className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm">Copy Body</button>
              <button onClick={()=>navigator.clipboard.writeText(`Subject: ${subject}\n\n${emailBody}`)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Copy Full</button>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap font-mono text-sm leading-relaxed">
            {emailBody}
          </div>
        </div>
      )}
    </main>
  );
}
