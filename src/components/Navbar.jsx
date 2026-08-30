import { useState, useEffect } from 'react';
import './Navbar.css';

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <button className="navbar__logo" onClick={() => scrollTo('home')} id="nav-logo">
          <span className="navbar__logo-text">F.Yusuf</span>
        </button>

        <button
          className={`navbar__hamburger ${open ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          id="nav-hamburger"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Full-screen Overlay Menu */}
      <div className={`nav-overlay ${open ? 'nav-overlay--open' : ''}`}>
        <nav className="nav-overlay__menu">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              className="nav-overlay__item"
              onClick={() => scrollTo(item.id)}
              id={`nav-link-${item.id}`}
              style={{ transitionDelay: open ? `${i * 0.07}s` : '0s' }}
            >
              <span className="nav-overlay__label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="nav-overlay__footer">
          <a href="https://github.com/fahim06" target="_blank" rel="noreferrer" aria-label="GitHub">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="mailto:fahim.yusuf06@gmail.com" aria-label="Email">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </a>
          <a href="https://www.linkedin.com/in/fahim06/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>
      </div>
    </>
  );
}
