import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! })

// Simple in-memory rate limiter (30 requests per 60 seconds)
let requests: number[] = []

function isRateLimited(): boolean {
  const now = Date.now()
  // keep only requests from last 60 seconds
  requests = requests.filter(t => now - t < 60000)

  if (requests.length >= 28) { // leave 2 buffer
    return true
  }
  requests.push(now)
  return false
}

export async function POST(req: NextRequest) {
  try {
    // Check rate limit
    if (isRateLimited()) {
      // wait 2 seconds and retry once
      await new Promise(r => setTimeout(r, 2000))
      if (isRateLimited()) {
        return NextResponse.json(
          { error: 'Too many requests, please wait 3 seconds' },
          { status: 429 }
        )
      }
    }

    const { prompt } = await req.json()

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 1000,
    })

    const text = completion.choices[0]?.message?.content || ''

    return NextResponse.json({ text })

  } catch (error: any) {
    console.error('Groq error:', error)
    return NextResponse.json(
      { error: 'Generation failed, try again' },
      { status: 500 }
    )
  }
}
