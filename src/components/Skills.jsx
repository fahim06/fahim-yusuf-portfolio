import { skills } from '../data/portfolio';
import { useIntersection } from '../hooks/useIntersection';
import './Skills.css';

const categoryColors = {
  'Languages': '#6366f1',
  'Frameworks & ML': '#8b5cf6',
  'Databases': '#06b6d4',
  'Tools & Platforms': '#10b981',
};

function SkillBar({ skill, color, visible, delay }) {
  return (
    <div className="skill-item" style={{ transitionDelay: `${delay}s` }}>
      <div className="skill-item__header">
        <span className="skill-item__name">{skill.name}</span>
        <span className="skill-item__level">{skill.level}%</span>
      </div>
      <div className="skill-item__track">
        <div
          className={`skill-item__bar ${visible ? 'skill-item__bar--filled' : ''}`}
          style={{
            '--target-width': `${skill.level}%`,
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
          }}
        />
      </div>
    </div>
  );
}

function CategoryCard({ category, skillList, color, index }) {
  const [ref, visible] = useIntersection();

  return (
    <div
      ref={ref}
      className={`skill-cat glass-panel ${visible ? 'skill-cat--visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="skill-cat__header">
        <div className="skill-cat__icon" style={{ background: `${color}18`, color }}>
          {categoryIcons[category]}
        </div>
        <div>
          <h3 className="skill-cat__title">{category}</h3>
          <span className="skill-cat__count">{skillList.length} skills</span>
        </div>
      </div>
      <div className="skill-cat__list">
        {skillList.map((skill, i) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            color={color}
            visible={visible}
            delay={i * 0.08}
          />
        ))}
      </div>
    </div>
  );
}

const categoryIcons = {
  'Languages': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  'Frameworks & ML': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  'Databases': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  'Tools & Platforms': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};

export default function Skills() {
  const [headerRef, headerVisible] = useIntersection();

  return (
    <section id="skills" className="skills section">
      <div className="skills__blob" />

      <div className="container">
        <div ref={headerRef} className={`section-header ${headerVisible ? 'animate-in' : ''}`}>
          <span className="section-label">// tools of the trade</span>
          <h2 className="section-title">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle">
            A curated set of technologies I use to build intelligent systems and stunning web experiences.
          </p>
        </div>

        <div className="skills__grid">
          {Object.entries(skills).map(([category, skillList], index) => (
            <CategoryCard
              key={category}
              category={category}
              skillList={skillList}
              color={categoryColors[category] || '#6366f1'}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
