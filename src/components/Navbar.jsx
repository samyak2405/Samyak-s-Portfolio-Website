import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle.jsx';

const NAV_LINKS = [
  { href: '#home',     label: 'Home'     },
  { href: '#about',    label: 'About'    },
  { href: '#projects', label: 'Projects' },
  { href: '#contact',  label: 'Contact'  },
];

function Navbar() {
  const [active, setActive]     = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));

    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: `-${Math.floor(window.innerHeight * 0.4)}px 0px -${Math.floor(window.innerHeight * 0.4)}px 0px` }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`} role="banner">
      <div className="container navbar__content">
        <a href="#home" className="brand" aria-label="Back to top">
          <span className="brand__initials" aria-hidden="true">SM</span>
          <span className="brand__name">Samyak Moon</span>
        </a>

        <nav className="nav" aria-label="Primary navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`nav__link${active === href.slice(1) ? ' active' : ''}`}
            >
              {label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
