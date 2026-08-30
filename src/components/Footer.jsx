import { useState } from 'react';
import { socialLinks } from '../data/portfolio';
import './Footer.css';

function PrivacyModal({ onClose }) {
  return (
    <div className="footer-modal" role="dialog" aria-modal="true" aria-label="Privacy Notice" onClick={onClose}>
      <div className="footer-modal__card" onClick={e => e.stopPropagation()}>
        <button className="footer-modal__close" onClick={onClose} aria-label="Close privacy notice">✕</button>
        <h2 className="footer-modal__title">Privacy Notice</h2>
        <div className="footer-modal__body">
          <p><strong>Effective:</strong> August 2026 &nbsp;|&nbsp; <strong>Site:</strong> Fahim Yusuf Portfolio</p>
          <h3>What we collect</h3>
          <p>If you use the contact form, you voluntarily provide your name, email address, and message. This information is used solely to respond to your enquiry.</p>
          <h3>External services</h3>
          <p>This site loads fonts from <strong>fonts.googleapis.com</strong>. Google may log your IP address per their own privacy policy. No analytics, advertising, or tracking scripts are used.</p>
          <h3>Cookies & storage</h3>
          <p>This site does not set any cookies or use local/session storage.</p>
          <h3>Data sharing</h3>
          <p>No personal data is shared with third parties other than Google Fonts CDN.</p>
          <h3>Contact</h3>
          <p>Questions? Email <a href="mailto:fahim.yusuf06@gmail.com">fahim.yusuf06@gmail.com</a></p>
          <p className="footer-modal__disclaimer">This notice is provided in good faith. It has not been reviewed by a legal professional. No legal compliance claims are made.</p>
        </div>
      </div>
    </div>
  );
}

function A11yModal({ onClose }) {
  return (
    <div className="footer-modal" role="dialog" aria-modal="true" aria-label="Accessibility Statement" onClick={onClose}>
      <div className="footer-modal__card" onClick={e => e.stopPropagation()}>
        <button className="footer-modal__close" onClick={onClose} aria-label="Close accessibility statement">✕</button>
        <h2 className="footer-modal__title">Accessibility</h2>
        <div className="footer-modal__body">
          <p>This portfolio aims to be usable by as many people as possible. Below is a factual account of current accessibility features and known limitations.</p>
          <h3>What we do</h3>
          <ul>
            <li>Semantic HTML: header, main, footer, nav, section, article</li>
            <li>Skip-to-main-content link for keyboard users</li>
            <li>ARIA labels on navigation dots, hamburger menu, modal dialogs, and social links</li>
            <li>Keyboard navigation: all interactive elements are reachable by keyboard</li>
            <li>Focus indicators visible via :focus-visible</li>
            <li>Reduced-motion support via prefers-reduced-motion media query</li>
            <li>Form labels associated with all inputs</li>
            <li>Accessible form error messages with aria-live regions</li>
            <li>Decorative images and animations marked aria-hidden</li>
          </ul>
          <h3>Known limitations</h3>
          <ul>
            <li>The custom cursor is hidden for users who prefer the system cursor — keyboard focus is still clearly indicated</li>
            <li>The canvas particle background is disabled in reduced-motion mode</li>
            <li>No WCAG conformance evaluation has been completed</li>
          </ul>
          <h3>Feedback</h3>
          <p>If you encounter an accessibility barrier, please email <a href="mailto:fahim.yusuf06@gmail.com">fahim.yusuf06@gmail.com</a> and I will address it promptly.</p>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [modal, setModal] = useState(null); /* null | 'privacy' | 'a11y' */
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {modal === 'privacy' && <PrivacyModal onClose={() => setModal(null)} />}
      {modal === 'a11y' && <A11yModal onClose={() => setModal(null)} />}

      <footer className="footer">
        <div className="footer__inner container">
          <div className="footer__brand">
            <span className="footer__logo">FY</span>
            <span className="footer__tagline letter-spaced">
              Fahim Yusuf · Software Engineer
            </span>
          </div>

          <nav className="footer__nav" aria-label="Page sections">
            {['home', 'about', 'services', 'projects', 'contact'].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="footer__nav-link"
                id={`footer-nav-${id}`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </nav>

          <div className="footer__social" aria-label="Social profiles">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
                aria-label={`${link.name} — ${link.description}`}
                id={`footer-social-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="footer__bottom">
            <span className="letter-spaced">© {year} Fahim Yusuf</span>
            <div className="footer__legal">
              <button onClick={() => setModal('privacy')} className="footer__legal-link" id="footer-privacy">
                Privacy
              </button>
              <button onClick={() => setModal('a11y')} className="footer__legal-link" id="footer-a11y">
                Accessibility
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
