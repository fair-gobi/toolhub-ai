"use client";
import { useState } from "react";

const styles = ["Realistic Photo", "Anime", "3D Render", "Cyberpunk", "Oil Painting", "Cartoon", "Logo", "Fantasy"];

export default function ImageGen(){
  const [prompt,setPrompt]=useState("");
  const [style,setStyle]=useState("Realistic Photo");
  const [loading,setLoading]=useState(false);
  const [images,setImages]=useState<string[]>([]);

  async function generate(){
    if(!prompt) return;
    setLoading(true);
    setImages([]);

    // Enhance prompt with style
    const fullPrompt = `${prompt}, ${style}, highly detailed, 8k, masterpiece`;
    const urls = [
      `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=1024&height=1024&seed=${Math.floor(Math.random()*9999)}&nologo=true&enhance=true`,
      `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=1024&height=1024&seed=${Math.floor(Math.random()*9999)}&nologo=true&enhance=true`
    ];
    setImages(urls);
    setLoading(false);
  }

  return(
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold">AI Image Generator 🎨</h1>
      <p className="text-gray-500">Text to image — unlimited free, no watermark</p>

      <div className="mt-6 border p-5 rounded-xl bg-white grid gap-4">
        <textarea placeholder="Describe image: e.g. A Nepali girl in traditional dress in Himalayas, sunset" className="border p-3 rounded h-28" value={prompt} onChange={e=>setPrompt(e.target.value)}/>

        <div className="flex flex-wrap gap-2">
          {styles.map(s=>(
            <button key={s} onClick={()=>setStyle(s)} className={`px-3 py-1.5 rounded-full text-sm border ${style===s?'bg-black text-white':'bg-gray-100'}`}>{s}</button>
          ))}
        </div>

        <button onClick={generate} className="bg-black text-white p-3 rounded-lg font-semibold text-lg">
          {loading?"Generating...":"✨ Generate Images"}
        </button>
      </div>

      {images.length>0 && (
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {images.map((img,i)=>(
            <div key={i} className="border rounded-xl overflow-hidden bg-white p-2">
              <img src={img} alt={prompt} className="w-full rounded-lg"/>
              <a href={img} target="_blank" download className="block text-center mt-2 bg-gray-900 text-white py-2 rounded">Download HD</a>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}