import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClipSense – AI YouTube Insight Extractor",
  description: "Extract summaries, timelines, and Q&A from YouTube videos with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          `${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-[#f4f8fb] to-[#e8f0ff]`
        }
      >
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
