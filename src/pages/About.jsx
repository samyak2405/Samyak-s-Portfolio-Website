import { useEffect, useRef, useState } from 'react';
import useReveal from '../hooks/useReveal.js';
import profile   from '../data/profile.js';
import generated from '../data/generated.js';
import Terminal  from '../components/Terminal.jsx';

const STATS = [
  { value: 2,  suffix: '+',   label: 'Years at PayU'          },
  { value: 10, suffix: 'K+',  label: 'Cards / Batch'          },
  { value: 25, suffix: '%',   label: 'API Throughput Boost'   },
  { value: 40, suffix: '%',   label: 'Manual Effort Reduced'  },
];

function StatCard({ value, suffix, label }) {
  const [count,  setCount]  = useState(0);
  const ref     = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        el.classList.add('is-revealed');
        const duration  = 1300;
        const startTime = performance.now();
        const tick = (now) => {
          const p = Math.min((now - startTime) / duration, 1);
          const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
          setCount(Math.round(e * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
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

/** Clean up the badly-parsed experience entries from the resume parser */
function parseExp(exp) {
  const dashIdx = exp.period.indexOf(' - ');
  const leftPart = dashIdx > -1 ? exp.period.slice(0, dashIdx) : exp.period;
  const endDate  = dashIdx > -1 ? exp.period.slice(dashIdx + 3) : '';

  const dateMatch = leftPart.match(/([A-Z][a-z]{2}\s\d{4})$/);
  const startDate   = dateMatch ? dateMatch[1] : '';
  const withoutDate = dateMatch ? leftPart.slice(0, -startDate.length) : leftPart;

  const commaIdx = withoutDate.lastIndexOf(', ');
  const role    = commaIdx > -1 ? withoutDate.slice(0, commaIdx).trim() : withoutDate.trim();
  const company = commaIdx > -1 ? withoutDate.slice(commaIdx + 2).trim() : '';

  const bullets = (exp.bullets || [])
    .filter((b) => b.trim().startsWith('•'))
    .map((b) => b.replace(/^•\s*/, '').trim());

  return { role, company, period: `${startDate}${endDate ? ` – ${endDate}` : ''}`, bullets };
}

/** Clean up the badly-parsed education entries */
function parseEdu(ed) {
  const raw   = ed.institution.replace(/^,\s*/, '');
  const match = raw.match(/(\d{4}\s*[-–]\s*\d{4})$/);
  const period = match ? match[1].replace(/\s*-\s*/, ' – ') : '';
  const school = match ? raw.slice(0, -match[0].length).trim() : raw.trim();
  const details = (ed.details || [])
    .filter((d) => !d.includes('EXTRA-CURRICULAR') && d.trim().length > 0)
    .map((d) => d.replace(/^[-•]\s*/, '').replace(/^Relevant Coursework:\s*/i, '').trim())
    .filter(Boolean);
  return { degree: ed.degree, school, period, details };
}

function TimelineItem({ title, subtitle, period, bullets }) {
  const ref = useReveal();
  return (
    <li ref={ref} className="tl-item reveal">
      <div className="tl-item__dot" aria-hidden="true" />
      <div className="tl-item__body">
        <div className="tl-item__header">
          <span className="tl-item__title">{title}</span>
          {subtitle && <span className="tl-item__company">{subtitle}</span>}
        </div>
        {period && <span className="tl-item__period">{period}</span>}
        {bullets && bullets.length > 0 && (
          <ul className="tl-item__bullets">
            {bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
      </div>
    </li>
  );
}

function About() {
  const headerRef = useReveal();
  const bioRef    = useReveal();
  const skillsRef = useReveal();

  const experience = (generated.experience || []).map(parseExp);
  const education  = (generated.education  || []).map(parseEdu);

  return (
    <section className="section" id="about" aria-label="About me">
      <div className="container">
        <div ref={headerRef} className="section-header reveal">
          <span className="section-num" aria-hidden="true">01</span>
          <span className="section__eyebrow">About</span>
          <h2 className="section__title">A bit about me</h2>
        </div>

        {/* Bio + Terminal */}
        <div className="about__grid">
          <div ref={bioRef} className="about__left reveal reveal-d1">
            <p className="about__bio">
              I&apos;m <strong>{profile.name} Moon</strong>, a{' '}
              <strong>{profile.title}</strong> who loves turning ideas into
              polished, accessible web experiences.
            </p>
            <p className="about__bio" style={{ marginTop: '16px' }}>
              {profile.summary}
            </p>

            <div style={{ marginTop: '28px' }}>
              <p className="about__skills-label">Tech Stack</p>
              <ul className="skills" aria-label="Skills and technologies">
                {profile.skills.map((skill) => (
                  <li key={skill} className="skill">{skill}</li>
                ))}
              </ul>
            </div>
          </div>

          <div ref={skillsRef} className="about__right reveal reveal-d2">
            <Terminal />
          </div>
        </div>

        {/* Animated stat counters */}
        <div className="stats-row">
          {STATS.map((s) => (
            <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>

        {/* Experience */}
        {experience.length > 0 && (
          <div className="about__timeline-section">
            <p className="about__skills-label" style={{ marginBottom: '28px' }}>Experience</p>
            <ul className="tl" aria-label="Work experience">
              {experience.map((e) => (
                <TimelineItem
                  key={`${e.role}-${e.company}`}
                  title={e.role}
                  subtitle={e.company}
                  period={e.period}
                  bullets={e.bullets}
                />
              ))}
            </ul>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="about__timeline-section">
            <p className="about__skills-label" style={{ marginBottom: '28px' }}>Education</p>
            <ul className="tl" aria-label="Education history">
              {education.map((ed) => (
                <TimelineItem
                  key={`${ed.degree}-${ed.school}`}
                  title={ed.degree}
                  subtitle={ed.school}
                  period={ed.period}
                  bullets={ed.details}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default About;


