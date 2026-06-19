import Link from "next/link";
const tools = [
  { name: "Prompt Generator", href: "/prompt-generator", desc: "Create perfect prompts", status: "soon" },
  { name: "YouTube Title Generator", href: "/yt-title", desc: "Viral title ideas", status: "soon" },
  { name: "YouTube Description", href: "/yt-description", desc: "SEO descriptions", status: "soon" },
  { name: "Blog Outline Generator", href: "/blog-outline", desc: "Article structures", status: "soon" },
  { name: "Hashtag Generator", href: "/hashtag-generator", desc: "Trending hashtags", status: "soon" },
  { name: "Caption Generator", href: "/caption-generator", desc: "Social captions", status: "soon" },
  { name: "Hook Generator", href: "/hook-generator", desc: "Attention hooks", status: "soon" },
  { name: "Text to Speech", href: "/tts", desc: "Convert text to audio", status: "soon" },
];
export default function AiTools() { return (
  <main className="max-w-4xl mx-auto p-8">
    <h1 className="text-3xl font-bold mb-2">AI Tools</h1>
    <p className="text-gray-600 mb-8">8 AI-powered generators</p>
    <div className="grid md:grid-cols-2 gap-4">{tools.map(t=>(
      <Link key={t.href} href={t.href} className="p-6 bg-white rounded-xl shadow border">
        <h2 className="font-semibold">{t.name}</h2><p className="text-sm text-gray-500">{t.desc}</p>
        <span className="text-xs px-2 py-1 bg-gray-100 rounded mt-2 inline-block">Soon</span>
      </Link>))}</div>
  </main>);}
