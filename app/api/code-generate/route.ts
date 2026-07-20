import { NextResponse } from "next/server";
export async function POST(req:Request){
  const { prompt, lang } = await req.json();
  const apiKey = process.env.GROQ_API_KEY || process.env.GROK_API_KEY;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions",{
    method:"POST",
    headers:{ "Authorization":`Bearer ${apiKey}`, "Content-Type":"application/json" },
    body: JSON.stringify({
      model:"llama-3.3-70b-versatile",
      messages:[
        {role:"system", content:`You are expert ${lang} coder. Return only clean code with comments.`},
        {role:"user", content:`Language: ${lang}. Task: ${prompt}`}
      ],
      temperature:0.3
    })
  });
  const data = await res.json();
  return NextResponse.json({ result: data.choices?.[0]?.message?.content });
}