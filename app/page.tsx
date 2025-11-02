"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Skills from "@/components/sections/skills"
import Projects from "@/components/sections/projects"
import Contact from "@/components/sections/contact"
import Footer from "@/components/sections/footer"
// import { Button } from "@/components/ui/button"
// import { ArrowUp } from "lucide-react"
import Navbar from "@/components/sections/navbar"
import Intro from "@/components/sections/intro"
import WorkExperience from "@/components/sections/work-experience"

export default function Home() {
  
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
    <main className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 bg-background z-0"></div>
      
      {/* Content */}
      <div className="relative z-20">
        <Navbar />
        <Intro />
        <WorkExperience />
        <Skills />
        <Projects />
        <Contact />
        <div className="hidden md:block">
          <Footer />
        </div>
      </div>
    </main>
  )
}