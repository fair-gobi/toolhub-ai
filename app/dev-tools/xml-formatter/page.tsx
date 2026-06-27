'use client'
import { useState } from 'react'

export default function XMLFormatter() {
  const [input, setInput] = useState('<root><item>test</item></root>')
  const [output, setOutput] = useState('')

  const formatXml = (xml:string) => {
    const PADDING = ' '
    const reg = /(>)(<)(\/*)/g
    let formatted = ''
    let pad = 0
    xml = xml.replace(reg, '$1\r\n$2$3')
    xml.split('\r\n').forEach(node => {
      let indent = 0
      if (node.match(/.+<\/\w[^>]*>$/)) indent = 0
      else if (node.match(/^<\/\w/)) pad = Math.max(pad-1,0)
      else if (node.match(/^<\w[^>]*[^\/]>.*$/)) indent = 1
      formatted += PADDING.repeat(pad) + node + '\r\n'
      pad += indent
    })
    return formatted.trim()
  }

  const format = () => {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(input, 'text/xml')
      if (doc.querySelector('parsererror')) throw new Error('Invalid XML')
      setOutput(formatXml(input))
    } catch { setOutput('Invalid XML') }
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">&lt;/&gt; XML Formatter</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-96 font-mono text-sm border-2 rounded-lg p-3" />
        <textarea value={output} readOnly className="w-full h-96 font-mono text-sm border-2 rounded-lg p-3 bg-gray-50" />
      </div>
      <button onClick={format} className="mt-3 bg-purple-600 text-white px-6 py-2 rounded-lg">Format XML</button>
    </main>
  )
}
