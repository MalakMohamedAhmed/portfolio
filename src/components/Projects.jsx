import { useState } from 'react'
import { projects } from '../data/portfolio'
import { Github, ExternalLink } from 'lucide-react'

const filters = ['All', 'AI', 'ML', 'Analytics', 'CV']

export default function Projects() {
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const filtered = projects.filter(p => {
    if (active === 'All') return true
    return p.type.toLowerCase() === active.toLowerCase()
  })

  const tier1 = filtered.filter(p => p.tier === 1)
  const tier2 = filtered.filter(p => p.tier === 2)
  const visibleTier2 = showAll ? tier2 : tier2.slice(0, 6)

  return (
    <section id="projects" className="snap-section proj-section">
      <div className="grid-bg" />
      <div className="section-inner">
        <div className="proj-header">
          <div>
            <span className="eyebrow">Portfolio</span>
            <h2 className="section-title">My <span>Projects</span></h2>
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

        {tier1.length > 0 && (
          <>
            <p className="proj-tier-label">⭐ Featured</p>
            <div className="proj-grid-featured">
              {tier1.map((p, i) => (
                <FeaturedCard key={i} project={p} onClick={() => setSelected(p)} />
              ))}
            </div>
          </>
        )}

        {tier2.length > 0 && (
          <>
            <p className="proj-tier-label" style={{ marginTop: 48 }}>Other Projects</p>
            <div className="proj-grid">
              {visibleTier2.map((p, i) => (
                <ProjectCard key={i} project={p} onClick={() => setSelected(p)} />
              ))}
            </div>
            {tier2.length > 6 && (
              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <button className="btn btn-ghost" onClick={() => setShowAll(!showAll)}>
                  {showAll ? 'Show Less' : `Show All ${tier2.length} Projects`}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}

      <style>{`
        .proj-section {
          background: var(--bg-primary);
          overflow-y: auto;
        }
        .proj-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        .proj-filters {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .proj-filter-btn {
          padding: 7px 18px;
          border-radius: 100px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text-muted);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.3px;
        }
        .proj-filter-btn:hover { border-color: var(--accent); color: var(--accent); }
        .proj-filter-btn--active {
          background: var(--accent);
          color: #0a0e1a;
          border-color: var(--accent);
        }
        .proj-tier-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .proj-grid-featured {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        /* FEATURED CARD */
        .feat-card {
          background: var(--bg-card);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          overflow: hidden;
          transition: var(--transition);
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }
        .feat-card:hover {
          border-color: rgba(126,184,247,0.4);
          box-shadow: var(--shadow-hover);
          transform: translateY(-4px);
        }
        .feat-media {
          width: 100%;
          height: 200px;
          background: var(--accent-light);
          overflow: hidden;
          position: relative;
        }
        .feat-media img, .feat-media video {
          width: 100%; height: 100%; object-fit: cover;
        }
        .feat-media iframe {
          width: 100%; height: 100%; border: none; pointer-events: none;
        }
        .feat-media-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 32px;
        }
        .feat-live-badge {
          position: absolute; top: 10px; right: 10px;
          background: #22c55e; color: white;
          font-size: 10px; font-weight: 700;
          padding: 3px 8px; border-radius: 100px;
        }
        .feat-body { padding: 20px; flex: 1; display: flex; flex-direction: column; }
        .feat-title {
          font-size: 17px; font-weight: 700;
          color: var(--text-primary); margin-bottom: 3px;
          font-family: 'Inter', sans-serif;
        }
        .feat-subtitle {
          font-size: 12px; color: var(--accent);
          font-weight: 600; margin-bottom: 10px;
        }
        .feat-desc {
          font-size: 13px; color: var(--text-secondary);
          line-height: 1.6; margin-bottom: 14px; flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .feat-stack { display: flex; flex-wrap: wrap; gap: 5px; }

        /* SMALL CARD */
        .proj-card {
          background: var(--bg-card);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          overflow: hidden;
          transition: var(--transition);
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }
        .proj-card:hover {
          border-color: rgba(126,184,247,0.3);
          box-shadow: var(--shadow-hover);
          transform: translateY(-3px);
        }
        .proj-media {
          width: 100%; height: 130px;
          background: var(--accent-light);
          overflow: hidden;
        }
        .proj-media img, .proj-media video {
          width: 100%; height: 100%; object-fit: cover;
        }
        .proj-media iframe {
          width: 100%; height: 100%; border: none; pointer-events: none;
        }
        .proj-media-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
        }
        .proj-body { padding: 16px; flex: 1; display: flex; flex-direction: column; }
        .proj-title {
          font-size: 14px; font-weight: 700;
          color: var(--text-primary); margin-bottom: 3px;
          font-family: 'Inter', sans-serif;
        }
        .proj-subtitle {
          font-size: 11px; color: var(--accent);
          font-weight: 600; margin-bottom: 8px;
        }
        .proj-desc {
          font-size: 12px; color: var(--text-secondary);
          line-height: 1.5; margin-bottom: 12px; flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .proj-stack { display: flex; flex-wrap: wrap; gap: 4px; }

        /* MODAL */
        .proj-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .proj-modal {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          max-width: 700px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          position: relative;
        }
        .proj-modal-media {
          width: 100%;
          height: 300px;
          background: var(--accent-light);
          overflow: hidden;
        }
        .proj-modal-media img, .proj-modal-media video {
          width: 100%; height: 100%; object-fit: cover;
        }
        .proj-modal-media iframe {
          width: 100%; height: 100%; border: none;
        }
        .proj-modal-body { padding: 32px; }
        .proj-modal-close {
          position: absolute;
          top: 16px; right: 16px;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(0,0,0,0.5);
          border: 1px solid var(--border);
          color: white;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          font-size: 18px;
          z-index: 1;
          transition: var(--transition);
        }
        .proj-modal-close:hover { background: rgba(255,255,255,0.1); }
        .proj-modal-title {
          font-size: 24px; font-weight: 800;
          color: var(--text-primary); margin-bottom: 6px;
        }
        .proj-modal-subtitle {
          font-size: 14px; color: var(--accent);
          font-weight: 600; margin-bottom: 16px;
        }
        .proj-modal-desc {
          font-size: 14px; color: var(--text-secondary);
          line-height: 1.7; margin-bottom: 20px;
        }
        .proj-modal-features {
          list-style: none; margin-bottom: 20px;
        }
        .proj-modal-features li {
          font-size: 13px; color: var(--text-secondary);
          padding: 6px 0 6px 16px; position: relative;
          border-bottom: 1px solid var(--border);
          line-height: 1.5;
        }
        .proj-modal-features li:last-child { border-bottom: none; }
        .proj-modal-features li::before {
          content: '▸'; position: absolute; left: 0; color: var(--accent);
        }
        .proj-modal-stack { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 24px; }
        .proj-modal-actions { display: flex; gap: 12px; }

        @media (max-width: 900px) {
          .proj-grid-featured { grid-template-columns: 1fr; }
          .proj-grid { grid-template-columns: repeat(2, 1fr); }
          .proj-header { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 600px) {
          .proj-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}

function MediaBlock({ media, title, className }) {
  if (media?.type === 'embed') {
    return (
      <div className={className}>
        <iframe src={media.src} title={title} allowFullScreen loading="lazy" />
      </div>
    )
  }
  if (media?.type === 'video') {
    return (
      <div className={className}>
        <video src={media.src} autoPlay muted loop playsInline />
      </div>
    )
  }
  if (media?.src) {
    return (
      <div className={className}>
        <img src={media.src} alt={title} onError={e => e.target.style.display = 'none'} />
      </div>
    )
  }
  return (
    <div className={className}>
      <div className={className === 'feat-media' ? 'feat-media-placeholder' : 'proj-media-placeholder'}>
        📊
      </div>
    </div>
  )
}

function FeaturedCard({ project: p, onClick }) {
  return (
    <div className="feat-card" onClick={onClick}>
      <div style={{ position: 'relative' }}>
        <MediaBlock media={p.media} title={p.title} className="feat-media" />
        {p.deployed && <span className="feat-live-badge">🟢 Live</span>}
      </div>
      <div className="feat-body">
        <h3 className="feat-title">{p.title}</h3>
        <p className="feat-subtitle">{p.subtitle}</p>
        <p className="feat-desc">{p.description}</p>
        <div className="feat-stack">
          {p.stack.slice(0, 4).map((s, i) => <span key={i} className="tag">{s}</span>)}
          {p.stack.length > 4 && <span className="tag">+{p.stack.length - 4}</span>}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project: p, onClick }) {
  return (
    <div className="proj-card" onClick={onClick}>
      <MediaBlock media={p.media} title={p.title} className="proj-media" />
      <div className="proj-body">
        <h3 className="proj-title">{p.title}</h3>
        <p className="proj-subtitle">{p.subtitle}</p>
        <p className="proj-desc">{p.description}</p>
        <div className="proj-stack">
          {p.stack.slice(0, 3).map((s, i) => <span key={i} className="tag">{s}</span>)}
          {p.stack.length > 3 && <span className="tag">+{p.stack.length - 3}</span>}
        </div>
      </div>
    </div>
  )
}

function ProjectModal({ project: p, onClose }) {
  return (
    <div className="proj-modal-overlay" onClick={onClose}>
      <div className="proj-modal" onClick={e => e.stopPropagation()}>
        <button className="proj-modal-close" onClick={onClose}>✕</button>
        <div style={{ position: 'relative' }}>
          <MediaBlock media={p.media} title={p.title} className="proj-modal-media" />
          {p.deployed && <span className="feat-live-badge" style={{ top: 12, right: 12, position: 'absolute' }}>🟢 Live</span>}
        </div>
        <div className="proj-modal-body">
          <h3 className="proj-modal-title">{p.title}</h3>
          <p className="proj-modal-subtitle">{p.subtitle}</p>
          <p className="proj-modal-desc">{p.description}</p>
          {p.features && (
            <ul className="proj-modal-features">
              {p.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          )}
          <div className="proj-modal-stack">
            {p.stack.map((s, i) => <span key={i} className="tag">{s}</span>)}
          </div>
          <div className="proj-modal-actions">
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-outline">
                <Github size={15} /> GitHub
              </a>
            )}
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-primary">
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}