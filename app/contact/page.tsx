import { ToolPageSEO } from "@/components/ToolPageSEO"
import Link from "next/link"

export default function Contact() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-700">Have feedback on our tools or Prompt Library?</p>
          
          <div className="mt-6 space-y-3">
            <p><strong>Email:</strong> fairanalyst93@gmail.com</p>
            <p><strong>Location:</strong> Damauli,Tanahu, Gandaki, Nepal</p>
            <p><strong>Facebook:</strong> <a href="https://facebook.com/gobinda.subedi.733" className="text-blue-600 hover:underline">Gobinda Subedi</a></p>
          </div>

          <div className="mt-8 p-5 bg-violet-50 border border-violet-200 rounded-xl">
            <h3 className="font-bold text-violet-800">🚀 Explore Our Prompt Library</h3>
            <p className="text-gray-700 text-sm mt-2">
              For prompt library visit <Link href="/prompts" className="text-violet-600 font-semibold">https://www.promptoolhub.com/prompts</Link> and visit one page to know the features of this library.
              Get 5000+ AI prompts for business, coding, study, marketing, image generation - with search, categories, favorites and 1-click copy.
            </p>
            <Link href="/prompts" className="inline-block mt-3 bg-violet-600 text-white px-5 py-2 rounded-full text-sm font-semibold">Visit Prompt Library →</Link>
          </div>

          <p className="text-gray-600 text-sm mt-6">We reply within 24 hours. Made in Nepal with ❤️ for students and creators.</p>
        </div>

        <div className="mt-8">
          <ToolPageSEO name="Contact Us" cat="Utility" path="/contact" />
        </div>
      </div>
    </main>
  );
}