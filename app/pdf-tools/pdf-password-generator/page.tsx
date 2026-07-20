// @ts-nocheck
'use client';
import { useState } from 'react';

export default function PdfPasswordGenerator(){
  const [length,setLength]=useState(16);
  const [upper,setUpper]=useState(true); const [lower,setLower]=useState(true);
  const [numbers,setNumbers]=useState(true); const [symbols,setSymbols]=useState(true);
  const [pwd,setPwd]=useState(''); const [file,setFile]=useState<File|null>(null);
  const [msg,setMsg]=useState('');

  const generate=()=>{
    const U='ABCDEFGHIJKLMNOPQRSTUVWXYZ'; const L='abcdefghijklmnopqrstuvwxyz'; const N='0123456789'; const S='!@#$%^&*_-+=';
    let chars=''; if(upper) chars+=U; if(lower) chars+=L; if(numbers) chars+=N; if(symbols) chars+=S; if(!chars) chars=L+N;
    const arr=new Uint32Array(length); crypto.getRandomValues(arr);
    let out=''; for(let i=0;i<length;i++) out+=chars[arr[i]%chars.length];
    setPwd(out);
  };

  const protectPdf=async()=>{
    if(!file ||!pwd){ setMsg('Upload PDF and generate password'); return; }
    setMsg('Encrypting...');
    try{
      // qpdf-wasm dynamic import so build never fails if not installed
      const qpdfMod:any = await import('qpdf-wasm');
      const qpdf = await qpdfMod.default();
      const buf = new Uint8Array(await file.arrayBuffer());
      // qpdf API: encrypt input -> output with user password
      const out = await qpdf.encryptPDF(buf, pwd, pwd, 128, { extract: 'n', print: 'low' } as any);
      const blob=new Blob([out as any],{type:'application/pdf'});
      const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=file.name.replace(/\.pdf$/i,'')+'-protected.pdf'; a.click();
      setMsg('Protected PDF downloaded with your password!');
    }catch(e:any){
      // Fallback if qpdf-wasm fails - still give password + unlockable method
      setMsg('Generated password copied. Browser encryption needs qpdf-wasm. Use this password in your PDF tool. Password: '+pwd);
      navigator.clipboard.writeText(pwd);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">🔑 PDF Password Generator</h1>
      <p className="text-sm text-gray-500 mb-6">Generate strong password and lock your PDF</p>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={upper} onChange={e=>setUpper(e.target.checked)}/> A-Z</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={lower} onChange={e=>setLower(e.target.checked)}/> a-z</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={numbers} onChange={e=>setNumbers(e.target.checked)}/> 0-9</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={symbols} onChange={e=>setSymbols(e.target.checked)}/> Symbols</label>
        </div>

        <div>
          <label className="text-sm">Length: {length}</label>
          <input type="range" min={6} max={32} value={length} onChange={e=>setLength(parseInt(e.target.value))} className="w-full"/>
        </div>

        <button onClick={generate} className="w-full bg-purple-600 text-white py-3 rounded-lg">Generate Password</button>

        {pwd && (
          <div className="flex gap-2">
            <input value={pwd} readOnly className="flex-1 border p-3 rounded font-mono text-sm"/>
            <button onClick={()=>navigator.clipboard.writeText(pwd)} className="px-4 bg-gray-900 text-white rounded">Copy</button>
          </div>
        )}

        <hr/>

        <p className="text-sm font-semibold">Apply to PDF:</p>
        <input type="file" accept="application/pdf" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full"/>
        <button onClick={protectPdf} disabled={!pwd||!file} className="w-full bg-red-600 text-white py-3 rounded-lg disabled:opacity-50">Lock PDF with this Password</button>
        {msg && <p className="text-sm text-green-600 break-all">{msg}</p>}
      </div>
    </main>
  );
}
