const fs = require('fs');
const path = require('path');

const ALL_TOOLS = [
  { path: "/ai-tools/bug-finder", name: "Bug Finder", cat: "AI Tools" },
  { path: "/ai-tools/code-generator", name: "Code Generator", cat: "AI Tools" },
  { path: "/ai-tools/cover-letter-generator", name: "Cover Letter Generator", cat: "AI Tools" },
  { path: "/ai-tools/image-generator", name: "Image Generator", cat: "AI Tools" },
  { path: "/ai-tools/resume-builder", name: "Resume Builder", cat: "AI Tools" },
  { path: "/ai-tools/video-generator", name: "Video Generator", cat: "AI Tools" },
  { path: "/business/business-plan-generator", name: "Business Plan Generator", cat: "Business" },
  { path: "/business/cac-calculator", name: "CAC Calculator", cat: "Business" },
  { path: "/business/invoice-generator", name: "Invoice Generator", cat: "Business" },
  { path: "/business/lead-value-calculator", name: "Lead Value Calculator", cat: "Business" },
  { path: "/business/ltv-calculator", name: "LTV Calculator", cat: "Business" },
  { path: "/business/name-generator", name: "Business Name Generator", cat: "Business" },
  { path: "/business/offer-letter", name: "Offer Letter Generator", cat: "Business" },
  { path: "/business/pricing-calculator", name: "Pricing Calculator", cat: "Business" },
  { path: "/business/profit-calculator", name: "Profit Calculator", cat: "Business" },
  { path: "/business/quotation-generator", name: "Quotation Generator", cat: "Business" },
  { path: "/business/resignation-letter", name: "Resignation Letter Generator", cat: "Business" },
  { path: "/business/salary-calculator", name: "Salary Calculator", cat: "Business" },
  { path: "/business/sales-forecast", name: "Sales Forecast", cat: "Business" },
  { path: "/business/slogan-generator", name: "Slogan Generator", cat: "Business" },
  { path: "/business/startup-ideas", name: "Startup Ideas Generator", cat: "Business" },
  { path: "/business/usp-generator", name: "USP Generator", cat: "Business" },
  { path: "/dev-tools/api-tester", name: "API Tester", cat: "Dev Tools" },
  { path: "/dev-tools/base64", name: "Base64 Encoder Decoder", cat: "Dev Tools" },
  { path: "/dev-tools/code-explainer", name: "Code Explainer", cat: "Dev Tools" },
  { path: "/dev-tools/code-optimizer", name: "Code Optimizer", cat: "Dev Tools" },
  { path: "/dev-tools/cron-generator", name: "Cron Generator", cat: "Dev Tools" },
  { path: "/dev-tools/css-minifier", name: "CSS Minifier", cat: "Dev Tools" },
  { path: "/dev-tools/hash-generator", name: "Hash Generator", cat: "Dev Tools" },
  { path: "/dev-tools/header-checker", name: "Header Checker", cat: "Dev Tools" },
  { path: "/dev-tools/html-formatter", name: "HTML Formatter", cat: "Dev Tools" },
  { path: "/dev-tools/js-minifier", name: "JS Minifier", cat: "Dev Tools" },
  { path: "/dev-tools/json-formatter", name: "JSON Formatter", cat: "Dev Tools" },
  { path: "/dev-tools/json-validator", name: "JSON Validator", cat: "Dev Tools" },
  { path: "/dev-tools/jwt-decoder", name: "JWT Decoder", cat: "Dev Tools" },
  { path: "/dev-tools/markdown-editor", name: "Markdown Editor", cat: "Dev Tools" },
  { path: "/dev-tools/regex-generator", name: "Regex Generator", cat: "Dev Tools" },
  { path: "/dev-tools/regex-tester", name: "Regex Tester", cat: "Dev Tools" },
  { path: "/dev-tools/sql-formatter", name: "SQL Formatter", cat: "Dev Tools" },
  { path: "/dev-tools/sql-generator", name: "SQL Generator", cat: "Dev Tools" },
  { path: "/dev-tools/url-encoder", name: "URL Encoder Decoder", cat: "Dev Tools" },
  { path: "/dev-tools/uuid-generator", name: "UUID Generator", cat: "Dev Tools" },
  { path: "/dev-tools/xml-formatter", name: "XML Formatter", cat: "Dev Tools" },
  { path: "/dev-tools/xml-validator", name: "XML Validator", cat: "Dev Tools" },
  { path: "/finance/break-even", name: "Break Even Calculator", cat: "Finance" },
  { path: "/finance/cash-flow", name: "Cash Flow Calculator", cat: "Finance" },
  { path: "/finance/compound-interest", name: "Compound Interest Calculator", cat: "Finance" },
  { path: "/finance/crypto-profit", name: "Crypto Profit Calculator", cat: "Finance" },
  { path: "/finance/dca-calculator", name: "DCA Calculator", cat: "Finance" },
  { path: "/finance/fire", name: "FIRE Calculator", cat: "Finance" },
  { path: "/finance/inflation", name: "Inflation Calculator", cat: "Finance" },
  { path: "/finance/investment-return", name: "Investment Return Calculator", cat: "Finance" },
  { path: "/finance/loan-emi", name: "Loan EMI Calculator", cat: "Finance" },
  { path: "/finance/mining-profit", name: "Mining Profit Calculator", cat: "Finance" },
  { path: "/finance/profit-margin", name: "Profit Margin Calculator", cat: "Finance" },
  { path: "/finance/retirement", name: "Retirement Calculator", cat: "Finance" },
  { path: "/finance/roi-calculator", name: "ROI Calculator", cat: "Finance" },
  { path: "/finance/savings-goal", name: "Savings Goal Calculator", cat: "Finance" },
  { path: "/finance/sip-calculator", name: "SIP Calculator", cat: "Finance" },
  { path: "/finance/startup-runway", name: "Startup Runway Calculator", cat: "Finance" },
  { path: "/image-tools/bg-remover", name: "Background Remover", cat: "Image Tools" },
  { path: "/image-tools/image-compressor", name: "Image Compressor", cat: "Image Tools" },
  { path: "/image-tools/image-resizer", name: "Image Resizer", cat: "Image Tools" },
  { path: "/image-tools/image-to-pdf", name: "Image to PDF", cat: "Image Tools" },
  { path: "/image-tools/image-upscaler", name: "Image Upscaler", cat: "Image Tools" },
  { path: "/image-tools/jpg-to-png", name: "JPG to PNG", cat: "Image Tools" },
  { path: "/image-tools/photo-restorer", name: "Photo Restorer", cat: "Image Tools" },
  { path: "/image-tools/png-to-jpg", name: "PNG to JPG", cat: "Image Tools" },
  { path: "/image-tools/webp-converter", name: "WebP Converter", cat: "Image Tools" },
  { path: "/pdf-tools/excel-to-pdf", name: "Excel to PDF", cat: "PDF Tools" },
  { path: "/pdf-tools/pdf-compress", name: "PDF Compress", cat: "PDF Tools" },
  { path: "/pdf-tools/pdf-extract", name: "PDF Extract", cat: "PDF Tools" },
  { path: "/pdf-tools/pdf-merger", name: "PDF Merger", cat: "PDF Tools" },
  { path: "/pdf-tools/pdf-meta", name: "PDF Metadata Viewer", cat: "PDF Tools" },
  { path: "/pdf-tools/pdf-ocr", name: "PDF OCR", cat: "PDF Tools" },
  { path: "/pdf-tools/pdf-password-generator", name: "PDF Password Generator", cat: "PDF Tools" },
  { path: "/pdf-tools/pdf-qa", name: "PDF Q&A AI", cat: "PDF Tools" },
  { path: "/pdf-tools/pdf-split", name: "PDF Split", cat: "PDF Tools" },
  { path: "/pdf-tools/pdf-summarizer", name: "PDF Summarizer", cat: "PDF Tools" },
  { path: "/pdf-tools/pdf-to-excel", name: "PDF to Excel", cat: "PDF Tools" },
  { path: "/pdf-tools/pdf-to-ppt", name: "PDF to PPT", cat: "PDF Tools" },
  { path: "/pdf-tools/pdf-to-word", name: "PDF to Word", cat: "PDF Tools" },
  { path: "/pdf-tools/pdf-unlock", name: "PDF Unlock", cat: "PDF Tools" },
  { path: "/pdf-tools/ppt-to-pdf", name: "PPT to PDF", cat: "PDF Tools" },
  { path: "/text-tools/ad-copy-generator", name: "Ad Copy Generator", cat: "Text Tools" },
  { path: "/text-tools/blog-generator", name: "Blog Generator", cat: "Text Tools" },
  { path: "/text-tools/case-converter", name: "Case Converter", cat: "Text Tools" },
  { path: "/text-tools/character-counter", name: "Character Counter", cat: "Text Tools" },
  { path: "/text-tools/email-writer", name: "Email Writer", cat: "Text Tools" },
  { path: "/text-tools/grammar-checker", name: "Grammar Checker", cat: "Text Tools" },
  { path: "/text-tools/keyword-density-checker", name: "Keyword Density Checker", cat: "Text Tools" },
  { path: "/text-tools/linkedin-post-generator", name: "LinkedIn Post Generator", cat: "Text Tools" },
  { path: "/text-tools/meta-description-generator", name: "Meta Description Generator", cat: "Text Tools" },
  { path: "/text-tools/paraphrasing-tool", name: "Paraphrasing Tool", cat: "Text Tools" },
  { path: "/text-tools/reading-time-calculator", name: "Reading Time Calculator", cat: "Text Tools" },
  { path: "/text-tools/slug-generator", name: "Slug Generator", cat: "Text Tools" },
  { path: "/text-tools/text-summarizer", name: "Text Summarizer", cat: "Text Tools" },
  { path: "/text-tools/title-generator", name: "Title Generator", cat: "Text Tools" },
  { path: "/text-tools/word-counter", name: "Word Counter", cat: "Text Tools" },
  { path: "/utility/nepali-date-converter", name: "Nepali Date Converter", cat: "Utility" },
  { path: "/utility/gpa-calculator", name: "GPA Calculator", cat: "Utility" },
  { path: "/utility/qr-generator", name: "QR Generator", cat: "Utility" },
  { path: "/utility/payment-qr", name: "Payment QR Generator", cat: "Utility" },
  { path: "/utility/qr-scanner", name: "QR Scanner", cat: "Utility" },
  { path: "/utility/age-calculator", name: "Age Calculator", cat: "Utility" },
  { path: "/utility/percentage-calculator", name: "Percentage Calculator", cat: "Utility" },
  { path: "/utility/bmi-calculator", name: "BMI Calculator", cat: "Utility" },
  { path: "/utility/currency-converter", name: "Currency Converter", cat: "Utility" },
  { path: "/utility/unit-converter", name: "Unit Converter", cat: "Utility" },
  { path: "/utility/time-zone-converter", name: "Time Zone Converter", cat: "Utility" },
  { path: "/utility/date-difference", name: "Date Difference Calculator", cat: "Utility" },
  { path: "/utility/emi-calculator", name: "EMI Calculator", cat: "Utility" },
  { path: "/utility/gst-calculator", name: "GST VAT Calculator", cat: "Utility" },
  { path: "/utility/youtube-thumbnail", name: "YouTube Thumbnail Downloader", cat: "Utility" },
];

