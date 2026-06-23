export default function Privacy() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-6">Last updated: June 23, 2026</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">1. No Data Collection</h2>
        <p className="text-gray-700">Promptoolhub Nepal tools run 100% in your browser. We do not upload your images, documents, or calculations to our servers. GPA, date conversions, and QR generation happen locally.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Analytics</h2>
        <p className="text-gray-700">We use Vercel Analytics to count page views and improve performance. No personal data, cookies, or IP tracking for ads.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Contact</h2>
        <p className="text-gray-700">For privacy questions: <a href="mailto:fairanalyst93@gmail.com" className="text-blue-600 underline">fairanalyst93@gmail.com</a></p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Third Party</h2>
        <p className="text-gray-700">YouTube downloader UI does not store links. When backend is added, we will not keep download history.</p>
      </div>
    </main>
  );
}
