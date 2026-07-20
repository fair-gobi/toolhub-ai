export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const file = await req.blob()
    
    const fd = new FormData()
    fd.append('image_file', file, 'image.jpg')
    fd.append('size', 'auto')
    
    const res = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': 'E8KzhmJwNZnEAYjJGqgLLFKC'
      },
      body: fd
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Remove.bg error:', err)
      return new Response(JSON.stringify({ error: err }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const blob = await res.blob()
    return new Response(blob, {
      headers: { 
        'Content-Type': 'image/png',
        'Cache-Control': 'no-store'
      }
    })
  } catch (e: any) {
    console.error('Crash:', e)
    return new Response(JSON.stringify({ error: e.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
