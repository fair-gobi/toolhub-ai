'use client'

import { useState } from 'react'

type Item = { desc: string; qty: number; price: number }

const currencies = [
  {code:'USD',symbol:'$',name:'US Dollar'},
  {code:'EUR',symbol:'€',name:'Euro'},
  {code:'GBP',symbol:'£',name:'British Pound'},
  {code:'INR',symbol:'₹',name:'Indian Rupee'},
  {code:'PKR',symbol:'₨',name:'Pakistani Rupee'},
  {code:'BDT',symbol:'৳',name:'Bangladeshi Taka'},
  {code:'NPR',symbol:'रू',name:'Nepalese Rupee'},
  {code:'LKR',symbol:'Rs',name:'Sri Lankan Rupee'},
  {code:'BTN',symbol:'Nu.',name:'Bhutanese Ngultrum'},
  {code:'MVR',symbol:'Rf',name:'Maldivian Rufiyaa'},
  {code:'AUD',symbol:'A$',name:'Australian Dollar'},
  {code:'CAD',symbol:'C$',name:'Canadian Dollar'},
  {code:'SGD',symbol:'S$',name:'Singapore Dollar'},
  {code:'AED',symbol:'د.إ',name:'UAE Dirham'},
  {code:'SAR',symbol:'﷼',name:'Saudi Riyal'},
  {code:'JPY',symbol:'¥',name:'Japanese Yen'},
  {code:'CNY',symbol:'¥',name:'Chinese Yuan'},
  {code:'KRW',symbol:'₩',name:'Korean Won'},
  {code:'THB',symbol:'฿',name:'Thai Baht'},
  {code:'MYR',symbol:'RM',name:'Malaysian Ringgit'},
  {code:'IDR',symbol:'Rp',name:'Indonesian Rupiah'},
  {code:'PHP',symbol:'₱',name:'Philippine Peso'},
  {code:'NZD',symbol:'NZ$',name:'NZ Dollar'},
  {code:'CHF',symbol:'CHF',name:'Swiss Franc'},
  {code:'ZAR',symbol:'R',name:'South African Rand'},
]

export default function InvoiceGenerator() {
  const [company, setCompany] = useState('Your Company')
  const [client, setClient] = useState('')
  const [invoiceNo, setInvoiceNo] = useState('INV-001')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [currency, setCurrency] = useState('USD')
  const [items, setItems] = useState<Item[]>([{ desc: 'Web Design', qty: 1, price: 500 }])
  const [tax, setTax] = useState(0)

  const curr = currencies.find(c=>c.code===currency)?.symbol || '$'
  const addItem = () => setItems([...items, { desc: '', qty: 1, price: 0 }])
  const updateItem = (i: number, field: keyof Item, value: string) => {
    const newItems = [...items]
    newItems[i] = {...newItems[i], [field]: field === 'desc'? value : Number(value) }
    setItems(newItems)
  }

  const subtotal = items.reduce((sum, it) => sum + it.qty * it.price, 0)
  const taxAmount = subtotal * (tax / 100)
  const total = subtotal + taxAmount

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <div className="bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-xl p-6 mb-6 print:hidden">
        <div className="flex items-center gap-3">
          <span className="text-4xl">💵</span>
          <div>
            <h1 className="text-3xl font-bold">Invoice Generator</h1>
            <p className="opacity-90">25 currencies including South Asia</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 print:hidden">
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Details</h2>
          <input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Your Company" className="w-full border rounded px-3 py-2 mb-3" />
          <input value={client} onChange={e=>setClient(e.target.value)} placeholder="Client Name" className="w-full border rounded px-3 py-2 mb-3" />
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input value={invoiceNo} onChange={e=>setInvoiceNo(e.target.value)} className="border rounded px-3 py-2" />
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="border rounded px-3 py-2" />
          </div>
          <select value={currency} onChange={e=>setCurrency(e.target.value)} className="w-full border rounded px-3 py-2">
            {currencies.map(c=> <option key={c.code} value={c.code}>{c.name} ({c.symbol})</option>)}
          </select>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Items</h2>
          {items.map((it, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 mb-2">
              <input value={it.desc} onChange={e=>updateItem(i,'desc',e.target.value)} placeholder="Description" className="col-span-6 border rounded px-2 py-1 text-sm" />
              <input type="number" value={it.qty} onChange={e=>updateItem(i,'qty',e.target.value)} className="col-span-2 border rounded px-2 py-1 text-sm" />
              <input type="number" value={it.price} onChange={e=>updateItem(i,'price',e.target.value)} className="col-span-4 border rounded px-2 py-1 text-sm" />
            </div>
          ))}
          <button onClick={addItem} className="text-sm text-emerald-600 mt-2">+ Add item</button>
          <div className="mt-4">
            <label className="text-sm">Tax %</label>
            <input type="number" value={tax} onChange={e=>setTax(Number(e.target.value))} className="w-20 border rounded px-2 py-1 ml-2" />
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-8 mt-6">
        <div className="flex justify-between mb-8">
          <div><h2 className="text-2xl font-bold">{company}</h2><p className="text-gray-600">Invoice</p></div>
          <div className="text-right"><p><strong>#{invoiceNo}</strong></p><p className="text-gray-600">{date}</p></div>
        </div>
        <p className="mb-6">Bill To: <strong>{client || 'Client Name'}</strong></p>
        <table className="w-full mb-6">
          <thead><tr className="border-b"><th className="text-left py-2">Description</th><th className="text-right py-2">Qty</th><th className="text-right py-2">Price</th><th className="text-right py-2">Total</th></tr></thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i} className="border-b"><td className="py-2">{it.desc}</td><td className="text-right">{it.qty}</td><td className="text-right">{curr}{it.price}</td><td className="text-right">{curr}{(it.qty * it.price).toFixed(2)}</td></tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <div className="w-56">
            <div className="flex justify-between py-1"><span>Subtotal</span><span>{curr}{subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between py-1"><span>Tax ({tax}%)</span><span>{curr}{taxAmount.toFixed(2)}</span></div>
            <div className="flex justify-between py-2 font-bold border-t mt-1"><span>Total</span><span>{curr}{total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>

      <button onClick={()=>window.print()} className="w-full mt-6 bg-emerald-600 text-white rounded-lg py-3 font-medium hover:bg-emerald-700 print:hidden">
        Download PDF
      </button>
    </main>
  )
}