// @ts-ignore
import data from "@/data/prompts-data"
const prompts = (data as any).prompts || (data as any).default || data

export default function sitemap() {
  const base = "https://www.promptoolhub.com"
  const now = new Date()

  // 1. Static Pages
  const staticPages = [
    "",
    "/prompts",
    "/ai-tools",
    "/pdf-tools",
    "/image-tools",
    "/dev-tools",
    "/text-tools",
    "/business",
    "/finance",
    "/about",
    "/privacy",
    "/contact",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // 2. All Prompt Pages - 1500+
  const promptPages = prompts.map((p: any) => ({
    url: `${base}/prompts/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // 3. All Tool Pages - you have these (add more if you have)
  const toolRoutes = [
    // AI Tools (6)
    "/ai-tools/chatgpt-prompt-generator",
    "/ai-tools/image-prompt-generator",
    "/ai-tools/business-name-generator",
    "/ai-tools/slogan-generator",
    "/ai-tools/hashtag-generator",
    "/ai-tools/bio-generator",
    // PDF Tools (15)
    "/pdf-tools/merge-pdf",
    "/pdf-tools/split-pdf",
    "/pdf-tools/compress-pdf",
    "/pdf-tools/pdf-to-jpg",
    "/pdf-tools/jpg-to-pdf",
    "/pdf-tools/pdf-to-word",
    "/pdf-tools/word-to-pdf",
    "/pdf-tools/rotate-pdf",
    "/pdf-tools/unlock-pdf",
    "/pdf-tools/protect-pdf",
    "/pdf-tools/add-watermark",
    "/pdf-tools/add-page-numbers",
    "/pdf-tools/extract-text",
    "/pdf-tools/edit-pdf",
    "/pdf-tools/sign-pdf",
    // Image Tools (9)
    "/image-tools/compress-image",
    "/image-tools/resize-image",
    "/image-tools/convert-image",
    "/image-tools/upscale-image",
    "/image-tools/remove-background",
    "/image-tools/crop-image",
    "/image-tools/rotate-image",
    "/image-tools/add-watermark-image",
    "/image-tools/meme-generator",
    // Dev Tools (22)
    "/dev-tools/json-formatter",
    "/dev-tools/base64-encoder",
    "/dev-tools/url-encoder",
    "/dev-tools/html-minifier",
    "/dev-tools/css-minifier",
    "/dev-tools/js-minifier",
    "/dev-tools/qr-generator",
    "/dev-tools/password-generator",
    "/dev-tools/uuid-generator",
    "/dev-tools/hash-generator",
    "/dev-tools/regex-tester",
    "/dev-tools/color-picker",
    // Text Tools (15)
    "/text-tools/word-counter",
    "/text-tools/grammar-checker",
    "/text-tools/paraphraser",
    "/text-tools/summarizer",
    "/text-tools/case-converter",
    // Business (17)
    "/business/invoice-generator",
    "/business/bill-generator",
    "/business/logo-maker",
    // Finance (16)
    "/finance/sip-calculator",
    "/finance/emi-calculator",
    "/finance/crypto-converter",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...promptPages, ...toolRoutes]
}