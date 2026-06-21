"use client"
import { useState, useEffect } from "react"

export default function QRGenerator() {
  const [text, setText] = useState("https://toolhub-fresh.vercel.app")
  const [qr, setQr] = useState("")

  const generate = async () => {
    const QRCode = (await import("qrcode")).default
    const url = await QRCode.toDataURL(text, { width: 400, margin: 2, color: { dark: "#000", light: "#FFF" } })
    setQr(url)
  }

  useEffect(() => { generate() }, [])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-3">Free QR Code Generator</h1>
      <p className="text-gray-600 mb-8 text-lg">Create QR codes instantly for URLs, text, phone numbers, or WiFi. No watermark, no signup required.</p>
      
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <label className="block text-sm font-medium mb-2">Enter text or URL</label>
        <textarea value={text} onChange={e => setText(e.target.value)} 
          className="w-full p-4 border rounded-lg h-28 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          placeholder="https://example.com" />
        <button onClick={generate} className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Generate QR Code
        </button>
      </div>

      {qr && (
        <div className="mt-8 text-center bg-gray-50 rounded-xl p-8">
          <img src={qr} alt="QR Code" className="mx-auto bg-white p-6 rounded-lg shadow-md" width={280} height={280} />
          <a href={qr} download="qrcode-toolhub.png" className="mt-6 inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700">
            Download PNG
          </a>
        </div>
      )}

      <div className="mt-16 prose max-w-none">
        <h2 className="text-2xl font-bold">How to use QR Generator in Nepal</h2>
        <p>Perfect for restaurants in Kathmandu, Pokhara shops, or delivery businesses. Print the QR and link to your menu, eSewa payment, or WhatsApp.</p>
        <h3>Popular uses:</h3>
        <ul>
          <li>Restaurant menus (contactless)</li>
          <li>eSewa/Khalti payment links</li>
          <li>Business cards and flyers</li>
          <li>WiFi password sharing</li>
        </ul>
      </div>
    </div>
  )
}