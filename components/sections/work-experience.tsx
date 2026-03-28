import { cn } from "@/lib/utils"

type Experience = {
  role: string
  company: string
  period: string
  summary: string
  type: "Full-time" | "Internship" | "Part-time" | "Freelance"
}

const experiences: Experience[] = [
  {
    role: "SDE Intern",
    company: "CoComply AI",
    period: "Nov 2025 - Present",
    type: "Internship",
    summary: "Built compliance and workflow automation tools for international banking clients using Django, Next.js, and LLM-powered features. Developed internal dashboards that reduced manual compliance review time for banking operations. Collaborated with cross-functional teams across time zones to deliver enterprise-grade features under tight regulatory requirements.",
  },
  {
    role: "Full Stack Developer Intern",
    company: "LabFox.Studio",
    period: "Jul 2025 - Nov 2025",
    type: "Internship",
    summary: "Contributed to backend architecture leveraging FastAPI, Kafka and LangGraph to power RAG features. Developed comprehensive APIs to integrate data from open-source DataHub SDKs, REST OpenAPIs, and GraphQL endpoints, resulting in a 30-40% improvement in API response times. Implemented scalable dataset processing pipelines through strategic chunking and optimized retrieval workflows.",
  },
  {
    role: "Freelance Full Stack Developer",
    company: "Self-Employed",
    period: "Jul 2025 - Present",
    type: "Freelance",
    summary: "Delivered 3 client projects end-to-end across e-commerce and business presence verticals, managing the full project lifecycle from requirements gathering to deployment. All delivered projects remain in active production with ongoing support and client referrals driving 50% of new engagements.",
  },
]

export default function WorkExperience({ className }: { className?: string }) {
  return (
    <section className={cn("space-y-8", className)}>
      <h2 className="text-lg font-semibold text-foreground">Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="group relative border-l border-border/50 pl-6 pb-2">
            <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border border-border bg-background group-hover:border-foreground transition-colors" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="font-medium text-foreground">{exp.role}</h3>
              <span className="text-xs text-muted-foreground font-mono">{exp.period}</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-sm font-medium text-muted-foreground">{exp.company}</p>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground font-medium uppercase tracking-wider">
                {exp.type}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
              {exp.summary}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
