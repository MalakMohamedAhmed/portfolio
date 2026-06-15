import { personalInfo } from '../data/portfolio'

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certs' },
  { id: 'volunteering', label: 'Volunteering' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activeSection, scrollTo }) {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <button className="navbar-logo" onClick={() => scrollTo('hero')}>
            MA<span>.</span>
          </button>
          <ul className="navbar-links">
            {navLinks.map((link) => (
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
          <a href={`mailto:${personalInfo.email}`} className="btn btn-primary navbar-cta">
            Hire Me
          </a>
        </div>
      </nav>

      {/* Progress dots */}
      <div className="progress-dots">
        {navLinks.map((link) => (
          <button
            key={link.id}
            className={`progress-dot ${activeSection === link.id ? 'progress-dot--active' : ''}`}
            onClick={() => scrollTo(link.id)}
            title={link.label}
          />
        ))}
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 0;
          background: rgba(10, 14, 26, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }
        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 60px;
          height: 64px;
          display: flex;
          align-items: center;
          gap: 40px;
        }
        .navbar-logo {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
          background: none;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
          letter-spacing: -0.5px;
        }
        .navbar-logo span { color: var(--accent); }
        .navbar-links {
          display: flex;
          list-style: none;
          gap: 2px;
          flex: 1;
          justify-content: center;
        }
        .nav-link {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-muted);
          padding: 6px 14px;
          border-radius: 100px;
          transition: var(--transition);
          letter-spacing: 0.2px;
        }
        .nav-link:hover { color: var(--text-primary); }
        .nav-link--active { color: var(--accent) !important; }
        .navbar-cta {
          font-size: 13px;
          padding: 8px 20px;
          flex-shrink: 0;
        }
        @media (max-width: 900px) {
          .navbar-links { display: none; }
          .navbar-inner { padding: 0 24px; }
        }
      `}</style>
    </>
  )
}