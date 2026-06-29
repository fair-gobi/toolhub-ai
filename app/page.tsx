"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Search, Sun, Moon } from "lucide-react"

const categories = [
  { icon: "💡", name: "Prompt Library", count: "500+ prompts", desc: "ChatGPT, Claude, Gemini prompts", soon: true },
  { icon: "🤖", name: "AI Tools", count: "8 tools", desc: "Generators & AI utilities", soon: true },
  { icon: "📄", name: "PDF Tools", count: "8 tools", desc: "Merge, split, compress", soon: true },
  { icon: "🖼", name: "Image Tools", count: "9 tools", desc: "Edit, convert, enhance", soon: true },
  { icon: "💻", name: "Developer Tools", count: "22 tools", desc: "JSON, Base64, formatters", href: "/dev-tools" },
  { icon: "📝", name: "Text Tools", count: "16 tools", desc: "Grammar, paraphrase, summarize", href: "/text-tools" },
  { icon: "💼", name: "Business Tools", count: "17 tools", desc: "Name generator, invoices & more", href: "/business" },
  { icon: "💰", name: "Finance Tools", count: "16 tools", desc: "SIP, crypto, loans, EMI, ROI", href: "/finance" },
  { icon: "🔧", name: "Utility Tools", count: "15 tools", desc: "Nepali tools & more", href: "/utility" },
]

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Dark mode toggle with localStorage
  useEffect(() => {
    const isDark = localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDarkMode(isDark)
    if (isDark) document.documentElement.classList.add('dark')
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    if (newMode) {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      
      {/* TOP STICKY HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold hidden sm:block">
                Promptool<span className="text-blue-600">Hub</span>
              </span>
            </Link>

            {/* Centered Search */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="search" 
                  placeholder="Search for tools..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 border border-transparent rounded-xl focus:bg-white dark:focus:bg-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="flex-shrink-0 p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto flex">
        
        {/* PERSISTENT LEFT SIDEBAR - Desktop only */}
        <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
          <nav className="p-4 space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Categories
            </p>
            
            {categories.map((cat) => {
              const isActive = cat.href === "/dev-tools" // Example active state
              return cat.href && !cat.soon ? (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ) : (
                <div
                  key={cat.name}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 dark:text-gray-600 cursor-not-allowed"
                >
                  <span className="text-xl opacity-50">{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded">Soon</span>
                </div>
              )
            })}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3">
              Free tools that work in your browser
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No signup. No uploads. 100% private.
            </p>
          </div>

          {/* DYNAMIC GRID: grid-cols-1 md:grid-cols-3 gap-6 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCategories.map((cat) => {
              const Card = (
                <div className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all ${cat.soon ? 'opacity-60' : ''}`}>
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{cat.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{cat.name}</h3>
                          {cat.soon && (
                            <span className="text-xs bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded">Soon</span>
                          )}
                        </div>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          {cat.count}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {cat.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )

              return cat.href && !cat.soon ? (
                <Link key={cat.name} href={cat.href}>{Card}</Link>
              ) : (
                <div key={cat.name}>{Card}</div>
              )
            })}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No tools found for "{searchQuery}"
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
