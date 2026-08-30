import { useState } from 'react';
import { useIntersection } from '../hooks/useIntersection';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); /* idle | submitting | success | error */
  const [ref, visible] = useIntersection();

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) errs.message = 'Message is required.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('submitting');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else if (res.status === 422 && data.errors) {
        // Server-side field validation errors
        setErrors(data.errors);
        setStatus('idle');
      } else {
        setStatus('error');
      }
    } catch {
      // Network failure
      setStatus('error');
    }
  };

  const handleRetry = () => setStatus('idle');

  return (
    <section id="contact" className="contact section">
      <div ref={ref} className={`contact__inner container ${visible ? 'fade-up visible' : 'fade-up'}`}>
        <h2 className="contact__heading">Contact</h2>
        <div className="contact__divider" />

        <p className="contact__intro italic-serif">
          "Feel free to reach out, let's discuss your next project,
          collaboration, or just connect."
        </p>

        {/* Accessible live region for form status announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {status === 'success' && 'Your message has been sent. You should receive a confirmation email shortly.'}
          {status === 'error' && 'There was a problem sending your message. Please try again or email directly.'}
        </div>

        {status === 'success' ? (
          <div className="contact__success" role="alert">
            <span className="contact__success-icon" aria-hidden="true">✓</span>
            <p>Message sent! You&apos;ll receive a confirmation email shortly. I&apos;ll get back to you within 24–48 hours.</p>
          </div>
        ) : status === 'error' ? (
          <div className="contact__error" role="alert">
            <span className="contact__error-icon" aria-hidden="true">✕</span>
            <p>Something went wrong. Please try again or email me directly at{' '}
              <a href="mailto:fahim.yusuf06@gmail.com" className="contact__error-link">fahim.yusuf06@gmail.com</a>.
            </p>
            <button onClick={handleRetry} className="contact__retry">
              Try Again
            </button>
          </div>
        ) : (
          <form
            className="contact__form"
            onSubmit={handleSubmit}
            id="contact-form"
            noValidate
            aria-label="Contact form"
          >
            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="contact-name" className="contact__label">
                  Name <span aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                  required
                  className={`contact__input ${errors.name ? 'contact__input--error' : ''}`}
                  id="contact-name"
                  aria-required="true"
                  aria-describedby={errors.name ? 'error-name' : undefined}
                  autoComplete="name"
                />
                {errors.name && (
                  <span id="error-name" className="contact__field-error" role="alert">{errors.name}</span>
                )}
              </div>

              <div className="contact__field">
                <label htmlFor="contact-email" className="contact__label">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                  required
                  className={`contact__input ${errors.email ? 'contact__input--error' : ''}`}
                  id="contact-email"
                  aria-required="true"
                  aria-describedby={errors.email ? 'error-email' : undefined}
                  autoComplete="email"
                />
                {errors.email && (
                  <span id="error-email" className="contact__field-error" role="alert">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="contact-message" className="contact__label">
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                placeholder="Tell me about your project or idea..."
                value={form.message}
                onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: '' }); }}
                required
                rows={6}
                className={`contact__input contact__textarea ${errors.message ? 'contact__input--error' : ''}`}
                id="contact-message"
                aria-required="true"
                aria-describedby={errors.message ? 'error-message' : undefined}
              />
              {errors.message && (
                <span id="error-message" className="contact__field-error" role="alert">{errors.message}</span>
              )}
            </div>

            <p className="contact__privacy-note">
              * Required. Your details are used only to respond to your message.
            </p>

            <button
              type="submit"
              className={`contact__submit ${status === 'submitting' ? 'contact__submit--loading' : ''}`}
              id="contact-submit"
              disabled={status === 'submitting'}
              aria-disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'SENDING…' : 'SEND MESSAGE'}
            </button>
          </form>
        )}

        <div className="contact__info">
          <a href="mailto:fahim.yusuf06@gmail.com" className="contact__info-item">
            <span className="letter-spaced">EMAIL</span>
            <span>fahim.yusuf06@gmail.com</span>
          </a>
          <div className="contact__info-item">
            <span className="letter-spaced">LOCATION</span>
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>
      </div>
    </section>
  );
}
