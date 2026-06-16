export async function POST(req: Request) {
  const token = process.env.HUGGINGFACE_TOKEN
  const file = await req.blob()

  const res = await fetch('https://api-inference.huggingface.co/models/NotAnotherTech/bg-removal', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: file
  })

  const text = await res.text()
  console.log('HF response:', res.status, text.slice(0,200))

  if (!res.ok) {
    return new Response(text, { 
      status: res.status,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // If it's image, return as blob
  return new Response(await res.blob(), {
    headers: { 'Content-Type': 'image/png' }
  })
}
