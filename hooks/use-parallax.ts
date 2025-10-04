"use client"

import { useScroll, useTransform, MotionValue } from "framer-motion"
import { useRef, RefObject } from "react"
import { useResponsiveParallax } from "./use-responsive-parallax"

export interface UseParallaxOptions {
  speed?: number
  offset?: [string, string]
  clamp?: boolean
}

export function useParallax(
  target?: RefObject<HTMLElement>,
  options: UseParallaxOptions = {}
) {
  const { speed = 0.5, offset = ["start end", "end start"], clamp = true } = options
  
  const ref = useRef<HTMLDivElement>(null)
  const targetRef = target || ref

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: offset as any,
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, speed * (typeof window !== "undefined" ? window.innerHeight : 1000)],
    { clamp }
  )

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return { ref: targetRef, y, opacity, scale, scrollYProgress }
}

export function useStackingParallax(index: number = 0) {
  const ref = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Create stacking effect - each section slides over the previous
  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [100 + (index * 20), 0, 0, -100 - (index * 20)]
  )

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.9, 1, 1, 0.95]
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  )

  // Z-index based on scroll position for proper stacking
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [index, index + 10, index]
  )

  return { ref, y, scale, opacity, zIndex, scrollYProgress }
}

export function useCardParallax(index: number = 0, totalCards: number = 1) {
  const ref = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Staggered reveal based on card index
  const delay = index / totalCards
  const adjustedProgress = useTransform(
    scrollYProgress,
    [0, 0.3 + delay * 0.4, 0.7 + delay * 0.2, 1],
    [0, 0, 1, 1]
  )

  const y = useTransform(
    adjustedProgress,
    [0, 1],
    [50 + (index * 10), 0]
  )

  const opacity = useTransform(adjustedProgress, [0, 1], [0, 1])
  const scale = useTransform(adjustedProgress, [0, 1], [0.9, 1])

  // Subtle rotation for more dynamic effect
  const rotateX = useTransform(
    adjustedProgress,
    [0, 1],
    [10 - (index % 2) * 5, 0]
  )

  return { ref, y, opacity, scale, rotateX, scrollYProgress }
}

// Hook for mobile-optimized parallax (lighter effects)
export function useMobileParallax(index: number = 0) {
  const ref = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Reduced motion for mobile
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [20, 0, -20]
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  )

  return { ref, y, opacity, scrollYProgress }
}