import { education } from '../data/portfolio'
import { GraduationCap, Star } from 'lucide-react'

const coursesByDept = {
  "Computer Science": [
    { name: "Calculus 1", grade: "C+" },
    { name: "Calculus 2", grade: "A" },
    { name: "Linear Algebra", grade: "A" },
    { name: "Java Programming", grade: "A-" },
    { name: "OOP", grade: "A" },
    { name: "Discrete Mathematics", grade: "A" },
    { name: "Web Programming", grade: "A" },
    { name: "Data Structures", grade: "A" },
    { name: "Theory of Computations", grade: "A" },
    { name: "Numerical Methods", grade: "A" },
    { name: "Artificial Intelligence", grade: "A-" },
    { name: "Operating Systems", grade: "A-" },
    { name: "Database", grade: "A" },
    { name: "Algorithms", grade: "A" },
    { name: "Machine Learning", grade: "A" },
    { name: "Computer Graphics", grade: "A" },
    { name: "Image Processing", grade: "A" },
    { name: "Networks", grade: "A" },
    { name: "Security", grade: "A" },
    { name: "Information Retrieval", grade: "A" },
  ],
  "Statistics": [
    { name: "Probability & Statistics", grade: "A" },
    { name: "Statistical Methods", grade: "A" },
    { name: "Project Management", grade: "A" },
    { name: "Regression Analysis", grade: "A" },
    { name: "Multivariate Analysis", grade: "A" },
    { name: "Data Science & Analysis", grade: "A" },
    { name: "Nonparametric Statistics", grade: "A" },
    { name: "R Programming", grade: "A" },
    { name: "Data Mining", grade: "A" },
  ],
}

export default function Education() {
  return (
    <section id="education" className="snap-section edu-section">
      <div className="grid-bg" />
      <div className="section-inner edu-inner">
        <div className="edu-left">
          <span className="eyebrow">Academic Background</span>
          <h2 className="section-title">
            Education<br /><span>& Courses</span>
          </h2>
          <div className="edu-degree-card card">
            <div className="edu-degree-icon">
              <GraduationCap size={28} color="var(--accent)" />
            </div>
            <h3 className="edu-degree-title">B.Sc. Computer Science & Statistics</h3>
            <p className="edu-degree-uni">Alexandria University</p>
            <div className="edu-degree-meta">
              <span className="edu-gpa-badge">
                <Star size={12} /> GPA {education[0]?.gpa}
              </span>
              <span className="tag">{education[0]?.duration}</span>
            </div>
            <p className="edu-degree-note">{education[0]?.note}</p>
          </div>
        </div>

        <div className="edu-right">
          {Object.entries(coursesByDept).map(([dept, courses]) => (
            <div key={dept} className="edu-dept-block">
              <p className="edu-dept-label">{dept}</p>
              <div className="edu-courses">
                {courses.map((c, i) => (
                  <span key={i} className="edu-course-tag">
                    {c.name}
                    {c.grade && <span className="edu-course-grade">{c.grade}</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .edu-section {
          background: #0a0f1e;
          padding: 140px 0;
        }
        .edu-inner {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 100px;
          align-items: start;
        }
        .edu-left {
          position: sticky;
          top: 80px;
        }
        .edu-degree-card {
          padding: 28px;
          margin-top: 32px;
        }
        .edu-degree-icon {
          width: 52px; height: 52px;
          border-radius: var(--radius-sm);
          background: var(--accent-light);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
        }
        .edu-degree-title {
          font-family: 'Inter', sans-serif;
          font-size: 16px; font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
          line-height: 1.4;
        }
        .edu-degree-uni {
          font-size: 14px; color: var(--accent);
          font-weight: 600; margin-bottom: 16px;
        }
        .edu-degree-meta {
          display: flex; gap: 10px;
          align-items: center; flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .edu-gpa-badge {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 700;
          color: var(--accent);
          background: var(--accent-light);
          padding: 4px 12px; border-radius: 100px;
          border: 1px solid var(--border);
        }
        .edu-degree-note {
          font-size: 12px; color: var(--text-muted);
          font-style: italic;
        }
        .edu-right {
          padding-top: 8px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .edu-dept-block {}
        .edu-dept-label {
          font-size: 11px; font-weight: 700;
          color: var(--accent);
          text-transform: uppercase; letter-spacing: 2px;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border);
        }
        .edu-courses {
        display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 8px;
      }
        .edu-course-tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 12px; border-radius: 100px;
          font-size: 12px; font-weight: 500;
          background: var(--bg-card);
          color: var(--text-secondary);
          border: 1px solid var(--border);
          transition: var(--transition);
          cursor: default;
        }
        .edu-course-tag:hover {
          background: var(--accent-light);
          color: var(--accent);
          border-color: rgba(126,184,247,0.3);
        }
        .edu-course-grade {
          font-size: 10px; font-weight: 700;
          color: var(--accent);
          background: var(--accent-light);
          padding: 1px 6px; border-radius: 100px;
        }
        @media (max-width: 900px) {
          .edu-inner { grid-template-columns: 1fr; gap: 32px; }
          .edu-left { position: static; }
        }
      `}</style>
    </section>
  )
}