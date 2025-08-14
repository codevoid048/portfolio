"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-violet-900/10 blur-[100px]"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-[100px]"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute top-2/3 left-1/2 w-[400px] h-[400px] rounded-full bg-indigo-900/10 blur-[100px]"
        animate={{
          x: [0, -30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Subtle floating particles */}
      <ParallaxStars />
    </div>
  )
}

function ParallaxStars() {
  const starsRef = useRef<HTMLDivElement>(null)

  // Generate deterministic star positions based on index
  const generateStarPosition = (index: number) => {
    // Use a simple deterministic function based on index
    const seed = index * 12345.6789
    const x = ((seed * 9301 + 49297) % 233280) / 233280.0
    const y = ((seed * 9301 + 49297) % 233280) / 233280.0
    return { x: x * 100, y: y * 100 }
  }

  const generateStarTiming = (index: number) => {
    // Generate deterministic timing values
    const seed = index * 54321.9876
    const duration = ((seed * 9301 + 49297) % 100) / 100.0 * 3 + 2 // 2-5 seconds
    const delay = ((seed * 1301 + 9297) % 100) / 100.0 * 5 // 0-5 seconds delay
    return { duration, delay }
  }

  useEffect(() => {
    const stars = starsRef.current
    if (!stars) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight

      stars.style.transform = `translateX(${x * -20}px) translateY(${y * -20}px)`
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={starsRef} className="absolute inset-0 transition-transform duration-200 ease-out">
      {Array.from({ length: 50 }).map((_, i) => {
        const position = generateStarPosition(i)
        const timing = generateStarTiming(i)
        
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: timing.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: timing.delay,
            }}
          />
        )
      })}
    </div>
  )
}
