import { useState } from 'react';
import { createPortal } from 'react-dom';
import { projects } from '../data/portfolio';
import { useIntersection } from '../hooks/useIntersection';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './Projects.css';

/* Wireframe polygon shape — now used as card accent */
function WireframeShape({ type = 0 }) {
  const shapes = [
    <polygon key="t" points="50,5 95,85 5,85" fill="none" stroke="rgba(200,200,200,0.18)" strokeWidth="0.8" />,
    <polygon key="d" points="50,5 95,50 50,95 5,50" fill="none" stroke="rgba(200,200,200,0.18)" strokeWidth="0.8" />,
    <polygon key="p" points="50,5 95,35 80,85 20,85 5,35" fill="none" stroke="rgba(200,200,200,0.18)" strokeWidth="0.8" />,
    <polygon key="h" points="50,5 90,28 90,72 50,95 10,72 10,28" fill="none" stroke="rgba(200,200,200,0.18)" strokeWidth="0.8" />,
    <polygon key="s" points="50,2 61,35 96,35 68,57 79,91 50,70 21,91 32,57 4,35 39,35" fill="none" stroke="rgba(200,200,200,0.18)" strokeWidth="0.8" />,
    <rect key="r" x="10" y="10" width="80" height="80" fill="none" stroke="rgba(200,200,200,0.18)" strokeWidth="0.8" />,
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

  const displayed = (projects || []);

  return (
    <section id="projects" className="projects section">
      <div
        ref={ref}
        className={`projects__inner container ${visible ? 'fade-up visible' : 'fade-up'}`}
      >
        {/* Section header */}
        <div className="projects__header">
          <h2 className="projects__heading">Projects</h2>
          <p className="projects__sub letter-spaced">Selected works</p>
        </div>

        {/* Project cards swiper */}
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 200,
            modifier: 1.5,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination]}
          className="projects__swiper"
          style={{ width: '100%', padding: '40px 0 60px 0' }}
        >
          {displayed.map((project, i) => (
            <SwiperSlide key={`${project.name}-${i}`} style={{ width: 'min(90vw, 420px)', height: 'auto', alignSelf: 'stretch' }}>
              <article
                className="project-card"
                role="listitem"
                id={`project-card-${i}`}
                onClick={() => setActiveProject(project)}
                onKeyDown={(e) => e.key === 'Enter' && setActiveProject(project)}
                tabIndex={0}
                aria-label={`${project.name} — click to view details`}
                style={{ height: '100%' }}
              >
                {/* Accent shape top-right */}
                <div className="project-card__shape" aria-hidden="true">
                  <WireframeShape type={i} />
                </div>

                {/* Card content */}
                <div className="project-card__body">
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
                    {(project.tags || []).slice(0, 3).map((t) => (
                      <span key={t} className="project-card__tag">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="project-card__cta" aria-hidden="true">
                  View details →
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
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
            className="project-detail__card"
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

            {/* Decorative shape */}
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

