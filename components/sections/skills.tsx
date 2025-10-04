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
      <div className="absolute inset-0 bg-black/20" />

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

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-0">
              {allSkills.map((skill, index) => (
                <SkillPill key={index} skill={skill} delay={index * 0.05} />
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
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20, rotateX: -15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.7, 
        delay,
        type: "spring",
        bounce: 0.2
      }}
      whileHover={{ 
        y: -12,
        rotateX: 10,
        rotateY: 5,
        scale: 1.1,
        z: 50
      }}
      className="group cursor-pointer"
      style={{ 
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      <div className="relative px-4 py-2 transition-all duration-500" 
           style={{ 
             transformStyle: "preserve-3d"
           }}>
        
        
        
        
        {/* 3D Top Surface */}
        <div className="relative bg-gradient-to-br from-gray-700/90 to-gray-800/90 backdrop-blur-xl border border-gray-500/40 rounded-3xl shadow-2xl group-hover:from-violet-800/80 group-hover:to-purple-800/80 group-hover:border-violet-400/60 transition-all duration-500"
             style={{ 
               transform: "translateZ(0px)",
               boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
             }}>
          
          {/* 3D Highlight Edge - Top */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-3xl" />
          
          {/* 3D Highlight Edge - Left */}
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent rounded-l-3xl" />
          
          {/* 3D Inner Glow */}
          <div className="absolute inset-1 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* 3D Depth Shadow */}
          <div className="absolute inset-0 rounded-3xl shadow-inner" 
               style={{ 
                 boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 -1px 2px rgba(255, 255, 255, 0.1)"
               }} />
          
          {/* Main Content */}
          <div className="relative px-4 py-2" style={{ transform: "translateZ(2px)" }}>
            <span className="relative text-sm md:text-base font-bold text-gray-100 group-hover:text-white transition-all duration-300 tracking-wide drop-shadow-lg">
              {skill}
            </span>
          </div>
        </div>
        
        {/* 3D Glow Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/40 group-hover:to-purple-500/40 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" 
             style={{ transform: "translateZ(-12px)" }} />
      </div>
    </motion.div>
  )
}
