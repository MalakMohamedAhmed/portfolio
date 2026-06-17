import { volunteering } from '../data/portfolio'
import { Heart } from 'lucide-react'

export default function Volunteering() {
  return (
    <section id="volunteering" className="snap-section vol-section">
      <div className="grid-bg" />
      <div className="section-inner">
        <div className="vol-header">
          <span className="eyebrow">Giving Back</span>
          <h2 className="section-title">
            Volunteering<br /><span>& Community</span>
          </h2>
          <p className="lead-text">
            Beyond work and study — organizations and causes I've contributed to.
          </p>
        </div>

        <div className="vol-grid">
          {volunteering.map((vol, i) => (
            <div key={i} className="vol-card card">
              <div className="vol-card-top">
                <div className="vol-icon">
                  <Heart size={16} color="var(--accent)" />
                </div>
                <div>
                  <p className="vol-field">{vol.field}</p>
                  <p className="vol-duration">{vol.duration}</p>
                </div>
              </div>

              {vol.images && vol.images.length > 0 && (
                <div className="vol-images">
                  {vol.images.slice(0, 3).map((img, j) => (
                    <div key={j} className="vol-img-wrap">
                      <img
                        src={img}
                        alt=""
                        onError={e => e.target.style.display = 'none'}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="vol-body">
                <h3 className="vol-role">{vol.role}</h3>
                <p className="vol-org">{vol.organization}</p>
                <p className="vol-desc">{vol.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .vol-section {
          background: #0a0f1e;
          padding: 140px 0;
        }
        .vol-header {
          margin-bottom: 48px;
        }
        .vol-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 100px;
          align-items: start;
        }
        .vol-card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: var(--transition);
        }
        .vol-card:hover {
          border-color: rgba(126,184,247,0.3);
          box-shadow: var(--shadow-hover);
          transform: translateY(-4px);
        }
        .vol-card-top {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 16px 16px 0;
        }
        .vol-icon {
          width: 32px; height: 32px;
          border-radius: var(--radius-sm);
          background: var(--accent-light);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .vol-field {
          font-size: 11px; font-weight: 700;
          color: var(--accent);
          text-transform: uppercase; letter-spacing: 1px;
        }
        .vol-duration {
          font-size: 11px; color: var(--text-muted);
          margin-top: 2px;
        }
        .vol-images {
          display: flex;
          gap: 4px;
          padding: 15px 60px 0;
          height: 300px;
        }
        .vol-img-wrap {
          flex: 1;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: var(--accent-light);
        }
        .vol-img-wrap img {
          width: 100%; height: 100%; object-fit: cover;
          transition: var(--transition);
        }
        .vol-card:hover .vol-img-wrap img {
          transform: scale(1.05);
        }
        .vol-body {
          padding: 14px 16px 20px;
          flex: 1;
        }
        .vol-role {
          font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 3px;
          line-height: 1.3;
        }
        .vol-org {
          font-size: 12px; color: var(--accent);
          font-weight: 600; margin-bottom: 8px;
        }
        .vol-desc {
          font-size: 12px; color: var(--text-secondary);
          line-height: 1.6;
        }
        @media (max-width: 900px) {
          .vol-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .vol-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}