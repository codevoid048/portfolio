import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll event to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle navigation and close mobile menu
  const handleNavigation = (sectionId: string) => {
    setIsOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="block w-10 h-10 md:w-12 md:h-12 relative"
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex space-x-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <NavItem label="About" sectionId="about" onClick={handleNavigation} />
            <NavItem label="Skills" sectionId="skills" onClick={handleNavigation} />
            <NavItem label="Projects" sectionId="projects" onClick={handleNavigation} />
            <NavItem label="CP Profiles" sectionId="cp-profiles" onClick={handleNavigation} />
            <NavItem label="Achievements" sectionId="achievements" onClick={handleNavigation} />
            <NavItem label="Contact" sectionId="contact" onClick={handleNavigation} />
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-violet-700/20"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                <MobileNavItem label="About" sectionId="about" onClick={handleNavigation} />
                <MobileNavItem label="Skills" sectionId="skills" onClick={handleNavigation} />
                <MobileNavItem label="Projects" sectionId="projects" onClick={handleNavigation} />
                <MobileNavItem label="CP Profiles" sectionId="cp-profiles" onClick={handleNavigation} />
                <MobileNavItem label="Achievements" sectionId="achievements" onClick={handleNavigation} />
                <MobileNavItem label="Contact" sectionId="contact" onClick={handleNavigation} />
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function NavItem({ label, sectionId, onClick }: { label: string; sectionId: string; onClick: (id: string) => void }) {
  return (
    <button
      onClick={() => onClick(sectionId)}
      className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300 relative group"
    >
      {label}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
    </button>
  )
}

function MobileNavItem({
  label,
  sectionId,
  onClick,
}: { label: string; sectionId: string; onClick: (id: string) => void }) {
  return (
    <button
      onClick={() => onClick(sectionId)}
      className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-violet-700/20 rounded-md transition-colors duration-300"
    >
      {label}
    </button>
  )
}
