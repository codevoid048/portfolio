import { motion } from "framer-motion"

export default function Skills() {
  // Skills organized by category for better bento layout
  const skillCategories = {
    languages: ["C", "C++", "Python", "Java", "JavaScript", "TypeScript"],
    technologies: ["React", "Next.js", "Express.js", "Node.js", "FastAPI", "LangChain", "LlamaIndex", "FAISS"],
    databases: ["MongoDB", "MySQL", "PostgreSQL", "Redis", "ChromaDB"],
    tools: ["Git", "Docker", "Linux", "AWS Lambda", "AWS S3", "CloudWatch", "CloudFormation", "Cloudflare"]
  }

  // Flatten all skills for the layout
  const allSkills = Object.values(skillCategories).flat()

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Subtle background overlay for better readability */}
      <div className="absolute inset-0 bg-background/80" />

      <div className="container mx-auto px-4">
        <motion.div
          className="animate-on-scroll"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">My Skills</h2>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {allSkills.map((skill, index) => (
                <SkillPill key={index} skill={skill} delay={index * 0.03} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SkillPill({ skill, delay }: { skill: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="whitespace-nowrap font-bold rounded-lg border border-border px-3 py-1 text-xs md:text-sm text-muted-foreground hover:bg-accent/50 hover:border-border transition-colors"
    >
      {skill}
    </motion.span>
  )
}