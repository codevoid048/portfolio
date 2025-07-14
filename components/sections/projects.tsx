import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AnimatedBackground } from "@/components/ui/animated-background"

export default function Projects() {
  const projects = [
    {
      title: "CodeQuest",
      description:
        "A POTD platform for enhancing the problem solving skills. And also a coding profile aggregator that syncs user stats across LeetCode, Codeforces, GFG, and CodeChef.",
      image: "/codequest.jpg?height=400&width=600",
      tags: ["TypeScript", "TypeSense", "Express", "MongoDB"],
      github: "https://github.com/codevoid048/codequest",
      //demo: "https://example.com",
    },
    {
      title: "AI Yoga Assistant",
      description:
        "An AI-powered yoga assistant that provides personalized yoga routines and guidance.",
      image: "/ai-yoga.jpg?height=400&width=600",
      tags: ["React.js", "Node.js", "MongoDB", "TensorFlow move-net"],
      //github: "",
      demo: "https://aiyogatutor.netlify.app/",
    },
    {
      title: "Geo-location Based Attendance System",
      description:
        "Automatic Attendance Tracking System that checks in employees within a 200-meter office radius and check them out upon their departure.",
      image: "/geo-attendance.webp?height=400&width=600",
      tags: ["React.js", "Node.js", "MongoDB"],
      github: "https://github.com/codevoid048/sih-gail-web/tree/master",
    }
  ]

  return (
    <section id="projects" className="py-20 bg-gray-900/50 relative overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground />

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
              Featured Projects
            </span>
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            {projects.map((project, index) => (
              <div key={index} className="w-full sm:w-[45%] lg:w-[30%]">
                  <ProjectCard key={index} project={project} index={index} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
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
    github: string
    demo: string
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
          fill
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
          {project.tags.map((tag, tagIndex) => (
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
