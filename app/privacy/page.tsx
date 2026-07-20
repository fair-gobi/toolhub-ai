export default function Privacy() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-6">Last updated: June 23, 2026</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">1. No Data Collection</h2>
        <p className="text-gray-700">Promptoolhub Nepal tools run entirely in your browser. We do not upload your images, documents, or calculations to our servers. GPA, date conversions, and QR codes are processed locally.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">2. Analytics</h2>
        <p className="text-gray-700">We use Vercel Analytics to understand page views and performance. No personal data or IP addresses are stored.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Cookies</h2>
        <p className="text-gray-700">We do not use tracking cookies. Local storage is used only to save your GPA calculations on your device.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Third Party</h2>
        <p className="text-gray-700">YouTube downloader UI does not connect to external APIs. Payment QR generates static codes only.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Contact</h2>
        <p className="text-gray-700">For questions: contact@promptoolhub.com</p>
      </div>
    </main>
  );
}
