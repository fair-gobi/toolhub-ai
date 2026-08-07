import { sql } from '@/lib/db'
import Link from "next/link"

type Props = { name?: string; cat?: string; path: string; slug?: string }

const RELATED: Record<string, { name: string; path: string }[]> = {
  "Business": [
    { name: "Invoice Generator", path: "/business/invoice-generator" },
    { name: "Business Plan Generator", path: "/business/business-plan-generator" },
    { name: "Salary Slip Generator", path: "/business/salary-slip-generator" },
    { name: "Business Name Generator", path: "/business/business-name-generator" },
    { name: "Profit Margin Calculator", path: "/finance/profit-margin-calculator" },
    { name: "QR Code Generator", path: "/utility/qr-code-generator" },
  ],
  "Finance": [
    { name: "SIP Calculator", path: "/finance/sip-calculator" },
    { name: "EMI Calculator", path: "/finance/emi-calculator" },
    { name: "GST Calculator", path: "/finance/gst-calculator" },
    { name: "Retirement Calculator", path: "/finance/retirement-calculator" },
    { name: "Percentage Calculator", path: "/utility/percentage-calculator" },
    { name: "Age Calculator", path: "/utility/age-calculator" },
  ],
  "Utility": [
    { name: "Age Calculator", path: "/utility/age-calculator" },
    { name: "BMI Calculator", path: "/utility/bmi-calculator" },
    { name: "Percentage Calculator", path: "/utility/percentage-calculator" },
    { name: "Nepali Date Converter", path: "/utility/nepali-date-converter" },
    { name: "QR Code Generator", path: "/utility/qr-code-generator" },
    { name: "Unit Converter", path: "/utility/unit-converter" },
  ],
  "Image Tools": [
    { name: "Background Remover", path: "/image-tools/background-remover" },
    { name: "Image Compressor", path: "/image-tools/image-compressor" },
    { name: "Image to PDF", path: "/image-tools/image-to-pdf" },
    { name: "Resize Image", path: "/image-tools/resize-image" },
    { name: "JPG to PNG", path: "/image-tools/jpg-to-png" },
    { name: "Image to Text", path: "/image-tools/image-to-text" },
  ],
  "PDF Tools": [
    { name: "Merge PDF", path: "/pdf-tools/merge-pdf" },
    { name: "Split PDF", path: "/pdf-tools/split-pdf" },
    { name: "Compress PDF", path: "/pdf-tools/compress-pdf" },
    { name: "PDF to Word", path: "/pdf-tools/pdf-to-word" },
    { name: "Word to PDF", path: "/pdf-tools/word-to-pdf" },
    { name: "PPT to PDF", path: "/pdf-tools/ppt-to-pdf" },
  ],
  "Dev Tools": [
    { name: "JSON Formatter", path: "/dev-tools/json-formatter" },
    { name: "Base64 Encoder", path: "/dev-tools/base64-encoder" },
    { name: "UUID Generator", path: "/dev-tools/uuid-generator" },
    { name: "Regex Tester", path: "/dev-tools/regex-tester" },
    { name: "HTML Minifier", path: "/dev-tools/html-minifier" },
    { name: "Password Generator", path: "/utility/password-generator" },
  ],
  "Text Tools": [
    { name: "Word Counter", path: "/text-tools/word-counter" },
    { name: "AI Writer", path: "/ai/ai-writer" },
    { name: "Paraphraser", path: "/ai/paraphraser" },
    { name: "Grammar Checker", path: "/text-tools/grammar-checker" },
    { name: "Case Converter", path: "/text-tools/case-converter" },
    { name: "Plagiarism Checker", path: "/text-tools/plagiarism-checker" },
  ],
  "AI": [
    { name: "AI Writer", path: "/ai/ai-writer" },
    { name: "Paraphraser", path: "/ai/paraphraser" },
    { name: "Image Generator", path: "/ai/image-generator" },
    { name: "Resume Builder", path: "/ai/resume-builder" },
    { name: "Prompt Generator", path: "/ai/prompt-generator" },
    { name: "Text to Speech", path: "/ai/text-to-speech" },
  ],
}

function getVerb(name: string) {
  if (name.toLowerCase().includes('calculator')) return 'calculate accurate results'
  if (name.toLowerCase().includes('generator')) return 'generate professional outputs'
  if (name.toLowerCase().includes('converter')) return 'convert formats'
  return 'solve your tasks quickly'
}
function getInputHint(name: string) {
  if (name.toLowerCase().includes('pdf')) return 'Upload PDF'
  if (name.toLowerCase().includes('image')) return 'Upload image'
  return 'Enter your data'
}

