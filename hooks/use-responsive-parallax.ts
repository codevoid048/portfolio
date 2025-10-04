"use client"

import { useEffect, useState } from "react"

export function useResponsiveParallax() {
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return { 
    isMobile, 
    prefersReducedMotion, 
    shouldUseParallax: !prefersReducedMotion && !isMobile 
  }
}