import { skills } from '../data/portfolio'

const categoryIcons = {
  "AI & Data Science": "🧠",
  "Libraries & Frameworks": "📦",
  "Data & BI Tools": "📊",
  "Databases": "🗄️",
  "Computer Vision": "👁️",
  "Other Tech": "⚙️",
  "Soft Skills": "🤝",
}

export default function Skills() {
  return (
    <section id="skills" className="snap-section skills-section">
      <div className="grid-bg" />
      <div className="glow glow-1" />
      <div className="section-inner">
        <div className="skills-header">
          <span className="eyebrow">What I Know</span>
          <h2 className="section-title">Skills &<br /><span>Tools</span></h2>
          <p className="lead-text">
            A full-stack data science toolkit — from raw data to deployed AI.
          </p>
        </div>

        <div className="skills-grid">
          {Object.entries(skills).map(([category, items], i) => (
            <div key={i} className="skills-cat-card card">
              <div className="skills-cat-header">
                <span className="skills-cat-icon">{categoryIcons[category] || "🔹"}</span>
                <h3 className="skills-cat-title">{category}</h3>
              </div>
              <div className="skills-tags">
                {items.map((skill, j) => (
                  <span key={j} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-section {
          background: var(--bg-secondary);
          overflow-y: auto;
        }
        .skills-header {
          margin-bottom: 48px;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .skills-cat-card {
          padding: 24px;
          transition: var(--transition);
        }
        .skills-cat-card:hover {
          border-color: rgba(126,184,247,0.3);
          box-shadow: var(--shadow-hover);
        }
        .skills-cat-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }
        .skills-cat-icon { font-size: 20px; }
        .skills-cat-title {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .skills-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }
        .skill-tag {
          display: inline-block;
          padding: 5px 12px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
          background: var(--bg-primary);
          color: var(--text-secondary);
          border: 1px solid var(--border);
          transition: var(--transition);
          cursor: default;
        }
        .skill-tag:hover {
          background: var(--accent-light);
          color: var(--accent);
          border-color: rgba(126,184,247,0.3);
          transform: translateY(-1px);
        }
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .skills-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}