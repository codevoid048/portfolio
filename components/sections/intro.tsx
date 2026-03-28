"use client";

import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Linkedin, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "about" | "github" | "linkedin" | "x" | "leetcode" | "codeforces";

type ProfileKey = Exclude<Tab, "about">;

interface ProfileCardData {
  tab: ProfileKey;
  title: string;
  handle: string;
  profileUrl: string;
  previewLabel: string;
  stats: Array<{ label: string; value: string }>;
  toneClass: string;
  followers?: string;
  following?: string;
  connections?: string;
}

const STATIC_PROFILES: Record<ProfileKey, ProfileCardData> = {
  github: {
    tab: "github",
    title: "GitHub",
    handle: "codevoid048",
    profileUrl: "https://github.com/codevoid048",
    previewLabel: "GitHub Profile Preview",
    followers: "15",
    following: "15",
    stats: [
      { label: "Repositories", value: "40+" },
      { label: "Contributions", value: "1600+" },
      { label: "Pinned Projects", value: "6" },
    ],
    toneClass: "text-slate-300",
  },
  linkedin: {
    tab: "linkedin",
    title: "LinkedIn",
    handle: "William Keri",
    profileUrl: "https://linkedin.com/in/codevoid",
    previewLabel: "LinkedIn Profile Preview",
    connections: "1700+",
    stats: [
      { label: "Role", value: "SDE Intern" },
      { label: "Works At", value: "CoComply AI" },
      { label: "Community", value: "Coding Club Lead" },
    ],
    toneClass: "text-[#0A66C2]",
  },
  x: {
    tab: "x",
    title: "X",
    handle: "@code__void",
    profileUrl: "https://x.com/code__void",
    previewLabel: "X Profile Preview",
    followers: "62",
    following: "122",
    stats: [
      { label: "I'm a", value: "Software Engineer" },
      { label: "Theme", value: "Dev + Devops" },
      { label: "Content", value: "Build in Public" },
    ],
    toneClass: "text-foreground",
  },
  leetcode: {
    tab: "leetcode",
    title: "LeetCode",
    handle: "code__void",
    profileUrl: "https://leetcode.com/u/code__void",
    previewLabel: "LeetCode Profile Preview",
    stats: [
      { label: "Rating", value: "1780" },
      { label: "Global Rank", value: "~ #72000" },
      { label: "Top", value: "9%" },
    ],
    toneClass: "text-[#FFA116]",
  },
  codeforces: {
    tab: "codeforces",
    title: "Codeforces",
    handle: "code__void",
    profileUrl: "https://codeforces.com/profile/code__void",
    previewLabel: "Codeforces Profile Preview",
    stats: [
      { label: "Rating", value: "1350+" },
      { label: "Rank", value: "Pupil" },
      { label: "Best Finish", value: "Top 12%" },
    ],
    toneClass: "text-cyan-400",
  },
};

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
    </svg>
  );
}

function LeetCodeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.173 5.423a1.398 1.398 0 0 0-.18.158l-1.374 1.082a1.04 1.04 0 0 0 .275 1.786l2.75 1.25a1.361 1.361 0 0 0 2.158-1.015v-.063l5.053-8.87a1.367 1.367 0 0 0-.358-1.637 1.392 1.392 0 0 0-1.95.295l-.064.091zm-7.39 6.57a1.442 1.442 0 0 0-.488.087l-4.11 1.764a1.42 1.42 0 0 0-.472 2.378l6.836 6.136a1.407 1.407 0 0 0 1.942-.254l2.126-2.614a1.056 1.056 0 0 0-.61-1.764L6.99 11.2a1.366 1.366 0 0 0-.897-4.63zm-1.076 6.442a1.41 1.41 0 0 0-1.118 2.275l4.166 5.345a1.413 1.413 0 0 0 2.228.02l3.41-4.148a1.033 1.033 0 0 0-.43-1.666l-6.936-2.316a1.374 1.374 0 0 0-.32-.01z" />
      <path d="M18.847 8.356a5.05 5.05 0 0 0-3.328.796l.89 1.572a3.255 3.255 0 0 1 2.373-.591 3.28 3.28 0 0 1 2.508 1.44 3.281 3.281 0 0 1-.36 4.146 3.282 3.282 0 0 1-4.045.242 3.258 3.258 0 0 1-1.21-2.285l-1.802.164a3.193 3.193 0 0 1-.065.518 5.071 5.071 0 0 0 2.103 4.226 5.08 5.08 0 0 0 6.568-.38 5.088 5.088 0 0 0 .546-6.685 5.084 5.084 0 0 0-4.178-2.663z" />
    </svg>
  );
}

function CodeforcesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="1.5" y="9" width="6" height="12" rx="1.5" fill="#FFC107" />
      <rect x="9" y="1.5" width="6" height="19.5" rx="1.5" fill="#2196F3" />
      <rect x="16.5" y="6" width="6" height="15" rx="1.5" fill="#F44336" />
    </svg>
  );
}

export default function Intro({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<Tab>("about");

  const activeProfile = useMemo(() => {
    if (activeTab === "about") {
      return null;
    }
    return STATIC_PROFILES[activeTab];
  }, [activeTab]);

  return (
    <section className={cn("flex flex-col gap-8", className)}>
      <div className="flex items-start gap-6">
        <div className="space-y-2 pt-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            William Keri
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm font-medium">
              SDE Intern @ CoComply AI
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <TabButton
              active={activeTab === "about"}
              onClick={() => setActiveTab("about")}
              icon={<Terminal className="h-4 w-4" />}
              label="About"
            />
            <TabButton
              active={activeTab === "github"}
              onClick={() => setActiveTab("github")}
              icon={<Github className="h-4 w-4" />}
              label="GitHub"
            />
            <TabButton
              active={activeTab === "linkedin"}
              onClick={() => setActiveTab("linkedin")}
              icon={<Linkedin className="h-4 w-4" />}
              label="LinkedIn"
            />
            <TabButton
              active={activeTab === "x"}
              onClick={() => setActiveTab("x")}
              icon={<XIcon className="h-4 w-4" />}
              label="X"
            />
            <TabButton
              active={activeTab === "leetcode"}
              onClick={() => setActiveTab("leetcode")}
              icon={<LeetCodeIcon className="h-4 w-4" />}
              label="LeetCode"
            />
            <TabButton
              active={activeTab === "codeforces"}
              onClick={() => setActiveTab("codeforces")}
              icon={<CodeforcesIcon className="h-4 w-4" />}
              label="Codeforces"
            />
          </div>
        </div>
      </div>

      <div className="min-h-[220px] relative">
        <AnimatePresence mode="wait">
          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 max-w-lg"
            >
              <p className="text-base text-muted-foreground leading-7">
                B.Tech CS student at SRKR Engineering College (CGPA: 8.08). SDE
                Intern at CoComply AI building compliance automation tools.
                Pupil on Codeforces (1350+), top performer on CodeChef, and 4th
                rank on GeeksforGeeks among 3000+ students. Technical Lead at
                SRKR Coding Club and Manager of CodeQuest POTD platform.
              </p>
            </motion.div>
          )}

          {activeProfile && (
            <StaticProfileCard key={activeProfile.tab} data={activeProfile} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2 rounded-md transition-all duration-200",
        active
          ? "bg-foreground text-background shadow-md scale-105"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
      )}
      title={label}
      type="button"
    >
      {icon}
    </button>
  );
}

function StaticProfileCard({
  data,
}: {
  data: ProfileCardData;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="border border-border rounded-xl p-5 bg-card/30 max-w-xl w-full"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className={cn("font-semibold text-lg", data.toneClass)}>
              {data.title}
            </h3>
            <p className="text-sm text-foreground">{data.handle}</p>
            <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
              {data.connections ? (
                <span>Connections: <span className="font-semibold text-foreground">{data.connections}</span></span>
              ) : (
                <>
                  {data.followers && <span>Followers: <span className="font-semibold text-foreground">{data.followers}</span></span>}
                  {data.following && <span>Following: <span className="font-semibold text-foreground">{data.following}</span></span>}
                </>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href={data.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-md transition-colors flex items-center gap-1.5 font-medium"
            >
              Open Profile <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {data.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border/60 bg-background/40 p-3"
            >
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
              <p className="text-lg font-semibold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
