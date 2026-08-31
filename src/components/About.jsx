import { useState } from 'react';
import { education } from '../data/portfolio';
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

/* Skill icon grid */
const TECH_ICONS = {
  'FRONT-END': ['HTML', 'CSS', 'JavaScript', 'Three.js', 'jQuery', 'Bootstrap', 'React', 'Vue', 'Tailwind'],
  'BACK-END': ['Java', 'Spring', 'Hibernate', 'MySQL', 'Python', 'Django', 'MongoDB', 'Docker', 'Node.js', 'Git', 'Google Cloud'],
};

const DEVICON_CLASSES = {
  HTML: 'devicon-html5-plain colored',
  CSS: 'devicon-css3-plain colored',
  JavaScript: 'devicon-javascript-plain colored',
  'Three.js': 'devicon-threejs-original',
  jQuery: 'devicon-jquery-plain colored',
  Bootstrap: 'devicon-bootstrap-plain colored',
  React: 'devicon-react-original colored',
  Vue: 'devicon-vuejs-plain colored',
  Tailwind: 'devicon-tailwindcss-original colored',
  Java: 'devicon-java-plain colored',
  Spring: 'devicon-spring-original colored',
  Hibernate: 'devicon-hibernate-plain colored',
  MySQL: 'devicon-mysql-plain colored',
  Python: 'devicon-python-plain colored',
  Django: 'devicon-django-plain',
  MongoDB: 'devicon-mongodb-plain colored',
  Docker: 'devicon-docker-plain colored',
  'Node.js': 'devicon-nodejs-plain colored',
  Git: 'devicon-git-plain colored',
  'Google Cloud': 'devicon-googlecloud-plain colored',
};

export default function About() {
  const [activeTab, setActiveTab] = useState('education');
  const [ref, visible] = useIntersection();

  return (
    <section id="about" className="about section">
      <div className="about__layout">
        {/* Left – Wireframe Visual */}
        <div className="about__visual">
          <WireframeAvatar />
        </div>

        {/* Right – Content */}
        <div ref={ref} className={`about__content ${visible ? 'fade-up visible' : 'fade-up'}`}>
          <h2 className="about__heading">About</h2>

          <blockquote className="about__bio">
            "Hi, I'm Fahim an AI/ML researcher and full-stack developer from Bangladesh.
            I hold an M.Sc. in Computer Science from Jahangirnagar University, where I achieved
            99.85% accuracy in citrus classification using deep learning. I have a passion for
            turning research into intelligent, impactful software from computer vision systems
            to modern web applications. I'm always looking for new challenges and opportunities
            to grow as a developer and make a positive impact with my work."
          </blockquote>

          {/* Tabs */}
          <div className="about__tabs" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'education'}
              aria-controls="tabpanel-education"
              className={`about__tab ${activeTab === 'education' ? 'about__tab--active' : ''}`}
              onClick={() => setActiveTab('education')}
              id="tab-education"
            >
              🎓 Education
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'skills'}
              aria-controls="tabpanel-skills"
              className={`about__tab ${activeTab === 'skills' ? 'about__tab--active' : ''}`}
              onClick={() => setActiveTab('skills')}
              id="tab-skills"
            >
              ⚙️ Skills
            </button>
          </div>

          {/* Education */}
          {activeTab === 'education' && (
            <div className="about__education" role="tabpanel" id="tabpanel-education" aria-labelledby="tab-education">
              {education.map((edu) => (
                <div key={edu.degree} className="edu-row">
                  <span className="edu-row__year letter-spaced">{edu.period}</span>
                  <div className="edu-row__info">
                    <span className="edu-row__institution">{edu.school}</span>
                    <span className="edu-row__degree">{edu.degree}</span>
                  </div>
                </div>
              ))}

              <div className="about__actions">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="about__cv-btn"
                  aria-label="Download CV"
                >
                  DOWNLOAD CV
                </a>
                <a
                  href="https://github.com/fahim06"
                  target="_blank"
                  rel="noreferrer"
                  className="about__cv-btn"
                  id="about-download-cv"
                  aria-label="View GitHub profile"
                >
                  VIEW GITHUB
                </a>
              </div>
            </div>
          )}

          {/* Skills */}
          {activeTab === 'skills' && (
            <div className="about__skills-wrapper" role="tabpanel" id="tabpanel-skills" aria-labelledby="tab-skills">
              <div className="about__skills-columns">
                {Object.entries(TECH_ICONS).map(([group, items]) => (
                  <div key={group} className="skill-group">
                    <h4 className="skill-group__label letter-spaced">{group}</h4>
                    <div className="skill-group__icons">
                      {items.map((tech) => (
                        <div
                          key={tech}
                          className="skill-icon"
                          title={tech}
                        >
                          <div className="skill-icon__box">
                            <i className={DEVICON_CLASSES[tech]}></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="about__skills-divider"></div>
              <div className="about__skills-actions">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="about__skills-cv"
                  aria-label="Download CV"
                >
                  DOWNLOAD CV
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
