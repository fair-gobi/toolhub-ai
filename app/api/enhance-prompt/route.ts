import { NextResponse } from "next/server";
export async function POST(req:Request){
  const { prompt } = await req.json();
  const apiKey = process.env.GROQ_API_KEY;
  if(!apiKey) return NextResponse.json({ result: prompt });

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions",{
    method:"POST",
    headers:{ "Authorization":`Bearer ${apiKey}`, "Content-Type":"application/json" },
    body: JSON.stringify({
      model:"llama-3.3-70b-versatile",
      messages:[{role:"user", content:`Enhance this image prompt to be highly detailed for Stable Diffusion XL: ${prompt}. Return only enhanced prompt.`}]
    })
  });
  const data=await res.json();
  return NextResponse.json({ result: data.choices?.[0]?.message?.content || prompt });
}