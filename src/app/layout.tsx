import type { Metadata } from "next";
import { Bricolage_Grotesque, Noto_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Easynomics - Interactive Webcomic Platform",
  description: "Master economics with interactive webcomics and real-time policy simulation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${notoSerif.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-serif bg-[#fcf9f8] text-[#1c1b1b]">{children}</body>
    </html>
  );
}
