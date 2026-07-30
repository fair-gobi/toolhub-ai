import { promptData, categoryData } from '@/data/prompts-data'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: { category: string } }){
  const cat = decodeURIComponent(params.category)
  return {
    title: `${cat} Prompts - 100+ Free AI Prompts | PromptoolHub`,
    description: `Best ${cat} AI prompts for ChatGPT, Claude, Midjourney. Copy in 1-click.`,
    alternates: { canonical: `https://www.promptoolhub.com/prompts/category/${cat}` }
  }
}

export default function CategoryPage({ params }: { params: { category: string } }){
  const catSlug = decodeURIComponent(params.category)
  const catInfo = categoryData.find((c:any)=> c.slug === catSlug)
  const filtered = promptData.filter((p:any)=> 
    p.category.toLowerCase() === catInfo?.name.toLowerCase() || 
    p.slug.includes(catSlug) ||
    p.category.toLowerCase().replace(' ','-') === catSlug
  )

  return (
    <main className="max-w-7xl mx-auto p-6">
      <Link href="/prompts" className="text-sm text-gray-500 hover:underline">← Back to Library</Link>
      <h1 className="text-4xl font-bold mt-4 capitalize">{catInfo?.name || catSlug} Prompts</h1>
      <p className="text-gray-500 mt-2">{filtered.length} prompts • Free to copy</p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {filtered.slice(0,60).map((p:any)=>(
          <div key={p.id} className="border rounded-2xl p-4 bg-white">
            <Link href={`/prompts/${p.slug}`}>
              <h3 className="font-bold line-clamp-2 hover:text-blue-600">{p.title}</h3>
              <p className="text-xs text-gray-500 mt-2 line-clamp-3">{p.content.slice(0,120)}...</p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}

export async function generateStaticParams(){
  return [
    { category: 'sales' },
    { category: 'marketing' },
    { category: 'image-prompt' },
    { category: 'coding' },
    { category: 'social-media' },
    { category: 'design' },
    { category: 'video-prompt' },
    { category: 'writing' },
    { category: 'business' },
    { category: 'seo' },
    { category: 'productivity' },
    { category: 'education' },
  ]
}