import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

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
  title: "Promptoolhub - 1500+ Best AI Prompts for ChatGPT, Midjourney & Business",
  description: "1500+ viral copy-paste AI prompts for ChatGPT, Midjourney, Runway, SEO, Marketing, Business, Coding. Free 250+ Image & Video prompts.",
  verification: {
    google: "e97fe87e90c581c8", 
  },
  openGraph: {
    title: "Promptoolhub - 1500+ AI Prompts",
    description: "Copy-paste 1500+ best prompts for ChatGPT, Midjourney, Claude.",
    url: "https://www.promptoolhub.com",
    siteName: "Promptoolhub",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <footer className="border-t mt-12 py-6 text-center text-sm text-gray-500">
          <a href="/about" className="mx-3 hover:underline">About</a>
          <a href="/privacy" className="mx-3 hover:underline">Privacy</a>
          <a href="/contact" className="mx-3 hover:underline">Contact</a>
          <a href="/prompts" className="mx-3 hover:underline">1500 Prompts</a>
          <p className="mt-2">© 2026 Promptoolhub Nepal 🇳🇵</p>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}