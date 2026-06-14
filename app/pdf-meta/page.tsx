'use client'
import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import Link from 'next/link'

export default function Meta() {
  const [info, setInfo] = useState<any>(null)

  const load = async (e:any) => {
    const file = e.target.files[0]
    const pdf = await PDFDocument.load(await file.arrayBuffer())
    setInfo({
      title: pdf.getTitle(),
      author: pdf.getAuthor(),
      pages: pdf.getPageCount(),
      created: pdf.getCreationDate()?.toLocaleString()
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600">← Back</Link>
        <h1 className="text-3xl font-bold mt-4">PDF Metadata Viewer</h1>
        <div className="bg-white p-6 rounded-xl shadow mt-4">
          <input type="file" accept=".pdf" onChange={load} className="mb-4" />
          {info && <pre className="bg-gray-100 p-4 rounded text-sm">{JSON.stringify(info, null, 2)}</pre>}
        </div>
      </div>
    </div>
  )
}
