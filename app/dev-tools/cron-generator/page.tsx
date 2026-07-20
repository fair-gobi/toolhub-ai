'use client'
import { useState } from 'react'

export default function CronGenerator(){
  const [minute,setMinute]=useState('0')
  const [hour,setHour]=useState('9')
  const [day,setDay]=useState('*')
  const [month,setMonth]=useState('*')
  const [weekday,setWeekday]=useState('1-5')

  const cron = `${minute} ${hour} ${day} ${month} ${weekday}`

  const presets = [
    {name:'Every hour', value:'0 * * * *'},
    {name:'Daily 9am', value:'0 9 * * *'},
    {name:'Weekdays 9am', value:'0 9 * * 1-5'},
    {name:'Every Monday', value:'0 0 * * 1'},
  ]

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Cron Job Generator</h1>
      <div className="bg-gray-900 text-green-400 font-mono text-2xl p-4 rounded mb-4 text-center">{cron}</div>

      <div className="grid grid-cols-5 gap-2 mb-4">
        {[
          {l:'Minute',v:minute,s:setMinute},
          {l:'Hour',v:hour,s:setHour},
          {l:'Day',v:day,s:setDay},
          {l:'Month',v:month,s:setMonth},
          {l:'Weekday',v:weekday,s:setWeekday},
        ].map(f=>(
          <div key={f.l}>
            <label className="text-xs">{f.l}</label>
            <input value={f.v} onChange={e=>f.s(e.target.value)} className="w-full border rounded p-2 font-mono"/>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {presets.map(p=>(
          <button key={p.name} onClick={()=>{
            const [m,h,d,mo,w]=p.value.split(' ')
            setMinute(m);setHour(h);setDay(d);setMonth(mo);setWeekday(w)
          }} className="text-sm border px-3 py-1 rounded hover:bg-gray-100">{p.name}</button>
        ))}
      </div>
    </main>
  )
}
