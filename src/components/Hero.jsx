import { personalInfo } from '../data/portfolio'
import { Github, Linkedin, Mail, ExternalLink, ArrowDown } from 'lucide-react'

export default function Hero({ scrollTo }) {
  return (
    <section id="hero" className="snap-section hero-section">
      <div className="grid-bg" />
      <div className="glow glow-1" />
      <div className="glow glow-2" />

      <div className="section-inner hero-inner">
        <div className="hero-left">
          <span className="eyebrow">👋 Welcome to my portfolio</span>
          <h1 className="display-title">
            Malak<br />
            <span>Abdelkareem</span>
          </h1>
          <p className="hero-role">Junior Data Scientist & AI Engineer</p>
          <p className="lead-text" style={{ marginTop: 24, marginBottom: 40 }}>
            {personalInfo.bio}
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              View My Work
            </button>
            <button className="btn btn-outline" onClick={() => scrollTo('experience')}>
              My Journey
            </button>
          </div>
          <div className="hero-links">
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hero-icon-link" title="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hero-icon-link" title="GitHub">
              <Github size={18} />
            </a>
            <a href={personalInfo.kaggle} target="_blank" rel="noreferrer" className="hero-icon-link" title="Kaggle">
              <ExternalLink size={18} />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="hero-icon-link" title="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-photo-wrap">
            <div className="hero-photo-ring">
              <div className="hero-photo">
                {personalInfo.photo ? (
                  <img src={personalInfo.photo} alt={personalInfo.name} />
                ) : (
                  <div className="img-placeholder">Your Photo</div>
                )}
              </div>
            </div>
            <div className="hero-stat hero-stat--1">
              <p className="hero-stat-num">3.89</p>
              <p className="hero-stat-label">GPA / 4.0</p>
            </div>
            <div className="hero-stat hero-stat--2">
              <p className="hero-stat-num">15+</p>
              <p className="hero-stat-label">Projects Built</p>
            </div>
            <div className="hero-stat hero-stat--3">
              <p className="hero-stat-num">2+</p>
              <p className="hero-stat-label">Years Experience</p>
            </div>
          </div>
        </div>
      </div>

      <button className="hero-scroll-btn" onClick={() => scrollTo('experience')}>
        <ArrowDown size={18} />
      </button>

      <style>{`
        .hero-section {
          background: var(--bg-primary);
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 80px;
          align-items: center;
        }
        .hero-role {
          font-size: clamp(16px, 2vw, 20px);
          font-weight: 500;
          color: var(--accent);
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.3px;
        }
        .hero-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }
        .hero-links {
          display: flex;
          gap: 10px;
        }
        .hero-icon-link {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-muted);
          transition: var(--transition);
        }
        .hero-icon-link:hover {
          color: var(--accent);
          border-color: var(--accent);
          transform: translateY(-3px);
        }
        .hero-photo-wrap {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px;
        }
        .hero-photo-ring {
          width: 340px; height: 340px;
          border-radius: 50%;
          padding: 4px;
          background: linear-gradient(135deg, var(--accent), transparent);
          box-shadow: 0 0 80px rgba(126,184,247,0.2);
        }
        .hero-photo {
          width: 100%; height: 100%;
          border-radius: 50%;
          overflow: hidden;
          background: var(--bg-card);
        }
        .hero-photo img { width: 100%; height: 100%; object-fit: cover; }
        .hero-stat {
          position: absolute;
          background: rgba(21, 29, 53, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 14px 20px;
          text-align: center;
          box-shadow: var(--shadow-hover);
        }
        .hero-stat--1 { top: 20px; left: 0; }
        .hero-stat--2 { bottom: 20px; right: 0; }
        .hero-stat--3 { bottom: 20px; left: 0; }
        .hero-stat-num {
          font-size: 24px;
          font-weight: 800;
          color: var(--accent);
          font-family: 'Playfair Display', serif;
          line-height: 1;
        }
        .hero-stat-label {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 4px;
          font-weight: 500;
        }
        .hero-scroll-btn {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          width: 44px; height: 44px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--accent);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          animation: bounce 2s ease-in-out infinite;
        }
        .hero-scroll-btn:hover {
          background: var(--accent);
          color: var(--bg-primary);
          border-color: var(--accent);
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; gap: 40px; text-align: center; }
          .hero-right { display: none; }
          .hero-actions, .hero-links { justify-content: center; }
          .lead-text { margin: 24px auto 40px; }
        }
      `}</style>
    </section>
  )
}