import { useEffect, useState, useRef } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

/* ── Custom Cursor ─────────────────────────────────── */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let x = 0, y = 0, rx = 0, ry = 0;
    const dot = dotRef.current;
    const ring = ringRef.current;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
    };

    const lerp = () => {
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      requestAnimationFrame(lerp);
    };

    window.addEventListener('mousemove', onMove);
    lerp();
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor__dot" />
      <div ref={ringRef} className="cursor__ring" />
    </>
  );
}

/* ── Section Dots Navigation ───────────────────────── */
const SECTIONS = ['home', 'about', 'services', 'projects', 'contact'];

function SectionDots() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="section-dots" role="navigation" aria-label="Page sections">
      {SECTIONS.map((id) => (
        <button
          key={id}
          className={`section-dots__dot ${active === id ? 'active' : ''}`}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          aria-label={`Go to ${id}`}
          id={`dot-${id}`}
        />
      ))}
    </div>
  );
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <SectionDots />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <SpeedInsights />
    </>
  );
}
