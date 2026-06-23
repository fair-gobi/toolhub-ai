import Link from 'next/link'

const tools = [
  { name: 'Nepali Date Converter', desc: 'BS ↔ AD calendar', href: '/date-converter', icon: '📅' },
  { name: 'GPA Calculator', desc: 'TU/PU CGPA calculator', href: '/gpa-calculator', icon: '📊' },
  { name: 'QR Generator', desc: 'Custom QR codes', href: '/qr-generator', icon: '🔲' },
  { name: 'Payment QR', desc: 'eSewa/Khalti QR', href: '/payment-qr', icon: '💳' },
  { name: 'Age Calculator', desc: 'Exact age in years/months', href: '/age-calculator', icon: '🎂' },
  { name: 'Percentage Calculator', desc: 'X% of Y, % change', href: '/percentage-calculator', icon: '📈' },
  { name: 'BMI Calculator', desc: 'Body mass index', href: '/bmi-calculator', icon: '⚖️' },
  { name: 'Currency Converter', desc: 'Live exchange rates', href: '/currency-converter', icon: '💱' },
  { name: 'Unit Converter', desc: 'Length, weight, temp', href: '/unit-converter', icon: '📏' },
  { name: 'YouTube Thumbnail', desc: 'Download HD thumbnails', href: '/youtube-thumbnail', icon: '🖼️' },
]

export default function Utility() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">🔧 Utility Tools</h1>
          <p className="text-gray-600">10 free tools • No signup • Works offline</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(tool => (
            <Link key={tool.href} href={tool.href} className="bg-white p-5 rounded-xl border hover:shadow-md hover:border-blue-300 transition">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{tool.icon}</div>
                <div>
                  <h3 className="font-semibold mb-1">{tool.name}</h3>
                  <p className="text-sm text-gray-600">{tool.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
