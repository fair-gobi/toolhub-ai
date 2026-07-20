import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, sentences } = await req.json();
    console.log("Text length:", text?.length);
    console.log("Key exists:",!!process.env.GROK_API_KEY);
    console.log("Key prefix:", process.env.GROK_API_KEY?.slice(0,8));

    if (!text) return NextResponse.json({ error: "No text received" }, { status: 400 });

    const key = process.env.GROK_API_KEY || process.env.GROQ_API_KEY;
    if (!key) throw new Error("GROK_API_KEY missing in.env.local - restart server!");

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: `Summarize in ${sentences||6} bullets:\n\n${text.slice(0,10000)}` }],
      })
    });

    const data = await groqRes.json();
    console.log("GROQ FULL RESPONSE:", JSON.stringify(data).slice(0,500));

    if (!groqRes.ok) {
      return NextResponse.json({ error: `Groq Error: ${data.error?.message || JSON.stringify(data)}` }, { status: 500 });
    }

    return NextResponse.json({ summary: data.choices[0].message.content });

  } catch (e: any) {
    console.error("FINAL CATCH ERROR:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}