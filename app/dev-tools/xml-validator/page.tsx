'use client'
import { useState } from 'react'

export default function XMLValidator(){
  const [input,setInput]=useState('<note><to>User</to></note>')
  const [result,setResult]=useState('')

  const validate=()=>{
    // Only run in browser
    if (typeof window === 'undefined') return
    
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(input, 'text/xml')
      const errorNode = doc.querySelector('parsererror')
      
      if (errorNode) {
        const errorText = errorNode.textContent || 'Invalid XML'
        setResult('✗ Invalid: ' + errorText.split('\n')[0].substring(0, 80))
      } else {
        const elements = doc.getElementsByTagName('*').length
        setResult(`✓ Valid XML — ${elements} elements`)
      }
    } catch (e:any) {
      setResult('✗ Error: ' + e.message)
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">XML Validator</h1>
      <textarea 
        value={input} 
        onChange={e=>setInput(e.target.value)} 
        className="w-full h-64 font-mono text-sm border-2 rounded-lg p-3"
        placeholder="Paste XML here..."
      />
      <button 
        onClick={validate} 
        className="mt-3 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
      >
        Validate
      </button>
      
      {result && (
        <div className={`mt-4 p-4 rounded-lg border ${
          result.startsWith('✓') 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {result}
        </div>
      )}
    </main>
  )
}
