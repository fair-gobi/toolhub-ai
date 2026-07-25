'use client'
import { useState, useRef, useEffect } from 'react'
import jsQR from 'jsqr'
import * as OTPAuth from 'otpauth'

export default function QRScanner() {
  const [result, setResult] = useState('')
  const [is2FA, setIs2FA] = useState(false)
  const [secret, setSecret] = useState('')
  const [account, setAccount] = useState('')
  const [issuer, setIssuer] = useState('')
  const [otp, setOtp] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  const [scanning, setScanning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const totpRef = useRef<OTPAuth.TOTP | null>(null)

  useEffect(() => {
    if (!is2FA ||!totpRef.current) return
    const update = () => {
      setOtp(totpRef.current!.generate())
      setTimeLeft(30 - Math.floor(Date.now() / 1000) % 30)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [is2FA])

  const handleScan = (data: string) => {
    const clean = data.trim()
    setResult(clean)
    stopCamera()

    if (clean.toLowerCase().startsWith('otpauth://')) {
      try {
        const url = new URL(clean)
        const sec = url.searchParams.get('secret') || ''
        const iss = url.searchParams.get('issuer') || 'Authenticator'
        let label = url.pathname.replace(/^\/+/, '').replace(/^totp\//i, '')
        label = decodeURIComponent(label)
        if (label.includes(':')) label = label.split(':').pop() || label

        const totp = new OTPAuth.TOTP({ secret: sec, issuer: iss, label })
        totpRef.current = totp

        setSecret(sec)
        setIssuer(iss)
        setAccount(label || 'Account')
        setIs2FA(true)
        setOtp(totp.generate())
      } catch {
        setIs2FA(false)
      }
    } else {
      setIs2FA(false)
    }
  }

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      streamRef.current = s
      if (videoRef.current) {
        videoRef.current.srcObject = s
        await videoRef.current.play()
        setScanning(true)
        scanLoop()
      }
    } catch {
      alert('Camera denied')
    }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    setScanning(false)
  }

  const scanLoop = () => {
    const v = videoRef.current, c = canvasRef.current
    if (!v ||!c || v.readyState!== 4) {
      if (scanning) requestAnimationFrame(scanLoop)
      return
    }
    c.width = v.videoWidth; c.height = v.videoHeight
    const ctx = c.getContext('2d')
    ctx?.drawImage(v, 0, 0)
    const img = ctx?.getImageData(0, 0, c.width, c.height)
    if (img) {
      const code = jsQR(img.data, img.width, img.height)
      if (code?.data) { handleScan(code.data); return }
    }
    if (scanning) requestAnimationFrame(scanLoop)
  }

  const scanFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return
    const img = new Image()
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = img.width; c.height = img.height
      const ctx = c.getContext('2d')
      ctx?.drawImage(img, 0, 0)
      const d = ctx?.getImageData(0, 0, c.width, c.height)
      if (d) {
        const code = jsQR(d.data, d.width, d.height)
        if (code?.data) handleScan(code.data)
      }
    }
    img.src = URL.createObjectURL(f)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">QR & 2FA Scanner</h1>
        <p className="text-gray-600 mb-6">Scan QR codes or 2FA setup codes — works offline</p>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          {!scanning &&!result && (
            <div className="space-y-3">
              <button onClick={startCamera} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-medium transition">📷 Scan QR Code</button>
              <label className="block w-full bg-gray-900 hover:bg-black text-white py-4 rounded-xl text-center cursor-pointer transition">
                📁 Upload Image
                <input type="file" accept="image/*" onChange={scanFile} className="hidden" />
              </label>
            </div>
          )}

          {scanning && (
            <div>
              <video ref={videoRef} autoPlay playsInline className="w-full rounded-xl mb-3 bg-black aspect-video" />
              <button onClick={stopCamera} className="w-full bg-red-600 text-white py-2.5 rounded-lg">Stop Camera</button>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />

          {result && (
            <div className="mt-4">
              {is2FA? (
                <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-lg">🔐</div>
                    <div>
                      <div className="font-semibold text-gray-900">{issuer}</div>
                      <div className="text-sm text-gray-600">{account}</div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl text-center mb-4 shadow-sm">
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Current Code</div>
                    <div className="text-5xl font-mono font-bold tracking-[0.2em] text-blue-600">{otp}</div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full transition-all duration-1000" style={{ width: `${(timeLeft / 30) * 100}%` }} />
                      </div>
                      <div className="text-xs text-gray-500 mt-1.5">{timeLeft} seconds remaining</div>
                    </div>
                  </div>

                  <div className="bg-white/60 backdrop-blur p-3 rounded-xl mb-3">
                    <div className="text-xs text-gray-500 mb-1">Secret Key</div>
                    <div className="font-mono text-xs break-all text-gray-700">{secret}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => navigator.clipboard.writeText(otp)} className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-medium transition">Copy Code</button>
                    <button onClick={() => navigator.clipboard.writeText(secret)} className="bg-gray-800 hover:bg-black text-white py-3 rounded-xl text-sm font-medium transition">Copy Secret</button>
                  </div>

                  <button onClick={() => { setResult(''); setIs2FA(false); totpRef.current = null }} className="w-full mt-3 text-sm text-gray-600 hover:text-gray-900 py-2">Scan Another</button>
                </div>
              ) : (
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="text-sm text-gray-600 mb-2">Scanned Content:</div>
                  <div className="font-mono text-sm break-all bg-white p-3 rounded-lg border">{result}</div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => navigator.clipboard.writeText(result)} className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium">Copy</button>
                    {result.startsWith('http') && <a href={result} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium text-center">Open Link</a>}
                  </div>
                  <button onClick={() => setResult('')} className="w-full mt-2 text-sm text-gray-600 py-2">Scan Again</button>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">All processing happens in your browser. No data is sent to servers.</p>
      </div>
    </main>
  )
}
