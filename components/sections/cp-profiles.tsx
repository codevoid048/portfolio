import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Trophy, Star, Code, Hash } from "lucide-react"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { useProfileWebSocket } from "@/hooks/useProfileWebSocket"

export default function CPProfiles() {
    const [profiles, setProfiles] = useState<any[]>([])

    interface ProfileData {
        leetcode: {
            username: string
            rank: number
            rating: number
            problemsSolved: number
        }
        codeforces: {
            username: string
            rank: string
            rating: number
            problemsSolved: number
        }
        gfg: {
            username: string
            rank: string
            rating: number
            problemsSolved: number
        }
        codechef: {
            username: string
            rank: number
            rating: number
            stars: string
        }
    }

    const data = useProfileWebSocket("code__void") as ProfileData | null

    useEffect(() => {
        if (!data) return

        const dynamicProfiles = [
            {
                platform: "LeetCode",
                username: data.leetcode.username,
                logo: "/leetcode.svg",
                stats: [
                    { label: "Rank", value: data.leetcode.rank.toLocaleString(), icon: <Trophy className="h-4 w-4" /> },
                    { label: "Rating", value: data.leetcode.rating, icon: <Hash className="h-4 w-4" /> },
                    { label: "Problems", value: `${data.leetcode.problemsSolved}`, icon: <Code className="h-4 w-4" /> },
                ],
                color: "from-yellow-500 to-orange-600",
                url: `https://leetcode.com/u/${data.leetcode.username}/`,
            },
            {
                platform: "Codeforces",
                username: data.codeforces.username,
                logo: "/codeforces.svg",
                stats: [
                    { label: "Rank", value: data.codeforces.rank, icon: <Trophy className="h-4 w-4" /> },
                    { label: "Rating", value: data.codeforces.rating, icon: <Hash className="h-4 w-4" /> },
                    { label: "Problems", value: `${data.codeforces.problemsSolved}`, icon: <Code className="h-4 w-4" /> },
                ],
                color: "from-red-500 to-red-600",
                url: `https://codeforces.com/profile/${data.codeforces.username}`,
            },
            {
                platform: "GeeksforGeeks",
                username: data.gfg.username,
                logo: "/gfg.svg",
                stats: [
                    { label: "Rank", value: `#${data.gfg.rank} in College`, icon: <Trophy className="h-4 w-4" /> },
                    { label: "Rating", value: data.gfg.rating, icon: <Hash className="h-4 w-4" /> },
                    { label: "Problems", value: `${data.gfg.problemsSolved}`, icon: <Code className="h-4 w-4" /> },
                ],
                color: "from-green-700 to-blue-500",
                url: `https://auth.geeksforgeeks.org/user/${data.gfg.username}`,
            },
            {
                platform: "CodeChef",
                username: data.codechef.username,
                logo: "/codechef.svg",
                stats: [
                    { label: "Rank", value: data.codechef.rank.toLocaleString(), icon: <Trophy className="h-4 w-4" /> },
                    { label: "Rating", value: data.codechef.rating, icon: <Hash className="h-4 w-4" /> },
                    { label: "Stars", value: data.codechef.stars, icon: <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> },
                ],
                color: "from-blue-500 to-amber-700",
                url: `https://www.codechef.com/users/${data.codechef.username}`,
            },
        ]

        setProfiles(dynamicProfiles)
    }, [data])

    if (!data) {
        return (
            <section id="cp-profiles" className="py-20 bg-black relative overflow-hidden min-h-[400px]">
            <AnimatedBackground />
            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600">
                    Coding Profiles
                </span>
                </h2>

                <p className="text-white text-center opacity-50 animate-pulse">Loading profiles...</p>
            </div>
            </section>
        );
        }

    return (
        <section id="cp-profiles" className="py-20 bg-black relative overflow-hidden">
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
                            Coding Profiles
                        </span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {profiles.map((profile, index) => (
                            <ProfileCard key={index} profile={profile} index={index} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

function ProfileCard({ profile, index, }: {
    profile: {
        platform: string
        username: string
        logo: string
        stats: { label: string; value: string; icon: React.ReactNode }[]
        color: string
        url: string
    }
    index: number
}) {
    return (
        <motion.a
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
        >
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-violet-700/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                <div className={`h-2 bg-gradient-to-r ${profile.color}`}></div>

                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <div className="relative w-12 h-12 mr-4 overflow-hidden rounded-lg bg-white/10 flex items-center justify-center">
                            <Image
                                src={profile.logo || "/placeholder.svg"}
                                alt={`${profile.platform} logo`}
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white">{profile.platform}</h3>
                            <p className="text-violet-400">@{profile.username}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-4">
                        {profile.stats.map((stat, statIndex) => (
                            <div key={statIndex} className="bg-gray-800/50 rounded-lg p-3 text-center">
                                <div className="flex justify-center mb-1 text-violet-300">{stat.icon}</div>
                                <p className="text-xs text-gray-400">{stat.label}</p>
                                <p className="text-sm font-semibold text-white">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.a>
    )
}