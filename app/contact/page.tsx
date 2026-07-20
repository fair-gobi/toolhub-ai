export default function Contact() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-700">Have feedback on our tools?</p>
        <div className="mt-6 space-y-3">
          <p><strong>Email:</strong> contact@promptoolhub.com</p>
          <p><strong>Location:</strong> Pokhara, Gandaki, Nepal</p>
          <p><strong>Facebook:</strong> <a href="https://facebook.com/gobinda.subedi.733" className="text-blue-600 hover:underline">Gobinda Subedi</a></p>
        </div>
      </div>
    </main>
  );
}
