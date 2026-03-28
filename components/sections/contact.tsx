import { Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Contact({ className }: { className?: string }) {
  return (
    <section className={cn("space-y-4", className)}>
      <h2 className="text-lg font-semibold text-foreground">Get in Touch</h2>
      <p className="text-muted-foreground leading-relaxed max-w-prose">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
      </p>
      <a 
        href="mailto:williamkeri007@gmail.com"
        className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors hover:underline underline-offset-4"
      >
        <Mail className="h-4 w-4" />
        <span>williamkeri007@gmail.com</span>
      </a>
    </section>
  )
}