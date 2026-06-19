import Link from "next/link";

const imageTools = [
  { name: "BG Remover", href: "/bg-remover", desc: "Remove background 1-click", status: "live" },
  { name: "Image Upscaler", href: "/image-upscaler", desc: "AI 4x upscale", status: "live" },
  { name: "Photo Restorer", href: "/photo-restorer", desc: "Restore old photos", status: "live" },
  { name: "Image Compressor", href: "/image-compressor", desc: "Compress images", status: "soon" },
  { name: "Image Resizer", href: "/image-resizer", desc: "Resize to any dimension", status: "soon" },
  { name: "JPG to PNG", href: "/jpg-to-png", desc: "Convert JPG to PNG", status: "soon" },
  { name: "PNG to JPG", href: "/png-to-jpg", desc: "Convert PNG to JPG", status: "soon" },
  { name: "WEBP Converter", href: "/webp-converter", desc: "Convert to WEBP", status: "soon" },
  { name: "Image to PDF", href: "/image-to-pdf", desc: "Convert to PDF", status: "soon" },
];

export default function ImageToolsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline text-sm">← Back to all tools</Link>
          <h1 className="text-4xl font-bold mt-4 mb-2">🖼️ Image Tools</h1>
          <p className="text-gray-600">9 free tools to edit, convert and enhance images</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {imageTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-semibold text-lg group-hover:text-blue-600">{tool.name}</h2>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  tool.status === 'live' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {tool.status === 'live' ? 'Live' : 'Soon'}
                </span>
              </div>
              <p className="text-sm text-gray-500">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
