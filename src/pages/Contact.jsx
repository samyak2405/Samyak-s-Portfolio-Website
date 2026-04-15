import { useState } from 'react';
import SocialLinks from '../components/SocialLinks.jsx';
import useReveal from '../hooks/useReveal.js';

function Contact() {
  const headerRef = useReveal();
  const formRef   = useReveal();
  const asideRef  = useReveal();

  const [status, setStatus] = useState('idle'); // idle | sent

  const handleSubmit = (e) => {
    // mailto: action handles delivery; show a brief confirmation
    setStatus('sent');
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section className="section" id="contact" aria-label="Contact">
      <div className="container">
        <div ref={headerRef} className="section-header reveal">
          <span className="section-num" aria-hidden="true">03</span>
          <span className="section__eyebrow">Contact</span>
          <h2 className="section__title">Get In Touch</h2>
        </div>

        <p className="contact__intro">
          Have a project in mind or just want to chat? I&apos;d love to hear
          from you — drop me a message and I&apos;ll get back to you soon.
        </p>

        <div className="contact__layout">
          <div ref={formRef} className="contact__form-card reveal reveal-d1">
            {status === 'sent' ? (
              <div className="contact__sent" role="status">
                <span className="contact__sent-icon" aria-hidden="true">✓</span>
                <p>Thanks! Your message is on its way.</p>
              </div>
            ) : (
              <form
                className="contact__form"
                action="mailto:moon24samyak@gmail.com"
                method="post"
                encType="text/plain"
                onSubmit={handleSubmit}
              >
                <label className="field">
                  <span className="field__label">Name</span>
                  <input
                    className="field__input"
                    type="text"
                    name="name"
                    placeholder="Jane Doe"
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="field">
                  <span className="field__label">Email</span>
                  <input
                    className="field__input"
                    type="email"
                    name="email"
                    placeholder="jane@example.com"
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="field">
                  <span className="field__label">Message</span>
                  <textarea
                    className="field__textarea"
                    name="message"
                    placeholder="Tell me about your project…"
                    rows={5}
                    required
                  />
                </label>
                <button className="btn btn--primary" type="submit">
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            )}
          </div>

          <div ref={asideRef} className="contact__aside reveal reveal-d2">
            <div>
              <p className="contact__aside-label">Direct email</p>
              <a href="mailto:moon24samyak@gmail.com" className="contact__email-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                moon24samyak@gmail.com
              </a>
            </div>

            <div className="contact__social-section">
              <p className="contact__aside-label">Find me online</p>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
