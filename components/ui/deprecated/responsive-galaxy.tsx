"use client"

import { useEffect, useState } from "react"
import Galaxy from "@/components/ui/galaxy"

interface ResponsiveGalaxyProps {
  className?: string
}

export default function ResponsiveGalaxy({ className }: ResponsiveGalaxyProps) {
  const [galaxySettings, setGalaxySettings] = useState({
    density: 1.2,
    glowIntensity: 0.4,
    saturation: 0.7,
    twinkleIntensity: 0.3,
    rotationSpeed: 0.03,
    repulsionStrength: 2,
    speed: 1.0,
  })

  useEffect(() => {
    const updateGalaxySettings = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isDesktop = width >= 1024
      const isLargeScreen = width >= 1440
      const pixelRatio = window.devicePixelRatio || 1
      
      // Performance-optimized settings for different screen sizes
      if (isLargeScreen) {
        // Large desktop screens - most conservative settings
        setGalaxySettings({
          density: 0.6,
          glowIntensity: 0.25,
          saturation: 0.6,
          twinkleIntensity: 0.2,
          rotationSpeed: 0.01,
          repulsionStrength: 1.5,
          speed: 0.7,
        })
      } else if (isDesktop) {
        // Regular desktop - moderate optimization
        setGalaxySettings({
          density: 0.8,
          glowIntensity: 0.3,
          saturation: 0.65,
          twinkleIntensity: 0.25,
          rotationSpeed: 0.015,
          repulsionStrength: 1.8,
          speed: 0.8,
        })
      } else {
        // Mobile/tablet - original settings (performs well)
        setGalaxySettings({
          density: 1.2,
          glowIntensity: 0.4,
          saturation: 0.7,
          twinkleIntensity: 0.3,
          rotationSpeed: 0.03,
          repulsionStrength: 2,
          speed: 1.0,
        })
      }
    }

    updateGalaxySettings()
    window.addEventListener('resize', updateGalaxySettings)
    
    return () => window.removeEventListener('resize', updateGalaxySettings)
  }, [])

  return (
    <Galaxy
      mouseRepulsion={true}
      mouseInteraction={true}
      density={galaxySettings.density}
      glowIntensity={galaxySettings.glowIntensity}
      saturation={galaxySettings.saturation}
      hueShift={280}
      twinkleIntensity={galaxySettings.twinkleIntensity}
      rotationSpeed={galaxySettings.rotationSpeed}
      repulsionStrength={galaxySettings.repulsionStrength}
      speed={galaxySettings.speed}
      transparent={true}
    />
  )
}