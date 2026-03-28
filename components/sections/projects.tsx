import { Github, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "CodeQuest",
    description: "Designed and implemented a daily Problem of the Day (POTD) platform that delivers curated coding challenges and tracks user performance through personal profiles and real-time leaderboards. Engineered the profile linkage and automated synchronization of user statistics across Leetcode, Codeforces, GFG, and CodeChef, which eliminated 95% of manual profile updates.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Redis", "Docker"],
    github: "https://github.com/codevoid048/codequest",
    link: "https://codequest.srkrcodingclub.in"
  },
  {
    title: "AI Yoga Assistant",
    description: "Built an AI Yoga Assistant that provides users with personalized feedback and real-time pose detection using move-net model with an accuracy of 89%. Developed and integrated the backend and data flow components to process model outputs and deliver instant feedback to users through a responsive interface.",
    tags: ["React", "Node.js", "TensorFlow", "MoveNet"],
    link: "https://aiyogatutor.netlify.app/"
  },
  {
    title: "The Raja Cycle Stores",
    description: "Delivered end-to-end e-commerce solution for a local business, managing the full project lifecycle from requirements gathering to deployment. Built scalable cloud infrastructure with AWS Lambda/S3 and optimized performance using Redis caching and Cloudflare CDN.",
    tags: ["Next.js", "AWS Serverless", "Redis", "Cloudflare"],
    link: "https://www.therajacyclestores.com"
  }
]

export default function Projects({ className }: { className?: string }) {
  return (
    <section className={cn("space-y-8", className)}>
      <h2 className="text-lg font-semibold text-foreground">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project, idx) => (
          <div 
            key={idx}
            className="group block p-5 bg-card/50 hover:bg-card border border-border/50 rounded-xl transition-all duration-300 hover:shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <div className="flex gap-2 text-muted-foreground shrink-0">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-1 bg-secondary/50 rounded-md text-secondary-foreground font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}