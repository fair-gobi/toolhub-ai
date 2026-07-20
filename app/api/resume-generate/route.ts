import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, location, linkedin, role, summary, skills, exp, education, projects, certs } = body;
  const apiKey = process.env.GROQ_API_KEY || process.env.GROK_API_KEY;

  const prompt = `Create a highly professional ATS-friendly resume with these details:
Name: ${name}
Role: ${role}
Email: ${email}
Phone: ${phone}
Location: ${location}
LinkedIn: ${linkedin}
Summary: ${summary}
Skills: ${skills}
Experience: ${exp}
Education: ${education} - Format education with Degree, University, Year, GPA/Honors if given.
Projects: ${projects}
Certifications: ${certs}

Structure:
1. Header (Name, Contact)
2. Professional Summary (3 lines)
3. Skills (Technical + Soft)
4. Work Experience (with bullet points, action verbs)
5. Education (detailed with university, year, achievements)
6. Projects
7. Certifications & Awards

Make it ATS optimized, no emojis, professional.`;

  if (!apiKey) return NextResponse.json({ result: prompt });

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5
    })
  });
  const data = await res.json();
  return NextResponse.json({ result: data.choices?.[0]?.message?.content || "Failed to generate" });
}