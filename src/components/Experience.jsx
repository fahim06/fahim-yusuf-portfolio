import { experience, education } from '../data/portfolio';
import { useIntersection } from '../hooks/useIntersection';
import './Experience.css';

export default function Experience() {
  const [ref, visible] = useIntersection();

  // Combine experience and education, then sort if needed or just interleave.
  // For simplicity, we'll map them separately or sequentially.
  // The brief asks for a focus on research and transition to SE.
  // Let's create a combined timeline.

  const timelineItems = [
    ...experience.map(e => ({ ...e, type: 'experience' })),
    ...education.map(e => ({
      ...e,
      role: e.degree,
      company: e.school,
      type: 'education'
    }))
  ];

  return (
    <section id="experience" className="experience section">
      <div
        ref={ref}
        className={`container ${visible ? 'fade-up visible' : 'fade-up'}`}
      >
        <div className="experience__header">
          <h2 className="experience__heading">Experience & Education</h2>
          <p className="experience__sub letter-spaced">My professional journey</p>
        </div>

        <div className="experience__timeline">
          {timelineItems.map((item, i) => (
            <div className="timeline-item" key={i}>
              <div 
                className="timeline-item__marker" 
                style={{ borderColor: item.color || 'var(--accent)', boxShadow: `0 0 10px ${item.color}40` }}
              />
              <div className="timeline-item__content glass-panel">
                <span className="timeline-item__period letter-spaced" style={{ color: item.color || 'var(--accent)' }}>
                  {item.period}
                </span>
                <h3 className="timeline-item__role">{item.role}</h3>
                <p className="timeline-item__company">{item.company}</p>
                <p className="timeline-item__desc">{item.description}</p>
                
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="timeline-item__highlights">
                    {item.highlights.map((h, idx) => (
                      <li key={idx} style={{ '--accent': item.color }}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
