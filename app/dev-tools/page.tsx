export default function DevToolsPage() {
  const tools = [
    { name: "JSON Formatter", href: "/dev-tools/json-formatter", desc: "Pretty print & validate JSON" },
    { name: "JSON Validator", href: "/dev-tools/json-validator", desc: "Check JSON syntax" },
    { name: "XML Formatter", href: "/dev-tools/xml-formatter", desc: "Indent XML beautifully" },
    { name: "XML Validator", href: "/dev-tools/xml-validator", desc: "Validate XML structure" },
    { name: "HTML Formatter", href: "/dev-tools/html-formatter", desc: "Clean up HTML" },
    { name: "CSS Minifier", href: "/dev-tools/css-minifier", desc: "Shrink CSS files" },
    { name: "JS Minifier", href: "/dev-tools/js-minifier", desc: "Minify JavaScript" },
    { name: "SQL Formatter", href: "/dev-tools/sql-formatter", desc: "Format SQL queries" },
    { name: "Base64 Encoder", href: "/dev-tools/base64", desc: "Encode & decode Base64" },
    { name: "URL Encoder", href: "/dev-tools/url-encoder", desc: "Encode URLs safely" },
    { name: "JWT Decoder", href: "/dev-tools/jwt-decoder", desc: "Decode JWT tokens" },
    { name: "Hash Generator", href: "/dev-tools/hash-generator", desc: "SHA hashes" },
    { name: "UUID Generator", href: "/dev-tools/uuid-generator", desc: "Generate UUID v4" },
    { name: "Regex Tester", href: "/dev-tools/regex-tester", desc: "Test regular expressions" },
    { name: "Cron Generator", href: "/dev-tools/cron-generator", desc: "Build cron expressions" },
    { name: "API Tester", href: "/dev-tools/api-tester", desc: "Test REST APIs" },
    { name: "Header Checker", href: "/dev-tools/header-checker", desc: "Check HTTP headers" },
    { name: "Markdown Editor", href: "/dev-tools/markdown-editor", desc: "Live markdown preview" },
    { name: "Code Explainer", href: "/dev-tools/code-explainer", desc: "Analyze code" },
    { name: "Code Optimizer", href: "/dev-tools/code-optimizer", desc: "Minify code" },
    { name: "SQL Generator", href: "/dev-tools/sql-generator", desc: "Generate SQL" },
    { name: "Regex Generator", href: "/dev-tools/regex-generator", desc: "Create patterns" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Developer Tools</h1>
          <p className="text-gray-600">22 free tools that run in your browser</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <a key={tool.href} href={tool.href} className="block bg-white rounded-xl p-5 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">{tool.name}</h3>
              <p className="text-sm text-gray-600">{tool.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
