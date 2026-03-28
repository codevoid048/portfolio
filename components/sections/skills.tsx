import { cn } from "@/lib/utils"

const skillCategories = [
  {
    name: "Languages",
    skills: ["C++", "Python", "JavaScript", "TypeScript", "SQL"]
  },
  {
    name: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion"]
  },
  {
    name: "Backend",
    skills: ["Node.js", "FastAPI", "Express", "PostgreSQL", "Redis"]
  },
  {
    name: "DevOps & Cloud",
    skills: ["AWS", "Docker", "Git", "Cloudflare"]
  }
]

export default function Skills({ className }: { className?: string }) {
  return (
    <section className={cn("space-y-8", className)}>
      <h2 className="text-lg font-semibold text-foreground">Stack</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {skillCategories.map((category) => (
          <div key={category.name} className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-md text-sm border border-border/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}