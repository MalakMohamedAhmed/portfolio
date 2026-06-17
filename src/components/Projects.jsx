import { useState } from 'react'
import { projects } from '../data/portfolio'
import { Github, ExternalLink, Linkedin } from 'lucide-react'

const filters = ['All', 'AI', 'ML', 'Analytics', 'CV']

export default function Projects() {
  const [active, setActive] = useState('All')
  const [showAll, setShowAll] = useState(false)

  const filtered = projects.filter(p => {
    if (active === 'All') return true
    return p.type.toLowerCase() === active.toLowerCase()
  })

  const tier1 = filtered.filter(p => p.tier === 1)
  const tier2 = filtered.filter(p => p.tier === 2)
  const visibleTier2 = showAll ? tier2 : tier2.slice(0, 6)

  return (
  <section id="projects" className="section proj-section">
    <div className="proj-section-header">
      <div className="proj-header-row">
        <div>
          <span className="eyebrow">Portfolio</span>
          <h2 className="section-title">My <span>Projects</span></h2>
          <p className="section-subtitle">
            From production-deployed AI systems to data dashboards — here's what I've built.
          </p>
        </div>
        <div className="proj-filters">
          {filters.map(f => (
            <button
              key={f}
              className={`proj-filter-btn ${active === f ? 'proj-filter-btn--active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>

    <div className="proj-grid-wrap">
      {tier1.length > 0 && (
        <>
          <p className="proj-tier-label">⭐ Featured Projects</p>
          <div className="proj-grid-featured">
            {tier1.map((p, i) => <FeaturedCard key={i} project={p} />)}
          </div>
        </>
      )}

      {tier2.length > 0 && (
        <>
          <p className="proj-tier-label" style={{ marginTop: 72 }}>Other Projects</p>
          <div className="proj-grid">
            {visibleTier2.map((p, i) => <ProjectCard key={i} project={p} />)}
          </div>
          {tier2.length > 6 && (
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <button className="btn btn-outline" onClick={() => setShowAll(!showAll)}>
                {showAll ? 'Show Less' : `Show All ${tier2.length} Projects`}
              </button>
            </div>
          )}
        </>
      )}
    </div>

    <style>{`
      .proj-section {
        background: #0a1020;
        border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
      }
      .proj-section-header {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 48px;
        margin-bottom: 48px;
      }
      .proj-header-row {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 32px;
        flex-wrap: wrap;
      }
      .proj-grid-wrap {
        width: 100%;
        padding: 0 48px;
      }
      .proj-filters {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 0;
      }
      .proj-filter-btn {
        padding: 9px 22px;
        border-radius: 100px;
        border: 1px solid var(--border);
        background: var(--bg-card);
        color: var(--text-secondary);
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: var(--transition);
        font-family: 'Inter', sans-serif;
      }
      .proj-filter-btn:hover { border-color: var(--accent); color: var(--accent-bright); }
      .proj-filter-btn--active {
        background: var(--accent);
        color: white;
        border-color: var(--accent);
      }
      .proj-tier-label {
        font-size: 11px;
        font-weight: 700;
        color: var(--text-muted);
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-bottom: 28px;
      }
      .proj-grid-featured {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 32px;
        margin-bottom: 16px;
      }
      .proj-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 28px;
      }

      /* FEATURED CARD */
      .feat-card {
        background: var(--bg-card);
        border-radius: var(--radius);
        border: 1px solid var(--border);
        overflow: hidden;
        box-shadow: var(--shadow);
        transition: var(--transition);
        display: flex;
        flex-direction: column;
      }
      .feat-card:hover {
        box-shadow: var(--shadow-hover);
        transform: translateY(-4px);
        border-color: rgba(37,99,235,0.3);
      }
      .feat-card-media {
        width: 100%;
        height: 240px;
        background: var(--accent-light);
        overflow: hidden;
        position: relative;
      }
      .feat-card-media img { width: 100%; height: 100%; object-fit: cover; }
      .feat-card-media video { width: 100%; height: 100%; object-fit: cover; }
      .feat-card-media iframe { width: 100%; height: 100%; border: none; pointer-events: none; }
      .feat-card-media-placeholder {
        width: 100%; height: 100%;
        display: flex; align-items: center; justify-content: center;
        color: var(--accent-bright); font-size: 14px; font-weight: 500;
      }
      .feat-deployed-badge {
        position: absolute;
        top: 12px; right: 12px;
        background: rgba(34,197,94,0.15);
        color: #4ade80;
        border: 1px solid rgba(34,197,94,0.3);
        font-size: 11px; font-weight: 600;
        padding: 4px 10px; border-radius: 100px; z-index: 1;
      }
      .feat-card-body { padding: 24px; flex: 1; display: flex; flex-direction: column; }
      .feat-card-title { font-size: 22px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
      .feat-card-subtitle { font-size: 13px; color: var(--accent-bright); font-weight: 500; margin-bottom: 14px; }
      .feat-card-desc { font-size: 14px; color: var(--text-secondary); line-height: 1.75; margin-bottom: 16px; flex: 1; }
      .feat-card-features { list-style: none; margin-bottom: 20px; }
      .feat-card-features li {
        font-size: 13px; color: var(--text-secondary);
        padding: 5px 0 5px 16px; position: relative;
        border-bottom: 1px solid var(--border-subtle);
      }
      .feat-card-features li:last-child { border-bottom: none; }
      .feat-card-features li::before { content: '▸'; position: absolute; left: 0; color: var(--accent-bright); }
      .feat-card-stack { display: flex; flex-wrap: wrap; gap: 6px; }

      /* BUTTONS */
      .proj-card-btns { display: flex; gap: 10px; flex-wrap: wrap; padding: 0 4px; }
      .proj-btn {
        display: inline-flex; align-items: center; gap: 7px;
        padding: 9px 18px; border-radius: 100px;
        font-size: 13px; font-weight: 600; cursor: pointer;
        transition: var(--transition); font-family: 'Inter', sans-serif;
        text-decoration: none; border: 1px solid var(--border);
        background: var(--bg-card); color: var(--text-secondary);
      }
      .proj-btn:hover {
        border-color: var(--accent); color: var(--accent-bright);
        transform: translateY(-2px); box-shadow: 0 4px 16px var(--accent-glow);
      }
      .proj-btn--primary { background: var(--accent); color: white; border-color: var(--accent); }
      .proj-btn--primary:hover { background: var(--accent-bright); border-color: var(--accent-bright); color: white; }

      /* SMALL CARD */
      .proj-card {
        background: var(--bg-card);
        border-radius: var(--radius);
        border: 1px solid var(--border);
        overflow: hidden; box-shadow: var(--shadow);
        transition: var(--transition); display: flex; flex-direction: column;
      }
      .proj-card:hover {
        box-shadow: var(--shadow-hover); transform: translateY(-4px);
        border-color: rgba(37,99,235,0.3);
      }
      .proj-card-media {
        width: 100%; height: 170px;
        background: var(--accent-light); overflow: hidden;
      }
      .proj-card-media img, .proj-card-media video { width: 100%; height: 100%; object-fit: cover; }
      .proj-card-media iframe { width: 100%; height: 100%; border: none; pointer-events: none; }
      .proj-card-body { padding: 20px; flex: 1; display: flex; flex-direction: column; }
      .proj-card-title { font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
      .proj-card-subtitle { font-size: 12px; color: var(--accent-bright); font-weight: 500; margin-bottom: 10px; }
      .proj-card-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.65; margin-bottom: 16px; flex: 1; }
      .proj-card-stack { display: flex; flex-wrap: wrap; gap: 5px; }

      .section-subtitle {
        font-size: 16px; color: var(--text-secondary);
        line-height: 1.7; margin-top: 12px;
      }

      @media (max-width: 1100px) {
        .proj-grid-featured { grid-template-columns: 1fr; }
        .proj-grid { grid-template-columns: repeat(2, 1fr); }
        .proj-section-header { padding: 0 24px; }
        .proj-grid-wrap { padding: 0 24px; }
      }
      @media (max-width: 640px) {
        .proj-grid { grid-template-columns: 1fr; }
        .proj-header-row { flex-direction: column; align-items: flex-start; }
      }
    `}</style>
  </section>
  )
}
// ── Shared button row ──────────────────────────────────────────────
function ProjectButtons({ project: p, size = 'md' }) {
  const pad = size === 'sm' ? '7px 14px' : '9px 18px'
  const fs = size === 'sm' ? 12 : 13
  return (
    <div className="proj-card-btns">
      {p.github && (
        <a href={p.github} target="_blank" rel="noreferrer" className="proj-btn" style={{ fontSize: fs, padding: pad }}>
          <Github size={fs + 1} /> GitHub
        </a>
      )}
      {p.live && (
        <a href={p.live} target="_blank" rel="noreferrer" className="proj-btn proj-btn--primary" style={{ fontSize: fs, padding: pad }}>
          <ExternalLink size={fs + 1} /> Live Demo
        </a>
      )}
      {p.kaggle && (
        <a href={p.kaggle} target="_blank" rel="noreferrer" className="proj-btn" style={{ fontSize: fs, padding: pad }}>
          <ExternalLink size={fs + 1} /> Kaggle
        </a>
      )}
      {p.LinkedIn && (
        <a href={p.LinkedIn} target="_blank" rel="noreferrer" className="proj-btn" style={{ fontSize: fs, padding: pad }}>
          <Linkedin size={fs + 1} /> LinkedIn
        </a>
      )}
    </div>
  )
}

// ── Media block ────────────────────────────────────────────────────
function MediaBlock({ media, title, className }) {
  if (media?.type === 'embed') return (
    <div className={className}>
      <iframe src={media.src} title={title} allowFullScreen loading="lazy" />
    </div>
  )
  if (media?.type === 'video') return (
    <div className={className}>
      <video src={media.src} autoPlay muted loop playsInline />
    </div>
  )
  if (media?.src) return (
    <div className={className}>
      <img src={media.src} alt={title} onError={e => e.target.style.display = 'none'} />
    </div>
  )
  return (
    <div className={className}>
      <div className="feat-card-media-placeholder">📊 {title}</div>
    </div>
  )
}

// ── Featured card ──────────────────────────────────────────────────
function FeaturedCard({ project: p }) {
  return (
    <div className="feat-card">
        <div style={{ position: 'relative' }}>
          <MediaBlock media={p.media} title={p.title} className="feat-card-media" />
          {p.deployed && <span className="feat-deployed-badge">🟢 Live</span>}
        </div>
        <div className="feat-card-body">
          <h3 className="feat-card-title">{p.title}</h3>
          <p className="feat-card-subtitle">{p.subtitle}</p>
          <p className="feat-card-desc">{p.description}</p>
          {p.features && (
            <ul className="feat-card-features">
              {p.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          )}
          <div className="feat-card-stack" style={{ marginBottom: 20 }}>
            {p.stack.map((s, i) => <span key={i} className="tag">{s}</span>)}
          </div>
          <ProjectButtons project={p} size="md" />
        </div>
    </div>
  )
}

// ── Small card ─────────────────────────────────────────────────────
function ProjectCard({ project: p }) {
  return (
    <div className="proj-card">
      <MediaBlock media={p.media} title={p.title} className="proj-card-media" />
        <div className="proj-card-body">
          <h3 className="proj-card-title">{p.title}</h3>
          <p className="proj-card-subtitle">{p.subtitle}</p>
          <p className="proj-card-desc">{p.description}</p>
          <div className="proj-card-stack" style={{ marginBottom: 14 }}>
            {p.stack.map((s, i) => <span key={i} className="tag">{s}</span>)}
          </div>
          <ProjectButtons project={p} size="sm" />
        </div>
    </div>
  )
}
