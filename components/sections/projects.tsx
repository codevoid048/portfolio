import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AnimatedBackground } from "@/components/ui/animated-background"

export default function Projects() {
  const [activeTab, setActiveTab] = useState<"personal" | "freelance">("personal")

  const personalProjects = [
    {
      title: "CodeQuest",
      description:
        "A POTD platform for enhancing the problem solving skills. And also a coding profile aggregator that syncs user stats across LeetCode, Codeforces, GFG, and CodeChef.",
      image: "/codequest.jpg",
      tags: ["TypeScript", "TypeSense", "Express", "MongoDB"],
      github: "https://github.com/codevoid048/codequest",
      demo: "https://codequest.srkrcodingclub.in",
    },
    {
      title: "AI Yoga Assistant",
      description:
        "An AI-powered yoga assistant that provides personalized yoga routines and guidance.",
      image: "/ai-yoga.jpg",
      tags: ["React.js", "Node.js", "MongoDB", "TensorFlow move-net"],
      //github: "",
      demo: "https://aiyogatutor.netlify.app/",
    },
    {
      title: "Geo-location Based Attendance System",
      description:
        "Automatic Attendance Tracking System that checks in employees within a 200-meter office radius and check them out upon their departure.",
      image: "/geo-attendance.webp",
      tags: ["React.js", "Node.js", "MongoDB"],
      github: "https://github.com/codevoid048/sih-gail-web/tree/master",
    }
  ]

  const freelanceProjects = [
    {
      title: "The Raja Cycle Stores",
      description:
        "Developed a scalable serverless e-commerce platform with robust cloud infrastructure using AWS Lambda, S3, and CloudFormation. Implemented Redis caching for backend optimization and integrated Cloudflare for global CDN to enhance performance. Designed secure APIs for product management, demonstrating expertise in full-stack development and cloud-native architecture.",
      image: "/cycle-store.webp",
      tags: ["Next.js", "TypeScript", "Node.js", "Express.js", "AWS Lambda", "AWS S3", "Cloudflare CDN", "MongoDB", "Redis"],
      demo: "https://www.therajacyclestores.com",
    }
  ]

  return (
    <section id="projects" className="py-20 bg-gray-900/50 relative overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="animate-on-scroll max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600">
              Featured Projects
            </span>
          </h2>

          {/* Tab Toggle */}
          <div className="mb-12">
            <div className="bg-gray-800/50 p-1.5 rounded-full flex w-fit mx-auto shadow-inner">
              <TabButton active={activeTab === "personal"} onClick={() => setActiveTab("personal")}>
                Personal Projects
              </TabButton>
              <TabButton active={activeTab === "freelance"} onClick={() => setActiveTab("freelance")}>
                Freelance Experience
              </TabButton>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
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

function PersonalProjectsContent({ projects }: { projects: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap justify-center gap-8">
        {projects.map((project, index) => (
          <div key={index} className="w-full sm:w-[45%] lg:w-[30%]">
            <ProjectCard project={project} index={index} />
          </div>
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
      <div className="max-w-5xl mx-auto">
        {projects.map((project, index) => (
          <FreelanceProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </motion.div>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: {
    title: string
    description: string
    image: string
    tags: string[]
    github?: string
    demo?: string
  }
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-violet-700/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={600}
          height={400}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-violet-400 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.map((tag, tagIndex) => (
            <Badge
              key={tagIndex}
              variant="outline"
              className="bg-gray-800/50 text-violet-300 border-violet-700/30 hover:bg-violet-700/20"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between">
          {project.github && <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-300 hover:text-violet-400 transition-colors duration-300"
          >
            <Github className="h-5 w-5 mr-1" />
            <span>Repo</span>
          </a>
          }

          {project.demo && <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-300 hover:text-violet-400 transition-colors duration-300"
          >
            <ExternalLink className="h-5 w-5 mr-1" />
            <span>Live Demo</span>
          </a>
          }
        </div>
      </div>

      {/* Glowing effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 to-purple-600/10"></div>
        <div className="absolute -inset-0.5 bg-gradient-to-tr from-violet-600/0 to-purple-600/0 group-hover:from-violet-600/20 group-hover:to-purple-600/20 rounded-xl blur-xl transition-all duration-500"></div>
      </motion.div>
    </motion.div>
  )
}

function FreelanceProjectCard({
  project,
  index,
}: {
  project: {
    title: string
    description: string
    image: string
    tags: string[]
    github?: string
    demo?: string
  }
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-violet-700/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="relative w-full lg:w-3/5 h-80 lg:h-auto overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={600}
            height={400}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent lg:bg-gradient-to-r"></div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-2/5 p-6 lg:p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-violet-400 transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags?.map((tag, tagIndex) => (
              <Badge
                key={tagIndex}
                variant="outline"
                className="bg-gray-800/50 text-violet-300 border-violet-700/30 hover:bg-violet-700/20"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors duration-300 hover:shadow-lg hover:shadow-violet-600/25"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                <span>Website Link</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Glowing effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 to-purple-600/10"></div>
        <div className="absolute -inset-0.5 bg-gradient-to-tr from-violet-600/0 to-purple-600/0 group-hover:from-violet-600/20 group-hover:to-purple-600/20 rounded-xl blur-xl transition-all duration-500"></div>
      </motion.div>
    </motion.div>
  )
}
