import { useEffect, useState } from 'react';
import placeholder from '../assets/placeholder.svg';

function ProfileImage({ src = '/images/profile.jpg', alt = 'Profile photo' }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [open, setOpen]     = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const handleOpen = () => {
    if (open) return;
    setOpen(true);
    requestAnimationFrame(() => setAnimate(true));
  };

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => setOpen(false), 240);
  };

  return (
    <div className="hero__avatar-wrap">
      <div
        className="avatar-ring-wrap"
        role="button"
        tabIndex={0}
        aria-label="View full profile photo"
        onClick={handleOpen}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpen(); }}
      >
        <div className="avatar-inner">
          <img
            src={imgSrc}
            alt={alt}
            loading="eager"
            decoding="async"
            onError={() => setImgSrc(placeholder)}
          />
        </div>
      </div>

      {open && (
        <div
          className={`avatar-modal${animate ? ' open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Profile photo enlarged"
          onClick={handleClose}
        >
          <div
            className="avatar-modal__img-wrap"
            onClick={(e) => e.stopPropagation()}
          >
            <img className="avatar-modal__img" src={imgSrc} alt={alt} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileImage;
