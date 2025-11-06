"use client"

import { motion } from "framer-motion"

type Experience = {
  role: string
  company: string
  period: string
  summary: string
}

const experiences: Experience[] = [
  {
    role: "Full Stack Developer Intern",
    company: "LabFox.Studio, Remote",
    period: "Jul 2025 - Present",
    summary: "Contribute to the backend architecture leveraging FastAPI, Kafka and LangGraph to power RAG features. Developed comprehensive APIs to integrate data from open-source DataHub SDKs, REST OpenAPIs, and GraphQL endpoints, resulting in 30-40% improved API response times. Implemented scalable dataset processing pipelines through strategic chunking and optimized retrieval workflows.",
  },
  {
    role: "Software Engineer",
    company: "Self-Employed",
    period: "Jul 2025 - Present",
    summary: "Managing end-to-end freelance projects independently, including client communication, requirement gathering, and technical negotiations to deliver tailored solutions. Architecting robust cloud infrastructure using AWS Lambda, S3, and CloudFormation for scalability and efficient resource management. Integrating Redis for backend caching and Cloudflare for global CDN and DNS management, improving performance.",
  },
]

export default function WorkExperience() {
  return (
    <section id="experience" className="py-8 md:py-16 relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="animate-on-scroll max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold font-sans mb-6 text-center text-foreground"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience
          </motion.h2>

          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.15,
                  type: "spring",
                  bounce: 0.3
                }}
                className="relative rounded-xl border border-border bg-card/10 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.15 + 0.2 }}
                  >
                    <h3 className="text-xl font-semibold font-sans text-foreground">{exp.role}</h3>
                    <p className="text-sm font-bold text-foreground">{exp.company} • {exp.period}</p>
                  </motion.div>
                </div>
                <motion.p
                  className="mt-4 text-foreground leading-relaxed"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.15 + 0.3 }}
                >
                  {exp.summary}
                </motion.p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
