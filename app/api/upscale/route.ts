export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const file = await req.blob()
    const fd = new FormData()
    fd.append('image_file', file, 'image.jpg')
    fd.append('scale', '4')
    
    const res = await fetch('https://api.deepai.org/api/torch-srgan', {
      method: 'POST',
      headers: { 'api-key': 'quickstart-QUdJIGlzIGNvbWluZy4uLi4K' },
      body: fd
    })

    const data = await res.json()
    const imgRes = await fetch(data.output_url)
    const blob = await imgRes.blob()
    
    return new Response(blob, { headers: { 'Content-Type': 'image/png' } })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}