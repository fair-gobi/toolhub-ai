import Groq from 'groq-sdk'

export async function POST(req: Request) {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! })
    const body = await req.json()

    // support both old Name Generator and new prompt-based tools
    const { keyword, industry, prompt } = body

    const content = prompt ||
      `Generate 12 creative business names for a ${industry || 'general'} business about "${keyword}". Return only names, one per line, no numbers.`

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.9,
      max_tokens: 800,
    })

    const text = completion.choices[0]?.message?.content || ''

    // return both formats for compatibility
    const results = text.split('\n').map(l => l.replace(/^\d+\.\s*/, '').trim()).filter(Boolean)

    return Response.json({ text, results })
  } catch (err: any) {
    return Response.json({ text: err.message, results: [err.message] }, { status: 500 })
  }
}
