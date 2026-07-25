'use client';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
export default function QRGen(){
  const [text,setText]=useState('https://promptoolhub.com'); const [qr,setQr]=useState('');
  useEffect(()=>{ if(!text) return; QRCode.toDataURL(text,{width:300,margin:2}).then(setQr); },[text]);
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8"><div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border">
      <h1 className="text-2xl md:text-3xl font-bold">Free QR Code Generator</h1><p className="text-gray-600 mt-2">Create QR for links, WiFi, text, phone numbers. No signup, instant download.</p>
      <div className="grid md:grid-cols-2 gap-6 mt-6"><textarea value={text} onChange={e=>setText(e.target.value)} rows={5} className="w-full border rounded-lg px-3 py-2" placeholder="Enter text or URL"/><div className="text-center">{qr && <><img src={qr} className="mx-auto border rounded-xl p-2"/><a href={qr} download="qr.png" className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg">Download PNG</a></>}</div></div>
      <div className="mt-8 border-t pt-4"><h2 className="font-semibold mb-1">About</h2><p className="text-sm text-gray-600">QR codes work for menus, business cards, payments, and WiFi sharing. Generated locally in your browser for privacy.</p></div>
    </div></main>
  );
}
