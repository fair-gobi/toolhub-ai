import Groq from 'groq-sdk'

export async function POST(req: Request) {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! })
    const { keyword, industry } = await req.json()

    const completion = await groq.chat.completions.create({
      messages: [{
        role: 'user',
        content: `Generate 12 creative business names for a ${industry || 'general'} business about "${keyword}". Return only names, one per line, no numbers.`
      }],
      model: 'llama-3.1-8b-instant', // <-- updated
      temperature: 0.9,
      max_tokens: 250,
    })

    const text = completion.choices[0]?.message?.content || ''
    const results = text.split('\n')
     .map(l => l.replace(/^\d+\.\s*/, '').trim())
     .filter(Boolean)

    return Response.json({ results })
  } catch (err: any) {
    return Response.json({ results: [err.message] }, { status: 500 })
  }
}