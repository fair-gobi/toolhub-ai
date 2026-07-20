'use client'
import { useState } from 'react'

export default function SQLGenerator(){
  const [table,setTable]=useState('users')
  const [action,setAction]=useState('SELECT')
  const [columns,setColumns]=useState('id, name, email')
  const [where,setWhere]=useState('active = 1')
  const [sql,setSql]=useState('')

  const generate=()=>{
    let query = ''
    switch(action){
      case 'SELECT':
        query = `SELECT ${columns}\nFROM ${table}${where?`\nWHERE ${where}`:''};`
        break
      case 'INSERT':
        const cols = columns.split(',').map(c=>c.trim())
        query = `INSERT INTO ${table} (${cols.join(', ')})\nVALUES (${cols.map(()=>'?').join(', ')});`
        break
      case 'UPDATE':
        query = `UPDATE ${table}\nSET ${columns.split(',')[0].trim()} =?${where?`\nWHERE ${where}`:''};`
        break
      case 'DELETE':
        query = `DELETE FROM ${table}${where?`\nWHERE ${where}`:''};`
        break
    }
    setSql(query)
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">SQL Query Generator</h1>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-sm">Table</label>
          <input value={table} onChange={e=>setTable(e.target.value)} className="w-full border rounded p-2 font-mono"/>
        </div>
        <div>
          <label className="text-sm">Action</label>
          <select value={action} onChange={e=>setAction(e.target.value)} className="w-full border rounded p-2">
            <option>SELECT</option><option>INSERT</option><option>UPDATE</option><option>DELETE</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="text-sm">Columns</label>
          <input value={columns} onChange={e=>setColumns(e.target.value)} className="w-full border rounded p-2 font-mono" placeholder="id, name"/>
        </div>
        <div className="col-span-2">
          <label className="text-sm">WHERE (optional)</label>
          <input value={where} onChange={e=>setWhere(e.target.value)} className="w-full border rounded p-2 font-mono" placeholder="id = 1"/>
        </div>
      </div>
      <button onClick={generate} className="bg-blue-700 text-white px-6 py-2 rounded-lg mb-4">Generate SQL</button>
      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">{sql || '-- SQL appears here'}</pre>
    </main>
  )
}
