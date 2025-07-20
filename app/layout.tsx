import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] })

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "William Keri",
  "url": "https://williams-portfolio-eta.vercel.app",
  "jobTitle": ["Full Stack Developer", "Software Engineer", "ML Engineer"],
  "sameAs": [
    "https://linkedin.com/in/codevoid",
    "https://github.com/codevoid048"
  ]
}

export const metadata: Metadata = {
  metadataBase: new URL("https://williams-portfolio-eta.vercel.app"),
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
    icon: "/logo1.png",
    shortcut: "/logo1.png",
    apple: "/logo1.png",
  },
  openGraph: {
    title: "William | Portfolio",
    description: "Full Stack Developer, Competitive Programmer, and ML Enthusiast",
    images: [
      {
        url: "https://williams-portfolio-eta.vercel.app/logo1.png",
        width: 1200,
        height: 630,
        alt: "William Portfolio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "William Keri | Portfolio",
    description: "Full Stack Developer, Competitive Programmer, and ML Enthusiast",
    creator: "@code__void",
    images: ["https://williams-portfolio-eta.vercel.app/logo1.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          <Script
            id="jsonld-person"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
