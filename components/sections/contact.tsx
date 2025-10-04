import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mail, Github, Linkedin, MapPin, PhoneCall } from "lucide-react"
import emailjs from "@emailjs/browser"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
  
    emailjs
      .send(
        'service_5vsq629',
        'template_huaqwe4',
        {
          name: formState.name,
          email: formState.email,
          message: formState.message,
        },
        'ob9xLxZbsRGqvatmZ'
      )
      .then(() => {
        setIsSubmitting(false)
        setIsSubmitted(true)
        setFormState({ name: "", email: "", message: "" })
  
        setTimeout(() => setIsSubmitted(false), 5000)
      })
      .catch((err) => {
        setIsSubmitting(false)
        console.error('Email send error:', err)
      })
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Subtle background overlay for better readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="animate-on-scroll"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600">
              Get In Touch
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-violet-700/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-violet-900/30 border border-violet-700/50 rounded-lg p-4 text-center"
                  >
                    <p className="text-violet-300 font-medium">
                      Thank you for your message! I'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="bg-gray-800/50 border-gray-700 focus:border-violet-500 focus:ring-violet-500 text-white"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="bg-gray-800/50 border-gray-700 focus:border-violet-500 focus:ring-violet-500 text-white"
                        placeholder="your.email@mail.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        className="bg-gray-800/50 border-gray-700 focus:border-violet-500 focus:ring-violet-500 text-white min-h-[150px]"
                        placeholder="Your message here..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-violet-700 hover:bg-violet-600 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-violet-700/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <ContactItem
                    icon={<Mail className="h-6 w-6" />}
                    title="Email"
                    content="williamkeri007@gmail.com"
                    href="mailto:williamkeri007@gmail.com"
                  />

                  <ContactItem
                    icon={<Github className="h-6 w-6" />}
                    title="GitHub"
                    content="github.com/codevoid048"
                    href="https://github.com/codevoid048"
                  />

                  <ContactItem
                    icon={<Linkedin className="h-6 w-6" />}
                    title="LinkedIn"
                    content="linkedin.com/in/codevoid"
                    href="https://linkedin.com/in/codevoid"
                  />

                  <ContactItem
                    icon={<MapPin className="h-6 w-6" />}
                    title="Location"
                    content="Bhimavaram, AP"
                    href="https://srkrec.edu.in/"
                  />

                  <ContactItem
                    icon={<PhoneCall className="h-6 w-6" />}
                    title="Phone Number"
                    content="9966542463"
                    href="tel:+919966542463"
                  />
                </div>

                <div className="mt-8">
                  <h3 className="text-gray-300 mb-2">Let's connnect and create impactful solutions</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ContactItem({
  icon,
  title,
  content,
  href,
}: {
  icon: React.ReactNode
  title: string
  content: string
  href: string
}) {
  return (
    <div className="flex items-start">
      <div className="p-3 bg-violet-700/20 rounded-lg mr-4">{icon}</div>
      <div>
        <h4 className="text-lg font-medium text-white">{title}</h4>
        <a
          href={href}
          className="text-gray-300 hover:text-violet-400 transition-colors duration-300"
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {content}
        </a>
      </div>
    </div>
  )
}
