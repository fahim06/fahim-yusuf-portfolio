import { useEffect, useRef } from 'react';
import './Hero.css';

/* ── Particle Canvas ─────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H, particles;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    const rand = (min, max) => Math.random() * (max - min) + min;

    const initParticles = () => {
      const particleCount = window.innerWidth < 768 ? 40 : 100;
      particles = Array.from({ length: particleCount }, () => ({
        x: rand(0, W),
        y: rand(0, H),
        vx: rand(-0.15, 0.15),
        vy: rand(-0.15, 0.15),
        r: rand(0.5, 1.5),
        alpha: rand(0.1, 0.5),
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    draw();

    const onResize = () => { resize(); initParticles(); };
    window.addEventListener('resize', onResize);

    /* Pause rAF when tab is hidden to save CPU */
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        draw();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__canvas" />;
}

/* ── Floating Binary Numbers ───────────────── */
/* Data initialized at module scope to avoid Math.random during render */
const BINARY_FLOATS_DATA = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  val: Array.from({ length: 4 }, () => Math.round(Math.random())).join(''),
  left: `${Math.random() * 90 + 5}%`,
  top: `${Math.random() * 85 + 5}%`,
  delay: `${Math.random() * 8}s`,
  duration: `${8 + Math.random() * 6}s`,
}));

function BinaryFloats() {
  const items = BINARY_FLOATS_DATA;

  return (
    <div className="hero__binary-field" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.id}
          className="hero__binary"
          style={{
            left: item.left,
            top: item.top,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          {item.val}
        </span>
      ))}
    </div>
  );
}

/* ── Wave Shape ──────────────────────────────────── */
function WaveShape() {
  return (
    <div className="hero__wave" aria-hidden="true">
      <svg viewBox="0 0 1400 200" preserveAspectRatio="none">
        <path
          d="M0,100 C200,20 400,180 600,100 S1000,20 1200,100 S1400,180 1400,100"
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
        <path
          d="M0,120 C200,40 400,200 600,120 S1000,40 1200,120 S1400,200 1400,120"
          fill="none"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="1"
        />
        <path
          d="M0,80 C200,0 400,160 600,80 S1000,0 1200,80 S1400,160 1400,80"
          fill="none"
          stroke="rgba(255,255,255,0.02)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────── */
export default function Hero() {
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="hero section">

      <BinaryFloats />
      <WaveShape />

      {/* Glow */}
      <div className="hero__glow" aria-hidden="true" />

      {/* Content */}
      <div className="hero__content">
        <p className="hero__eyebrow letter-spaced">| Creative Developer |</p>

        <h1 className="hero__name">
          <span className="hero__name-line">
            <span className="hero__name-first">F</span>
            <span className="hero__name-rest">AHIM</span>
          </span>
          <span className="hero__name-line">
            <span className="hero__name-first">Y</span>
            <span className="hero__name-rest">USUF</span>
          </span>
        </h1>

        <button className="hero__cta" onClick={scrollToContact} id="hero-cta-btn">
          Get in Touch
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll" aria-label="Scroll down">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
      </div>
    </section>
  );
}
