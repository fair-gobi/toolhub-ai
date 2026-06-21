"use client"
import { useState, useEffect } from "react"

export default function PaymentQR() {
  const [method, setMethod] = useState("esewa")
  const [number, setNumber] = useState("98XXXXXXXX")
  const [amount, setAmount] = useState("")
  const [name, setName] = useState("Your Business")
  const [qr, setQr] = useState("")

  const generate = async () => {
    const QRCode = (await import("qrcode")).default
    let data = ""
    
    if (method === "esewa") {
      data = `esewa:${number}?amt=${amount || 0}&pn=${encodeURIComponent(name)}`
    } else if (method === "khalti") {
      data = `khalti://${number}?amount=${amount || 0}`
    } else {
      data = `upi://pay?pa=${number}@esewa&pn=${encodeURIComponent(name)}&am=${amount || 0}&cu=NPR`
    }
    
    const url = await QRCode.toDataURL(data, { width: 400, margin: 2 })
    setQr(url)
  }

  useEffect(() => { generate() }, [method, number, amount, name])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-3">Nepal Payment QR Generator</h1>
      <p className="text-gray-600 mb-8 text-lg">Create eSewa, Khalti, and Fonepay QR codes for your shop. Customers scan and pay instantly.</p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Payment Method</label>
            <select value={method} onChange={e => setMethod(e.target.value)} className="w-full p-3 border rounded-lg">
              <option value="esewa">eSewa</option>
              <option value="khalti">Khalti</option>
              <option value="fonepay">Fonepay / UPI</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">eSewa ID / Phone</label>
            <input value={number} onChange={e => setNumber(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="98XXXXXXXX" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Business Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Mero Pasal" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Amount (optional)</label>
            <input value={amount} onChange={e => setAmount(e.target.value)} type="number" className="w-full p-3 border rounded-lg" placeholder="Leave empty for customer to enter" />
          </div>
        </div>

        <div className="text-center">
          {qr && (
            <div className="bg-white border rounded-xl p-8 shadow-sm">
              <div className="bg-gradient-to-b from-green-50 to-white p-4 rounded-lg inline-block">
                <img src={qr} alt="Payment QR" className="mx-auto" width={240} height={240} />
              </div>
              <p className="mt-4 font-semibold text-lg">{name}</p>
              <p className="text-sm text-gray-600 capitalize">{method} • {number}</p>
              <a href={qr} download={`${method}-qr.png`} className="mt-4 inline-block bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium w-full hover:bg-green-700">
                Download QR
              </a>
              <button onClick={() => window.print()} className="mt-2 w-full border py-2.5 rounded-lg hover:bg-gray-50">Print for Shop</button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 prose max-w-none">
        <h2>For Nepal businesses</h2>
        <p>Print this QR and stick on your counter. Works with eSewa and Khalti apps. No merchant account needed for basic QR.</p>
      </div>
    </div>
  )
}