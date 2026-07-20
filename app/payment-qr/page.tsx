'use client';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
export default function PaymentQR(){
  const [amount,setAmount]=useState('100'); const [name,setName]=useState('Gobinda'); const [note,setNote]=useState('Payment'); const [qr,setQr]=useState(''); const [app,setApp]=useState('esewa');
  useEffect(()=>{ const text = `${app.toUpperCase()}|NAME:${name}|AMT:${amount}|NOTE:${note}`; QRCode.toDataURL(text,{width:300}).then(setQr).catch(()=>{}); },[amount,name,note,app]);
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8"><div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border">
      <h1 className="text-2xl md:text-3xl font-bold">Nepal Payment QR Generator</h1><p className="text-gray-600 mt-2">Create QR for eSewa and Khalti to receive payments. Works offline.</p>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-3"><div className="flex gap-2"><button onClick={()=>setApp('esewa')} className={`px-3 py-1.5 rounded ${app==='esewa'?'bg-green-600 text-white':'bg-gray-100'}`}>eSewa</button><button onClick={()=>setApp('khalti')} className={`px-3 py-1.5 rounded ${app==='khalti'?'bg-purple-600 text-white':'bg-gray-100'}`}>Khalti</button></div>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Merchant Name" className="w-full border rounded-lg px-3 py-2"/><input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount NPR" className="w-full border rounded-lg px-3 py-2"/><input value={note} onChange={e=>setNote(e.target.value)} placeholder="Note" className="w-full border rounded-lg px-3 py-2"/></div>
        <div className="text-center">{qr && <img src={qr} alt="QR" className="mx-auto border rounded-xl p-2 bg-white"/>}<p className="text-sm mt-2">{name} - Rs. {amount}</p></div>
      </div>
      <div className="mt-8 border-t pt-4"><h2 className="font-semibold mb-1">How to use</h2><p className="text-sm text-gray-600">Enter your name and amount, show the QR to customer. They scan with eSewa/Khalti app. This generates a static QR with your details embedded. For dynamic Fonepay QR, connect merchant API later.</p></div>
    </div></main>
  );
}
