import { personalInfo } from '../data/portfolio'
import { Mail, Linkedin, Github, ExternalLink, MapPin } from 'lucide-react'

const contactLinks = [
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "m61644380@gmail.com",
    href: `mailto:${personalInfo.email}`,
    cta: "Send a message",
  },
  {
    icon: <Linkedin size={20} />,
    label: "LinkedIn",
    value: "malak~mohamed",
    href: personalInfo.linkedin,
    cta: "Connect with me",
  },
  {
    icon: <Github size={20} />,
    label: "GitHub",
    value: "MalakMohamedAhmed",
    href: personalInfo.github,
    cta: "See my code",
  },
  {
    icon: <ExternalLink size={20} />,
    label: "Kaggle",
    value: "malakmohamed777",
    href: personalInfo.kaggle,
    cta: "View notebooks",
  },
]

export default function Contact() {
  return (
    <section id="contact" className="snap-section contact-section">
      <div className="grid-bg" />
      <div className="glow glow-2" />
      <div className="section-inner contact-inner">
        <div className="contact-left">
          <span className="eyebrow">Get In Touch</span>
          <h2 className="section-title">
            Let's<br /><span>Connect</span>
          </h2>
          <p className="lead-text" style={{ marginBottom: 40 }}>
            {personalInfo.cta}
          </p>

          <div className="contact-open-wrap">
            <p className="contact-open-label">Currently open to</p>
            <div className="contact-open-tags">
              {["Full-time roles", "Internships", "Collaborations", "Freelance"].map((t, i) => (
                <span key={i} className="contact-open-tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="contact-avatar-row">
            <div className="contact-avatar">
              {personalInfo.photo ? (
                <img
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  onError={e => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
              ) : null}
              <div
                className="contact-avatar-placeholder"
                style={{ display: personalInfo.photo ? 'none' : 'flex' }}
              >
                M
              </div>
            </div>
            <div>
              <p className="contact-name">{personalInfo.name}</p>
              <p className="contact-location">
                <MapPin size={12} /> {personalInfo.location}
              </p>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <div className="contact-links">
            {contactLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel="noreferrer"
                className="contact-link-card card"
              >
                <div className="contact-link-icon">{link.icon}</div>
                <div className="contact-link-body">
                  <p className="contact-link-label">{link.label}</p>
                  <p className="contact-link-value">{link.value}</p>
                </div>
                <span className="contact-link-cta">{link.cta} →</span>
              </a>
            ))}
          </div>

          <p className="contact-footer">
            Designed & built by Malak Abdelkareem · {new Date().getFullYear()}
          </p>
        </div>
      </div>

      <style>{`
        .contact-section {
          background: var(--bg-secondary);
        }
        .contact-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .contact-open-wrap {
          margin-bottom: 40px;
        }
        .contact-open-label {
          font-size: 11px; font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase; letter-spacing: 2px;
          margin-bottom: 12px;
        }
        .contact-open-tags {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .contact-open-tag {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 13px; font-weight: 500;
          background: var(--accent-light);
          color: var(--accent);
          border: 1px solid var(--border);
        }
        .contact-avatar-row {
          display: flex; align-items: center; gap: 16px;
        }
        .contact-avatar {
          width: 56px; height: 56px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--accent);
          flex-shrink: 0;
          background: var(--accent-light);
        }
        .contact-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .contact-avatar-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; font-weight: 700; color: var(--accent);
        }
        .contact-name {
          font-size: 15px; font-weight: 700; color: var(--text-primary);
          margin-bottom: 4px;
        }
        .contact-location {
          display: flex; align-items: center; gap: 4px;
          font-size: 12px; color: var(--text-muted);
        }
        .contact-links {
          display: flex; flex-direction: column; gap: 12px;
          margin-bottom: 40px;
        }
        .contact-link-card {
          padding: 20px 24px;
          display: flex; align-items: center; gap: 16px;
          text-decoration: none; color: inherit;
          transition: var(--transition);
        }
        .contact-link-card:hover {
          transform: translateX(6px);
          border-color: rgba(126,184,247,0.3);
          box-shadow: var(--shadow-hover);
        }
        .contact-link-icon {
          width: 44px; height: 44px;
          border-radius: var(--radius-sm);
          background: var(--accent-light);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent); flex-shrink: 0;
          transition: var(--transition);
        }
        .contact-link-card:hover .contact-link-icon {
          background: var(--accent);
          color: var(--bg-primary);
        }
        .contact-link-body { flex: 1; }
        .contact-link-label {
          font-size: 11px; font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase; letter-spacing: 1px;
          margin-bottom: 3px;
        }
        .contact-link-value {
          font-size: 15px; font-weight: 600;
          color: var(--text-primary);
        }
        .contact-link-cta {
          font-size: 13px; color: var(--accent);
          font-weight: 500; flex-shrink: 0;
          opacity: 0; transition: var(--transition);
        }
        .contact-link-card:hover .contact-link-cta { opacity: 1; }
        .contact-footer {
          font-size: 12px; color: var(--text-muted);
          padding-top: 24px;
          border-top: 1px solid var(--border);
        }
        @media (max-width: 860px) {
          .contact-inner { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 500px) {
          .contact-link-cta { display: none; }
        }
      `}</style>
    </section>
  )
}