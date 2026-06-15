import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Volunteering from './components/Volunteering'
import Contact from './components/Contact'
import './App.css'

const sections = ['hero', 'experience', 'projects', 'skills', 'education', 'certifications', 'volunteering', 'contact']

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const children = Array.from(container.children)
      let closest = null
      let closestDistance = Infinity
      children.forEach((child) => {
        const rect = child.getBoundingClientRect()
        const distance = Math.abs(rect.top)
        if (distance < closestDistance) {
          closestDistance = distance
          closest = child
        }
      })
      if (closest) setActiveSection(closest.id)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Navbar activeSection={activeSection} scrollTo={scrollTo} />
      <div className="snap-container" ref={containerRef}>
        <Hero scrollTo={scrollTo} />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Volunteering />
        <Contact />
      </div>
    </div>
  )
}