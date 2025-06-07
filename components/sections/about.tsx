import type React from "react"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-900/50 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-violet-900/20 to-transparent opacity-30"></div>

      <div className="container mx-auto px-4">
        <motion.div
          className="animate-on-scroll"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600">
              About Me
            </span>
          </h2>

          <div className="w-full max-w-screen-md lg:max-w-4xl mx-auto text-center px-4">
          <motion.p
              className="text-balance text-base sm:text-lg md:text-xl text-gray-300 mb-6 leading-normal sm:leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I'm William Keri, a passionate Full Stack Developer and Competitive Programmer who thrives at the intersection of design and logic. I specialize in crafting modern, high-performance web applications using technologies like React.js, Next.js, Node.js, and MongoDB. I enjoy solving complex problems and building seamless user experiences from backend to frontend.
          </motion.p>

          <motion.p
            className="text-balance text-base sm:text-lg md:text-xl text-gray-300 mb-6 leading-normal sm:leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            With good global rankings on platforms like Codeforces, CodeChef, and GeeksForGeeks, I’ve consistently proven my problem-solving abilities. I’ve also led the development of impactful projects such as an AI Yoga Assistant and CodeQuest. Always eager to explore cutting-edge tech and build solutions that matter.
          </motion.p>

            <motion.div
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <SocialLink icon={<Github className="h-5 w-5" />} href="https://github.com/codevoid048" label="GitHub" />
              <SocialLink icon={<Linkedin className="h-5 w-5" />} href="https://linkedin.com/in/codevoid" label="LinkedIn" />
              <SocialLink icon={<Twitter className="h-5 w-5" />} href="https://x.com/code__void" label="Twitter" />
              <SocialLink icon={<Mail className="h-5 w-5" />} href="#contact" label="Email" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SocialLink({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-violet-700 transition-all duration-300 hover:shadow-[0_0_10px_rgba(139,92,246,0.5)]"
      aria-label={label}
    >
      {icon}
    </a>
  )
}
