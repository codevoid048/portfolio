"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, User, Code, Trophy, Briefcase, Mail } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "cp-profiles", label: "CP", icon: Trophy },
    { id: "achievements", label: "Achievements", icon: Trophy },
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
    setIsOpen(false) // Close mobile menu first
    
    // Small delay to ensure menu closes before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        // Calculate offset for fixed navbar
        const offset = 80 // Account for navbar height
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      }
    }, 100)
  }

  return (
    <>
      {/* Desktop Floating Navbar */}
      <div className="fixed top-3 left-0 right-0 z-50 hidden md:block">
        <div className="flex justify-center">
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`transition-all duration-500 ${
              scrolled ? "scale-95" : "scale-100"
            }`}
          >
        <div className="relative">
          {/* Glassmorphism container */}
          <div className="bg-black/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 shadow-2xl w-[600px] md:w-[700px] lg:w-[850px] xl:w-[1024px]">
            <div className="flex items-center justify-between px-4">
              {/* Logo */}
              <div className="flex items-center">
                <Image
                  src="/logo1.jpg"
                  alt="William Keri"
                  width={56}
                  height={64}
                />
              </div>

              {/* Navigation Items */}
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    isActive={activeSection === item.id}
                    onClick={() => handleNavigation(item.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-full blur-xl -z-10 opacity-60" />
        </div>
      </motion.nav>
        </div>
      </div>

      {/* Mobile Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-[9999] md:hidden transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-lg border-b border-white/10"
            : "bg-transparent"
        }`}
        style={{ zIndex: 9999 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Logo */}
            <div className="flex items-center space-x-3">
              <Image
                src="/logo1.jpg"
                alt="William Keri"
                width={48}
                height={48}
              />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden bg-black/90 backdrop-blur-lg border-t border-white/10"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-wrap justify-center gap-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05, type: "spring", bounce: 0.4 }}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        console.log('Mobile nav item clicked:', item.id) // Debug log
                        handleNavigation(item.id)
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault()
                        console.log('Mobile nav item touched:', item.id) // Debug log
                        handleNavigation(item.id)
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer touch-manipulation ${
                        activeSection === item.id
                          ? "bg-gradient-to-r from-violet-600/40 to-purple-600/40 text-white border border-violet-400/50 shadow-lg shadow-violet-600/25"
                          : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20 backdrop-blur-sm"
                      }`}
                      style={{ touchAction: 'manipulation' }}
                    >
                      <span>{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
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
  // const Icon = item.icon

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
        isActive
          ? "text-white bg-violet-600/30 shadow-lg shadow-violet-600/25"
          : "text-gray-300 hover:text-white hover:bg-white/10"
      }`}
    >
      {/* <Icon className="h-4 w-4" /> */}
      <span className="text-sm font-medium ">{item.label}</span>
      
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute inset-0 bg-gradient-to-r from-violet-600/40 to-purple-600/40 rounded-full -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  )
}