"use client"
import { useState, useEffect } from 'react'
const CATS = ["Image Prompt","Video Prompt","Design","Marketing","Social Media","Productivity","Business","Coding","Writing","SEO","Sales","Education","ChatGPT Prompt","Claude Prompt","Gemini Prompt","Developer Prompt"]
const API = "/api/admin/add-prompt"

export default function AdminPage(){
  const [authed,setAuthed]=useState(false)
  const [key,setKey]=useState("")
  const [prompts,setPrompts]=useState<any[]>([])
  const [q,setQ]=useState("")
  const [form,setForm]=useState({id:"",title:"",category:"Image Prompt",prompt_content:""})
  const [editing,setEditing]=useState(false)
  const [msg,setMsg]=useState("")

  useEffect(()=>{ 
    const s=localStorage.getItem("admin_key"); 
    if(s){ setKey(s); setAuthed(true); load(s,"") } 
  },[])

  const load = async (k:string, query:string) => {
    const res = await fetch(`${API}?q=${encodeURIComponent(query)}`, { headers: { "x-admin-key": k } })
    const data = await res.json()
    if(res.ok) setPrompts(data.prompts)
    else setMsg("❌ "+data.error)
  }

  const handleLogin = () => {
    if(!key.trim()){ setMsg("Enter ADMIN_KEY"); return }
    localStorage.setItem("admin_key", key)
    setAuthed(true)
    setMsg("✅ Logged in")
    load(key, "")
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_key")
    setAuthed(false)
    setKey("")
    setPrompts([])
    setMsg("Logged out")
  }

  const save = async (e:any) => {
    e.preventDefault()
    const method = editing ? "PUT" : "POST"
    const res = await fetch(API, { method, headers: { "Content-Type":"application/json","x-admin-key":key }, body: JSON.stringify(form) })
    if(res.ok){ setMsg(editing?"✅ Updated!":"✅ Added!"); setForm({id:"",title:"",category:"Image Prompt",prompt_content:""}); setEditing(false); load(key,q) }
    else { const d=await res.json(); setMsg("❌ "+d.error) }
  }

  // NOT LOGGED IN VIEW
  if(!authed) return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-xl bg-white">
      <h1 className="font-bold text-lg mb-4">Admin Login</h1>
      <input type="password" placeholder="Enter ADMIN_KEY" className="w-full border p-2.5 rounded mb-3" value={key} onChange={e=>setKey(e.target.value)} />
      <button onClick={handleLogin} className="w-full bg-black text-white py-2.5 rounded font-medium">Login</button>
      {msg && <p className="text-sm mt-3 bg-zinc-100 p-2 rounded">{msg}</p>}
    </div>
  )

  // LOGGED IN VIEW
  return (
    <div className="max-w-4xl mx-auto mt-6 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Admin - Add / Search / Edit</h1>
        <button onClick={handleLogout} className="text-xs border border-red-200 text-red-600 bg-red-50 px-4 py-1.5 rounded-full hover:bg-red-100">Logout</button>
      </div>

      <form onSubmit={save} className="border-2 border-violet-200 p-4 rounded-xl bg-white mb-6 space-y-3">
        <h2 className="font-semibold">{editing?"✏️ Edit Prompt":"➕ Add New Prompt"}</h2>
        <input required placeholder="Title" className="w-full border p-2 rounded" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
        <select className="w-full border p-2 rounded" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{CATS.map(c=><option key={c} value={c}>{c}</option>)}</select>
        <textarea required rows={6} placeholder="Prompt content..." className="w-full border p-2 rounded" value={form.prompt_content} onChange={e=>setForm({...form,prompt_content:e.target.value})}/>
        <div className="flex gap-2">
          <button className="bg-violet-600 text-white px-6 py-2 rounded flex-1">{editing?"Update":"Add"}</button>
          {editing && <button type="button" onClick={()=>{setEditing(false); setForm({id:"",title:"",category:"Image Prompt",prompt_content:""})}} className="border px-6 py-2 rounded">Cancel</button>}
        </div>
        {msg && <p className="text-sm bg-zinc-100 p-2 rounded">{msg}</p>}
      </form>

      <div className="flex gap-2 mb-4">
        <input placeholder="Search title..." className="flex-1 border p-2 rounded" value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=> e.key==='Enter' && load(key,q)}/>
        <button onClick={()=>load(key,q)} className="bg-black text-white px-6 rounded">Search</button>
      </div>

      {prompts.map(p=>(
        <div key={p.id} className="border p-3 rounded bg-white flex justify-between mb-2">
          <div className="flex-1"><div className="text-sm font-medium truncate">{p.title}</div><div className="text-xs text-zinc-500">{p.category}</div></div>
          <button onClick={()=>{setForm({id:p.id,title:p.title,category:p.category,prompt_content:p.prompt_content}); setEditing(true); window.scrollTo({top:0,behavior:"smooth"})}} className="bg-zinc-900 text-white text-xs px-4 py-1 rounded h-fit">Edit</button>
        </div>
      ))}
    </div>
  )
}