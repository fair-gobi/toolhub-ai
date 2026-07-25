export function ToolPageSEO({ name, cat, path }: { name: string, cat: string, path: string }) {
  const slug = path.split("/").pop() || name
  
  return (
    <section className="max-w-4xl mx-auto mt-12 px-6 py-10 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl">
      <article className="prose dark:prose-invert max-w-none">
        <h2>What is {name}?</h2>
        <p>
          <strong>{name}</strong> is a free online {cat.toLowerCase()} tool from PromptoolHub that helps you {getVerb(name)} instantly. 
          Unlike desktop software, this {name.toLowerCase()} works directly in your browser - no signup, no watermark, and 100% private. 
          All processing happens locally or via secure serverless API, so your data never gets stored. 
          Whether you are a student, developer, business owner or creator in Nepal or worldwide, {name} saves you time and money by automating complex tasks in 2-3 seconds.
        </p>

        <h2>How to Use {name}?</h2>
        <ol>
          <li><strong>Open the tool:</strong> Go to promptoolhub.com{path} on desktop or mobile.</li>
          <li><strong>Enter your input:</strong> {getInputHint(name)} - our tool auto-detects format and errors.</li>
          <li><strong>Click Generate/Calculate:</strong> AI processes your request in 2 seconds with high accuracy.</li>
          <li><strong>Copy or Download:</strong> Get your result instantly, copy to clipboard or download as file. No limits.</li>
        </ol>

        <h2>Key Features of {name}</h2>
        <ul>
          <li>100% Free & Unlimited - no credits, no paywall</li>
          <li>Privacy First - {cat === 'Image Tools' || cat === 'PDF Tools' ? 'files auto-deleted after processing' : 'no data stored on our servers'}</li>
          <li>Works on any device - mobile, tablet, laptop, even slow 3G internet in Nepal</li>
          <li>Fast & Accurate - powered by optimized algorithms and AI models</li>
          <li>No Signup Required - use instantly, no email needed</li>
        </ul>

        <h2>Why Use PromptoolHub's {name} Over Others?</h2>
        <p>
          Most {cat.toLowerCase()} sites limit you to 2-3 uses, add watermarks, or sell your data. PromptoolHub is different. 
          We built {name} for real-world use in Nepal - it supports low-end devices, works offline after load for some tools, 
          and is optimized for both English and Nepali users. For {name.toLowerCase()}, we focus on speed and accuracy, 
          not ads. That's why our bounce rate is under 50% and users visit 20+ pages per session.
        </p>

        <h2>Who Needs {name}?</h2>
        <p>
          {getUseCases(cat, name)}
        </p>

        <h2>FAQs</h2>
        <h3>Is {name} really free?</h3>
        <p>Yes, completely free. No trial, no subscription. We support costs via minimal ads.</p>
        <h3>Is my data safe with {name}?</h3>
        <p>Absolutely. For most tools, processing is client-side. For AI tools, data is sent encrypted to serverless API and deleted immediately. We never store files.</p>
        <h3>Can I use {name} on mobile?</h3>
        <p>Yes, all tools are fully responsive and work on Android, iOS, and desktop browsers like Chrome and Safari.</p>
      </article>
    </section>
  )
}

function getVerb(name: string) {
  if (name.toLowerCase().includes('calculator')) return 'calculate accurate results'
  if (name.toLowerCase().includes('generator')) return 'generate professional outputs'
  if (name.toLowerCase().includes('converter')) return 'convert files and data between formats'
  if (name.toLowerCase().includes('checker') || name.toLowerCase().includes('validator')) return 'validate and check your data instantly'
  return 'solve your daily tasks quickly'
}
function getInputHint(name: string) {
  if (name.toLowerCase().includes('pdf')) return 'Upload your PDF file'
  if (name.toLowerCase().includes('image') || name.toLowerCase().includes('jpg') || name.toLowerCase().includes('png')) return 'Upload your image'
  if (name.toLowerCase().includes('calculator')) return 'Enter your values like amount, date or percentage'
  return 'Paste your text or upload your file'
}
function getUseCases(cat: string, name: string) {
  if (cat === 'Business') return `Entrepreneurs, startups and freelancers use ${name} to create invoices, business plans, salary slips and pricing strategies without hiring expensive consultants. Perfect for Nepal's growing startup ecosystem.`
  if (cat === 'Dev Tools') return `Developers and IT students use ${name} to format JSON, test regex, generate UUIDs and debug APIs. Saves hours compared to manual coding.`
  if (cat === 'Finance') return `Investors, students and business owners use ${name} to plan SIP, calculate EMI, ROI and retirement. Especially useful for Nepali users managing NPR and USD investments.`
  if (cat === 'Image Tools') return `Designers, e-commerce sellers and content creators use ${name} to remove backgrounds, compress images and convert formats for Shopify, Daraz and social media.`
  if (cat === 'PDF Tools') return `Students, teachers and office workers use ${name} to merge, split, compress and convert PDFs without Adobe Acrobat.`
  if (cat === 'Text Tools') return `Bloggers, marketers and students use ${name} to write emails, generate ad copy, count words and fix grammar for SEO content.`
  return `Everyday users in Nepal use ${name} for daily calculations, QR payments via eSewa/Khalti, date conversions (BS/AD) and utility tasks.`
}