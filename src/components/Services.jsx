import { useIntersection } from '../hooks/useIntersection';
import './Services.css';

const services = [
  { icon: '🤖', title: 'AI & Machine Learning', desc: 'Building intelligent systems using PyTorch, TensorFlow, and scikit-learn with state-of-the-art architectures.' },
  { icon: '👁️', title: 'Computer Vision', desc: 'Designing CNN-based pipelines for image classification, object detection, and medical image analysis.' },
  { icon: '🌐', title: 'Web Application', desc: 'Full-stack development with React, Django, and Laravel — from REST APIs to polished frontends.' },
  { icon: '📊', title: 'Data Science', desc: 'Transforming raw data into insights through analysis, visualization, and predictive modeling.' },
  { icon: '📱', title: 'Mobile Development', desc: 'Cross-platform mobile applications with clean UX and reliable performance.' },
  { icon: '☁️', title: 'API & Backend', desc: 'Scalable RESTful APIs, database design, and cloud-ready backend services.' },
];

/* Rotating 3D gear sphere */
function GearSphere() {
  return (
    <div className="gear-sphere" aria-hidden="true">
      <div className="gear-sphere__outer">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="gear-sphere__particle"
            style={{
              '--a': `${(i / 32) * 360}deg`,
              '--r': `${110 + (i % 4) * 20}px`,
              '--delay': `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
      <div className="gear-sphere__inner">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="gear-sphere__ring" style={{ '--i': i }} />
        ))}
      </div>
      <div className="gear-sphere__core" />
    </div>
  );
}

export default function Services() {
  const [ref, visible] = useIntersection();

  return (
    <section id="services" className="services section">
      <div className="services__layout">
        {/* Left Content */}
        <div ref={ref} className={`services__content ${visible ? 'fade-up visible' : 'fade-up'}`}>
          <h2 className="services__heading">Service</h2>
          <div className="services__divider" />

          <p className="services__intro italic-serif">
            "You might be wondering how I can help you. As a developer, I can turn
            your ideas into results — using my expertise in AI/ML, full-stack development,
            and data science. Whether it's an intelligent application, a web platform,
            or a research system, I'll create solutions that exceed your expectations."
          </p>

          <div className="services__grid">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="service-card"
                id={`service-${i}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="service-card__icon">{s.icon}</span>
                <span className="service-card__title">{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Visual */}
        <div className="services__visual">
          <GearSphere />
        </div>
      </div>
    </section>
  );
}
