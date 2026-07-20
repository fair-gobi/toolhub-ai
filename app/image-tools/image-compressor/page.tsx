'use client';
import { useState } from 'react';
import imageCompression from 'browser-image-compression';

export default function Compressor() {
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [info, setInfo] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleCompress = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: file.type,
      };
      const compressed = await imageCompression(file, options);
      setOutputUrl(URL.createObjectURL(compressed));
      setInfo(`${(file.size/1024).toFixed(0)}KB → ${(compressed.size/1024).toFixed(0)}KB`);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🗜️ Image Compressor</h1>
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border space-y-4">
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full" />
        <button onClick={handleCompress} disabled={!file || loading} className="w-full bg-purple-600 text-white py-3 rounded-lg disabled:opacity-50">
          {loading? 'Compressing...' : 'Compress'}
        </button>
        {outputUrl && (
          <>
            <p className="text-sm text-green-600 font-medium">{info}</p>
            <img src={outputUrl} alt="compressed" className="max-w-full rounded border" />
            <a href={outputUrl} download={`compressed-${file?.name}`} className="inline-block bg-green-600 text-white px-4 py-2 rounded">
              Download
            </a>
          </>
        )}
      </div>
    </main>
  );
}
