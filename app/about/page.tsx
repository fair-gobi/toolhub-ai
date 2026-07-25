import { ToolPageSEO } from "@/components/ToolPageSEO"

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-sm prose dark:prose-invert max-w-none">
          <h1>About PromptoolHub - Nepal's #1 Free Toolkit</h1>
          <p>
            <strong>PromptoolHub</strong> is Nepal's #1 free toolkit - 114+ free online tools (PDF, Image, Finance, Utility, AI) + 5000+ AI prompts. 
            Built in Pokhara for Nepali students and creators. We provide free, fast tools: AI background remover, image upscaler, photo restorer, GPA calculator, Nepali date converter, QR generator, and payment QR for eSewa/Khalti.
          </p>
          <p>All tools work without signup, process data in your browser for privacy, and are optimized for mobile and slow 3G internet in Nepal.</p>

          <h2>Our Prompt Library - 5000+ AI Prompts</h2>
          <p>
            For prompt library visit <a href="https://www.promptoolhub.com/prompts" className="text-violet-600 font-semibold">https://www.promptoolhub.com/prompts</a> and visit one page to know the features of this library.
          </p>
          <ul>
            <li>5000+ prompts for ChatGPT, Claude, Midjourney, Gemini</li>
            <li>Categories: business, coding, image generation, study, marketing</li>
            <li>Features: 1-click copy, search, favorites, daily new prompts, Nepali + English</li>
          </ul>
          <p>It helps you get best results from AI - whether you are a student, developer or business owner.</p>

          <h2>Our Mission</h2>
          <p>Make powerful tools free for everyone, without paywalls or data selling. Founded 2025 by Gobinda Subedi in Pokhara, Nepal.</p>

          <h2>Why PromptoolHub?</h2>
          <ul>
            <li>100% Free & Unlimited - no credits</li>
            <li>Privacy First - files auto-deleted</li>
            <li>Works offline after first load for many tools</li>
            <li>No signup required</li>
          </ul>
        </div>

        <div className="mt-8">
          <ToolPageSEO name="About PromptoolHub" cat="Utility" path="/about" />
        </div>
      </div>
    </main>
  );
}