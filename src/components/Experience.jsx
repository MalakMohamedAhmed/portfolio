import { useState, useEffect, useRef } from 'react'
import { experience } from '../data/portfolio'
import { MapPin, ChevronDown } from 'lucide-react'

// ── Scroll reveal hook ──────────────────────────────────────────────
function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, visible]
}

// ── Stacked images ──────────────────────────────────────────────────
function StackedImages({ images, single }) {
  const imgs = images || (single ? [single] : [])
  const [order, setOrder] = useState(imgs.map((_, i) => i))
  const intervalRef = useRef(null)

  const startShuffle = () => {
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

  if (imgs.length === 0) return null

  if (imgs.length === 1) return (
    <div className="exp-gallery-single">
      <img src={imgs[0]} alt="" onError={e => e.target.style.display = 'none'} />
    </div>
  )

  const count = Math.min(imgs.length, 3)
  const positions = [
    { zIndex: 3, transform: 'rotate(-3deg) translate(0px, 0px)',   filter: 'brightness(1)',    transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)' },
    { zIndex: 2, transform: 'rotate(4deg) translate(22px, 12px)',  filter: 'brightness(0.85)', transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)' },
    { zIndex: 1, transform: 'rotate(9deg) translate(44px, 22px)',  filter: 'brightness(0.70)', transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)' },
  ]

  return (
    <div
      className="exp-gallery-deck"
      onMouseEnter={startShuffle}
      onMouseLeave={stopShuffle}
    >
      {order.slice(0, count).map((imgIdx, posIdx) => (
        <div
          key={imgIdx}
          className="exp-deck-img"
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

function PhaseItem({ phase }) {
  const imgs = phase.images || (phase.image ? [phase.image] : [])
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

  const hasImgs = imgs.length > 0
  const count = Math.min(imgs.length, 3)
  const positions = [
    { zIndex: 3, transform: 'rotate(-3deg) translate(0px, 0px)',  filter: 'brightness(1)',    transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)' },
    { zIndex: 2, transform: 'rotate(4deg) translate(22px, 12px)', filter: 'brightness(0.85)', transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)' },
    { zIndex: 1, transform: 'rotate(9deg) translate(44px, 22px)', filter: 'brightness(0.70)', transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)' },
  ]

  return (
    <div className="exp-phase">
      <div className="exp-phase-inner">
        <div className="exp-phase-left">
          <div className="exp-phase-header">
            <div className="exp-phase-dot" />
            <div className="exp-phase-info">
              <p className="exp-phase-name">{phase.name}</p>
              <p className="exp-phase-duration">{phase.duration}</p>
            </div>
          </div>
          {phase.bullets && phase.bullets.length > 0 && (
            <ul className="exp-phase-bullets">
              {phase.bullets.map((b, bi) => (
                <li key={bi}>{b}</li>
              ))}
            </ul>
          )}
        </div>

        {hasImgs && count > 0 && (
          <div
            className="exp-gallery-deck"
            onMouseEnter={startShuffle}
            onMouseLeave={stopShuffle}
          >
            {order.slice(0, count).map((imgIdx, posIdx) => (
              <div
                key={imgIdx}
                className="exp-deck-img"
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
        )}
      </div>
    </div>
  )
}

// ── Single timeline item with its own reveal observer ───────────────
function TimelineItem({ exp, isOpen, onToggle, typeStyle, hasImages, year, delay }) {
  const [ref, visible] = useScrollReveal(0.1)

  return (
    <div
      ref={ref}
      className={`exp-tl-item ${isOpen ? 'exp-tl-item--open' : ''} ${visible ? 'exp-tl-item--visible' : ''}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {/* Dot + year */}
      <div className="exp-tl-dot-wrap">
        <div className="exp-tl-dot" />
        {year && <span className="exp-tl-year">{year}</span>}
      </div>

      {/* Card */}
      <div className="exp-tl-card card" onClick={onToggle}>
        <div className="exp-tl-card-header">
          <div className="exp-tl-logo">
            {exp.image ? (
              <>
                <img src={exp.image} alt={exp.company}
                  onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
                <div className="exp-tl-logo-fallback" style={{display:'none'}}>{exp.company?.charAt(0) || '?'}</div>
              </>
            ) : exp.images ? (
              <>
                <img src={exp.images[0]} alt={exp.company}
                  onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
                <div className="exp-tl-logo-fallback" style={{display:'none'}}>{exp.company?.charAt(0) || '?'}</div>
              </>
            ) : (
              <div className="exp-tl-logo-fallback">{exp.company?.charAt(0) || '?'}</div>
            )}
          </div>

          <div className="exp-tl-header-text">
            <h3 className="exp-tl-role">{exp.role}</h3>
            <p className="exp-tl-meta">
              <span className="exp-tl-company">{exp.company}</span>
              <span className="exp-tl-sep">·</span>
              <span>{exp.duration}</span>
            </p>
          </div>

          <div className="exp-tl-header-right">
            <span className="exp-tl-type" style={{ background: typeStyle.bg, color: typeStyle.color }}>
              {exp.type}
            </span>
            <ChevronDown size={18} className={`exp-tl-chevron ${isOpen ? 'exp-tl-chevron--open' : ''}`} />
          </div>
        </div>

        {/* Expandable body */}
        <div className={`exp-tl-body ${isOpen ? 'exp-tl-body--open' : ''}`}>
          <div className="exp-tl-body-inner">
            <div className="exp-tl-body-meta">
              <span className="exp-meta-item"><MapPin size={13} /> {exp.location}</span>
            </div>

            {/* Phases (nested accordion) */}
            {exp.phases ? (
              <div className="exp-phases">
                {exp.phases.map((phase, pi) => (
                  <PhaseItem key={pi} phase={phase} />
                ))}
              </div>
              ) : (
              <div className={`exp-tl-expand-content ${hasImages ? 'exp-tl-expand-content--with-images' : ''}`}>
                {exp.bullets.length > 0 && (
                  <ul className="exp-bullets">
                    {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                )}
                {hasImages && (
                  <div className="exp-tl-images">
                    <StackedImages images={exp.images} single={exp.image} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Animated stat counter ───────────────────────────────────────────
const stats = [
  { value: '10+', label: 'Roles & Programs' },
  { value: '3+',  label: 'Years Active' },
  { value: '8+',  label: 'Organizations' },
]

function AnimatedStat({ value, label, trigger }) {
  const [display, setDisplay] = useState('0')
  useEffect(() => {
    if (!trigger) return
    const num = parseInt(value)
    const suffix = value.replace(String(num), '')
    let start = 0
    const step = Math.ceil(num / 20)
    const interval = setInterval(() => {
      start += step
      if (start >= num) { setDisplay(num + suffix); clearInterval(interval) }
      else setDisplay(start + suffix)
    }, 40)
    return () => clearInterval(interval)
  }, [trigger, value])
  return (
    <div className="exp-stat">
      <span className="exp-stat-value">{display}</span>
      <span className="exp-stat-label">{label}</span>
    </div>
  )
}

// ── Type badge colours ──────────────────────────────────────────────
const typeColors = {
  'Full-time':  { bg: 'rgba(34,197,94,0.15)',  color: '#4ade80' },
  'Part-time':  { bg: 'rgba(59,130,246,0.15)', color: '#93c5fd' },
  'Internship': { bg: 'rgba(168,85,247,0.15)', color: '#d8b4fe' },
  'Seasonal':   { bg: 'rgba(251,191,36,0.15)', color: '#fde68a' },
}

// ── Main component ──────────────────────────────────────────────────
export default function Experience() {
  const [openIdx, setOpenIdx] = useState(null)
  const [statsTrigger, setStatsTrigger] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsTrigger(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const toggle = (i) => setOpenIdx(openIdx === i ? null : i)

  return (
    <section id="experience" className="section exp-section" ref={sectionRef}>
      <div className="section-inner exp-layout">

        {/* LEFT — sticky */}
        <div className="exp-left">
          <div className="exp-left-inner">
            <p className="section-label">Work History</p>
            <h2 className="exp-big-title">My<br /><span>Journey</span></h2>
            <p className="exp-left-sub">
              Roles across AI, data science, operations, and research — building real things for real organizations.
            </p>
            <div className="exp-stats">
              {stats.map((s, i) => (
                <AnimatedStat key={i} value={s.value} label={s.label} trigger={statsTrigger} />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — timeline */}
        <div className="exp-right">
          <div className="exp-timeline-line" />
          {experience.map((exp, i) => (
            <TimelineItem
              key={i}
              exp={exp}
              isOpen={openIdx === i}
              onToggle={() => toggle(i)}
              typeStyle={typeColors[exp.type] || { bg: 'var(--accent-light)', color: 'var(--accent)' }}
              hasImages={(exp.images && exp.images.length > 0) || !!exp.image}
              year={exp.duration.match(/\d{4}/)?.[0] || ''}
              delay={i * 60}
            />
          ))}
        </div>
      </div>

      <style>{`
        /* PHASES */
        .exp-gallery-deck {
          position: relative;
          width: 200px;
          height: 160px;
          cursor: pointer;
          flex-shrink: 0;
          overflow: hidden;
        }
        .exp-deck-img {
          position: absolute;
          width: 160px;
          height: 120px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 2px solid rgba(255,255,255,0.8);
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
          top: 8px; left: 8px;
        }
        .exp-deck-img img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .exp-phases {
          display: flex;
          flex-direction: column;
          gap: 0;
          border-left: 2px solid var(--border);
          margin-left: 8px;
        }
        .exp-phase {
          padding: 16px 0 16px 20px;
          border-bottom: 1px solid var(--border);
          transition: var(--transition);
        }
        .exp-phase:last-child { border-bottom: none; }
        .exp-phase:hover { background: rgba(37,99,235,0.03); }
        .exp-phase-inner {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }
        .exp-phase-left { flex: 1; min-width: 0; }
        .exp-phase-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 10px;
        }
        .exp-phase-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
          margin-top: 5px;
          box-shadow: 0 0 6px rgba(37,99,235,0.4);
        }
        .exp-phase-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 3px;
          line-height: 1.4;
        }
        .exp-phase-duration {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 500;
        }
        .exp-phase-bullets {
          list-style: none;
          padding: 0;
          margin-left: 20px;
        }
        .exp-phase-bullets li {
          font-size: 12px;
          color: var(--text-secondary);
          padding: 4px 0 4px 14px;
          position: relative;
          line-height: 1.6;
        }
        .exp-phase-bullets li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--accent);
          font-size: 10px;
        }
        
        .exp-section { background: var(--bg-primary); padding: 100px 0; }
        .exp-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 80px;
          align-items: start;
        }

        /* PHASE IMAGE SLIDESHOW */
        .exp-phase-img-wrap {
          position: relative;
          width: 160px;
          height: 110px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid var(--border);
          cursor: pointer;
          background: var(--bg-secondary);
        }
        .exp-phase-img {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .exp-phase-img--active { opacity: 1; }
        .exp-phase-img-dots {
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 4px;
          z-index: 2;
        }
        .exp-phase-img-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: var(--transition);
        }
        .exp-phase-img-dot--active {
          background: white;
          transform: scale(1.3);
        }

        /* LEFT */
        .exp-left { position: sticky; top: 100px; }
        .exp-big-title {
          font-size: clamp(40px, 5vw, 64px);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
          margin: 12px 0 20px;
        }
        .exp-big-title span { color: var(--accent); }
        .exp-left-sub {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 40px;
        }
        .exp-stats { display: flex; flex-direction: column; gap: 20px; }
        .exp-stat-value {
          display: block;
          font-size: 36px;
          font-weight: 700;
          color: var(--accent);
          font-family: 'Playfair Display', serif;
          line-height: 1;
          margin-bottom: 4px;
        }
        .exp-stat-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        /* RIGHT TIMELINE */
        .exp-right { position: relative; padding-left: 80px; }
        .exp-timeline-line {
          position: absolute;
          left: 16px; top: 8px; bottom: 8px;
          width: 2px;
          background: linear-gradient(to bottom, var(--accent), var(--accent-light), transparent);
          border-radius: 2px;
        }

        /* SCROLL REVEAL */
        .exp-tl-item {
          position: relative;
          margin-bottom: 20px;
          opacity: 0;
          transform: translateY(32px) translateX(-8px);
          transition: opacity 0.55s cubic-bezier(0.4,0,0.2,1),
                      transform 0.55s cubic-bezier(0.4,0,0.2,1);
        }
        .exp-tl-item--visible {
          opacity: 1;
          transform: translateY(0) translateX(0);
        }

        /* DOT */
        .exp-tl-dot-wrap {
          position: absolute;
          left: -80px; top: 22px;
          display: flex; align-items: center; gap: 10px;
        }
        .exp-tl-dot {
          width: 16px; height: 16px;
          border-radius: 50%;
          background: var(--bg-primary);
          border: 3px solid var(--accent);
          box-shadow: 0 0 0 3px var(--accent-light);
          transition: var(--transition);
          flex-shrink: 0;
        }
        .exp-tl-item--open .exp-tl-dot {
          background: var(--accent);
          box-shadow: 0 0 0 4px var(--accent-light), 0 0 16px rgba(37,99,235,0.5);
        }
        .exp-tl-year {
          font-size: 13px;
          font-weight: 700;
          color: var(--accent-bright);
          letter-spacing: 0.5px;
          white-space: nowrap;
          opacity: 0.45;
          transition: var(--transition);
        }
        .exp-tl-item--open .exp-tl-year,
        .exp-tl-item:hover .exp-tl-year { opacity: 1; }

        /* CARD */
        .exp-tl-card {
          cursor: pointer;
          transition: var(--transition);
          overflow: hidden;
          border-left: 3px solid transparent;
        }
        .exp-tl-card:hover { transform: translateX(4px); box-shadow: var(--shadow-hover); }
        .exp-tl-item--open .exp-tl-card {
          border-left-color: var(--accent);
          box-shadow: var(--shadow-hover);
          transform: translateX(4px);
        }
        .exp-tl-card-header {
          display: flex; align-items: center;
          gap: 16px; padding: 18px 20px;
        }
        .exp-tl-logo {
          width: 48px; height: 48px;
          border-radius: var(--radius-sm);
          overflow: hidden; flex-shrink: 0;
          border: 1px solid var(--border);
          background: var(--bg-secondary);
        }
        .exp-tl-logo img { width: 100%; height: 100%; object-fit: cover; }
        .exp-tl-logo-fallback {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; font-weight: 700;
          color: var(--accent); background: var(--accent-light);
        }
        .exp-tl-header-text { flex: 1; min-width: 0; }
        .exp-tl-role {
          font-family: 'Inter', sans-serif;
          font-size: 15px; font-weight: 700;
          color: var(--text-primary); margin-bottom: 3px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .exp-tl-meta {
          font-size: 12px; color: var(--text-muted);
          display: flex; align-items: center;
          gap: 6px; flex-wrap: wrap;
        }
        .exp-tl-company { color: var(--accent); font-weight: 600; }
        .exp-tl-sep { color: var(--border); }
        .exp-tl-header-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .exp-tl-type {
          font-size: 11px; font-weight: 700;
          padding: 4px 10px; border-radius: 100px; white-space: nowrap;
        }
        .exp-tl-chevron { color: var(--text-muted); transition: transform 0.3s ease; flex-shrink: 0; }
        .exp-tl-chevron--open { transform: rotate(180deg); }

        /* EXPAND */
        .exp-tl-body { max-height: 0; overflow: hidden; transition: max-height 0.45s cubic-bezier(0.4,0,0.2,1); }
        .exp-tl-body--open { max-height: 800px; }
        .exp-tl-body-inner { padding: 20px 20px 24px; border-top: 1px solid var(--border); }
        .exp-tl-body-meta { margin-bottom: 16px; }
        .exp-meta-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--text-muted); }
        .exp-tl-expand-content { display: flex; flex-direction: column; gap: 24px; }
        .exp-tl-expand-content--with-images { flex-direction: row; align-items: flex-start; gap: 32px; }
        .exp-bullets { list-style: none; padding: 0; flex: 1; }
        .exp-bullets li {
          font-size: 13px; color: var(--text-secondary);
          padding: 6px 0 6px 16px; position: relative;
          line-height: 1.6; border-bottom: 1px solid var(--bg-secondary);
        }
        .exp-bullets li:last-child { border-bottom: none; }
        .exp-bullets li::before { content: '▸'; position: absolute; left: 0; color: var(--accent); }

        /* STACKED IMAGES */
        .exp-tl-images { flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        .exp-gallery-single {
          width: 260px; height: 180px;
          border-radius: var(--radius-sm); overflow: hidden;
          border: 2px solid var(--border); box-shadow: var(--shadow-hover);
        }
        .exp-gallery-single img { width: 100%; height: 100%; object-fit: cover; }
        .exp-gallery-stack { position: relative; }
        .exp-gallery-stack--2 { width: 280px; height: 210px; }
        .exp-gallery-stack--3 { width: 300px; height: 230px; }
        .exp-stack-img {
          position: absolute;
          border-radius: var(--radius-sm); overflow: hidden;
          border: 3px solid white;
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
          transition: var(--transition);
        }
        .exp-stack-img img { width: 100%; height: 100%; object-fit: cover; }
        .exp-gallery-stack--2 .exp-stack-img { width: 220px; height: 160px; }
        .exp-gallery-stack--2 .exp-stack-back { top: 28px; left: 44px; transform: rotate(6deg); z-index: 1; filter: brightness(0.82); }
        .exp-gallery-stack--2 .exp-stack-front { top: 0; left: 0; transform: rotate(-3deg); z-index: 2; }
        .exp-gallery-stack--3 .exp-stack-img { width: 210px; height: 155px; }
        .exp-gallery-stack--3 .exp-stack-back2 { top: 44px; left: 72px; transform: rotate(9deg); z-index: 1; filter: brightness(0.72); }
        .exp-gallery-stack--3 .exp-stack-back { top: 22px; left: 36px; transform: rotate(4deg); z-index: 2; filter: brightness(0.86); }
        .exp-gallery-stack--3 .exp-stack-front { top: 0; left: 0; transform: rotate(-3deg); z-index: 3; }
        .exp-tl-images:hover .exp-stack-front { transform: rotate(-3deg) scale(1.03); box-shadow: 0 12px 32px rgba(0,0,0,0.22); }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .exp-layout { grid-template-columns: 1fr; gap: 48px; }
          .exp-left { position: static; }
          .exp-stats { flex-direction: row; flex-wrap: wrap; gap: 32px; }
        }
        @media (max-width: 600px) {
          .exp-tl-expand-content--with-images { flex-direction: column; }
          .exp-gallery-stack--2, .exp-gallery-stack--3 { width: 220px; height: 180px; }
          .exp-gallery-stack--2 .exp-stack-img,
          .exp-gallery-stack--3 .exp-stack-img { width: 160px; height: 120px; }
          .exp-tl-role { white-space: normal; }
        }
      `}</style>
    </section>
  )
}