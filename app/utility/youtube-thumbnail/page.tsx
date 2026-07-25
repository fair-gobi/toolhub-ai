'use client'
import { useState } from 'react'

export default function YouTubeThumbnail() {
  const [url, setUrl] = useState('')
  const [thumbs, setThumbs] = useState<string[]>([])

  const getThumbnails = () => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    if (!match) { alert('Enter valid YouTube URL'); return }
    const id = match[1]
    setThumbs([
      `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${id}/sddefault.jpg`,
      `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
    ])
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">YouTube Thumbnail Downloader</h1>
        <p className="text-gray-600 mb-6">Download HD thumbnails in 1 click</p>

        <div className="bg-white p-6 rounded-2xl shadow-sm border mb-6">
          <input
            type="text"
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={e=>setUrl(e.target.value)}
            className="w-full p-3 border rounded-xl mb-4"
          />
          <button onClick={getThumbnails} className="w-full bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700">
            Get Thumbnails
          </button>
        </div>

        {thumbs.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4">
            {thumbs.map((thumb, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border">
                <img src={thumb} alt="thumbnail" className="w-full rounded-lg mb-3" />
                <a href={thumb} download target="_blank" className="block text-center bg-gray-900 text-white py-2 rounded-lg text-sm hover:bg-black">
                  Download {['Max Res','SD','HQ','MQ'][i]}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
