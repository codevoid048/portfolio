import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] })

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "William Keri",
  "url": "https://codevoid.site",
  "jobTitle": ["Full Stack Developer", "Software Engineer", "ML Engineer"],
  "sameAs": [
    "https://linkedin.com/in/codevoid",
    "https://github.com/codevoid048",
    "https://x.com/code__void",
  ]
}

export const metadata: Metadata = {
  metadataBase: new URL("https://codevoid.site"),
  title: "William Keri | Portfolio",
  description: "Personal portfolio website of William Keri, Full Stack Developer",
  authors: [{ name: "William Keri", url: "https://linkedin.com/in/codevoid" }],
  keywords: [
    "William Keri",
    "codevoid",
    "code__void",
    "codevoid048",
    "williamkeri007",
    "Full Stack Developer",
    "Portfolio",
    "Software Engineer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "JavaScript Developer",
    "TypeScript Developer",
  ],
  icons: {
    icon: "/logo1.jpg",
    shortcut: "/logo1.jpg",
    apple: "/logo1.jpg",
  },
  openGraph: {
    title: "William | Portfolio",
    description: "Full Stack Developer, Competitive Programmer, and ML Enthusiast",
    images: [
      {
        url: "https://codevoid.site/logo1.jpg",
        width: 1200,
        height: 630,
        alt: "William Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "William Keri | Portfolio",
    description: "Full Stack Developer, Competitive Programmer, and ML Enthusiast",
    creator: "@code__void",
    images: ["https://codevoid.site/logo1.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          <Script
            id="jsonld-person"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
          />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}