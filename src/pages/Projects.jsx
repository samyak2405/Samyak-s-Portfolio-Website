import ProjectCard from '../components/ProjectCard.jsx';
import projects from '../data/projects.js';
import useReveal from '../hooks/useReveal.js';

function Projects() {
  const headerRef = useReveal();

  return (
    <section className="section" id="projects" aria-label="Selected projects">
      <div className="container">
        <div ref={headerRef} className="section-header reveal">
          <span className="section-num" aria-hidden="true">02</span>
          <span className="section__eyebrow">Work</span>
          <h2 className="section__title">Selected Projects</h2>
        </div>

        <div className="projects__grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
