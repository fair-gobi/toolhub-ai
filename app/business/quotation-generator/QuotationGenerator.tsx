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

export default function QuotationGenerator() {
  const [company, setCompany] = useState('Your Company')
  const [client, setClient] = useState('')
  const [quoteNo, setQuoteNo] = useState('QT-001')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [validDays, setValidDays] = useState(15)
  const [currency, setCurrency] = useState('NPR')
  const [items, setItems] = useState<Item[]>([{ desc: 'Website Development', qty: 1, price: 1000 }])

  const curr = currencies.find(c => c.code === currency)?.symbol || 'रू'
  const total = items.reduce((s, it) => s + it.qty * it.price, 0)
  const validUntil = new Date(Date.now() + validDays * 86400000).toISOString().split('T')[0]

  const addItem = () => setItems([...items, { desc: '', qty: 1, price: 0 }])
  const updateItem = (i: number, field: keyof Item, val: string) => {
    const copy = [...items]
    copy[i] = {...copy[i], [field]: field === 'desc'? val : Number(val) }
    setItems(copy)
  }

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <div className="bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-xl p-6 mb-6 print:hidden">
        <div className="flex items-center gap-3">
          <span className="text-4xl">📝</span>
          <div>
            <h1 className="text-3xl font-bold">Quotation Generator</h1>
            <p className="opacity-90">25 currencies including South Asia</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 print:hidden">
        <div className="bg-white border rounded-xl p-6">
          <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Your Company" className="w-full border rounded px-3 py-2 mb-3" />
          <input value={client} onChange={e => setClient(e.target.value)} placeholder="Client Name" className="w-full border rounded px-3 py-2 mb-3" />
          <div className="grid grid-cols-3 gap-2">
            <input value={quoteNo} onChange={e => setQuoteNo(e.target.value)} className="border rounded px-2 py-2" />
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border rounded px-2 py-2" />
            <input type="number" value={validDays} onChange={e => setValidDays(Number(e.target.value))} className="border rounded px-2 py-2" />
          </div>
          <select value={currency} onChange={e => setCurrency(e.target.value)} className="w-full border rounded px-3 py-2 mt-3">
            {currencies.map(c => <option key={c.code} value={c.code}>{c.name} ({c.symbol})</option>)}
          </select>
        </div>

        <div className="bg-white border rounded-xl p-6">
          {items.map((it, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 mb-2">
              <input value={it.desc} onChange={e => updateItem(i, 'desc', e.target.value)} className="col-span-6 border rounded px-2 py-1 text-sm" placeholder="Item" />
              <input type="number" value={it.qty} onChange={e => updateItem(i, 'qty', e.target.value)} className="col-span-2 border rounded px-2 py-1 text-sm" />
              <input type="number" value={it.price} onChange={e => updateItem(i, 'price', e.target.value)} className="col-span-4 border rounded px-2 py-1 text-sm" />
            </div>
          ))}
          <button onClick={addItem} className="text-sm text-pink-600">+ Add item</button>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-8 mt-6">
        <div className="flex justify-between mb-6">
          <div><h2 className="text-2xl font-bold">{company}</h2><p className="text-gray-600">QUOTATION</p></div>
          <div className="text-right text-sm"><p><strong>{quoteNo}</strong></p><p>Date: {date}</p><p>Valid until: {validUntil}</p></div>
        </div>
        <p className="mb-4">To: <strong>{client || 'Client'}</strong></p>
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="text-left py-2">Item</th><th className="text-right">Qty</th><th className="text-right">Rate</th><th className="text-right">Amount</th></tr></thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i} className="border-b">
                <td className="py-2">{it.desc}</td>
                <td className="text-right">{it.qty}</td>
                <td className="text-right">{curr}{it.price}</td>
                <td className="text-right">{curr}{(it.qty * it.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <p className="text-lg font-bold">Total: {curr}{total.toFixed(2)}</p>
        </div>
      </div>

      <button onClick={() => window.print()} className="w-full mt-6 bg-pink-600 text-white rounded-lg py-3 font-medium hover:bg-pink-700 print:hidden">
        Download PDF
      </button>
    </main>
  )
}
