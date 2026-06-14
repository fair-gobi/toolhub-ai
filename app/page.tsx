import Link from "next/link";

const tools = [
  { name: "QR Generator", href: "/qr-generator", desc: "Create QR codes instantly" },
  { name: "Image Compressor", href: "/image-compressor", desc: "Compress images" },
  { name: "Image to PDF", href: "/image-to-pdf", desc: "Convert images to PDF" },
  { name: "PDF Merger", href: "/pdf-merger", desc: "Merge multiple PDFs" },
  { name: "PDF to Word", href: "/pdf-to-word", desc: "Extract text from PDF" },
  { name: "Nepali Date 🇳🇵", href: "/nepali-date", desc: "AD to BS converter" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">ToolHub</h1>
        <p className="text-gray-600 mb-8">Free online tools made in Nepal</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
              <h2 className="font-semibold text-lg">{tool.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
