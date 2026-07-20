"use client"
import { useState } from "react"

export default function SIP() {
  const [sip,setSip]=useState(5000); const [years,setYears]=useState(10); const [ret,setRet]=useState(12)
  const months = years*12; const monthly = ret/12/100
  const future = sip * ((Math.pow(1+monthly,months)-1)/monthly) * (1+monthly)
  const invested = sip*months; const gains = future-invested

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">SIP Calculator Nepal</h1>
      <p className="text-gray-600 mb-8">Mutual fund SIP returns. Plan your investment.</p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div><label>Monthly SIP (Rs)</label><input type="number" value={sip} onChange={e=>setSip(+e.target.value)} className="w-full p-4 border-2 rounded-xl" /></div>
          <div><label>Years</label><input type="number" value={years} onChange={e=>setYears(+e.target.value)} className="w-full p-4 border-2 rounded-xl" /></div>
          <div><label>Expected Return %</label><input type="number" value={ret} onChange={e=>setRet(+e.target.value)} className="w-full p-4 border-2 rounded-xl" /></div>
        </div>
        <div className="bg-green-600 text-white rounded-2xl p-8">
          <div className="text-sm opacity-90">Maturity Value</div>
          <div className="text-4xl font-bold">Rs {future.toFixed(0).toLocaleString()}</div>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div><div className="opacity-80">Invested</div><div className="text-xl font-bold">Rs {invested.toLocaleString()}</div></div>
            <div><div className="opacity-80">Gains</div><div className="text-xl font-bold">Rs {gains.toFixed(0).toLocaleString()}</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
