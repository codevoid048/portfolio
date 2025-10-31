"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Subtle background overlay for better readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="container mx-auto px-4">
        <motion.div
          className="animate-on-scroll max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600">
              Get to Know Me
            </span>
          </h2>

          {/* Card Container */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
            {/* Content */}
            <div className="p-8">
              <AboutContent />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function AboutContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-6 text-white">Hi, I'm William Keri 👋</h3>

        <div className="space-y-6 text-lg leading-relaxed max-w-3xl mx-auto">
          <p className="text-gray-300">
            I'm a passionate <span className="text-violet-400 font-semibold">Full Stack Developer</span> specializing in
            the <span className="text-violet-400 font-semibold">MERN stack</span> (MongoDB, Express.js, React, Node.js).
            I create modern, scalable web applications that deliver exceptional user experiences.
          </p>

          <p className="text-gray-300">
            Beyond traditional web development, I'm deeply interested in{" "}
            <span className="text-violet-400 font-semibold">Machine Learning</span> and{" "}
            <span className="text-violet-400 font-semibold">AI integration</span>, building intelligent applications
            that solve real-world problems.
          </p>

          <p className="text-gray-300">
            My journey combines technical expertise with creative problem-solving, constantly exploring new technologies
            to build innovative solutions that make a difference. I'm passionate about clean code, user-centric design,
            and delivering high-quality software.
          </p>
        </div>
      </div>

      {/* Social Links */}
      <motion.div
        className="flex justify-center space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <SocialLink icon={<Github className="h-5 w-5" />} href="https://github.com/codevoid048" label="GitHub" />
        <SocialLink icon={<Linkedin className="h-5 w-5" />} href="https://linkedin.com/in/codevoid" label="LinkedIn" />
        <SocialLink icon={<Twitter className="h-5 w-5" />} href="https://x.com/code__void" label="X" />
        <SocialLink icon={<Mail className="h-5 w-5" />} href="#contact" label="Email" />
      </motion.div>
    </motion.div>
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
      className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/50 hover:bg-violet-700 text-gray-300 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-violet-700/25 hover:scale-110 border border-gray-700/50"
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
