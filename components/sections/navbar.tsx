"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Code, Briefcase, Mail, Folder, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about")
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationOrigin, setAnimationOrigin] = useState({ x: 0, y: 0 })
  const desktopThemeButtonRef = useRef<HTMLButtonElement>(null)
  const mobileThemeButtonRef = useRef<HTMLButtonElement>(null)
  const { theme, setTheme } = useTheme()

  const navItems = [
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Folder },
    { id: "work", label: "Work", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = navItems.map(item => item.id)
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsOpen(false)

    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }, 100)
  }

  const toggleTheme = () => {
    // Determine which button is currently visible and get its position
    const currentButtonRef = window.innerWidth >= 768 ? desktopThemeButtonRef : mobileThemeButtonRef
    const buttonElement = currentButtonRef.current

    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect()
      setAnimationOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      })
      setIsAnimating(true)

      // Change theme after animation starts
      setTimeout(() => {
        setTheme(theme === "dark" ? "light" : "dark")
      }, 300)

      // Reset animation state
      setTimeout(() => {
        setIsAnimating(false)
      }, 1400)
    }
  }

  return (
    <>
      {/* Theme Transition Overlay */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{
              position: "fixed",
              top: animationOrigin.y,
              left: animationOrigin.x,
              width: 0,
              height: 0,
              borderRadius: "50%",
              backgroundColor: theme === "dark" ? "#ffffff" : "#000000",
              zIndex: 9999,
              opacity: 0.8
            }}
            animate={{
              width: Math.max(window.innerWidth, window.innerHeight) * 2,
              height: Math.max(window.innerWidth, window.innerHeight) * 2,
              top: animationOrigin.y - Math.max(window.innerWidth, window.innerHeight),
              left: animationOrigin.x - Math.max(window.innerWidth, window.innerHeight),
              opacity: 0
            }}
            exit={{
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: 1.2,
              ease: "easeInOut"
            }}
            style={{
              transformOrigin: "center"
            }}
          />
        )}
      </AnimatePresence>
      {/* Desktop Floating Navbar */}
      <div className="fixed top-3 left-0 right-0 z-50 hidden md:block">
        <div className="flex justify-center">
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`transition-all duration-500 ${scrolled ? "scale-95" : "scale-100"}`}
          >
            <div className="relative">
              {/* Glassmorphism container */}
              <div className="bg-background/80 backdrop-blur-lg border border-border rounded-full px-6 py-3 shadow-2xl w-[600px] md:w-[700px] lg:w-[850px] xl:w-[1024px]">
                <div className="flex items-center justify-center px-4 gap-2">
                  {/* Navigation Items + Theme Toggle */}
                  <div className="flex items-center space-x-1">
                    {navItems.map((item) => (
                      <NavItem
                        key={item.id}
                        item={item}
                        isActive={activeSection === item.id}
                        onClick={() => handleNavigation(item.id)}
                      />
                    ))}
                    <button
                      ref={desktopThemeButtonRef}
                      onClick={toggleTheme}
                      aria-label="Toggle theme"
                      className="ml-2 inline-flex items-center justify-center rounded-full border border-border bg-accent hover:bg-accent/80 text-foreground transition-colors h-8 w-8"
                    >
                      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-foreground/10 rounded-full blur-xl -z-10 opacity-40" />
            </div>
          </motion.nav>
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed inset-x-0 bottom-4 z-[9999] flex justify-center">
        <nav className="mx-4 w-full max-w-sm rounded-full bg-background/80 backdrop-blur-lg border border-border shadow-xl">
          <ul className="grid grid-cols-6">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = activeSection === item.id
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full py-3 flex flex-col items-center gap-1 text-xs transition-colors ${
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${active ? "" : "opacity-80"}`} />
                    <span className="sr-only sm:not-sr-only sm:block">{item.label}</span>
                  </button>
                </li>
              )
            })}
            {/* Theme toggle (mobile) */}
            <li>
              <button
                ref={mobileThemeButtonRef}
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-full py-3 flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only sm:not-sr-only sm:block">Theme</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

function NavItem({
  item,
  isActive,
  onClick,
}: {
  item: { id: string; label: string; icon: React.ComponentType<any> }
  isActive: boolean
  onClick: () => void
}) {
  const Icon = item.icon

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
        isActive ? "text-foreground bg-accent/60" : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span className="text-sm font-medium ">{item.label}</span>

      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute inset-0 bg-accent/60 rounded-full -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  )
}