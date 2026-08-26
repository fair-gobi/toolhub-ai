import Link from "next/link"

type Tool = {
  slug: string
  name: string
  desc: string
  category: string
  pricing: string
  url: string
  rating: number
}

const TOOLS: Tool[] = [
  { slug: "runway", name: "Runway ML", desc: "Turn text into cinematic videos Gen-3", category: "video", pricing: "Freemium", url: "https://runwayml.com", rating: 4.8 },
  { slug: "pika", name: "Pika Labs", desc: "AI video from text and image", category: "video", pricing: "Free", url: "https://pika.art", rating: 4.7 },
  { slug: "sora", name: "Sora by OpenAI", desc: "Text-to-video realistic scenes", category: "video", pricing: "Paid", url: "https://openai.com/sora", rating: 4.9 },
  { slug: "kling", name: "Kling AI", desc: "High-fidelity video for YouTube", category: "video", pricing: "Freemium", url: "https://kling.kuaishou.com", rating: 4.7 },
  { slug: "luma", name: "Luma Dream Machine", desc: "Realistic video from text", category: "video", pricing: "Freemium", url: "https://lumalabs.ai", rating: 4.8 },
  { slug: "heygen", name: "HeyGen", desc: "AI avatar video generator", category: "video", pricing: "Freemium", url: "https://www.heygen.com", rating: 4.6 },
  { slug: "synthesia", name: "Synthesia", desc: "Create AI videos with 160+ avatars", category: "video", pricing: "Paid", url: "https://www.synthesia.io", rating: 4.7 },
  { slug: "midjourney", name: "Midjourney", desc: "Best AI art stunning realism", category: "image", pricing: "Paid", url: "https://www.midjourney.com", rating: 4.9 },
  { slug: "leonardo-ai", name: "Leonardo AI", desc: "Game & art assets quality", category: "image", pricing: "Freemium", url: "https://leonardo.ai", rating: 4.7 },
  { slug: "firefly", name: "Adobe Firefly", desc: "Commercial-safe image gen", category: "image", pricing: "Freemium", url: "https://firefly.adobe.com", rating: 4.6 },
  { slug: "ideogram", name: "Ideogram", desc: "Perfect text in image AI", category: "image", pricing: "Free", url: "https://ideogram.ai", rating: 4.7 },
  { slug: "remove-bg", name: "Remove.bg", desc: "Remove BG in 5 seconds", category: "image-editing", pricing: "Freemium", url: "https://www.remove.bg", rating: 4.8 },
  { slug: "photoroom", name: "PhotoRoom", desc: "BG remover product photos", category: "image-editing", pricing: "Freemium", url: "https://www.photoroom.com", rating: 4.7 },
  { slug: "suno", name: "Suno AI", desc: "Full songs with vocals from text", category: "audio", pricing: "Freemium", url: "https://suno.com", rating: 4.9 },
  { slug: "elevenlabs", name: "ElevenLabs", desc: "Best text-to-speech & cloning", category: "audio", pricing: "Freemium", url: "https://elevenlabs.io", rating: 4.9 },
]

const SLUG_MAP: Record<string, string> = {
  "video-generators": "video",
  "video": "video",
  "image-generators": "image",
  "image": "image",
  "image-editing-tools": "image-editing",
  "image-editing": "image-editing",
  "audio-tools": "audio",
  "audio": "audio",
  "business-tools": "business",
  "business": "business",
  "productivity-tools": "productivity",
  "productivity": "productivity",
}

const SEO: Record<string, { title: string; h1: string; desc: string }> = {
  "video": { title: "50 Best AI Video Generators (2026)", h1: "AI Video Generators", desc: "Best AI video generators: Runway, Sora, Pika, Kling & more. 1-click access." },
  "image": { title: "50 Best AI Image Generators (2026)", h1: "AI Image Generators", desc: "Top AI image generators: Midjourney, DALL-E 3, Leonardo, Flux, Firefly." },
  "image-editing": { title: "20 Best AI Photo Editors", h1: "AI Image Editing Tools", desc: "Best AI photo editing: Remove.bg, PhotoRoom, Magnific, Topaz." },
  "audio": { title: "20 Best AI Audio Tools", h1: "AI Audio & Music Tools", desc: "Best AI audio: Suno for music, ElevenLabs for voice cloning." },
  "business": { title: "10 Best AI Business Tools", h1: "AI Business Tools", desc: "Top AI business tools: Jasper, Copy.ai, Gamma, Tome." },
  "productivity": { title: "10 Best AI Productivity Tools", h1: "AI Productivity Tools", desc: "Best AI productivity: Notion AI, Motion, Taskade, Grammarly." },
}

export function generateStaticParams() {
  return Object.keys(SLUG_MAP).map((category) => ({ category }))
}

export async function generateMetadata({ params }: { params: { category: string } }) {
  const catKey = SLUG_MAP[params.category] || params.category
  const seo = SEO[catKey]
  if (!seo) return { title: "AI Tools | Promptoolhub" }
  return { title: seo.title, description: seo.desc }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const catKey = SLUG_MAP[params.category] || params.category
  const seo = SEO[catKey]
  const tools = TOOLS.filter((t) => t.category === catKey)

  if (!seo) {
    return <div style={{padding:40}}>Category not found. <Link href="/ai-tools">Back</Link></div>
  }

  return (
    <>
      <div style={{padding:'30px 0', borderBottom:'1px solid #D2D6CC', background:'#FCFDFB'}}>
        <div style={{maxWidth:1180, margin:'0 auto', padding:'0 24px'}}>
          <div style={{fontSize:'.85rem', color:'#52585A'}}><Link href="/">Home</Link> / <Link href="/ai-tools">AI Tools</Link> / {seo.h1}</div>
          <h1 style={{fontSize:'2rem', fontWeight:700, marginTop:8}}>{seo.h1}</h1>
          <p style={{color:'#52585A', marginTop:6}}>{seo.desc} All tools open in 1 click.</p>
        </div>
      </div>
      <div style={{maxWidth:1180, margin:'0 auto', padding:'24px'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))', gap:14}}>
          {tools.map((t) => (
            <a key={t.slug} href={t.url} target="_blank" style={{background:'#FCFDFB', border:'1px solid #D2D6CC', borderRadius:10, padding:15, textDecoration:'none', color:'inherit'}}>
              <div style={{fontWeight:600}}>{t.name} ★ {t.rating}</div>
              <div style={{fontSize:'.85rem', color:'#52585A', marginTop:4}}>{t.desc}</div>
              <div style={{marginTop:8, background:'#14181A', color:'white', padding:'6px 10px', borderRadius:6, textAlign:'center', fontSize:'.8rem'}}>Use Tool →</div>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}