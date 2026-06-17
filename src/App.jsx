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
import About from './components/About'

const sectionIds = ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'certifications', 'volunteering', 'contact']

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Navbar activeSection={activeSection} scrollTo={scrollTo} />

      <div className="progress-dots">
        {sectionIds.map(id => (
          <button
            key={id}
            className={`progress-dot ${activeSection === id ? 'progress-dot--active' : ''}`}
            onClick={() => scrollTo(id)}
            title={id}
          />
        ))}
      </div>

      <Hero scrollTo={scrollTo} />
      <main className="main-content">
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Volunteering />
        <Contact />
      </main>
    </div>
  )
}