import { NextResponse } from "next/server";
export async function POST(req:Request){
  const { name, role, company, skills, exp } = await req.json();
  const apiKey = process.env.GROQ_API_KEY || process.env.GROK_API_KEY;
  const prompt = `Write professional cover letter for ${name} applying for ${role} at ${company}. Skills: ${skills}. Experience: ${exp}. Formal, 300 words, ATS friendly.`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions",{
    method:"POST",
    headers:{ "Authorization":`Bearer ${apiKey}`, "Content-Type":"application/json" },
    body: JSON.stringify({ model:"llama-3.3-70b-versatile", messages:[{role:"user",content:prompt}] })
  });
  const data = await res.json();
  return NextResponse.json({ result: data.choices?.[0]?.message?.content });
}