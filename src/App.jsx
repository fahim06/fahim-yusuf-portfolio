import { useEffect, useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundCombined from './components/BackgroundCombined';
import './App.css';



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

import ErrorPage from './components/ErrorPage';

export default function App() {
  // Simple check for 404s since we don't use React Router
  if (window.location.pathname !== '/') {
    return <ErrorPage type="404" message="The page you are looking for does not exist." />;
  }

  return (
    <>
      <BackgroundCombined />
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
      <Analytics />
    </>
  );
}
