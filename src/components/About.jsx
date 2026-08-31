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
  Languages: ['Python', 'JavaScript', 'Java', 'SQL', 'HTML', 'CSS'],
  Frameworks: ['React', 'Django', 'TensorFlow', 'Node.js', 'Bootstrap'],
  AI: ['OpenCV', 'Scikit-learn'],
  Tools: ['Git', 'MySQL', 'PostgreSQL', 'VS Code', 'Linux'],
};

const ICON_COLORS = {
  Python: '#3572A5', JavaScript: '#F0DB4F', Java: '#E76F00', PHP: '#787CB5',
  C: '#555555', SQL: '#e38c00', HTML: '#e34c26', CSS: '#264de4',
  React: '#61DBFB', Django: '#092E20', 'Django REST': '#a30000',
  PyTorch: '#EE4C2C', TensorFlow: '#FF6F00', Laravel: '#FF2D20',
  'Node.js': '#68A063', Bootstrap: '#7952B3',
  'Machine Learning': '#9b59b6', 'Deep Learning': '#e74c3c',
  'Computer Vision': '#1abc9c', NLP: '#3498db',
  OpenCV: '#5c3317', 'Scikit-learn': '#f89939',
  Git: '#F1502F', Docker: '#2496ED', MySQL: '#00758F',
  PostgreSQL: '#336791', 'VS Code': '#007ACC', Linux: '#333333',
};

const DEVICON_CLASSES = {
  Python: 'devicon-python-plain',
  JavaScript: 'devicon-javascript-plain',
  Java: 'devicon-java-plain',
  PHP: 'devicon-php-plain',
  C: 'devicon-c-plain',
  SQL: 'devicon-azuresqldatabase-plain',
  HTML: 'devicon-html5-plain',
  CSS: 'devicon-css3-plain',
  React: 'devicon-react-original',
  Django: 'devicon-django-plain',
  'Django REST': 'devicon-django-plain',
  PyTorch: 'devicon-pytorch-original',
  TensorFlow: 'devicon-tensorflow-original',
  Laravel: 'devicon-laravel-original',
  'Node.js': 'devicon-nodejs-plain',
  Bootstrap: 'devicon-bootstrap-plain',
  OpenCV: 'devicon-opencv-plain',
  'Scikit-learn': 'devicon-scikitlearn-plain',
  Git: 'devicon-git-plain',
  Docker: 'devicon-docker-plain',
  MySQL: 'devicon-mysql-plain',
  PostgreSQL: 'devicon-postgresql-plain',
  'VS Code': 'devicon-vscode-plain',
  Linux: 'devicon-linux-plain',
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

              <a
                href="https://github.com/fahim06"
                target="_blank"
                rel="noreferrer"
                className="about__cv-btn"
                id="about-download-cv"
                aria-label="View GitHub profile (CV available on request)"
              >
                VIEW GITHUB
              </a>
            </div>
          )}

          {/* Skills */}
          {activeTab === 'skills' && (
            <div className="about__skills" role="tabpanel" id="tabpanel-skills" aria-labelledby="tab-skills">
              {Object.entries(TECH_ICONS).map(([group, items]) => (
                <div key={group} className="skill-group">
                  <h4 className="skill-group__label letter-spaced">{group}</h4>
                  <div className="skill-group__icons">
                    {items.map((tech) => (
                      <div
                        key={tech}
                        className="skill-icon"
                        title={tech}
                        style={{ '--color': ICON_COLORS[tech] || '#888' }}
                      >
                        <div className="skill-icon__box">
                          {DEVICON_CLASSES[tech] ? (
                            <i className={`${DEVICON_CLASSES[tech]} colored`} style={{ fontSize: '40px' }}></i>
                          ) : (
                            <span className="skill-icon__abbr">
                              {tech.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <span className="skill-icon__name">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
