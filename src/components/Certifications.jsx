import { certifications } from '../data/portfolio'

export default function Certifications() {
  return (
    <section id="certifications" className="snap-section cert-section">
      <div className="grid-bg" />
      <div className="section-inner">
        <div className="cert-header">
          <span className="eyebrow">Credentials</span>
          <h2 className="section-title">Certifications<br /><span>& Licenses</span></h2>
          <p className="lead-text">
            A growing collection of credentials across AI, data science, programming, and professional development.
          </p>
        </div>

        <div className="cert-grid">
          {certifications.map((cert, i) => (
            <div key={i} className="cert-card card">
              <div className="cert-img-wrap">
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.name}
                    onError={e => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                <div
                  className="cert-img-placeholder"
                  style={{ display: cert.image ? 'none' : 'flex' }}
                >
                  🏅
                </div>
              </div>
              <div className="cert-body">
                <p className="cert-issuer">{cert.issuer}</p>
                <h3 className="cert-name">{cert.name}</h3>
                {cert.date && <p className="cert-date">{cert.date}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cert-section {
          background: var(--bg-secondary);
          overflow-y: auto;
        }
        .cert-header {
          margin-bottom: 48px;
        }
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .cert-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: var(--transition);
          cursor: default;
        }
        .cert-card:hover {
          transform: translateY(-4px);
          border-color: rgba(126,184,247,0.3);
          box-shadow: var(--shadow-hover);
        }
        .cert-img-wrap {
          width: 100%;
          aspect-ratio: 4/3;
          background: var(--accent-light);
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cert-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }
        .cert-card:hover .cert-img-wrap img {
          transform: scale(1.04);
        }
        .cert-img-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 36px;
        }
        .cert-body {
          padding: 14px 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cert-issuer {
          font-size: 10px; font-weight: 700;
          color: var(--accent);
          text-transform: uppercase; letter-spacing: 1px;
        }
        .cert-name {
          font-family: 'Inter', sans-serif;
          font-size: 12px; font-weight: 600;
          color: var(--text-primary);
          line-height: 1.4; flex: 1;
        }
        .cert-date {
          font-size: 10px; color: var(--text-muted);
          margin-top: 4px;
        }
        @media (max-width: 1000px) {
          .cert-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 700px) {
          .cert-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .cert-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}