export async function ToolPageSEO({ name: propName, cat: propCat, path, slug }: Props) {
  const effectiveSlug = slug || path.split('/').filter(Boolean).pop() || ''

  // AUTO FETCH FROM DB - 114 articles
  let article: any = null
  try {
    const rows = await sql`SELECT * FROM tool_articles WHERE slug=${effectiveSlug} LIMIT 1`
    article = rows[0] || null
  } catch {}

  const name = article?.tool_name || propName || effectiveSlug
  const cat = propCat || article?.category || 'Utility'
  const intro = article?.intro as string | undefined
  const steps = article?.steps as string[] | undefined
  const logic = article?.logic as string | undefined
  const features = article?.features as string[] | undefined

  const faqs = [
    { q: `Is ${name} free to use?`, a: `Yes, ${name} from PromptoolHub is 100% free and unlimited. No signup, no watermark, no credit limits.` },
    { q: `Is my data safe with ${name}?`, a: `Absolutely. Processing happens in browser or secure serverless API and auto-deleted. We never store your files.` },
    { q: `Can I use ${name} on mobile in Nepal?`, a: `${name} works on Android, iOS, laptop, even slow 3G in Nepal.` },
    { q: `How accurate is ${name}?`, a: `${name} uses optimized algorithms tested for high accuracy and edge cases.` },
  ]

  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) }
  const softwareSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": name, "applicationCategory": `${cat}Application`, "operatingSystem": "Web", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "url": `https://www.promptoolhub.com${path}`, "description": intro?.slice(0,160) || `${name} - free ${cat} tool`, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1250" } }
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.promptoolhub.com" }, { "@type": "ListItem", "position": 2, "name": cat, "item": `https://www.promptoolhub.com/${cat.toLowerCase().replace(' ', '-')}` }, { "@type": "ListItem", "position": 3, "name": name, "item": `https://www.promptoolhub.com${path}` }] }

  const related = (RELATED[cat] || RELATED["Utility"]).filter(t => t.path!== path).slice(0, 6)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="max-w-4xl mx-auto mt-12 px-6 py-10 bg-white dark:bg-gray-900 border rounded-2xl">
        <article className="prose dark:prose-invert max-w-none">
          <h2>What is {name}?</h2>
          <p>{intro || <><strong>{name}</strong> is a free online {cat.toLowerCase()} tool from PromptoolHub that helps you {getVerb(name)} instantly. No signup, private, fast.</>}</p>

          <h2>How to Use {name}?</h2>
          {steps && steps.length > 0? (
            <ol>{steps.map((s,i)=><li key={i}>{s}</li>)}</ol>
          ) : (
            <ol>
              <li>Open promptoolhub.com{path}</li>
              <li>Enter your input - {getInputHint(name)}</li>
              <li>Click Generate</li>
              <li>Copy or Download instantly</li>
            </ol>
          )}

          {logic && (<><h2>How {name} Works?</h2><p>{logic}</p></>)}

          <h2>Key Features</h2>
          {features && features.length>0? <ul>{features.map((f,i)=><li key={i}>{f}</li>)}</ul> : <ul><li>100% Free & Unlimited</li><li>Privacy First - auto-deleted</li><li>Works on mobile & low-end devices</li><li>Fast & Accurate</li><li>No Signup</li></ul>}

          <h2>FAQs - {name}</h2>
          {faqs.map((f,i) => <div key={i} className="mb-3"><h3 className="font-semibold">{f.q}</h3><p>{f.a}</p></div>)}
        </article>

        <div className="mt-8 p-5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl text-white">
          <h3 className="font-bold text-lg">🚀 Need AI Prompts for {name}?</h3>
          <p className="text-sm mt-1 text-violet-100">Get 1500+ ready-to-use ChatGPT, Claude & Midjourney prompts for {cat.toLowerCase()}, business, marketing, social media, image, video prompts & more.</p>
          <a href="https://www.promptoolhub.com/prompts" className="inline-block mt-3 bg-white text-violet-700 px-5 py-2 rounded-full font-semibold text-sm">Explore Prompt Library →</a>
        </div>

        <div className="mt-10 pt-8 border-t">
          <h3 className="text-xl font-bold mb-4">Related {cat} Tools</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {related.map(t => (
              <Link key={t.path} href={t.path} className="p-4 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <span className="font-medium">{t.name}</span>
                <span className="block text-xs text-gray-500">Free • No signup</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}