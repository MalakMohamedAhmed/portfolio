import { useState } from 'react'
import { experience } from '../data/portfolio'
import { MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react'

export default function Experience() {
  const [expanded, setExpanded] = useState(0)

  return (
    <section id="experience" className="snap-section exp-section">
      <div className="grid-bg" />
      <div className="section-inner exp-inner">
        <div className="exp-left">
          <span className="eyebrow">Work History</span>
          <h2 className="section-title">
            My<br /><span>Journey</span>
          </h2>
          <p className="lead-text">
            Roles across AI, data science, operations, and research — building real things for real organizations.
          </p>
          <div className="exp-stats">
            <div className="exp-stat-item">
              <p className="exp-stat-num">15+</p>
              <p className="exp-stat-label">Roles & Programs</p>
            </div>
            <div className="exp-stat-item">
              <p className="exp-stat-num">3+</p>
              <p className="exp-stat-label">Years Active</p>
            </div>
            <div className="exp-stat-item">
              <p className="exp-stat-num">5+</p>
              <p className="exp-stat-label">Organizations</p>
            </div>
          </div>
        </div>

        <div className="exp-right">
          <div className="exp-accordion">
            {experience.map((exp, i) => (
              <div
                key={i}
                className={`exp-acc-item ${expanded === i ? 'exp-acc-item--open' : ''}`}
              >
                <button
                  className="exp-acc-header"
                  onClick={() => setExpanded(expanded === i ? -1 : i)}
                >
                  <div className="exp-acc-logo">
                    {exp.image ? (
                      <img
                        src={exp.image}
                        alt={exp.company}
                        onError={e => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div className="exp-acc-logo-placeholder" style={{ display: exp.image ? 'none' : 'flex' }}>
                      {exp.company.charAt(0)}
                    </div>
                  </div>
                  <div className="exp-acc-info">
                    <p className="exp-acc-role">{exp.role}</p>
                    <p className="exp-acc-company">{exp.company} · <span>{exp.duration}</span></p>
                  </div>
                  <div className="exp-acc-right">
                    <span className="tag">{exp.type}</span>
                    {expanded === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {expanded === i && (
                  <div className="exp-acc-body">
                    <div className="exp-acc-meta">
                      <span className="exp-meta-item"><MapPin size={12} /> {exp.location}</span>
                      <span className="exp-meta-item"><Calendar size={12} /> {exp.duration}</span>
                    </div>
                    {exp.bullets.length > 0 ? (
                      <ul className="exp-acc-bullets">
                        {exp.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="exp-acc-empty">Details coming soon.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .exp-section {
          background: var(--bg-secondary);
          overflow-y: auto;
        }
        .exp-inner {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 80px;
          align-items: start;
          padding-top: 20px;
        }
        .exp-left {
          position: sticky;
          top: 80px;
        }
        .exp-stats {
          display: flex;
          gap: 32px;
          margin-top: 40px;
        }
        .exp-stat-item {}
        .exp-stat-num {
          font-size: 36px;
          font-weight: 800;
          color: var(--accent);
          font-family: 'Playfair Display', serif;
          line-height: 1;
        }
        .exp-stat-label {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 4px;
          font-weight: 500;
        }
        .exp-right {
          padding-top: 8px;
        }
        .exp-accordion {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .exp-acc-item {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          transition: var(--transition);
        }
        .exp-acc-item--open {
          border-color: rgba(126, 184, 247, 0.4);
          box-shadow: 0 0 0 1px rgba(126,184,247,0.1), var(--shadow);
        }
        .exp-acc-header {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: var(--transition);
          font-family: 'Inter', sans-serif;
        }
        .exp-acc-header:hover { background: rgba(126,184,247,0.03); }
        .exp-acc-logo {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid var(--border);
          background: var(--bg-secondary);
        }
        .exp-acc-logo img { width: 100%; height: 100%; object-fit: cover; }
        .exp-acc-logo-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 700;
          color: var(--accent);
          background: var(--accent-light);
        }
        .exp-acc-info { flex: 1; min-width: 0; }
        .exp-acc-role {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .exp-acc-company {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 500;
        }
        .exp-acc-company span { color: var(--text-muted); }
        .exp-acc-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          color: var(--text-muted);
        }
        .exp-acc-body {
          padding: 0 20px 20px;
          border-top: 1px solid var(--border);
          margin-top: 0;
        }
        .exp-acc-meta {
          display: flex;
          gap: 16px;
          padding: 12px 0;
          flex-wrap: wrap;
        }
        .exp-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: var(--text-muted);
        }
        .exp-acc-bullets {
          list-style: none;
          padding: 0;
          margin-top: 4px;
        }
        .exp-acc-bullets li {
          font-size: 13px;
          color: var(--text-secondary);
          padding: 6px 0 6px 16px;
          position: relative;
          line-height: 1.6;
          border-bottom: 1px solid var(--border);
        }
        .exp-acc-bullets li:last-child { border-bottom: none; }
        .exp-acc-bullets li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--accent);
        }
        .exp-acc-empty {
          font-size: 13px;
          color: var(--text-muted);
          font-style: italic;
          padding-top: 12px;
        }
        @media (max-width: 900px) {
          .exp-inner { grid-template-columns: 1fr; gap: 40px; }
          .exp-left { position: static; }
        }
      `}</style>
    </section>
  )
}