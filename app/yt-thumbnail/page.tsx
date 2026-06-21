"use client"
import { useState } from "react"

export default function YTThumbnail() {
  const [url, setUrl] = useState("")
  const [thumbs, setThumbs] = useState<{label:string, url:string, size:string}[]>([])

  const extractId = (u: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([0-9A-Za-z_-]{11})/,
      /^([0-9A-Za-z_-]{11})$/
    ]
    for (const p of patterns) {
      const m = u.match(p)
      if (m) return m[1]
    }
    return ""
  }

  const generate = () => {
    const id = extractId(url.trim())
    if (!id) return alert("Please enter a valid YouTube URL")
    
    setThumbs([
      { label: "Maximum Resolution", url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`, size: "1280x720" },
      { label: "High Quality", url: `https://img.youtube.com/vi/${id}/hqdefault.jpg`, size: "480x360" },
      { label: "Medium Quality", url: `https://img.youtube.com/vi/${id}/mqdefault.jpg`, size: "320x180" },
      { label: "Standard", url: `https://img.youtube.com/vi/${id}/sddefault.jpg`, size: "640x480" },
    ])
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-3">YouTube Thumbnail Downloader</h1>
      <p className="text-gray-600 mb-8 text-lg">Download any YouTube video thumbnail in HD, 4K quality. Free tool for creators, designers, and marketers.</p>
      
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <div className="flex gap-3">
          <input value={url} onChange={e => setUrl(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && generate()}
            className="flex-1 p-4 border rounded-lg text-base focus:ring-2 focus:ring-red-500" 
            placeholder="Paste YouTube URL: https://youtube.com/watch?v=..." />
          <button onClick={generate} className="bg-red-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-red-700">
            Get Thumbnails
          </button>
        </div>
      </div>

      {thumbs.length > 0 && (
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {thumbs.map((t, i) => (
            <div key={i} className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
              <img src={t.url} alt={t.label} className="w-full aspect-video object-cover bg-gray-100" 
                onError={(e) => (e.currentTarget.style.display = 'none')} />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{t.label}</h3>
                    <p className="text-sm text-gray-500">{t.size}</p>
                  </div>
                  <a href={t.url} download={`yt-thumbnail-${t.label.toLowerCase().replace(' ','-')}.jpg`} target="_blank"
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-black">
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-16 prose max-w-none">
        <h2>Why creators use this</h2>
        <p>Download thumbnails for reference, recreating designs, or saving your own videos. Works with all YouTube videos including Shorts.</p>
      </div>
    </div>
  )
}