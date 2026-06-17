import { personalInfo } from '../data/portfolio'
import { Github, Linkedin, Mail, ExternalLink, ArrowDown } from 'lucide-react'

export default function Hero({ scrollTo }) {
  return (
    <section id="hero" className="hero-snap hero-section">

      {/* Corner TL */}
      <div className="hero-corner hero-corner--tl">
        <p>Junior Data Scientist</p>
        <p>& AI Engineer</p>
      </div>

      {/* Corner TR */}
      <div className="hero-corner hero-corner--tr">
        <ArrowDown size={14} style={{ transform: 'rotate(-90deg)', color: 'var(--text-muted)' }} />
      </div>

      {/* Name above PORTFOLIO */}
      <div className="hero-name-above">
        <p>Malak Abdelkareem</p>
      </div>

      {/* BIG TEXT BEHIND */}
      <div className="hero-bg-text">
        <span className="hero-bg-word">PORT</span>
        <span className="hero-bg-word hero-bg-word--outline">FOLIO</span>
      </div>

      {/* Photo on top of text */}
      <div className="hero-photo-wrap">
        <img src="/images/profile.png" alt="Malak Abdelkareem" />
      </div>

      {/* Links row */}
      <div className="hero-links-row">
        <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hero-link">
          <Linkedin size={15} />
        </a>
        <span className="hero-link-dot" />
        <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hero-link">
          <Github size={15} />
        </a>
        <span className="hero-link-dot" />
        <a href={personalInfo.kaggle} target="_blank" rel="noreferrer" className="hero-link">
          <ExternalLink size={15} />
        </a>
        <span className="hero-link-dot" />
        <a href={`mailto:${personalInfo.email}`} className="hero-link">
          <Mail size={15} />
        </a>
      </div>

      {/* Scroll */}
      <button className="hero-scroll-btn" onClick={() => scrollTo('experience')}>
        <ArrowDown size={14} />
      </button>

      <style>{`
        .hero-section {
          position: relative;
          background: #080808;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* CORNERS */
        .hero-corner {
          position: absolute;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .hero-corner p {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .hero-corner--tl { top: 36px; left: 48px; }
        .hero-corner--tr {
          top: 36px; right: 48px;
          flex-direction: row;
          align-items: center;
        }

        /* NAME ABOVE */
        .hero-name-above {
          position: absolute;
          z-index: 10;
          top: calc(50% - 170px);
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }
        .hero-name-above p {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 400;
          color: var(--text-secondary);
          letter-spacing: 8px;
          text-transform: uppercase;
        }

        /* BIG TEXT */
        .hero-bg-text {
          position: absolute;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          gap: 0;
          pointer-events: none;
          user-select: none;
          top: 50%;
          transform: translateY(-50%);
        }
        .hero-bg-word {
          font-family: 'Playfair Display', serif;
          font-size: clamp(120px, 22vw, 280px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -4px;
          color: var(--text-primary);
        }
        .hero-bg-word--outline {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(232,238,248,0.15);
        }

        /* PHOTO */
        .hero-photo-wrap {
          position: relative;
          z-index: 2;
          height: 100vh;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .hero-photo-wrap img {
          height: 100%;
          width: auto;
          object-fit: cover;
          object-position: center top;
          display: block;
          filter: contrast(1.05);
        }

        /* LINKS ROW */
        .hero-links-row {
          position: absolute;
          bottom: 36px;
          left: 48px;
          display: flex;
          align-items: center;
          gap: 16px;
          z-index: 10;
        }
        .hero-link {
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }
        .hero-link:hover {
          color: var(--accent-bright);
          transform: translateY(-2px);
        }
        .hero-link-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--text-muted);
          opacity: 0.4;
        }

        /* SCROLL */
        .hero-scroll-btn {
          position: absolute;
          bottom: 36px;
          right: 48px;
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: none;
          color: var(--text-muted);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          z-index: 10;
          animation: arrowBounce 2s ease-in-out infinite;
        }
        .hero-scroll-btn:hover {
          border-color: var(--accent);
          color: var(--accent-bright);
        }
        @keyframes arrowBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }

        @media (max-width: 768px) {
          .hero-bg-word { font-size: clamp(64px, 22vw, 120px); letter-spacing: -2px; }
          .hero-photo-wrap { height: 65vh; }
          .hero-corner--tr { display: none; }
          .hero-corner--tl { left: 24px; top: 24px; }
          .hero-scroll-btn { right: 24px; bottom: 24px; }
        }
      `}</style>
    </section>
  )
}