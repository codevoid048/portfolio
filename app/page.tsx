"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Skills from "@/components/sections/skills"
import Projects from "@/components/sections/projects"
import CPProfiles from "@/components/sections/cp-profiles"
import Achievements from "@/components/sections/achievements"
import Contact from "@/components/sections/contact"
import Footer from "@/components/sections/footer"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import Navbar from "@/components/sections/navbar"

export default function Home() {
  const { scrollY } = useScroll()
  const scrollToTopRef = useRef<HTMLDivElement>(null)
  const opacity = useTransform(scrollY, [0, 200], [0, 1])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el)
    })

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.unobserve(el)
      })
    }
  }, [])

  return (
    <main className="relative bg-gradient-to-b from-black to-gray-900 text-white min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <CPProfiles />
      <Achievements />
      <Contact />
      <Footer />

      <motion.div ref={scrollToTopRef} style={{ opacity }} className="fixed bottom-8 right-8 z-50">
        <Button
          onClick={scrollToTop}
          size="icon"
          className="rounded-full bg-violet-700 hover:bg-violet-600 shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.8)]"
        >
          <ArrowUp className="h-5 w-5" />
          <span className="sr-only">Scroll to top</span>
        </Button>
      </motion.div>
    </main>
  )
}
