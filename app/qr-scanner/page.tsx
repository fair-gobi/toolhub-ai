'use client'
import { useState, useRef, useEffect } from 'react'
import jsQR from 'jsqr'
import { authenticator } from 'otplib'

export default function QRScanner() {
  const [result, setResult] = useState('')
  const [is2FA, setIs2FA] = useState(false)
  const [secret, setSecret] = useState('')
  const [issuer, setIssuer] = useState('')
  const [account, setAccount] = useState('')
  const [otp, setOtp] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  const [scanning, setScanning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream|null>(null)

  useEffect(() => {
    if (is2FA && secret) {
      const update = () => {
        try {
          setOtp(authenticator.generate(secret))
          setTimeLeft(30 - Math.floor(Date.now() / 1000) % 30)
        } catch {}
      }
      update()
      const interval = setInterval(update, 1000)
      return () => clearInterval(interval)
    }
  }, [is2FA, secret])

  const handleScan = (data: string) => {
    setResult(data)
    if (data.startsWith('otpauth://')) {
      const url = new URL(data)
      setIs2FA(true)
      setSecret(url.searchParams.get('secret') || '')
      setIssuer(url.searchParams.get('issuer') || '')
      setAccount(decodeURIComponent(url.pathname.slice(1)))
    } else {
      setIs2FA(false)
    }
    stopCamera()
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setScanning(true)
        scanLoop()
      }
    } catch { alert('Camera access denied') }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    setScanning(false)
  }

  const scanLoop = () => {
    const video = videoRef.current, canvas = canvasRef.current
    if (!video ||!canvas || video.readyState!==4) { requestAnimationFrame(scanLoop); return }
    const ctx = canvas.getContext('2d')
    canvas.width = video.videoWidth; canvas.height = video.videoHeight
    ctx?.drawImage(video, 0, 0)
    const img = ctx?.getImageData(0, 0, canvas.width, canvas.height)
    if (img) {
      const code = jsQR(img.data, img.width, img.height)
      if (code) { handleScan(code.data); return }
    }
    if (scanning) requestAnimationFrame(scanLoop)
  }

  const scanFile = (e:any) => {
    const file = e.target.files[0]; if (!file) return
    const img = new Image()
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = img.width; c.height = img.height
      const ctx = c.getContext('2d'); ctx?.drawImage(img,0,0)
      const d = ctx?.getImageData(0,0,c.width,c.height)
      if (d) { const code = jsQR(d.data,d.width,d.height); if (code) handleScan(code.data) }
    }
    img.src = URL.createObjectURL(file)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">QR & 2FA Scanner</h1>
        <p className="text-gray-600 mb-6">Scan QR codes and authenticator setup</p>

        <div className="bg-white p-6 rounded-2xl border">
          {!scanning? (
            <div className="space-y-3">
              <button onClick={startCamera} className="w-full bg-purple-600 text-white py-4 rounded-xl font-medium">📷 Start Camera Scan</button>
              <label className="block w-full bg-gray-900 text-white py-4 rounded-xl text-center cursor-pointer">
                📁 Upload QR Image
                <input type="file" accept="image/*" onChange={scanFile} className="hidden" />
              </label>
            </div>
          ) : (
            <div>
              <video ref={videoRef} autoPlay playsInline className="w-full rounded-xl mb-3 bg-black" />
              <button onClick={stopCamera} className="w-full bg-red-600 text-white py-2 rounded-lg">Stop Scanning</button>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />

          {result && (
            <div className="mt-6">
              {is2FA? (
                <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-2xl">🔐</div>
                    <div>
                      <div className="font-semibold text-blue-900">2FA Authenticator</div>
                      <div className="text-xs text-blue-700">{issuer} {account && `• ${account}`}</div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg mb-3 text-center">
                    <div className="text-xs text-gray-500 mb-1">Current Code</div>
                    <div className="text-4xl font-bold tracking-widest text-blue-600 font-mono">{otp}</div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                      <div className="bg-blue-600 h-1 rounded-full transition-all" style={{width: `${(timeLeft/30)*100}%`}}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{timeLeft}s remaining</div>
                  </div>

                  <div className="bg-white p-3 rounded-lg mb-3">
                    <div className="text-xs text-gray-500">Secret Key</div>
                    <div className="font-mono text-xs break-all">{secret}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={()=>navigator.clipboard.writeText(otp)} className="bg-blue-600 text-white py-2 rounded-lg text-sm">Copy Code</button>
                    <button onClick={()=>navigator.clipboard.writeText(secret)} className="bg-gray-800 text-white py-2 rounded-lg text-sm">Copy Secret</button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="text-sm text-gray-600 mb-2">Scanned Content:</div>
                  <div className="font-mono break-all bg-white p-3 rounded border text-sm">{result}</div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={()=>navigator.clipboard.writeText(result)} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm">Copy</button>
                    {result.startsWith('http') && <a href={result} target="_blank" className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm text-center">Open Link</a>}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 p-4 rounded-xl text-sm">
          <strong>⚠️ Privacy First:</strong> All scanning and code generation happens in your browser. Secrets are never sent to any server. Perfect for backing up your 2FA.
        </div>
      </div>
    </main>
  )
}
