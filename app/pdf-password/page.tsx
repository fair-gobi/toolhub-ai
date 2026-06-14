'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function PdfPass() {
  const [file, setFile] = useState<File|null>(null)
  const [pass, setPass] = useState('')

  const protect = async () => {
    alert('PDF password needs server. Use pdf-lib encryption or deploy API later. For now, this is placeholder.')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600">← Back</Link>
        <h1 className="text-3xl font-bold mt-4">PDF Password Protect/Unlock</h1>
        <div className="bg-white p-6 rounded-xl shadow mt-4 space-y-3">
          <input type="file" accept=".pdf" onChange={e=>setFile(e.target.files?.[0]||null)} />
          <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" className="w-full border p-3 rounded" />
          <button onClick={protect} className="w-full bg-red-600 text-white py-3 rounded">Protect PDF</button>
          <p className="text-sm text-gray-500">Note: Full encryption coming in v2 (needs backend)</p>
        </div>
      </div>
    </div>
  )
}
