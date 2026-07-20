import Link from "next/link";

const imageTools = [
  { name: "BG Remover", href: "/image-tools/bg-remover", desc: "Remove background 1-click" },
  { name: "Image Upscaler", href: "/image-tools/image-upscaler", desc: "AI 4x upscale" },
  { name: "Photo Restorer", href: "/image-tools/photo-restorer", desc: "Restore old photos" },
  { name: "Image Compressor", href: "/image-tools/image-compressor", desc: "Compress images" },
  { name: "Image Resizer", href: "/image-tools/image-resizer", desc: "Resize to any dimension" },
  { name: "JPG to PNG", href: "/image-tools/jpg-to-png", desc: "Convert JPG to PNG" },
  { name: "PNG to JPG", href: "/image-tools/png-to-jpg", desc: "Convert PNG to JPG" },
  { name: "WEBP Converter", href: "/image-tools/webp-converter", desc: "Convert to/from WEBP" },
  { name: "Image to PDF", href: "/image-tools/image-to-pdf", desc: "Convert images to PDF" },
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {imageTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-semibold text-lg group-hover:text-blue-600">{tool.name}</h2>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium $ 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-amber-100 text-amber-700'
                }`}>
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
