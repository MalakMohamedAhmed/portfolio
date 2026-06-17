import { useState, useEffect } from 'react'
import { personalInfo } from '../data/portfolio'

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certs' },
  { id: 'volunteering', label: 'Volunteering' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activeSection, scrollTo }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar-inner">
        <button className="navbar-logo" onClick={() => scrollTo('hero')}>
          MA<span>.</span>
        </button>

        <ul className="navbar-links">
          {navLinks.map(link => (
            <li key={link.id}>
              <button
                className={`nav-link ${activeSection === link.id ? 'nav-link--active' : ''}`}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <a href={`mailto:${personalInfo.email}`} className="navbar-hire">
          Hire Me
        </a>

        <button className="navbar-burger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="navbar-mobile">
          {navLinks.map(link => (
            <button
              key={link.id}
              className="nav-link-mobile"
              onClick={() => { scrollTo(link.id); setMenuOpen(false) }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 24px 0;
          transition: var(--transition);
        }
        .navbar--scrolled {
          padding: 14px 0;
          background: rgba(8,8,8,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }
        .navbar-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 48px;
          display: flex;
          align-items: center;
          gap: 40px;
        }
        .navbar-logo {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          background: none;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
          letter-spacing: 1px;
        }
        .navbar-logo span { color: var(--accent); }
        .navbar-links {
          display: flex;
          list-style: none;
          gap: 0;
          flex: 1;
          justify-content: center;
        }
        .nav-link {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: var(--text-muted);
          padding: 6px 14px;
          border-radius: 100px;
          transition: var(--transition);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .nav-link:hover { color: var(--text-secondary); }
        .nav-link--active { color: var(--accent) !important; }
        .navbar-hire {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--accent);
          border: 1px solid rgba(192,57,43,0.4);
          padding: 8px 20px;
          border-radius: 100px;
          transition: var(--transition);
          flex-shrink: 0;
        }
        .navbar-hire:hover {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
        }
        .navbar-burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
        }
        .navbar-burger span {
          display: block;
          width: 20px; height: 1.5px;
          background: var(--text-secondary);
          transition: var(--transition);
        }
        .navbar-mobile {
          display: flex;
          flex-direction: column;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          padding: 16px 48px;
        }
        .nav-link-mobile {
          background: none; border: none; cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 13px; font-weight: 500;
          color: var(--text-secondary);
          padding: 12px 0;
          text-align: left;
          border-bottom: 1px solid var(--border);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .nav-link-mobile:last-child { border-bottom: none; }
        .nav-link-mobile:hover { color: var(--accent); }
        @media (max-width: 768px) {
          .navbar-links { display: none; }
          .navbar-hire { display: none; }
          .navbar-burger { display: flex; margin-left: auto; }
          .navbar-inner { padding: 0 24px; }
        }
      `}</style>
    </nav>
  )
}