"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Stars } from "lucide-react"

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const [isHovered, setIsHovered] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        if (isAnimating) return

        setIsAnimating(true)

        // Create a flash effect when changing themes
        const overlay = document.getElementById("theme-transition-overlay")
        if (overlay) {
            overlay.classList.add("opacity-30")

            setTimeout(() => {
                overlay.classList.remove("opacity-30")
            }, 500)
        }

        // Toggle theme with a slight delay for the animation
        setTimeout(() => {
            setTheme(theme === "dark" ? "light" : "dark")
            setTimeout(() => setIsAnimating(false), 300)
        }, 150)
    }

    if (!mounted) return null

    const isDark = theme === "dark"

    return (
        <motion.button
            aria-label="Toggle theme"
            className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${isDark ? "bg-gray-800 hover:bg-violet-700/20" : "bg-blue-100 hover:bg-blue-200"
                }`}
            onClick={toggleTheme}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isAnimating}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={isDark ? "dark" : "light"}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="absolute"
                >
                    {isDark ? <Moon className="h-5 w-5 text-violet-300" /> : <Sun className="h-5 w-5 text-yellow-500" />}
                </motion.div>
            </AnimatePresence>

            {/* Orbiting stars/sun rays */}
            <AnimatePresence>
                {isHovered && (
                    <>
                        {isDark ? (
                            // Stars orbiting the moon
                            <>
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={`star-${i}`}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            x: Math.cos((i * (Math.PI * 2)) / 5) * 20,
                                            y: Math.sin((i * (Math.PI * 2)) / 5) * 20,
                                        }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: i * 0.05,
                                        }}
                                        className="absolute"
                                    >
                                        <Stars className="h-3 w-3 text-violet-300" />
                                    </motion.div>
                                ))}
                            </>
                        ) : (
                            // Sun rays
                            <>
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={`ray-${i}`}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            x: Math.cos((i * (Math.PI * 2)) / 8) * 20,
                                            y: Math.sin((i * (Math.PI * 2)) / 8) * 20,
                                        }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: i * 0.04,
                                        }}
                                        className="absolute h-1 w-4 bg-yellow-300 rounded-full"
                                        style={{
                                            transform: `rotate(${i * 45}deg) translateX(20px)`,
                                        }}
                                    />
                                ))}
                            </>
                        )}
                    </>
                )}
            </AnimatePresence>
        </motion.button>
    )
}
