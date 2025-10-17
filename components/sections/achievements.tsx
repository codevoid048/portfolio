import type React from "react"

import { motion } from "framer-motion"
import { Award, BookOpen, Briefcase, GraduationCap } from "lucide-react"
import ElectricBorder from "@/components/ui/electric-border"

export default function Achievements() {
  const achievements = [
    {
      title: "Freelance Full Stack Developer",
      date: "July 2025 - Present",
      description: "Providing end-to-end freelance services including design to deployment",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      title: "Full Stack Developer Intern",
      date: "July 2025 - Present",
      description: "Gaining hands-on experience with modern AI infra design and Python backend development",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      title: "Ranking #4 on GFG",
      date: "2023 - Present",
      description: "Among top 5 rankers on GeeksforGeeks in SRKR Institute",
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: "Web Developer",
      date: "2024 - 2025",
      description: "Worked at CSE Dept. of SRKREC, developing responsive web application",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      title: "Secured 3 prize in Vedic Vision Hackathon",
      date: "Aug 2024",
      description: "An internal Hackathon organised by AST Club from SRKR",
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: "Secured in Top 20 at WCC",
      date: "OCT 2024",
      description: "A national level coding competition organised by VNRVJIET, Hyderabad",
      icon: <Award className="h-6 w-6" />,
    },
  ]

  return (
    <section id="achievements" className="py-20 relative overflow-hidden">
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
              Achievements & Experience
            </span>
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <AchievementCard 
                  key={index} 
                  achievement={achievement} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function AchievementCard({
  achievement,
  index,
}: {
  achievement: {
    title: string
    date: string
    description: string
    icon: React.ReactNode
  }
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        bounce: 0.2
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="group cursor-pointer"
    >
      <ElectricBorder
        color="#8b5cf6"
        speed={0.8}
        chaos={0.3}
        thickness={2}
        style={{ borderRadius: 16 }}
        className="h-full"
      >
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 h-full relative overflow-hidden">
        {/* Icon and Title */}
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 bg-violet-700/20 rounded-xl group-hover:bg-violet-700/30 transition-colors duration-300 flex-shrink-0">
            {achievement.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-semibold text-white leading-tight group-hover:text-violet-200 transition-colors duration-300">
              {achievement.title}
            </h3>
          </div>
        </div>

        {/* Date */}
        <div className="mb-3 text-sm text-violet-400 font-medium">
          {achievement.date}
        </div>

        {/* Description - Hidden on small screens, shown on medium+ */}
        <p className="text-gray-300 text-sm leading-relaxed hidden md:block group-hover:text-gray-200 transition-colors duration-300">
          {achievement.description}
        </p>

          {/* Hover effect gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-purple-600/0 group-hover:from-violet-600/5 group-hover:to-purple-600/5 rounded-2xl transition-all duration-500 pointer-events-none" />
        </div>
      </ElectricBorder>
    </motion.div>
  )
}
