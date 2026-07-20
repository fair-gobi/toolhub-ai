"use client";
import { useState } from "react";

export default function ResumeBuilder() {
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState("");
  const [form, setForm] = useState({
    name:"", email:"", phone:"", location:"", linkedin:"",
    role:"", summary:"", skills:"", exp:"", education:"", projects:"", certs:""
  });

  const update = (k:string,v:string) => setForm({...form,[k]:v});

  async function gen(){
    setLoading(true);
    const res = await fetch("/api/resume-generate", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setResume(data.result);
    setLoading(false);
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">AI Resume Builder 📄</h1>
      <p className="text-gray-500 mt-1">Build ATS-friendly resume in 30 seconds</p>

      <div className="grid md:grid-cols-2 gap-3 mt-6 bg-white border p-5 rounded-xl">
        <input placeholder="Full Name *" className="border p-2.5 rounded-lg" onChange={e=>update('name',e.target.value)}/>
        <input placeholder="Target Role * (e.g. Frontend Developer)" className="border p-2.5 rounded-lg" onChange={e=>update('role',e.target.value)}/>
        <input placeholder="Email" className="border p-2.5 rounded-lg" onChange={e=>update('email',e.target.value)}/>
        <input placeholder="Phone" className="border p-2.5 rounded-lg" onChange={e=>update('phone',e.target.value)}/>
        <input placeholder="Location (e.g. Kathmandu, Nepal)" className="border p-2.5 rounded-lg" onChange={e=>update('location',e.target.value)}/>
        <input placeholder="LinkedIn / Portfolio URL" className="border p-2.5 rounded-lg" onChange={e=>update('linkedin',e.target.value)}/>
        <textarea placeholder="Professional Summary (optional - AI will write if empty)" className="border p-2.5 rounded-lg md:col-span-2 h-20" onChange={e=>update('summary',e.target.value)}/>
        <textarea placeholder="Skills * (e.g. React, Node.js, Python)" className="border p-2.5 rounded-lg md:col-span-2 h-20" onChange={e=>update('skills',e.target.value)}/>
        <textarea placeholder="Work Experience * (Company, Role, Duration, What you did)" className="border p-2.5 rounded-lg md:col-span-2 h-28" onChange={e=>update('exp',e.target.value)}/>
        <textarea placeholder="Education * (e.g. Bachelor in CS - Tribhuvan University 2020-2024, GPA 3.7)" className="border p-2.5 rounded-lg md:col-span-2 h-28" onChange={e=>update('education',e.target.value)}/>
        <textarea placeholder="Projects (Name - Tech - Link - 1 line desc)" className="border p-2.5 rounded-lg md:col-span-2 h-24" onChange={e=>update('projects',e.target.value)}/>
        <textarea placeholder="Certifications / Awards (optional)" className="border p-2.5 rounded-lg md:col-span-2 h-20" onChange={e=>update('certs',e.target.value)}/>

        <button onClick={gen} disabled={loading} className="md:col-span-2 bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50">
          {loading?"Generating...":"✨ Generate Professional Resume"}
        </button>
      </div>

      {resume && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold">Your Resume</h2>
            <button onClick={()=>navigator.clipboard.writeText(resume)} className="text-sm border px-3 py-1 rounded">Copy</button>
          </div>
          <pre className="whitespace-pre-wrap border p-5 rounded-xl bg-gray-50 text-sm leading-6">{resume}</pre>
        </div>
      )}
    </main>
  )
}