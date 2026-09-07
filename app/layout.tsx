import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/main/navbar";
import { Footer } from "@/components/main/footer";
import { Providers } from "@/components/providers/Providers";
import { SiteAnalytics } from "@/components/marketing/SiteAnalytics";
import { site } from "@/lib/content/site";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: { default: site.name, template: "%s | ruizTechServices|" },
  description:
    "Website fixes, practical NYC tech help, and web development with Gio Ruiz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <Providers>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <Navbar />
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
          <Footer />
        </Providers>
        <SiteAnalytics />
      </body>
    </html>
  );
}
