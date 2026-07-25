import { ToolPageSEO } from "@/components/ToolPageSEO"
import Link from "next/link"

export default function Privacy() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-6">Last updated: July 25, 2026</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-2">1. No Data Collection</h2>
          <p className="text-gray-700">Promptoolhub Nepal tools run entirely in your browser. We do not upload your images, documents, or calculations to our servers. GPA, date conversions, and QR codes are processed locally.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-2">2. Prompt Library</h2>
          <p className="text-gray-700">
            Our Prompt Library at <Link href="/prompts" className="text-violet-600 font-semibold">https://www.promptoolhub.com/prompts</Link> contains 1500+ public prompts. 
            For prompt library visit https://www.promptoolhub.com/prompts and visit one page to know the features of this library - categories, search, favorites, 1-click copy. 
            We don't track which prompts you copy. Favorites are saved locally in your browser only.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">3. Analytics</h2>
          <p className="text-gray-700">We use Vercel Analytics to understand page views and performance. No personal data or IP addresses are stored. We use aggregated data only to improve tools.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies</h2>
          <p className="text-gray-700">We do not use tracking cookies. Local storage is used only to save your GPA calculations, favorites from prompt library, and tool preferences on your device.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-2">5. Third Party</h2>
          <p className="text-gray-700">YouTube downloader UI does not connect to external APIs. Payment QR generates static codes only for eSewa/Khalti. Google AdSense may use cookies after approval.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact</h2>
          <p className="text-gray-700">For privacy questions: fairanalyst93@gmail.com - PromptoolHub, Damauli, Tanahu, Gandaki, Nepal</p>
        </div>

        <div className="mt-8">
          <ToolPageSEO name="Privacy Policy" cat="Utility" path="/privacy" />
        </div>
      </div>
    </main>
  );
}
