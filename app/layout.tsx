import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://williams-portfolio-eta.vercel.app"),
  title: "William Keri | Portfolio",
  description: "Personal portfolio website of William Keri, Full Stack Developer",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "William | Portfolio",
    description: "Full Stack Developer portfolio",
    images: [
      {
        url: "/ppk.png",
        width: 1200,
        height: 630,
        alt: "William Portfolio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "William Keri | Portfolio",
    description: "Full Stack Developer portfolio",
    images: ["/ppk.png"],
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
        </ThemeProvider>
      </body>
    </html>
  )
}
