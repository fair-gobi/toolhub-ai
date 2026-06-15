'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function InvoiceGenerator(){
  const [items,setItems]=useState([{desc:'',qty:1,rate:0}])
  const [vat,setVat]=useState(13)

  const subtotal = items.reduce((s,i)=>s+i.qty*i.rate,0)
  const vatAmt = subtotal * vat/100
  const total = subtotal + vatAmt

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-600">← Back</Link>
        <h1 className="text-3xl font-bold mt-4">Invoice Generator 🇳🇵</h1>

        <div className="grid grid-cols-2 gap-2 mb-4 mt-4">
          <input placeholder="Your PAN" className="border p-2 rounded text-sm" />
          <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="border p-2 rounded text-sm" />
        </div>

        <div className="bg-white p-6 rounded-xl shadow mt-4">
          {items.map((it,i)=>(
            <div key={i} className="grid grid-cols-12 gap-2 mb-2">
              <input placeholder="Description" value={it.desc} onChange={e=>{const n=[...items];n[i].desc=e.target.value;setItems(n)}} className="border p-2 rounded col-span-6" />
              <input type="number" placeholder="Qty" value={it.qty} onChange={e=>{const n=[...items];n[i].qty=+e.target.value;setItems(n)}} className="border p-2 rounded col-span-2" />
              <input type="number" placeholder="Rate" value={it.rate} onChange={e=>{const n=[...items];n[i].rate=+e.target.value;setItems(n)}} className="border p-2 rounded col-span-3" />
              <button onClick={()=>setItems(items.filter((_,j)=>j!==i))} className="text-red-500 col-span-1">×</button>
            </div>
          ))}

          <button onClick={()=>setItems([...items,{desc:'',qty:1,rate:0}])} className="text-blue-600 text-sm mb-4">+ Add Item</button>

          <div className="border-t pt-4 space-y-1 text-right">
            <div>Subtotal: Rs. {subtotal.toFixed(2)}</div>
            <div className="flex justify-end items-center gap-2">
              VAT <input type="number" value={vat} onChange={e=>setVat(+e.target.value)} className="w-16 border p-1 rounded text-right" />%: Rs. {vatAmt.toFixed(2)}
            </div>
            <div className="font-bold text-lg">Total: Rs. {total.toFixed(2)}</div>
          </div>

          <button onClick={()=>window.print()} className="mt-4 w-full bg-green-600 text-white py-2 rounded">Print / Save PDF</button>
        </div>
      </div>
    </div>
  )
}
