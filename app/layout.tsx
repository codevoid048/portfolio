import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"
import Aurora from "@/components/ui/aurora"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
})

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "William Keri",
  "url": "https://codevoid.site",
  "image": "https://codevoid.site/logo.webp",
  "jobTitle": ["Software Engineer", "Full Stack Developer", "Software Engineer", "ML Engineer"],
  "description": "Software Engineer, Full Stack Developer, Competitive Programmer, and Machine Learning Enthusiast",
  "knowsAbout": [
    // Languages
    "C", "C++", "Python", "Java", "JavaScript", "TypeScript",
    // Technologies & Frameworks
    "React", "Next.js", "Express.js", "Node.js", "FastAPI", "LangChain", "LlamaIndex", "FAISS",
    // Databases
    "MongoDB", "MySQL", "PostgreSQL", "Redis", "ChromaDB",
    // Tools & Cloud
    "Git", "Docker", "Linux", "AWS Lambda", "AWS S3", "CloudWatch", "CloudFormation", "Cloudflare",
    "Kubernetes", "Terraform", "Grafana", "Prometheus",
    // Protocols & Messaging
    "gRPC", "Kafka", "WebSockets",
    // Domains
    "Full Stack Development", "Machine Learning", "Competitive Programming", 
    "Data Structures", "Algorithms", "Web Development", "AI/RAG Applications"
  ],
  "sameAs": [
    "https://linkedin.com/in/codevoid",
    "https://github.com/codevoid048",
    "https://x.com/code__void",
  ]
}

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "William Keri Portfolio",
  "url": "https://codevoid.site",
  "description": "Personal portfolio website of William Keri, Software Engineer, Full Stack Developer, Competitive Programmer, and Machine Learning Enthusiast",
  "author": {
    "@type": "Person",
    "name": "William Keri",
    "url": "https://codevoid.site"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://codevoid.site/#search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://codevoid.site"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Experience",
      "item": "https://codevoid.site/#experience"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Projects",
      "item": "https://codevoid.site/#projects"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Contact",
      "item": "https://codevoid.site/#contact"
    }
  ]
}

export const metadata: Metadata = {
  metadataBase: new URL("https://codevoid.site"),
  title: {
    default: "William Keri | Software Engineer",
    template: "%s | William Keri"
  },
  description: "Personal portfolio of William Keri - Software Engineer, Full Stack Developer, Competitive Programmer, and Machine Learning Enthusiast. Explore projects, skills, and work experience.",
  alternates: {
    canonical: "https://codevoid.site",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: "William Keri", url: "https://linkedin.com/in/codevoid" }],
  creator: "William Keri",
  publisher: "William Keri",
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  category: "technology",
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
    "Machine Learning",
    "Competitive Programmer",
    "Python Developer",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codevoid.site",
    siteName: "William Keri Portfolio",
    title: "William Keri | Software Engineer",
    description: "Software Engineer, Full Stack Developer, Competitive Programmer, and ML Enthusiast. Explore my projects, skills, and work experience.",
    images: [
      {
        url: "https://codevoid.site/logo.webp",
        width: 1200,
        height: 630,
        alt: "William Keri - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@code__void",
    creator: "@code__void",
    title: "William Keri | Software Engineer",
    description: "Software Engineer, Full Stack Developer, Competitive Programmer, and ML Enthusiast. Explore my projects, skills, and work experience.",
    images: {
      url: "https://codevoid.site/logo.webp",
      alt: "William Keri - Software Engineer",
    },
  },
  verification: {
    // google: "google-verification-code",
    // yandex: "yandex-verification-code",
    // bing: "bing-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans relative">
        {/* Aurora Background */}
        <div className="fixed inset-0 -z-20 w-screen h-screen">
          <Aurora
            colorStops={["rgb(0,0,0)", "rgb(0,0,0)", "rgb(0,0,0)"]}
            blend={0.4}
            amplitude={0.8}
            speed={0.5}
          />
        </div>

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
          {/* Structured Data - JSON-LD */}
          <Script
            id="jsonld-person"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
          />
          <Script
            id="jsonld-website"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
          />
          <Script
            id="jsonld-breadcrumb"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
          />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}