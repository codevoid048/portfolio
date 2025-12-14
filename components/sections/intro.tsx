"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter, MessageCircle } from "lucide-react"

export default function Intro() {
  return (
    <section id="about" className="pt-10 md:pt-28 pb-4 md:pb-10 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold font-sans tracking-tight text-foreground">
            William Keri
          </h1>
          <p className="mt-3 font-bold text-base md:text-lg text-foreground">
            Software Engineer • Competitive Programmer
          </p>

          <div className="mt-6">
            <span id="about" className="sr-only">About</span>
            <p className="text-foreground text-base md:text-lg leading-relaxed">
              Passionate Full Stack Developer with expertise in modern web technologies and AI/ML integration. Currently interning as Full-Stack Developer while freelancing on community and innovative projects. I specialize in building scalable applications with a strong foundation in competitive programming and cloud technologies like AWS and Docker, always focusing on delivering efficient, user-centric solutions that drive business value.
            </p>
          </div>

          <motion.div
            className="mt-4 flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SocialLink icon={<Github className="h-5 w-5" />} href="https://github.com/codevoid048" label="GitHub" />
            <SocialLink icon={<Linkedin className="h-5 w-5" />} href="https://linkedin.com/in/codevoid" label="LinkedIn" />
            <SocialLink icon={<Twitter className="h-5 w-5" />} href="https://x.com/code__void" label="Twitter" />
            <SocialLink icon={<MessageCircle className="h-5 w-5" />} href="https://wa.me/919966542463" label="Whatsapp" />
            <SocialLink icon={<Mail className="h-5 w-5" />} href="#contact" label="Email" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function SocialLink({
  icon,
  href,
  label,
}: {
  icon: React.ReactNode
  href: string
  label: string
}) {
  return (
    <motion.a
      href={href}
      className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-card/20 hover:bg-accent text-accent-foreground hover:text-accent-foreground transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:scale-110 border border-border"
      aria-label={label}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {icon}
    </motion.a>
  )
}