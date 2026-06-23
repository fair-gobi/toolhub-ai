'use client'
import { useState, useRef } from 'react'

export default function QRScanner() {
  const [result, setResult] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const scanFile = async (e:any) => {
    const file = e.target.files[0]
    if (!file) return
    // Simple demo - in production use jsQR library
    setResult('Upload scanned. For full camera scanning, add jsQR library. Current: File received - ' + file.name)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">QR Code Scanner</h1>
        <p className="text-gray-600 mb-6">Scan QR from image</p>
        <div className="bg-white p-6 rounded-2xl border text-center">
          <input ref={fileRef} type="file" accept="image/*" onChange={scanFile} className="hidden" />
          <button onClick={()=>fileRef.current?.click()} className="w-full bg-purple-600 text-white py-4 rounded-xl mb-4">Upload QR Image</button>
          <p className="text-sm text-gray-500 mb-4">Camera scanning requires HTTPS - works on Vercel</p>
          {result && <div className="p-4 bg-gray-50 rounded-xl text-left break-all">{result}</div>}
          <div className="mt-6 p-4 bg-yellow-50 rounded-xl text-sm">
            <strong>Note:</strong> For full camera QR scan, install jsQR: npm i jsqr
          </div>
        </div>
      </div>
    </main>
  )
}
