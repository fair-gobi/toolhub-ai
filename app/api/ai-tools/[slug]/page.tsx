import { sql } from '@/lib/db'
import { ToolPageSEO } from '@/components/ToolPageSEO'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Page({params}:{params: Promise<{slug:string}>}){
  const {slug} = await params

  const [tool] = await sql`SELECT * FROM ai_tools WHERE slug=${slug} LIMIT 1`
  if(!tool) notFound()

  return(
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold">{tool.name}</h1>
      <p className="text-gray-500 mt-2">{tool.description}</p>

      <div className="mt-6 p-10 border rounded-xl bg-gray-50 text-center">
        {tool.is_original? (
          <p>Your {tool.name} UI component goes here</p>
        ) : (
          <a href={tool.external_url} target="_blank" className="bg-black text-white px-6 py-3 rounded-full">
            Visit {tool.name} ↗
          </a>
        )}
      </div>

      {/* THIS AUTO LOADS SEO FROM tool_articles */}
      <ToolPageSEO name={tool.name} cat="AI" path={`/ai-tools/${slug}`} slug={slug} />
    </main>
  )
}