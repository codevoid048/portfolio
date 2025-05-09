import type React from "react"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Download, Mail, Twitter } from "lucide-react"
import ParticleBackground from "@/components/ui/particle-background"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { clientX, clientY } = e
      const { width, height, left, top } = containerRef.current.getBoundingClientRect()

      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5

      const elements = containerRef.current.querySelectorAll(".parallax")
      elements.forEach((el) => {
        const speed = Number.parseFloat(el.getAttribute("data-speed") || "0")
        const xOffset = x * speed
        const yOffset = y * speed
        ;(el as HTMLElement).style.transform = `translate(${xOffset}px, ${yOffset}px)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10"></div>

      <div className="container mx-auto px-4 z-20 flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            William Keri
          </motion.h1>

          <motion.div
            className="relative h-12 mb-6 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <TypewriterEffect texts={["Full Stack Developer", "Competitive Programmer", "Machine Learning Enthusiast"]} />
          </motion.div>

          <motion.p
            className="text-gray-300 text-lg mb-8 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            I'm passionate about technology. I love to explore new technologies and push the boundaries of what's possible.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <SocialButton icon={<Github />} href="https://github.com/codevoid048" label="GitHub" />
            <SocialButton icon={<Linkedin />} href="https://linkedin.com/in/codevoid" label="LinkedIn" />
            <SocialButton icon={<Twitter />} href="https://x.com/code__void" label="Twitter" />
            <SocialButton icon={<Mail />} href="#contact" label="Contact" />

            <a href='/resume.pdf' download>
            <Button className="bg-violet-700 hover:bg-violet-600 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]">
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </Button>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="parallax"
          data-speed="20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative w-[25rem] h-[25rem] rounded-full overflow-hidden border-4 border-violet-600 shadow-[0_0_30px_rgba(139,92,246,0.5)]">
            <Image
              src="/ppk.jpg"
              alt="William Keri"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center items-start p-1">
          <div className="w-1.5 h-3 bg-white rounded-full animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  )
}

function SocialButton({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 hover:bg-violet-700 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] mr-4"
      aria-label={label}
    >
      {icon}
    </a>
  )
}

function TypewriterEffect({ texts }: { texts: string[] }) {
  return (
    <>
      {texts.map((text, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 flex items-center justify-center md:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [20, 0, 0, -20],
          }}
          transition={{
            duration: 4,
            times: [0, 0.1, 0.9, 1],
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: (texts.length - 1) * 4,
            delay: index * 4,
          }}
        >
          <h2 className="text-xl md:text-3xl font-light text-violet-300">{text}</h2>
        </motion.div>
      ))}
    </>
  )
}
