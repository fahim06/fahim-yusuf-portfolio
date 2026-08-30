import { socialLinks } from '../data/portfolio';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>

      <footer className="footer">
        <div className="footer__inner container">
          <div className="footer__brand">
            <span className="footer__logo">F.Yusuf</span>
            <span className="footer__tagline letter-spaced">
              Fahim Yusuf · Software Engineer
            </span>
          </div>

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
          </div>
        </div>
      </footer>
    </>
  );
}
