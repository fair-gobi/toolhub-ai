import Link from "next/link";

const tools = [
  { name: "Image to PDF", href: "/image-to-pdf", desc: "Convert images to PDF", status: "soon" },
  { name: "PDF Merger", href: "/pdf-merger", desc: "Merge multiple PDFs", status: "soon" },
  { name: "PDF to Word", href: "/pdf-to-word", desc: "Extract text from PDF", status: "soon" },
  { name: "PDF Split", href: "/pdf-split", desc: "Split into pages", status: "soon" },
  { name: "PDF Extract", href: "/pdf-extract", desc: "Extract pages", status: "soon" },
  { name: "PDF Password", href: "/pdf-password", desc: "Lock/Unlock PDF", status: "soon" },
  { name: "PDF Metadata", href: "/pdf-meta", desc: "View PDF info", status: "soon" },
  { name: "PDF Compress", href: "/pdf-compress", desc: "Reduce PDF size", status: "soon" },
];

export default function PdfTools() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">PDF Tools</h1>
      <p className="text-gray-600 mb-8">8 free tools to work with PDFs</p>
      <div className="grid md:grid-cols-2 gap-4">
        {tools.map(t => (
          <Link key={t.href} href={t.href} className="p-6 bg-white rounded-xl shadow hover:shadow-md border">
            <div className="flex justify-between">
              <h2 className="font-semibold">{t.name}</h2>
              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">Soon</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{t.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
