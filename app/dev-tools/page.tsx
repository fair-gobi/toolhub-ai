export default function DevToolsPage() {
  const tools = [
    { name: 'JSON Formatter', href: '/dev-tools/json-formatter', desc: 'Pretty print & validate JSON', icon: '{}' },
    { name: 'JSON Validator', href: '/dev-tools/json-validator', desc: 'Check JSON syntax', icon: '✓' },
    { name: 'XML Formatter', href: '/dev-tools/xml-formatter', desc: 'Indent XML beautifully', icon: '</>' },
    { name: 'XML Validator', href: '/dev-tools/xml-validator', desc: 'Validate XML structure', icon: '✓' },
    { name: 'HTML Formatter', href: '/dev-tools/html-formatter', desc: 'Clean up HTML', icon: '<>' },
    { name: 'CSS Minifier', href: '/dev-tools/css-minifier', desc: 'Shrink CSS files', icon: '🎨' },
    { name: 'JS Minifier', href: '/dev-tools/js-minifier', desc: 'Minify JavaScript', icon: '⚡' },
    { name: 'SQL Formatter', href: '/dev-tools/sql-formatter', desc: 'Format SQL queries', icon: '🗄️' },
    { name: 'Base64 Encoder', href: '/dev-tools/base64', desc: 'Encode & decode Base64', icon: '🔐' },
    { name: 'URL Encoder', href: '/dev-tools/url-encoder', desc: 'Encode URLs safely', icon: '🔗' },
    { name: 'JWT Decoder', href: '/dev-tools/jwt-decoder', desc: 'Decode JWT tokens', icon: '🎫' },
    { name: 'Hash Generator', href: '/dev-tools/hash-generator', desc: 'SHA-1, SHA-256, SHA-512', icon: '#' },
    { name: 'UUID Generator', href: '/dev-tools/uuid-generator', desc: 'Generate UUID v4', icon: '🆔' },
    { name: 'Regex Tester', href: '/dev-tools/regex-tester', desc: 'Test regular expressions', icon: '.*' },
    { name: 'Cron Generator', href: '/dev-tools/cron-generator', desc: 'Build cron expressions', icon: '⏰' },
    { name: 'API Tester', href: '/dev-tools/api-tester', desc: 'Test REST APIs', icon: '🚀' },
    { name: 'Header Checker', href: '/dev-tools/header-checker', desc: 'Check HTTP headers', icon: '📡' },
    { name: 'Markdown Editor', href: '/dev-tools/markdown-editor', desc: 'Live markdown preview', icon: '📝' },
    { name: 'Code Explainer', href: '/dev-tools/code-explainer', desc: 'Analyze code structure', icon: '💡' },
    { name: 'Code Optimizer', href: '/dev-tools/code-optimizer', desc: 'Minify & optimize', icon: '⚙️' },
    { name: 'SQL Generator', href: '/dev-tools/sql-generator', desc: 'Generate SQL queries', icon: '📊' },
    { name: 'Regex Generator', href: '/dev-tools/regex-generator', desc: 'Create regex patterns', icon: '🔍' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <span>💻</span> Developer Tools
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            22 Essential Dev Tools
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Free, fast, and private. All tools run in your browser — no data sent to servers.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl w-10 h-10 flex items-center justify-center bg-gray-100 group-hover:bg-blue-50 rounded-xl transition-colors">
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {tool.desc}
                  </p>
                </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            All tools work offline • No signup required
          </div>
        </div>
      </div>
    </div>
  )
}
