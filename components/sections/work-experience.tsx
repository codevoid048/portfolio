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
    <section id="work" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-background/90" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-foreground">Experience</h2>

          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="relative rounded-xl border border-border bg-card/50 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                    <p className="text-sm font-bold text-muted-foreground">{exp.company} • {exp.period}</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">{exp.summary}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
