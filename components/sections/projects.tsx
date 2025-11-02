import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Projects() {
  const [activeTab, setActiveTab] = useState<"personal" | "freelance">("freelance")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

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
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Subtle background overlay for better readability */}
      <div className="absolute inset-0 bg-background/80"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="animate-on-scroll max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
            Projects
          </h2>

          {/* Tab Toggle */}
          <div className="mb-12">
            <div className="bg-card/50 border border-border p-1.5 rounded-full flex w-fit mx-auto shadow-inner">
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

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-semibold text-foreground">{selectedProject.title}</h3>
                <button
                  onClick={closeModal}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">{selectedProject.description}</p>

              {selectedProject.tags?.length ? (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag: string, tagIndex: number) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="bg-accent/50 text-accent-foreground border-border"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}

              <div className="flex gap-6">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="h-5 w-5 mr-1" />
                    <span>View Repository</span>
                  </a>
                )}

                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-5 w-5 mr-1" />
                    <span>View Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
          ? "bg-accent text-accent-foreground border border-border"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50 border border-transparent"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
      className="relative rounded-xl border border-border bg-card/50 p-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
    >

      <h3 className="text-xl font-semibold mb-2 text-foreground">{project.title}</h3>

      <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

      {project.tags?.length ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <Badge
              key={tagIndex}
              variant="outline"
              className="bg-accent/50 text-accent-foreground border-border"
            >
              {tag}
            </Badge>
          ))}
        </div>
      ) : null}

      <div className="flex gap-6">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
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
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-5 w-5 mr-1" />
            <span>Live</span>
          </a>
        )}
      </div>
    </motion.div>
  )
}