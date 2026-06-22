import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Promppromptoolhub Nepal - Free AI Background Remover, Image Upscaler & Photo Restorer",
  description: "Free online AI tools to remove image backgrounds, upscale photos 4x with AI, and restore old pictures. Fast, no signup, 100% free.",
  verification: {
    google: "psNzC77faKxonVJOS7yTunAboLEBZjJLioEiddRfEfE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="border-t mt-12 py-6 text-center text-sm text-gray-500">
          <a href="/about" className="mx-3 hover:underline">About</a>
          <a href="/privacy" className="mx-3 hover:underline">Privacy</a>
          <a href="/contact" className="mx-3 hover:underline">Contact</a>
          <p className="mt-2">Â© 2026 Promppromptoolhub Nepal</p>
        </footer>
      </body>
    </html>
  );
}


