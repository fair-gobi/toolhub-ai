'use client'
import { useState } from 'react'
import Link from 'next/link'
const C = ['NPR','INR','USD','EUR','GBP','JPY','AUD','CAD','CHF','CNY','SGD','AED']
export default function CI(){
  const [p,setP]=useState(100000),[r,setR]=useState(8),[t,setT]=useState(5),[n,setN]=useState(12),[c,setC]=useState('NPR')
  const A=p*Math.pow(1+r/100/n,n*t)
  const fmt=(v:number)=>new Intl.NumberFormat('en',{style:'currency',currency:c,maximumFractionDigits:0}).format(v)
  return(
  <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/finance" className="text-sm text-green-600 hover:underline mb-4 inline-block">← Back</Link>
      <div className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">💰</div>
            <div><h1 className="text-2xl font-bold">Compound Interest Calculator</h1><p className="text-green-100 text-sm">See how your money grows exponentially</p></div>
          </div>
        </div>
        <div className="p-6 grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <select value={c} onChange={e=>setC(e.target.value)} className="w-full p-3 border rounded-xl">{C.map(x=><option key={x}>{x}</option>)}</select>
            <div><label className="text-sm font-medium">Principal: {fmt(p)}</label><input type="range" min="1000" max="10000000" step="1000" value={p} onChange={e=>setP(+e.target.value)} className="w-full accent-green-600"/></div>
            <div><label className="text-sm font-medium">Rate: {r}%</label><input type="range" min="1" max="25" step="0.1" value={r} onChange={e=>setR(+e.target.value)} className="w-full accent-green-600"/></div>
            <div><label className="text-sm font-medium">Years: {t}</label><input type="range" min="1" max="50" value={t} onChange={e=>setT(+e.target.value)} className="w-full accent-green-600"/></div>
            <select value={n} onChange={e=>setN(+e.target.value)} className="w-full p-3 border rounded-xl"><option value={1}>Yearly</option><option value={2}>Half-yearly</option><option value={4}>Quarterly</option><option value={12}>Monthly</option><option value={365}>Daily</option></select>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <div className="bg-white rounded-xl p-4 mb-3"><div className="text-xs text-gray-500">Principal</div><div className="text-xl font-bold">{fmt(p)}</div></div>
            <div className="bg-white rounded-xl p-4 mb-3"><div className="text-xs text-gray-500">Interest Earned</div><div className="text-xl font-bold text-green-600">{fmt(A-p)}</div></div>
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-4 text-white"><div className="text-xs opacity-90">Maturity Amount</div><div className="text-3xl font-bold">{fmt(A)}</div></div>
          </div>
        <div className="px-6 pb-6"><div className="bg-green-50 rounded-xl p-4 text-sm"><strong>Formula:</strong> A = P(1 + r/n)^(nt) • Compounding {n===12?'monthly':n===4?'quarterly':'yearly'} gives you {fmt(A-p)} extra</div></div>
      </div>
    </div>
  </main>)
}
