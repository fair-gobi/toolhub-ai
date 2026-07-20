import { promptData, categoryData } from "@/data/prompts-data"

export default async function sitemap() {
  const baseUrl = "https://www.promptoolhub.com"
  const now = new Date()

  // 1. Main pages
  const mainPages = [
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
    url: `${baseUrl}${route}`,
    lastModified: now,
  }))

  // 2. Category pages
  const categoryPages = categoryData.map((cat: any) => ({
    url: `${baseUrl}/prompts/category/${cat.slug}`,
    lastModified: now,
  }))

  // 3. All 1500 prompt pages
  const promptPages = promptData.map((p: any) => ({
    url: `${baseUrl}/prompts/${p.id}`,
    lastModified: now,
  }))

  return [...mainPages, ...categoryPages, ...promptPages]
}