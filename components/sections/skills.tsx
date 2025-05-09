import { motion } from "framer-motion"
import Image from "next/image"

export default function Skills() {
  // Combine all skills into a single array without categories
  const skills = [
    // Frontend
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Cpp", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
    //{ name: "Framer Motion", icon: "/placeholder.svg?height=60&width=60" },
    // Backend
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" },
    { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg" },
    //{ name: "Python", icon: "/placeholder.svg?height=60&width=60" },
    //{ name: "Django", icon: "/placeholder.svg?height=60&width=60" },
    { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
    //{ name: "REST APIs", icon: "/placeholder.svg?height=60&width=60" },
    // Database
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
    //{ name: "PostgreSQL", icon: "/placeholder.svg?height=60&width=60" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
    //{ name: "Firebase", icon: "/placeholder.svg?height=60&width=60" },
    // DevOps & Tools
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    //{ name: "AWS", icon: "/placeholder.svg?height=60&width=60" },
    //{ name: "Figma", icon: "/placeholder.svg?height=60&width=60" },
    //{ name: "VS Code", icon: "/placeholder.svg?height=60&width=60" },
  ]

  return (
    <section id="skills" className="py-20 bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <FloatingGradients />

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
              My Skills
            </span>
          </h2>

          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 justify-items-center">
            {skills.map((skill, index) => (
              <SkillIcon key={index} skill={skill} delay={index * 0.05} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SkillIcon({ skill, delay }: { skill: { name: string; icon: string }; delay: number }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        className="relative w-16 h-16 mb-2 bg-gray-800/50 rounded-xl p-2 flex items-center justify-center group"
        whileHover={{
          y: -5,
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
          backgroundColor: "rgba(139, 92, 246, 0.2)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Image
          src={skill.icon || "/placeholder.svg"}
          alt={skill.name}
          width={40}
          height={40}
          className="transition-all duration-300 group-hover:scale-110"
        />
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-violet-600/20 to-purple-600/20 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </motion.div>
      <motion.p
        className="text-sm text-gray-400 text-center transition-colors duration-300 group-hover:text-violet-400"
        whileHover={{ color: "rgb(167, 139, 250)" }}
      >
        {skill.name}
      </motion.p>
    </motion.div>
  )
}

// Animated background component for visual interest
function FloatingGradients() {
  return (
    <>
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-900 to-transparent"></div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-900 to-transparent"></div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-900/10 blur-[100px]"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-900/10 blur-[100px]"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </>
  )
}
