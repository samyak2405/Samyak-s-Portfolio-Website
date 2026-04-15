import { useState } from 'react';
import SocialLinks from '../components/SocialLinks.jsx';
import useReveal   from '../hooks/useReveal.js';

const FALLBACK_EMAIL = import.meta.env.VITE_CONTACT_EMAIL ?? 'moon24samyak@gmail.com';

const INITIAL = { name: '', email: '', message: '' };

// status: 'idle' | 'loading' | 'success' | 'error' | 'rate_limited'

function Contact() {
  const headerRef = useReveal();
  const formRef   = useReveal();
  const asideRef  = useReveal();

  const [fields,      setFields]      = useState(INITIAL);
  const [status,      setStatus]      = useState('idle');
  const [directEmail, setDirectEmail] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ← stop the browser; we handle submission ourselves
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(fields),
      });

      if (res.ok) {
        setStatus('success');
        setFields(INITIAL);
        return;
      }

      const data = await res.json().catch(() => ({}));

      if (res.status === 429) {
        setDirectEmail(data.directEmail ?? FALLBACK_EMAIL);
        setStatus('rate_limited');
        return;
      }

      setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  const isLoading = status === 'loading';

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

            {/* ── Success ── */}
            {status === 'success' && (
              <div className="contact__sent" role="status">
                <span className="contact__sent-icon" aria-hidden="true">✓</span>
                <p>Message sent! I&apos;ll get back to you soon.</p>
                <button
                  className="btn btn--ghost btn--sm"
                  onClick={() => setStatus('idle')}
                >
                  Send another
                </button>
              </div>
            )}

            {/* ── Status banners (error / rate_limited) ── */}
            {(status === 'error' || status === 'rate_limited') && (
              <div className="contact__banner contact__banner--error" role="alert">
                {status === 'rate_limited' ? (
                  <>
                    The contact form is at capacity this month. Email me directly at{' '}
                    <a href={`mailto:${directEmail}`}>{directEmail}</a>.
                  </>
                ) : (
                  <>
                    Something went wrong. Email me directly at{' '}
                    <a href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>.
                  </>
                )}
              </div>
            )}

            {/* ── Form (always rendered unless success, so banners show above it) ── */}
            {status !== 'success' && (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <label className="field">
                  <span className="field__label">Name</span>
                  <input
                    className="field__input"
                    type="text"
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    autoComplete="name"
                    required
                    disabled={isLoading}
                  />
                </label>

                <label className="field">
                  <span className="field__label">Email</span>
                  <input
                    className="field__input"
                    type="email"
                    name="email"
                    value={fields.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    autoComplete="email"
                    required
                    disabled={isLoading}
                  />
                </label>

                <label className="field">
                  <span className="field__label">Message</span>
                  <textarea
                    className="field__textarea"
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project…"
                    rows={5}
                    required
                    disabled={isLoading}
                  />
                </label>

                <button
                  className="btn btn--primary"
                  type="submit"
                  disabled={isLoading}
                  aria-busy={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="btn-spinner" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
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
