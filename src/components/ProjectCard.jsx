import { useRef } from 'react';

function ProjectCard({ project }) {
  const { title, subtitle, description, tags, image, demoUrl, sourceUrl, badge, impact, type } = project;
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el   = cardRef.current;
    const rect = el.getBoundingClientRect();
    const x    = (e.clientX - rect.left)  / rect.width  - 0.5;
    const y    = (e.clientY - rect.top)   / rect.height - 0.5;
    el.style.setProperty('--tx', `${-y * 5}deg`);
    el.style.setProperty('--ty', `${x * 5}deg`);
  };

  const handleMouseLeave = () => {
    cardRef.current.style.setProperty('--tx', '0deg');
    cardRef.current.style.setProperty('--ty', '0deg');
  };

  return (
    <article
      ref={cardRef}
      className="project-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className="project-card__media">
        <img
          src={image}
          alt={`${title} preview`}
          className="project-card__img"
          loading="lazy"
          decoding="async"
        />

        {/* Overlay badges */}
        <div className="project-card__media-overlay" aria-hidden="true">
          {type === 'work' && (
            <span className="project-card__type-badge">Production</span>
          )}
          {type === 'personal' && (
            <span className="project-card__type-badge project-card__type-badge--personal">Personal</span>
          )}
        </div>

        {/* Hover quick-links */}
        <div className="project-card__overlay" aria-hidden="true">
          {demoUrl && (
            <a className="btn btn--primary btn--sm" href={demoUrl} target="_blank" rel="noreferrer" tabIndex={-1}>
              Live Demo
            </a>
          )}
          {sourceUrl && (
            <a className="btn btn--outline btn--sm" href={sourceUrl} target="_blank" rel="noreferrer" tabIndex={-1}>
              Source
            </a>
          )}
          {!demoUrl && !sourceUrl && impact && (
            <span className="project-card__impact-hover">⚡ {impact}</span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="project-card__body">
        {badge && (
          <span className="project-card__badge">{badge}</span>
        )}

        <div>
          <h3 className="project-card__title">{title}</h3>
          {subtitle && <p className="project-card__subtitle">{subtitle}</p>}
        </div>

        <p className="project-card__desc">{description}</p>

        {impact && (
          <div className="project-card__impact">
            <span className="project-card__impact-dot" aria-hidden="true" />
            {impact}
          </div>
        )}

        {tags?.length > 0 && (
          <ul className="project-card__tags" aria-label="Technologies used">
            {tags.map((tag) => (
              <li key={tag} className="project-card__tag">{tag}</li>
            ))}
          </ul>
        )}

        <div className="project-card__actions">
          {demoUrl && (
            <a className="btn btn--primary btn--sm" href={demoUrl} target="_blank" rel="noreferrer">
              Live Demo
            </a>
          )}
          {sourceUrl && (
            <a className="btn btn--ghost btn--sm" href={sourceUrl} target="_blank" rel="noreferrer">
              View Source
            </a>
          )}
          {!demoUrl && !sourceUrl && (
            <span className="project-card__private">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Private / Production
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
