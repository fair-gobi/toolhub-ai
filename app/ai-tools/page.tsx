import Link from "next/link";

const tools = [
  { slug: "resume-builder", name: "AI Resume Builder", desc: "Create ATS resume in 30 sec", icon: "📄", color: "bg-green-500" },
  { slug: "cover-letter", name: "AI Cover Letter", desc: "Job-winning cover letters", icon: "✉️", color: "bg-green-500" },
  { slug: "code-generator", name: "AI Code Generator", desc: "Generate code in any language", icon: "💻", color: "bg-green-500" },
  { slug: "bug-finder", name: "AI Bug Finder", desc: "Find & fix bugs instantly", icon: "🐛", color: "bg-green-500" },
  { slug: "image-generator", name: "AI Image Generator", desc: "Text to image — unlimited free", icon: "🎨", color: "bg-green-500" },
  { slug: "video-generator", name: "AI Video Generator", desc: "Text to video — 100% free", icon: "🎬", color: "bg-green-500" },
];

export default function AIToolsPage(){
  return(
    <main className="max-w-6xl mx-auto p-6">
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold">Promptoolhub AI Tools</h1>
        <p className="text-gray-500 mt-2">6 Powerful AI Tools — All FREE</p>
        <div className="mt-4 inline-flex gap-2 bg-black text-white px-4 py-1.5 rounded-full text-sm">
          ✅ 6 Tools 
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-6">
        {tools.map(t=>(
          <Link key={t.slug} href={`/ai-tools/${t.slug}`} className="border rounded-2xl p-6 bg-white hover:shadow-xl hover:scale-[1.02] transition">
            <div className="flex justify-between items-start">
              <span className="text-4xl">{t.icon}</span>
              <span className={`text- px-2.5 py-1 rounded-full text-white font-bold ${t.color}`}></span>
            </div>
            <h3 className="font-bold text-lg mt-4">{t.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{t.desc}</p>
            <div className="mt-4 text-sm font-semibold"> →</div>
          </Link>
        ))}
      </div>
    </main>
  )
}