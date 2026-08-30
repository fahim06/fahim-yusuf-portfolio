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
              <span className="nav-overlay__num">0{i + 1}</span>
              <span className="nav-overlay__label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="nav-overlay__footer">
          <span className="letter-spaced">fahim.yusuf06@gmail.com</span>
        </div>
      </div>
    </>
  );
}
