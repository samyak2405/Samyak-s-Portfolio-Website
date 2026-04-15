import SocialLinks from './SocialLinks.jsx';
import links from '../data/links.js';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__content">
        <span className="footer__brand">Samyak Moon</span>
        <p className="footer__copy">© {year} — All rights reserved</p>
        <div className="footer__right">
          <SocialLinks />
          <a
            className="btn btn--ghost btn--sm"
            href={links.resumeUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open resume in new tab"
          >
            Resume ↗
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
