import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toolhub-fresh.vercel.app'
  
  return [
    // Core pages
    { url: `${baseUrl}/`, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.8 },
    
    // 9 Category Pages
    { url: `${baseUrl}/prompts`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/ai-tools`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/pdf-tools`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/image-tools`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/dev-tools`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/text-tools`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/business-tools`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/finance-tools`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/utility-tools`, lastModified: new Date(), priority: 0.8 },
    
    // Live AI Tools
    { url: `${baseUrl}/bg-remover`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/image-upscaler`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/photo-restorer`, lastModified: new Date(), priority: 0.9 },
    
    // All 19 Coming Soon Tools
    { url: `${baseUrl}/qr-generator`, lastModified: new Date() },
    { url: `${baseUrl}/image-compressor`, lastModified: new Date() },
    { url: `${baseUrl}/yt-thumbnail`, lastModified: new Date() },
    { url: `${baseUrl}/payment-qr`, lastModified: new Date() },
    { url: `${baseUrl}/image-to-pdf`, lastModified: new Date() },
    { url: `${baseUrl}/pdf-merger`, lastModified: new Date() },
    { url: `${baseUrl}/pdf-to-word`, lastModified: new Date() },
    { url: `${baseUrl}/nepali-date`, lastModified: new Date() },
    { url: `${baseUrl}/pdf-split`, lastModified: new Date() },
    { url: `${baseUrl}/pdf-extract`, lastModified: new Date() },
    { url: `${baseUrl}/pdf-password`, lastModified: new Date() },
    { url: `${baseUrl}/pdf-meta`, lastModified: new Date() },
    { url: `${baseUrl}/pdf-compress`, lastModified: new Date() },
    { url: `${baseUrl}/gpa-calculator`, lastModified: new Date() },
    { url: `${baseUrl}/routine-maker`, lastModified: new Date() },
    { url: `${baseUrl}/notes-converter`, lastModified: new Date() },
    { url: `${baseUrl}/invoice-generator`, lastModified: new Date() },
    { url: `${baseUrl}/pan-checker`, lastModified: new Date() },
    { url: `${baseUrl}/esewa-parser`, lastModified: new Date() },
        { url: `${baseUrl}/image-resizer`, lastModified: new Date() },
    { url: `${baseUrl}/jpg-to-png`, lastModified: new Date() },
    { url: `${baseUrl}/png-to-jpg`, lastModified: new Date() },
    { url: `${baseUrl}/webp-converter`, lastModified: new Date() },
  ]
}