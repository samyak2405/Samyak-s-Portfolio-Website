import ProfileImage from '../components/ProfileImage.jsx';
import Typewriter   from '../components/Typewriter.jsx';
import CodeRain     from '../components/CodeRain.jsx';
import CodeCard     from '../components/CodeCard.jsx';
import profile      from '../data/profile.js';
import links        from '../data/links.js';

const PHRASES = ['Software Developer', 'React Engineer', 'Java Backend Dev', 'UI Craftsman'];

function Home() {
  return (
    <section className="hero" id="home" aria-label="Introduction">
      {/* Layer 0: canvas code rain */}
      <CodeRain />

      {/* Layer 1: ambient gradient orbs */}
      <div className="orb orb--1" aria-hidden="true" />
      <div className="orb orb--2" aria-hidden="true" />
      <div className="orb orb--3" aria-hidden="true" />

      {/* Decorative floating code snippet — desktop only */}
      <CodeCard />

      {/* Layer 2: main content */}
      <div className="hero__inner">
        <div className="hero__badge">
          <span className="badge__pulse" aria-hidden="true" />
          Available for Work
        </div>

        <ProfileImage src="/images/Samyak.jpeg" alt="Samyak Moon profile photo" />

        <p className="hero__greeting">Hi, I&apos;m</p>
        <h1 className="hero__display">{profile.name} Moon</h1>

        <p className="hero__role">
          <span className="hero__role-sep">—</span>
          <Typewriter phrases={PHRASES} speed={55} pause={2400} />
        </p>

        <p className="hero__bio">{profile.summary}</p>

        <nav className="hero__actions" aria-label="Quick actions">
          <a href="#projects" className="btn btn--primary">View Projects</a>
          <a href="#contact"  className="btn btn--outline">Contact Me</a>
          <a
            href={links.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn--ghost"
            aria-label="Open resume PDF in new tab"
          >
            Resume ↗
          </a>
        </nav>
      </div>
    </section>
  );
}

export default Home;
