import links from '../data/links.js';

function Resume() {
  return (
    <section className="section" id="resume">
      <h2 className="section__title">Resume</h2>
      <div className="resume">
        <div className="resume__actions">
          <a className="btn" href={links.resumeUrl} target="_blank" rel="noreferrer">
            View Resume
          </a>
        </div>
      </div>
    </section>
  );
}

export default Resume;


