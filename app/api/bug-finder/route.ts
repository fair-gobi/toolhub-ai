import { NextResponse } from "next/server";
export async function POST(req:Request){
  const { code, lang } = await req.json();
  const apiKey = process.env.GROQ_API_KEY || process.env.GROK_API_KEY;

  const prompt = `You are expert ${lang} code reviewer.
Task:
1. Find bugs/errors in this code
2. Explain each bug
3. Give FIXED code
4. Suggest improvements

Code:
\`\`\`${lang}
${code}
\`\`\`
`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions",{
    method:"POST",
    headers:{ "Authorization":`Bearer ${apiKey}`, "Content-Type":"application/json" },
    body: JSON.stringify({
      model:"llama-3.3-70b-versatile",
      messages:[{role:"user", content: prompt}],
      temperature:0.2
    })
  });
  const data=await res.json();
  return NextResponse.json({ result: data.choices?.[0]?.message?.content || "Error" });
}