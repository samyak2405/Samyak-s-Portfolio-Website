import { useEffect, useRef, useState } from 'react';
import useReveal from '../hooks/useReveal.js';
import profile   from '../data/profile.js';
import generated from '../data/generated.js';
import Terminal  from '../components/Terminal.jsx';

/* Real impact numbers from the resume */
const STATS = [
  { value: 85, suffix: '%',  label: 'Faster Card Generation'       },
  { value: 80, suffix: '%',  label: 'Security Vulnerabilities Fixed' },
  { value: 10, suffix: '+',  label: 'Enterprise Clients Served'     },
  { value: 60, suffix: '%',  label: 'Faster HSM Processing'         },
];

/* ── Animated counter card ─────────────────────────────────────────────── */
function StatCard({ value, suffix, label }) {
  const [count,  setCount]  = useState(0);
  const ref     = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          el.classList.add('is-revealed');
          const duration  = 1400;
          const startTime = performance.now();
          const tick = (now) => {
            const p = Math.min((now - startTime) / duration, 1);
            const e = 1 - Math.pow(1 - p, 3);
            setCount(Math.round(e * value));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="stat-card reveal">
      <span className="stat-card__value">{count}{suffix}</span>
      <span className="stat-card__label">{label}</span>
    </div>
  );
}

/* ── Timeline item ─────────────────────────────────────────────────────── */
function TimelineItem({ role, company, period, bullets }) {
  const ref = useReveal();
  return (
    <li ref={ref} className="tl-item reveal">
      <div className="tl-item__dot" aria-hidden="true" />
      <div className="tl-item__body">
        <div className="tl-item__header">
          <span className="tl-item__title">{role}</span>
          {company && <span className="tl-item__company">{company}</span>}
        </div>
        {period && <span className="tl-item__period">{period}</span>}
        {bullets?.length > 0 && (
          <ul className="tl-item__bullets">
            {bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
      </div>
    </li>
  );
}

/* ── Section ───────────────────────────────────────────────────────────── */
function About() {
  const headerRef = useReveal();
  const bioRef    = useReveal();
  const termRef   = useReveal();

  return (
    <section className="section" id="about" aria-label="About me">
      <div className="container">

        {/* Header */}
        <div ref={headerRef} className="section-header reveal">
          <span className="section-num" aria-hidden="true">01</span>
          <span className="section__eyebrow">About</span>
          <h2 className="section__title">A bit about me</h2>
        </div>

        {/* Bio + Terminal */}
        <div className="about__grid">
          <div ref={bioRef} className="about__left reveal reveal-d1">
            <p className="about__bio">
              I&apos;m <strong>Samyak Moon</strong>, a{' '}
              <strong>Backend Software Engineer</strong> with 2.8+ years
              building scalable fintech systems at{' '}
              <strong>PayU Digital Labs</strong> — one of India&apos;s
              leading payment platforms.
            </p>
            <p className="about__bio" style={{ marginTop: '16px' }}>
              {profile.summary}
            </p>

            {/* Award callout */}
            <div className="about__award">
              <span className="about__award-icon" aria-hidden="true">🏆</span>
              <div>
                <span className="about__award-title">Extra Mile Award</span>
                <span className="about__award-sub">
                  Individual Contribution — Card Order Flow, PayU
                </span>
              </div>
            </div>

            <div style={{ marginTop: '28px' }}>
              <p className="about__skills-label">Tech Stack</p>
              <ul className="skills" aria-label="Skills and technologies">
                {profile.skills.map((skill) => (
                  <li key={skill} className="skill">{skill}</li>
                ))}
              </ul>
            </div>
          </div>

          <div ref={termRef} className="about__right reveal reveal-d2">
            <Terminal />
          </div>
        </div>

        {/* Animated stat counters */}
        <div className="stats-row">
          {STATS.map((s) => (
            <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>

        {/* Experience timeline */}
        <div className="about__timeline-section">
          <p className="about__skills-label" style={{ marginBottom: '28px' }}>Experience</p>
          <ul className="tl" aria-label="Work experience">
            {generated.experience.map((e) => (
              <TimelineItem key={`${e.role}-${e.company}`} {...e} />
            ))}
          </ul>
        </div>

        {/* Education timeline */}
        <div className="about__timeline-section">
          <p className="about__skills-label" style={{ marginBottom: '28px' }}>Education</p>
          <ul className="tl" aria-label="Education history">
            {generated.education.map((ed) => (
              <TimelineItem
                key={`${ed.degree}-${ed.school}`}
                role={ed.degree}
                company={ed.school}
                period={ed.period}
                bullets={ed.details}
              />
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}

export default About;
