import Link from "next/link";

const tools = [
  { name: "PDF Merger", href: "/pdf-tools/pdf-merger", desc: "Merge multiple PDFs"},
  { name: "PDF Split", href: "/pdf-tools/pdf-split", desc: "Split PDF into pages" },
  { name: "PDF Compress", href: "/pdf-tools/pdf-compress", desc: "Reduce PDF size" },
  { name: "PDF Extract", href: "/pdf-tools/pdf-extract", desc: "Extract pages" },
  { name: "PDF Meta", href: "/pdf-tools/pdf-meta", desc: "Edit metadata" },
  { name: "PDF to Word", href: "/pdf-tools/pdf-to-word", desc: "Convert to DOCX" },
  { name: "PDF Password Generator", href: "/pdf-tools/pdf-password-generator", desc: "Generate & lock PDF" },
  { name: "PDF Unlock", href: "/pdf-tools/pdf-unlock", desc: "Remove password from PDF"},
  { name: "PDF to Excel", href: "/pdf-tools/pdf-to-excel", desc: "Extract tables from PDF to editable Excel" },
  { name: "Excel to PDF", href: "/pdf-tools/excel-to-pdf", desc: "Convert Excel sheets to PDF" },
  { name: "PDF to PPT", href: "/pdf-tools/pdf-to-ppt", desc: "Convert PDF pages to PowerPoint slides" },
  { name: "PPT to PDF", href: "/pdf-tools/ppt-to-pdf", desc: "Convert PowerPoint presentation to PDF" },
  { name: "PDF OCR", href: "/pdf-tools/pdf-ocr", desc: "Extract text from scanned PDFs using OCR" },
  { name: "PDF Summarizer", href: "/pdf-tools/pdf-summarizer", desc: "Summarize long PDFs into key points" },
  { name: "PDF Question Answering", href: "/pdf-tools/pdf-qa", desc: "Ask questions and get answers from PDF" },
];
export default function PdfTools() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">PDF Tools</h1>
      <p className="text-gray-600 mb-8"> free tools to work with PDFs</p>
      <div className="grid md:grid-cols-2 gap-4">
        {tools.map(t => (
          <Link key={t.href} href={t.href} className="p-6 bg-white rounded-xl shadow hover:shadow-md border">
            <div className="flex justify-between">
              <h2 className="font-semibold">{t.name}</h2>
              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600"></span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{t.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
