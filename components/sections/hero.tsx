import type React from "react"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Download, Mail, Twitter } from "lucide-react"
import Galaxy from "@/components/ui/galaxy"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <section
      id="home"
      ref={containerRef}
      className="relative pt-32 md:pt-48 pb-16 md:pb-24 flex items-center justify-center overflow-hidden"
    >
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.6}
          saturation={0.8}
          hueShift={280}
          twinkleIntensity={0.4}
          rotationSpeed={0.05}
          repulsionStrength={3}
          speed={1.2}
          transparent={true}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10"></div>

      <div className="container mx-auto px-4 z-20 flex items-center justify-center">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            William Keri
          </motion.h1>

          <motion.div
            className="relative h-16 md:h-20 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <TypewriterEffect texts={["Full Stack Developer", "Competitive Programmer", "Machine Learning Enthusiast"]} />
          </motion.div>

          <motion.p
            className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            I'm passionate about technology. I love to explore new technologies and push the boundaries of what's possible.
          </motion.p>

          <motion.div
            className="flex flex-wrap sm:gap:4 md:gap-6 lg:gap-6 justify-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <SocialButton icon={<Github />} href="https://github.com/codevoid048" label="GitHub" />
            <SocialButton icon={<Linkedin />} href="https://linkedin.com/in/codevoid" label="LinkedIn" />
            <SocialButton icon={<Twitter />} href="https://x.com/code__void" label="Twitter" />
            <SocialButton icon={<Mail />} href="#contact" label="Contact" />

            {/* <a href='/resume.pdf' download>
            <Button className="bg-violet-700 hover:bg-violet-600 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]">
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </Button>
            </a> */}
          </motion.div>
        </motion.div>
      </div>
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
          className="absolute inset-0 flex items-center justify-center"
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
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-violet-300">{text}</h2>
        </motion.div>
      ))}
    </>
  )
}
