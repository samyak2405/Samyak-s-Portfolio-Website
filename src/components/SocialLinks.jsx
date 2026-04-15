const ICONS = {
  github: {
    label: 'GitHub',
    path: 'M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.799 8.207 11.387.6.111.793-.261.793-.579 0-.287-.011-1.243-.016-2.255-3.338.726-4.042-1.415-4.042-1.415-.546-1.388-1.333-1.758-1.333-1.758-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.303-5.467-1.332-5.467-5.932 0-1.31.469-2.381 1.237-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.019.005 2.047.138 3.004.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.625-5.479 5.922.43.371.813 1.102.813 2.222 0 1.606-.015 2.903-.015 3.297 0 .32.19.694.8.576C20.565 21.796 24 17.298 24 12 24 5.37 18.627 0 12 0z',
  },
  linkedin: {
    label: 'LinkedIn',
    d: null, // uses custom SVG
  },
  x: {
    label: 'X / Twitter',
    path: 'M18.244 2H21.5l-7.5 8.58L23 22h-6.594l-5.156-6.229L5.25 22H2l8.057-9.2L1 2h6.75l4.66 5.713L18.244 2zm-2.31 17.3h1.82L8.145 4.6H6.2l9.733 14.7z',
  },
  mail: {
    label: 'Email',
    path: 'M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z',
  },
};

function Icon({ icon }) {
  if (icon.label === 'LinkedIn') {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

function SocialLinks() {
  return (
    <div className="socials" role="list">
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noreferrer"
        className="socials__link"
        aria-label="GitHub profile"
        role="listitem"
      >
        <Icon icon={ICONS.github} />
      </a>
      <a
        href="https://www.linkedin.com/in/yourusername"
        target="_blank"
        rel="noreferrer"
        className="socials__link"
        aria-label="LinkedIn profile"
        role="listitem"
      >
        <Icon icon={ICONS.linkedin} />
      </a>
      <a
        href="https://x.com/yourusername"
        target="_blank"
        rel="noreferrer"
        className="socials__link"
        aria-label="X / Twitter profile"
        role="listitem"
      >
        <Icon icon={ICONS.x} />
      </a>
      <a
        href="mailto:moon24samyak@gmail.com"
        className="socials__link"
        aria-label="Send email"
        role="listitem"
      >
        <Icon icon={ICONS.mail} />
      </a>
    </div>
  );
}

export default SocialLinks;
