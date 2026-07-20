'use client';
import { useState, useEffect } from 'react';

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [lock, setLock] = useState(true);
  const [format, setFormat] = useState('image/jpeg');
  const [output, setOutput] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setOrigW(img.width);
      setOrigH(img.height);
      setWidth(img.width);
      setHeight(img.height);
    };
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleWidth = (w: number) => {
    setWidth(w);
    if (lock && origW) setHeight(Math.round((w / origW) * origH));
  };
  const handleHeight = (h: number) => {
    setHeight(h);
    if (lock && origH) setWidth(Math.round((h / origH) * origW));
  };

  const resize = async () => {
    if (!file ||!preview) return;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    img.src = preview;
    await new Promise(r => img.onload = r);
    ctx.drawImage(img, 0, 0, width, height);
    canvas.toBlob(blob => {
      if (blob) setOutput(URL.createObjectURL(blob));
    }, format, 0.92);
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📐 Image Resizer</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border space-y-4">
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full" />
          {origW > 0 && <p className="text-sm text-gray-500">Original: {origW} x {origH}px</p>}

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-sm font-medium">Width</label>
              <input type="number" value={width} onChange={e => handleWidth(Number(e.target.value))} className="w-full border rounded p-2 mt-1" />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Height</label>
              <input type="number" value={height} onChange={e => handleHeight(Number(e.target.value))} className="w-full border rounded p-2 mt-1" />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={lock} onChange={e => setLock(e.target.checked)} /> Lock aspect ratio
          </label>

          <div>
            <label className="text-sm font-medium">Output Format</label>
            <select value={format} onChange={e => setFormat(e.target.value)} className="w-full border rounded p-2 mt-1">
              <option value="image/jpeg">JPG</option>
              <option value="image/png">PNG</option>
              <option value="image/webp">WEBP</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={() => {handleWidth(1920); handleHeight(1080)}} className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">1920x1080</button>
            <button onClick={() => {handleWidth(1280); handleHeight(720)}} className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">1280x720</button>
            <button onClick={() => {handleWidth(1080); handleHeight(1080)}} className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">1080x1080</button>
            <button onClick={() => {handleWidth(512); handleHeight(512)}} className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">512x512</button>
          </div>

          <button onClick={resize} disabled={!file} className="w-full bg-purple-600 text-white py-3 rounded-lg disabled:opacity-50">Resize Image</button>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border">
          {preview && <img src={preview} alt="original" className="max-w-full rounded border mb-4" />}
          {output && (
            <>
              <p className="font-medium mb-2">Resized: {width} x {height}px</p>
              <img src={output} alt="resized" className="max-w-full rounded border mb-3" />
              <a href={output} download={`resized-${width}x${height}.jpg`} className="block text-center bg-green-600 text-white py-2 rounded-lg">Download</a>
            </>
          )}
          {!preview && <p className="text-gray-400 text-center py-20">Upload an image to start</p>}
        </div>
      </div>
    </main>
  );
}
