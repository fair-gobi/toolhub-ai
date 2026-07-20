
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, question } = await req.json();
    if (!text ||!question) return NextResponse.json({ error: "Missing text or question" }, { status: 400 });

    const key = process.env.GROK_API_KEY || process.env.GROQ_API_KEY;
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You answer only from the provided document. If answer not in document, say not found." },
          { role: "user", content: `DOCUMENT:\n${text.slice(0,12000)}\n\nQUESTION: ${question}\n\nAnswer in detail:` }
        ],
      })
    });
    const data = await groqRes.json();
    if (!groqRes.ok) return NextResponse.json({ error: data.error?.message }, { status: 500 });
    return NextResponse.json({ answer: data.choices[0].message.content });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}