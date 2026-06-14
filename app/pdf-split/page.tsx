'use client'
import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import Link from 'next/link'

export default function PdfSplit() {
  const [file, setFile] = useState<File|null>(null)

  const split = async () => {
    if (!file) return
    const bytes = await file.arrayBuffer()
    const pdf = await PDFDocument.load(bytes)
    const pages = pdf.getPageCount()
    for (let i=0; i<pages; i++) {
      const newPdf = await PDFDocument.create()
      const [page] = await newPdf.copyPages(pdf, [i])
      newPdf.addPage(page)
      const blob = new Blob([await newPdf.save()], {type:'application/pdf'})
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `page-${i+1}.pdf`
      a.click()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600">← Back</Link>
        <h1 className="text-3xl font-bold mt-4">PDF Splitter</h1>
        <div className="bg-white p-6 rounded-xl shadow mt-4">
          <input type="file" accept=".pdf" onChange={e=>setFile(e.target.files?.[0]||null)} className="mb-4" />
          <button onClick={split} className="w-full bg-blue-600 text-white py-3 rounded">Split All Pages</button>
        </div>
      </div>
    </div>
  )
}
