import { useState, useEffect, useRef } from 'react'
import { certifications } from '../data/portfolio'

function CertDeck({ images, single }) {
  const imgs = images || (single ? [single] : [])
  const [order, setOrder] = useState(imgs.map((_, i) => i))
  const intervalRef = useRef(null)

  const startShuffle = () => {
    if (imgs.length < 2) return
    intervalRef.current = setInterval(() => {
      setOrder(prev => {
        const next = [...prev]
        next.push(next.shift())
        return next
      })
    }, 1200)
  }

  const stopShuffle = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setOrder(imgs.map((_, i) => i))
  }

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  if (imgs.length === 0) {
    return (
      <div className="cert-img-placeholder">🏅</div>
    )
  }

  if (imgs.length === 1) {
    return (
      <img
        src={imgs[0]}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
        onError={e => e.target.style.display = 'none'}
      />
    )
  }

  const count = Math.min(imgs.length, 3)
  const positions = [
    { zIndex: 3, transform: 'rotate(-2deg) translate(0px, 0px)',   filter: 'brightness(1)',    transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)' },
    { zIndex: 2, transform: 'rotate(3deg) translate(14px, 8px)',   filter: 'brightness(0.85)', transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)' },
    { zIndex: 1, transform: 'rotate(7deg) translate(28px, 16px)',  filter: 'brightness(0.70)', transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)' },
  ]

  return (
    <div
      className="cert-deck"
      onMouseEnter={startShuffle}
      onMouseLeave={stopShuffle}
    >
      {order.slice(0, count).map((imgIdx, posIdx) => (
        <div
          key={imgIdx}
          className="cert-deck-img"
          style={positions[posIdx]}
        >
          <img
            src={imgs[imgIdx]}
            alt=""
            onError={e => e.target.style.display = 'none'}
          />
        </div>
      ))}
    </div>
  )
}

export default function Certifications() {
  return (
    <section id="certifications" className="section cert-section">
      <div className="cert-section-header">
        <div className="cert-header">
          <span className="eyebrow">Credentials</span>
          <h2 className="section-title">Certifications<br /><span>& Licenses</span></h2>
          <p className="lead-text">
            A growing collection of credentials across AI, data science, programming, and professional development.
          </p>
        </div>
      </div>

      <div className="cert-grid-wrap">
        <div className="cert-grid">
          {certifications.map((cert, i) => (
            <div key={i} className="cert-card card">
              <div className="cert-img-wrap">
                <CertDeck images={cert.images} single={cert.image} />
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
        .cert-section-header {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 48px;
          margin-bottom: 60px;
        }
        .cert-grid-wrap {
          width: 100%;
          padding: 0 48px;
        }
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          width: 100%;
        }
        .cert-section {
          background: #060a10;
          padding: 140px 0;
        }
        .cert-header {
          margin-bottom: 60px;
        }
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
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
          border-color: rgba(59,130,246,0.3);
          box-shadow: var(--shadow-hover);
        }
        .cert-img-wrap {
          width: 100%;
          aspect-ratio: 3/2;
          background: var(--bg-card);
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cert-card:hover .cert-img-wrap img {
          transform: scale(1.04);
        }
        .cert-img-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 36px;
          color: var(--text-muted);
        }

        /* DECK */
        .cert-deck {
          position: relative;
          width: 85%;
          height: 85%;
          cursor: pointer;
        }
        .cert-deck-img {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 2px solid rgba(255,255,255,0.15);
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
          top: 0; left: 0;
        }
        .cert-deck-img img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }

        .cert-body {
          padding: 16px 18px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .cert-issuer {
          font-size: 10px; font-weight: 700;
          color: var(--accent-bright);
          text-transform: uppercase; letter-spacing: 1.5px;
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