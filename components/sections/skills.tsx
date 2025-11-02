import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Trophy, Hash } from "lucide-react"
import { useProfileWebSocket } from "@/hooks/useProfileWebSocket"

export default function Skills() {
  const [cpProfiles, setCpProfiles] = useState<any[]>([])

  interface ProfileData {
    leetcode: { username: string; rank: number; rating: number }
    codeforces: { username: string; rank: string; rating: number }
    gfg: { username: string; rank: string; rating: number }
    codechef: { username: string; rank: number; rating: number; stars: string }
  }

  const data = useProfileWebSocket("code__void") as ProfileData | null

  useEffect(() => {
    if (!data) return

    const profiles = [
      {
        platform: "LeetCode",
        username: data.leetcode.username,
        logo: "/leetcode.svg",
        rating: data.leetcode.rating,
        rank: data.leetcode.rank,
        url: `https://leetcode.com/u/${data.leetcode.username}/`,
      },
      {
        platform: "Codeforces",
        username: data.codeforces.username,
        logo: "/codeforces.svg",
        rating: data.codeforces.rating,
        rank: data.codeforces.rank,
        url: `https://codeforces.com/profile/${data.codeforces.username}`,
      },
      {
        platform: "GeeksforGeeks",
        username: data.gfg.username,
        logo: "/gfg.svg",
        rating: data.gfg.rating,
        rank: data.gfg.rank,
        url: `https://auth.geeksforgeeks.org/user/${data.gfg.username}`,
      },
      {
        platform: "CodeChef",
        username: data.codechef.username,
        logo: "/codechef.svg",
        rating: data.codechef.rating,
        rank: data.codechef.rank,
        url: `https://www.codechef.com/users/${data.codechef.username}`,
      },
    ]

    setCpProfiles(profiles)
  }, [data])

  // Skills organized by category for better bento layout
  const skillCategories = {
    languages: ["C", "C++", "Python", "Java", "JavaScript", "TypeScript"],
    technologies: ["React", "Next.js", "Express.js", "Node.js", "FastAPI", "LangChain", "LlamaIndex", "FAISS"],
    databases: ["MongoDB", "MySQL", "PostgreSQL", "Redis", "ChromaDB"],
    tools: ["Git", "Docker", "Linux", "AWS Lambda", "AWS S3", "CloudWatch", "CloudFormation", "Cloudflare"]
  }

  const allSkills = Object.values(skillCategories).flat()

  return (
    <section id="skills" className="py-6 md:py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-background/80"></div>

      {/* Subtle floating elements */}
      <motion.div
        className="absolute top-20 left-16 w-8 h-8 border border-accent/20 rounded-full"
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-24 right-20 w-6 h-6 bg-accent/10 rounded-lg"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="animate-on-scroll max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold font-sans mb-6 text-center text-foreground"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            My Skills
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {allSkills.map((skill, index) => (
              <SkillPill key={index} skill={skill} delay={index * 0.03} />
            ))}
          </div>

          {/* Competitive Programming Profiles */}
          {cpProfiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8"
            >
              <h3 className="text-lg font-semibold text-center text-muted-foreground mb-4">
                Competitive Programming
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {cpProfiles.map((profile, index) => (
                  <CPProfilePill
                    key={profile.platform}
                    profile={profile}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function SkillPill({ skill, delay }: { skill: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 12, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        bounce: 0.4,
        stiffness: 100
      }}
      whileHover={{
        scale: 1.05,
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.95 }}
      className="whitespace-nowrap font-bold rounded-lg border border-border px-3 py-1 text-xs md:text-sm text-muted-foreground hover:bg-accent/50 hover:border-accent/60 hover:text-accent-foreground transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-accent/30"
    >
      {skill}
    </motion.span>
  )
}

function CPProfilePill({
  profile,
  delay
}: {
  profile: {
    platform: string
    username: string
    logo: string
    rating: number
    rank: string | number
    url: string
  }
  delay: number
}) {
  const displayValue = profile.rating > 0 ? profile.rating : profile.rank

  return (
    <motion.a
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        bounce: 0.4
      }}
      whileHover={{
        scale: 1.05,
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card/50 hover:bg-card hover:border-accent/60 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50 group"
    >
      <div className="relative w-5 h-5 flex-shrink-0">
        <Image
          src={profile.logo}
          alt={`${profile.platform} logo`}
          width={20}
          height={20}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col">
        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">
          @{profile.username}
        </span>
        <div className="flex items-center gap-1">
          {profile.rating > 0 ? (
            <Hash className="w-3 h-3 text-accent" />
          ) : (
            <Trophy className="w-3 h-3 text-accent" />
          )}
          <span className="text-xs font-bold text-accent-foreground">
            #{displayValue}
          </span>
        </div>
      </div>
    </motion.a>
  )
}