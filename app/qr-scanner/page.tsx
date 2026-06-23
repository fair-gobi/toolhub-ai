'use client'
import { useState, useEffect } from 'react'
import { authenticator } from 'otplib'

export default function Test() {
  const [code, setCode] = useState('loading...')

  useEffect(() => {
    try {
      const c = authenticator.generate('ZBLWUEP2WDWCOJR7BZ3Z6NWLAZHDFNHV')
      setCode(c)
    } catch (e:any) {
      setCode('ERROR: ' + e.message)
    }
  }, [])

  return (
    <main className="p-10">
      <h1 className="text-2xl">OTPLIB Test</h1>
      <div className="text-5xl font-mono mt-4">{code}</div>
      <p className="mt-4 text-sm">If you see 6 digits, otplib works on Vercel.</p>
    </main>
  )
}
