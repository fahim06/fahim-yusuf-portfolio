import { useState } from 'react';
import { createPortal } from 'react-dom';
import { projects } from '../data/portfolio';
import { useIntersection } from '../hooks/useIntersection';
import './Projects.css';

/* Wireframe polygon shape for accents */
function WireframeShape({ type = 0 }) {
  const shapes = [
    <polygon key="t" points="50,5 95,85 5,85" fill="none" stroke="rgba(200,200,200,0.18)" strokeWidth="0.8" />,
    <polygon key="d" points="50,5 95,50 50,95 5,50" fill="none" stroke="rgba(200,200,200,0.18)" strokeWidth="0.8" />,
    <polygon key="p" points="50,5 95,35 80,85 20,85 5,35" fill="none" stroke="rgba(200,200,200,0.18)" strokeWidth="0.8" />,
    <polygon key="h" points="50,5 90,28 90,72 50,95 10,72 10,28" fill="none" stroke="rgba(200,200,200,0.18)" strokeWidth="0.8" />,
  ];

  return (
    <svg viewBox="0 0 100 100" width="64" height="64" aria-hidden="true">
      {shapes[type % shapes.length]}
    </svg>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [ref, visible] = useIntersection();

  // Highlight ML/AI projects if they have the 'stars: 1' flag
  const displayed = projects || [];

  return (
    <section id="projects" className="projects section">
      <div
        ref={ref}
        className={`projects__inner container ${visible ? 'fade-up visible' : 'fade-up'}`}
      >
        <div className="projects__header">
          <h2 className="projects__heading">Projects</h2>
          <p className="projects__sub letter-spaced">Selected works & research</p>
        </div>

        <div className="projects__grid">
          {displayed.map((project, i) => {
            const isFeatured = project.stars === 1;
            return (
              <article
                key={`${project.name}-${i}`}
                className={`project-card glass-panel ${isFeatured ? 'project-card--featured' : ''}`}
                role="button"
                id={`project-card-${i}`}
                onClick={() => setActiveProject(project)}
                onKeyDown={(e) => e.key === 'Enter' && setActiveProject(project)}
                tabIndex={0}
                aria-label={`${project.name} — click to view details`}
              >
                <div className="project-card__shape" aria-hidden="true">
                  <WireframeShape type={i} />
                </div>

                <div className="project-card__content">
                  <div className="project-card__meta">
                    <span
                      className="project-card__lang letter-spaced"
                      style={{ color: project.color || 'var(--accent)' }}
                    >
                      {project.language}
                    </span>
                    {project.badge && (
                      <span className="project-card__badge" style={{ backgroundColor: `${project.color}20`, color: project.color, border: `1px solid ${project.color}50` }}>
                        {project.badge}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="project-card__title">{project.name}</h3>
                  <p className="project-card__desc">{project.description}</p>
                  
                  <div className="project-card__tags">
                    {(project.tags || []).map((t) => (
                      <span key={t} className="project-card__tag">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="project-card__cta" aria-hidden="true">
                  View details →
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Project detail modal */}
      {activeProject && createPortal(
        <div
          className="project-detail"
          onClick={() => setActiveProject(null)}
          role="dialog"
          aria-label={activeProject.name}
          aria-modal="true"
        >
          <div
            className="project-detail__card glass-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="project-detail__close"
              onClick={() => setActiveProject(null)}
              id="project-detail-close"
              aria-label="Close project details"
            >
              ✕
            </button>

            <div className="project-detail__shape" aria-hidden="true">
              <WireframeShape type={displayed.findIndex(p => p.name === activeProject.name)} />
            </div>

            <div className="project-detail__meta">
              <span className="letter-spaced" style={{ color: activeProject.color || 'var(--accent)' }}>
                {activeProject.language || 'Project'}
              </span>
            </div>

            <h3 className="project-detail__title">{activeProject.name}</h3>
            <p className="project-detail__desc">{activeProject.description}</p>

            <div className="project-detail__tags">
              {(activeProject.tags || []).map((t) => (
                <span key={t} className="project-detail__tag">{t}</span>
              ))}
            </div>

            <div className="project-detail__links">
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="project-detail__link"
                  id={`project-github-${activeProject.name.replace(/\s+/g, '-')}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub →
                </a>
              )}
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="project-detail__link project-detail__link--accent"
                  id={`project-live-${activeProject.name.replace(/\s+/g, '-')}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  Live Demo →
                </a>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
