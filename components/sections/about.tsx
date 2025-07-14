"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Twitter, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function About() {
  const [activeTab, setActiveTab] = useState<"about" | "resume">("about")

  return (
    <section id="about" className="py-20 bg-gray-900/50 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-violet-900/20 to-transparent opacity-30"></div>

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
            {/* Tab Toggle */}
            <div className="p-8 pb-0">
              <div className="bg-gray-800/50 p-1.5 rounded-full flex w-fit mx-auto shadow-inner">
                <TabButton active={activeTab === "about"} onClick={() => setActiveTab("about")}>
                  About Me
                </TabButton>
                <TabButton active={activeTab === "resume"} onClick={() => setActiveTab("resume")}>
                  Review Resume
                </TabButton>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8 pt-8 min-h-[500px]">
              <AnimatePresence mode="wait">
                {activeTab === "about" ? <AboutContent key="about" /> : <ResumeContent key="resume" />}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 rounded-full font-medium transition-all duration-300 relative ${
        active
          ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25"
          : "text-gray-300 hover:text-white hover:bg-gray-700/50"
      }`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-violet-600 rounded-full -z-10 shadow-lg shadow-violet-600/25"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  )
}

function AboutContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
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

      {/* Tech Stack Highlights */}
      {/* <div className="mb-8">
        <h4 className="text-lg font-semibold text-violet-400 mb-4">Core Technologies</h4>
        <div className="flex flex-wrap justify-center gap-3">
          {["React", "Node.js", "MongoDB", "Express.js", "Python", "TensorFlow", "Google Maps API", "TypeScript"].map(
            (tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gray-800/50 rounded-full text-sm text-gray-300 border border-gray-700/50"
              >
                {tech}
              </span>
            ),
          )}
        </div>
      </div> */}

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

function ResumeContent() {
  const resumeUrl = "/resume.pdf" // Replace with your actual resume PDF path

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-4 text-white">My Resume</h3>
        <p className="text-gray-300">Take a look at my professional experience, skills, and achievements.</p>
      </div>

      {/* PDF Embed */}
      <div className="bg-gray-800/30 rounded-xl p-4 shadow-inner">
        <div className="relative w-full h-[600px] rounded-lg overflow-hidden bg-white/5 border border-gray-700/50">
          <iframe
            src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full rounded-lg"
            title="William Keri Resume"
            loading="lazy"
          />
        </div>

        {/* Fallback Message */}
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm mb-3">Can't see the resume? No worries!</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              className="bg-violet-600 hover:bg-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in New Tab
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-violet-600 text-violet-400 hover:bg-violet-600/10 transition-all duration-300 bg-transparent"
            >
              <a href={resumeUrl} download="William_Keri_Resume.pdf">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </a>
            </Button>
          </div>
        </div>
      </div>
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
