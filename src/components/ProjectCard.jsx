import { useRef } from 'react';

function ProjectCard({ project }) {
  const { title, description, tags, image, demoUrl, sourceUrl } = project;
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.setProperty('--tx', `${-y * 5}deg`);
    el.style.setProperty('--ty', `${x * 5}deg`);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    el.style.setProperty('--tx', '0deg');
    el.style.setProperty('--ty', '0deg');
  };

  return (
    <article
      ref={cardRef}
      className="project-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-card__media">
        <img
          src={image}
          alt={`${title} preview`}
          className="project-card__img"
          loading="lazy"
          decoding="async"
        />
        {/* On-hover overlay with quick-action buttons */}
        <div className="project-card__overlay" aria-hidden="true">
          {demoUrl && (
            <a
              className="btn btn--primary btn--sm"
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              tabIndex={-1}
            >
              Live Demo
            </a>
          )}
          {sourceUrl && (
            <a
              className="btn btn--outline btn--sm"
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              tabIndex={-1}
            >
              Source
            </a>
          )}
        </div>
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{description}</p>

        {Array.isArray(tags) && tags.length > 0 && (
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
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