const baseDir = path.join(__dirname, '..', 'app');

ALL_TOOLS.forEach(tool => {
  const fullDir = path.join(baseDir, tool.path);
  const pageFile = path.join(fullDir, 'page.tsx');
  
  if (!fs.existsSync(fullDir)) {
    fs.mkdirSync(fullDir, { recursive: true });
  }

  if (!fs.existsSync(pageFile)) {
    // Create new page if not exists
    const newContent = `"use client"
import { ToolPageSEO } from "@/components/ToolPageSEO"

export default function Page() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">${tool.name}</h1>
      <div className="bg-gray-100 dark:bg-gray-900 p-12 rounded-xl text-center">
        <p>Tool UI for ${tool.name} - Replace with your actual component</p>
      </div>
      <ToolPageSEO name="${tool.name}" cat="${tool.cat}" path="${tool.path}" />
    </main>
  )
}
`;
    fs.writeFileSync(pageFile, newContent);
    console.log(`✅ Created ${tool.path}`);
    return;
  }

  let content = fs.readFileSync(pageFile, 'utf8');
  if (content.includes('ToolPageSEO')) {
    console.log(`⏭️  Skip ${tool.path} - already has SEO`);
    return;
  }

  // Inject import
  if (content.includes('"use client"')) {
    content = content.replace('"use client"', `"use client"\nimport { ToolPageSEO } from "@/components/ToolPageSEO"`);
  } else {
    content = `import { ToolPageSEO } from "@/components/ToolPageSEO"\n` + content;
  }

  // Rename export default function to OriginalPage
  content = content.replace(/export\s+default\s+function\s+(\w*)/, 'function OriginalPage');

  // Append wrapper at end
  content += `
export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="${tool.name}" cat="${tool.cat}" path="${tool.path}" />
    </>
  )
}
`;
  fs.writeFileSync(pageFile, content);
  console.log(`✅ Patched ${tool.path}`);
});

console.log("\nDone! All 114 tools patched with 400+ words SEO");