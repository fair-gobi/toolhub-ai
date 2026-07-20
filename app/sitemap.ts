
export default async function sitemap() {
  const baseUrl = "https://www.promptoolhub.com"

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/prompts`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/ai-tools`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/pdf-tools`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/image-tools`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/dev-tools`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/text-tools`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/business`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/finance`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
  ]
}