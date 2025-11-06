import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Projects() {
  const [activeTab, setActiveTab] = useState<"personal" | "freelance">("freelance")

  const personalProjects = [
    {
      title: "Code Indexer",
      description:
        "Built a code indexing and retrieval system using FAISS vector DB and LlamaIndex to enable fast, semantic search of codebases. Implemented chunking and querying pipelines to optimize code parsing. Implemented RAG workflows for context-aware code query responses.",
      tags: ["LlamaIndex", "FAISS", "Tree-sitter", "LRU cache", "FastAPI"],
      github: "https://github.com/codevoid048/code-indexer"
    },
    {
      title: "CodeQuest",
      description:
        "A Problem of the Day platform for enhancing problem-solving skills for our college. And also a coding profile aggregator that syncs user stats across LeetCode, Codeforces, GFG, and CodeChef.",
      tags: ["React.js", "TypeScript", "Express", "MongoDB", "Docker"],
      github: "https://github.com/codevoid048/codequest",
      demo: "https://codequest.srkrcodingclub.in",
    },
    {
      title: "AI Yoga Assistant",
      description:
        "An AI Yoga Assistant that provided users with personalized feedback and real-time pose detection using move-net model with an accuracy of 89%.",
      tags: ["React.js", "Node.js", "MongoDB", "TensorFlow move-net"],
      //github: "",
      demo: "https://aiyogatutor.netlify.app/",
    },
    {
      title: "Geo-location Based Attendance System",
      description:
        "Automatic Attendance Tracking System that checks in employees within a 200-meter office radius and check them out upon their departure.",
      tags: ["React.js", "Node.js", "MongoDB"],
    }
  ]

  const freelanceProjects = [
    {
      title: "The Raja Cycle Stores",
      description:
        "Developed a scalable serverless e-commerce platform with robust cloud infrastructure using AWS Lambda, S3, and CloudFormation. Implemented Redis caching for backend optimization and integrated Cloudflare for global CDN to enhance performance. Designed secure APIs for product management, demonstrating expertise in full-stack development and cloud-native architecture.",
      tags: ["Next.js", "TypeScript", "Node.js", "Express.js", "AWS Lambda", "AWS S3", "Cloudflare CDN", "MongoDB", "Redis"],
      demo: "https://www.therajacyclestores.com",
    },
    {
      title: "Balaji Traders",
      description:
        "Currently developing a comprehensive e-commerce platform for Balaji Traders, a cement and building materials company. Features include product catalog showcase, detailed product listings with specifications, customer inquiry system, and a complete admin panel for inventory management, order processing, and content management.",
      tags: ["Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB"],
    }
  ]

  return (
    <section id="projects" className="py-6 md:py-10 relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="animate-on-scroll max-w-6xl mx-auto"
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
            Projects
          </motion.h2>

          {/* Tab Toggle */}
          <div className="mb-6">
            <div className="bg-card/10 border border-border p-1.5 rounded-full flex w-fit mx-auto shadow-inner">
              <TabButton active={activeTab === "freelance"} onClick={() => setActiveTab("freelance")}>
                Freelance
              </TabButton>
              <TabButton active={activeTab === "personal"} onClick={() => setActiveTab("personal")}>
                Personal
              </TabButton>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            <AnimatePresence>
              {activeTab === "personal" && (
                <PersonalProjectsContent projects={personalProjects} />
              )}
              {activeTab === "freelance" && (
                <FreelanceProjectsContent projects={freelanceProjects} />
              )}
            </AnimatePresence>
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
      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
        active
          ? "bg-accent/40 text-accent-foreground border border-border"
          : "text-foreground hover:text-foreground hover:bg-accent/30 border border-transparent"
      }`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="activeTabBW"
          className="absolute inset-0 rounded-full -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  )
}

function PersonalProjectsContent({ projects }: { projects: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} type="Personal" />
        ))}
      </div>
    </motion.div>
  )
}

function FreelanceProjectsContent({ projects }: { projects: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} type="Freelance" />
        ))}
      </div>
    </motion.div>
  )
}

function ProjectCard({
  project,
  index,
  type,
}: {
  project: {
    title: string
    description: string
    tags: string[]
    github?: string
    demo?: string
  }
  index: number
  type: "Personal" | "Freelance"
}) {
  return (
    <motion.div
      className="relative rounded-xl border border-border bg-card/10 p-6 group"
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        bounce: 0.3
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        rotateY: 2,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/20 via-accent/30 to-accent/20 opacity-0 group-hover:opacity-100"
        initial={false}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Floating particles on hover */}
      <motion.div
        className="absolute -top-2 -right-2 w-2 h-2 bg-accent rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
          y: -20
        }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.div
        className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-accent rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
          y: 20
        }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />

      <motion.h3
        className="text-xl font-bold mb-2 text-foreground"
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.2 }}
      >
        {project.title}
      </motion.h3>

      <motion.p
        className="text-foreground mb-4 leading-relaxed"
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        {project.description}
      </motion.p>

      {project.tags?.length ? (
        <motion.div
          className="flex flex-wrap gap-2 mb-4"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          {project.tags.map((tag, tagIndex) => (
            <motion.div
              key={tagIndex}
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{
                delay: index * 0.1 + 0.5 + tagIndex * 0.05,
                type: "spring",
                bounce: 0.5
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Badge
                variant="outline"
                className="bg-accent/50 text-accent-foreground border-border hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {tag}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      ) : null}

      <motion.div
        className="flex gap-6"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.6 }}
      >
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors z-10 relative"
            style={{ pointerEvents: 'auto' }}
          >
            <Github className="h-5 w-5 mr-1" />
            <span>Repo</span>
          </a>
        )}

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors z-10 relative"
            style={{ pointerEvents: 'auto' }}
          >
            <ExternalLink className="h-5 w-5 mr-1" />
            <span>Live</span>
          </a>
        )}
      </motion.div>
    </motion.div>
  )
}