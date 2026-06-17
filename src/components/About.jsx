import { personalInfo } from '../data/portfolio'
import { MapPin, GraduationCap, Mail } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="section-inner about-inner">

        {/* LEFT — Text */}
        <div className="about-left">
          <span className="eyebrow">About Me</span>
          <h2 className="about-title">Hi!</h2>
          <p className="about-intro">
            My name is <strong>Malak Abdelkareem</strong>. I'm a Junior Data Scientist & AI Engineer based in Alexandria, Egypt, with nearly 2 years of hands-on experience building AI products and data solutions.
          </p>
          <p className="about-bio">
            {personalInfo.bio}
          </p>

          <div className="about-details">
            <div className="about-detail-item">
              <GraduationCap size={16} />
              <span>B.Sc. Computer Science & Statistics — Alexandria University · GPA 3.89</span>
            </div>
            <div className="about-detail-item">
              <MapPin size={16} />
              <span>Alexandria, Egypt</span>
            </div>
            <div className="about-detail-item">
              <Mail size={16} />
              <span>{personalInfo.email}</span>
            </div>
          </div>

          <div className="about-contact-label">Contact</div>
          <div className="about-contact-grid">
            <a href={`mailto:${personalInfo.email}`} className="about-contact-item">
              ✉ {personalInfo.email}
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="about-contact-item">
              in {personalInfo.linkedin.replace('https://www.linkedin.com/in/', 'linkedin.com/in/')}
            </a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="about-contact-item">
              ⌥ {personalInfo.github.replace('https://github.com/', 'github.com/')}
            </a>
            <a href={personalInfo.kaggle} target="_blank" rel="noreferrer" className="about-contact-item">
              ◈ {personalInfo.kaggle.replace('https://www.kaggle.com/', 'kaggle.com/')}
            </a>
          </div>
        </div>

        {/* RIGHT — Photo */}
        <div className="about-right">
          <div className="about-photo-wrap">
            <img
              src="/public/images/about.jpg"
              alt="Malak Abdelkareem"
              onError={e => e.target.style.display = 'none'}
            />
          </div>

          {/* Decorative line */}
          <div className="about-deco-line about-deco-line--1" />
          <div className="about-deco-line about-deco-line--2" />
        </div>
      </div>

      <style>{`
        .about-section {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .about-inner {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 80px;
          align-items: center;
        }

        /* LEFT */
        .about-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(40px, 5vw, 64px);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 20px;
          line-height: 1;
        }
        .about-intro {
          font-size: 16px;
          color: var(--text-primary);
          line-height: 1.8;
          margin-bottom: 20px;
        }
        .about-intro strong {
          color: var(--accent-bright);
          font-weight: 600;
        }
        .about-bio {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 32px;
        }
        .about-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 36px;
          padding: 20px;
          background: var(--bg-card);
          border-radius: var(--radius);
          border: 1px solid var(--border);
        }
        .about-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .about-detail-item svg {
          color: var(--accent-bright);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .about-contact-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .about-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .about-contact-item {
          font-size: 12px;
          color: var(--text-secondary);
          transition: var(--transition);
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          background: var(--bg-card);
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .about-contact-item:hover {
          color: var(--accent-bright);
          border-color: rgba(59,130,246,0.3);
          transform: translateY(-2px);
        }

        /* RIGHT */
        .about-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .about-photo-wrap {
          width: 100%;
          max-width: 380px;
          aspect-ratio: 3/4;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--bg-card);
          position: relative;
          z-index: 1;
          box-shadow: 0 24px 60px rgba(0,0,0,0.4);
        }
        .about-photo-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }
        .about-deco-line {
          position: absolute;
          border-radius: 100px;
          background: linear-gradient(to bottom, var(--accent), transparent);
          opacity: 0.3;
        }
        .about-deco-line--1 {
          width: 1px;
          height: 200px;
          top: -40px;
          right: 40px;
        }
        .about-deco-line--2 {
          width: 200px;
          height: 1px;
          bottom: 40px;
          right: -20px;
          background: linear-gradient(to right, var(--accent), transparent);
        }

        @media (max-width: 900px) {
          .about-inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .about-right { order: -1; }
          .about-photo-wrap { max-width: 280px; margin: 0 auto; }
          .about-contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}