export default function DevToolsPage() {
  const tools = [
    { name: 'JSON Formatter', href: '/dev-tools/json-formatter', desc: 'Pretty print JSON' },
    { name: 'JSON Validator', href: '/dev-tools/json-validator', desc: 'Check syntax' },
    { name: 'XML Formatter', href: '/dev-tools/xml-formatter', desc: 'Indent XML' },
    { name: 'XML Validator', href: '/dev-tools/xml-validator', desc: 'Well-formed check' },
    { name: 'HTML Formatter', href: '/dev-tools/html-formatter', desc: 'Clean HTML' },
    { name: 'CSS Minifier', href: '/dev-tools/css-minifier', desc: 'Shrink CSS' },
    { name: 'JS Minifier', href: '/dev-tools/js-minifier', desc: 'Remove whitespace' },
    { name: 'SQL Formatter', href: '/dev-tools/sql-formatter', desc: 'Format queries' },
  ]

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Developer Tools</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <a
            key={tool.href}
            href={tool.href}
            className="block border rounded-xl p-5 hover:border-blue-500 hover:shadow-sm"
          >
            <div className="font-semibold text-gray-900">{tool.name}</div>
            <div className="text-sm text-gray-600 mt-1">{tool.desc}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
