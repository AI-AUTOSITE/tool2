// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Resume & Cover Letter",
  description: "Generate a tailored resume & cover letter in seconds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 text-neutral-900 flex flex-col`}>
        {/* Header */}
        <header className="sticky top-0 z-30 border-b bg-white/75 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-indigo-100">
                <svg viewBox="0 0 40 40" className="h-5 w-5">
                  <circle cx="20" cy="20" r="18" fill="#6366f1" opacity="0.12" />
                  <path d="M14 20a6 6 0 1 1 12 0" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <circle cx="20" cy="20" r="4" fill="#6366f1" opacity="0.22" />
                </svg>
              </span>
              <span>AI Resume</span>
            </Link>

            <nav className="hidden sm:flex items-center gap-5 text-sm text-neutral-700">
              <a href="#how-it-works" className="hover:text-neutral-900">How it works</a>
              <a href="#features" className="hover:text-neutral-900">Features</a>
              <a
                href="#try"
                className="rounded-md bg-black px-3 py-1.5 font-medium text-white hover:opacity-90"
              >
                Try Now
              </a>
            </nav>
          </div>
        </header>

        {/* Main */}
        <main id="try" className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t bg-white/70 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-neutral-600">
            <p>© {year} AI-AUTOSITE. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="hover:text-neutral-800">Privacy</a>
              <a href="/terms" className="hover:text-neutral-800">Terms</a>
              <a href="mailto:support@example.com" className="hover:text-neutral-800">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
