import type React from "react"

import { motion } from "framer-motion"
import { Award, BookOpen, Briefcase, GraduationCap } from "lucide-react"
import { AnimatedBackground } from "@/components/ui/animated-background"

export default function Achievements() {
  const achievements = [
    {
      title: "Bachelor's Degree in Computer Science",
      date: "2023 - Present",
      description: "Pursuing with 8.1 CGPA at SRKREC, Bhimavaram",
      icon: <GraduationCap className="h-6 w-6" />,
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
    <section id="achievements" className="py-20 bg-black relative overflow-hidden">
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
              Achievements & Experience
            </span>
          </h2>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-violet-600/80 via-purple-600/80 to-violet-600/80 transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <TimelineItem key={index} achievement={achievement} index={index} isLeft={index % 2 === 0} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function TimelineItem({
  achievement,
  index,
  isLeft,
}: {
  achievement: {
    title: string
    date: string
    description: string
    icon: React.ReactNode
  }
  index: number
  isLeft: boolean
}) {
  return (
    <motion.div
      className={`relative flex flex-col md:flex-row ${isLeft ? "md:flex-row-reverse" : ""}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 top-0 w-6 h-6 rounded-full bg-violet-600 shadow-[0_0_10px_rgba(139,92,246,0.8)] transform -translate-x-1/2 z-10"></div>

      {/* Content */}
      <div className={`md:w-1/2 pl-10 md:pl-0 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-violet-700/50 transition-all duration-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-violet-700/20 rounded-lg mr-3">{achievement.icon}</div>
            <h3 className="text-xl font-semibold text-white">{achievement.title}</h3>
          </div>

          <div className="mb-2 text-violet-400 font-medium">{achievement.date}</div>

          <p className="text-gray-300">{achievement.description}</p>
        </div>
      </div>
    </motion.div>
  )
}
