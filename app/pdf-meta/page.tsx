export const metadata = {
  title: "PDF Metadata Viewer - Free Online Tool | ToolHub Nepal",
  description: "View PDF properties and info. Fast, free, no signup required. Made in Nepal.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">PDF Metadata Viewer</h1>
        <p className="text-gray-600 mb-6">View PDF properties and info</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-lg">?? Coming Soon</p>
          <p className="text-sm text-gray-600 mt-2">We're building this tool. Check back soon!</p>
        </div>
        <a href="/" className="inline-block mt-6 text-blue-600 hover:underline">? Back to all tools</a>
      </div>
    </main>
  )
}
