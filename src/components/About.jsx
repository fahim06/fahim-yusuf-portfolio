import { stats, personalInfo } from '../data/portfolio';
import { useIntersection } from '../hooks/useIntersection';
import './About.css';

/* Wireframe 3D head using CSS */
function WireframeAvatar() {
  return (
    <div className="wireframe-avatar" aria-hidden="true">
      <div className="wireframe-avatar__sphere">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="wireframe-avatar__ring" style={{ '--i': i }} />
        ))}
        {/* Central glow */}
        <div className="wireframe-avatar__core" />
        {/* Orbiting dots */}
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="wireframe-avatar__dot"
            style={{ '--angle': `${i * 15}deg`, '--radius': `${80 + (i % 3) * 30}px` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const [ref, visible] = useIntersection();

  return (
    <section id="about" className="about section">
      <div ref={ref} className={`container ${visible ? 'fade-up visible' : 'fade-up'}`}>
        <div className="about__header">
          <h2 className="about__heading">About</h2>
          <p className="about__sub letter-spaced">Researcher & Engineer</p>
        </div>

        <div className="about__bento">
          
          {/* Main Bio Card */}
          <div className="bento-card bento-card--large glass-panel">
            <h3 className="bento-card__title">Who I Am</h3>
            <div className="bento-card__bio">
              {personalInfo.bio.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Avatar / Visual Card */}
          <div className="bento-card bento-card--visual glass-panel">
            <WireframeAvatar />
          </div>

          {/* Stats Cards */}
          <div className="bento-card bento-card--stats glass-panel">
            <div className="stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className="stat-item">
                  <span className="stat-item__val">{stat.value}</span>
                  <span className="stat-item__label letter-spaced">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
