'use client'
import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import Link from 'next/link'

export default function Compress() {
  const [file, setFile] = useState<File|null>(null)

  const compress = async () => {
    if (!file) return
    const pdf = await PDFDocument.load(await file.arrayBuffer())
    const bytes = await pdf.save({ useObjectStreams: false })
    const blob = new Blob([bytes], {type:'application/pdf'})
    const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='compressed.pdf'; a.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600">← Back</Link>
        <h1 className="text-3xl font-bold mt-4">PDF Compressor</h1>
        <div className="bg-white p-6 rounded-xl shadow mt-4">
          <input type="file" accept=".pdf" onChange={e=>setFile(e.target.files?.[0]||null)} className="mb-4" />
          <button onClick={compress} className="w-full bg-purple-600 text-white py-3 rounded">Compress PDF</button>
        </div>
      </div>
    </div>
  )
}
