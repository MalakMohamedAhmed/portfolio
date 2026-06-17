import { skills } from '../data/portfolio'
import {
  SiPython, SiTensorflow, SiScikitlearn, SiPandas, SiNumpy,
  SiMysql, SiGithub, SiKaggle, SiHuggingface,
  SiOpencv, SiFlutter, SiDart, SiPlotly, SiStreamlit,
  SiR, SiGoogleanalytics,
} from 'react-icons/si'
import { FaDatabase, FaMicrosoft, FaChartBar, FaChartLine, FaTable } from 'react-icons/fa'

const marqueeIcons = [
  { icon: <SiPython />,         label: 'Python' },
  { icon: <SiTensorflow />,     label: 'TensorFlow' },
  { icon: <SiScikitlearn />,    label: 'Scikit-Learn' },
  { icon: <SiPandas />,         label: 'Pandas' },
  { icon: <SiNumpy />,          label: 'NumPy' },
  { icon: <SiStreamlit />,      label: 'Streamlit' },
  { icon: <SiPlotly />,         label: 'Plotly' },
  { icon: <SiMysql />,          label: 'MySQL' },
  { icon: <FaDatabase />,       label: 'SQL' },
  { icon: <SiGithub />,         label: 'GitHub' },
  { icon: <SiKaggle />,         label: 'Kaggle' },
  { icon: <SiHuggingface />,    label: 'HuggingFace' },
  { icon: <FaChartBar />,       label: 'Tableau' },
  { icon: <SiOpencv />,         label: 'OpenCV' },
  { icon: <SiFlutter />,        label: 'Flutter' },
  { icon: <SiDart />,           label: 'Dart' },
  { icon: <SiR />,              label: 'R' },
  { icon: <SiGoogleanalytics />,label: 'Google Analytics' },
  { icon: <FaMicrosoft />,      label: 'Excel' },
  { icon: <FaChartLine />,      label: 'Matplotlib' },
  { icon: <FaTable />,          label: 'Seaborn' },
]

// duplicate for seamless loop
const marqueeItems = [...marqueeIcons, ...marqueeIcons]

const categoryIcons = {
  "AI & Data Science":      "🧠",
  "Libraries & Frameworks": "📦",
  "Data & BI Tools":        "📊",
  "Databases":              "🗄️",
  "Computer Vision":        "👁️",
  "Other Tech":             "⚙️",
  "Soft Skills":            "🤝",
}

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="section-inner">
        <span className="section-label">What I Know</span>
        <h2 className="section-title">Skills &<br /><span>Tools</span></h2>
        <p className="section-subtitle">
          A full-stack data science toolkit — from raw data to deployed AI.
        </p>
      </div>

      {/* ── MARQUEE STRIP ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <div className="marquee-item" key={i}>
              <div className="marquee-icon">{item.icon}</div>
              <span className="marquee-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CARD GRID ── */}
      <div className="section-inner">
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
          background: #060a10;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding-bottom: 140px;
        }

        /* ── MARQUEE ── */
        .marquee-wrap {
          width: 100%;
          overflow: hidden;
          padding: 40px 0 56px;
          position: relative;
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        .marquee-track {
          display: flex;
          gap: 12px;
          width: max-content;
          animation: marquee-scroll 36s linear infinite;
        }
        .marquee-wrap:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 20px 28px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          min-width: 100px;
          cursor: default;
          transition: var(--transition);
          flex-shrink: 0;
        }
        .marquee-item:hover {
          border-color: var(--accent);
          background: var(--bg-card-hover);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px var(--accent-glow);
        }
        .marquee-icon {
          font-size: 36px;
          color: var(--text-secondary);
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }
        .marquee-item:hover .marquee-icon {
          color: var(--accent-bright);
        }
        .marquee-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.5px;
          white-space: nowrap;
          transition: var(--transition);
        }
        .marquee-item:hover .marquee-label {
          color: var(--text-secondary);
        }

        /* ── GRID ── */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .skills-cat-card {
          padding: 28px;
          transition: var(--transition);
        }
        .skills-cat-card:hover {
          border-color: rgba(59,130,246,0.3);
          box-shadow: var(--shadow-hover);
        }
        .skills-cat-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          padding-bottom: 14px;
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
          color: var(--accent-bright);
          border-color: rgba(59,130,246,0.3);
          transform: translateY(-1px);
        }

        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .skills-grid { grid-template-columns: 1fr; }
          .marquee-item { padding: 16px 20px; min-width: 80px; }
          .marquee-icon { font-size: 28px; }
        }
      `}</style>
    </section>
  )
}