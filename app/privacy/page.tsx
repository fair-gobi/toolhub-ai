export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: June 19, 2026</p>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
          <p>ToolHub Nepal does not require registration. When you use our tools (Background Remover, Image Upscaler, Photo Restorer), images are processed in your browser or temporarily on our servers and are automatically deleted within 24 hours. We do not store your photos.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Cookies and Advertising</h2>
          <p>We use Google AdSense to display ads. Google uses cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet.</p>
          <p className="mt-2">You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline">Google Ads Settings</a>. Alternatively, you can opt out of third-party vendor cookies by visiting <a href="https://www.aboutads.info" className="text-blue-600 hover:underline">aboutads.info</a>.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Google Analytics</h2>
          <p>We use Google Analytics to understand how visitors use our site. Google Analytics collects information anonymously and reports website trends without identifying individual visitors.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Third-Party Services</h2>
          <p>Our image processing uses third-party AI APIs. Images are transmitted securely and not used for training purposes.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Contact</h2>
          <p>For privacy questions, contact us at: gobinda.subedi.733,[at] fairanalyst93@gmail.com or via our <a href="/contact" className="text-blue-600 hover:underline">Contact page</a>.</p>
        </section>
      </div>
    </div>
  )
}
