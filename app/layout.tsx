import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/main/navbar";
import { Footer } from "@/components/main/footer";
import { Providers } from "@/components/providers/Providers";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'ruizTechServices|',
  description:
    'RuizTechServices| – Solo-led web development, AI integrations & on-site tech support in NYC.',
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
        <Providers>
          <div className="w-full flex justify-center">
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
          </div>
          {children}
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
