import { CheckCircle2, Mail, Send, ShieldCheck, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import ZelCaptcha from './ZelCaptcha';

export type ContactDraft = { name: string; email: string; message: string };
type Props = {
  endpoint: string | null;
  siteKey: string | null;
  active: boolean;
  loading: boolean;
  draft: ContactDraft;
  onChange: (draft: ContactDraft) => void;
};

export default function ZelContactForm({
  endpoint,
  siteKey,
  active,
  loading,
  draft,
  onChange,
}: Props) {
  const [busy, setBusy] = useState(false);
  const [token, setToken] = useState('');
  const [captchaReset, setCaptchaReset] = useState(0);
  const [success, setSuccess] = useState(false);
  const [notice, setNotice] = useState('');
  const controller = useRef<AbortController | null>(null);
  const inFlight = useRef(false);
  const retryAt = useRef(0);
  const latestDraft = useRef(draft);
  latestDraft.current = draft;

  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    if (!success) return;
    const timer = window.setTimeout(() => setSuccess(false), 6000);
    return () => window.clearTimeout(timer);
  }, [success]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;
    setSuccess(false);
    if (Date.now() < retryAt.current) {
      setNotice('Please wait a minute before sending another message.');
      return;
    }
    if (!endpoint || !siteKey || !token) {
      setNotice('Please complete the spam verification before sending.');
      return;
    }
    if (!draft.email.trim() || draft.message.trim().length < 5) {
      setNotice(
        'Please enter your email and a message of at least 5 characters.',
      );
      return;
    }
    const submittedMessage = draft.message;
    const data = new FormData(event.currentTarget);
    data.set('cf-turnstile-response', token);
    const current = new AbortController();
    controller.current = current;
    inFlight.current = true;
    setBusy(true);
    setNotice('');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
        credentials: 'omit',
        redirect: 'error',
        signal: AbortSignal.any([current.signal, AbortSignal.timeout(20000)]),
      });
      const result = await response.json().catch(() => null);
      if (current.signal.aborted) return;
      if (!response.ok || result?.ok !== true) {
        if (response.status === 429) retryAt.current = Date.now() + 60000;
        setNotice(
          response.status === 429
            ? 'The form is receiving too many requests. Please try again later.'
            : "Your message couldn't be sent. Please check your details and verification, then try again.",
        );
        return;
      }
      retryAt.current = Date.now() + 60000;
      onChange({
        ...latestDraft.current,
        message:
          latestDraft.current.message === submittedMessage
            ? ''
            : latestDraft.current.message,
      });
      setSuccess(true);
    } catch {
      if (!current.signal.aborted)
        setNotice(
          "I couldn't confirm that your message was sent. Your message is still here; please check your connection before trying again.",
        );
    } finally {
      if (!current.signal.aborted) {
        setBusy(false);
        setToken('');
        setCaptchaReset((value) => value + 1);
      }
      inFlight.current = false;
      if (controller.current === current) controller.current = null;
    }
  };

  return (
    <div className="zel-contact">
      <div className="zel-contact-intro">
        <span className="zel-contact-icon">
          <Mail size={20} aria-hidden="true" />
        </span>
        <h3>Have something in mind?</h3>
        <p>Leave your email and a message. I'll get back to you by email.</p>
      </div>
      <form onSubmit={submit} className="zel-contact-form" aria-busy={busy}>
        <label htmlFor="zel-contact-name">
          Name <span>(optional)</span>
        </label>
        <input
          id="zel-contact-name"
          name="name"
          autoComplete="name"
          maxLength={80}
          value={draft.name}
          readOnly={busy}
          onChange={(event) => onChange({ ...draft, name: event.target.value })}
        />
        <label htmlFor="zel-contact-email">Your email</label>
        <input
          id="zel-contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="you@example.com"
          value={draft.email}
          readOnly={busy}
          onChange={(event) =>
            onChange({ ...draft, email: event.target.value })
          }
        />
        <label htmlFor="zel-contact-message">Message</label>
        <textarea
          id="zel-contact-message"
          name="message"
          required
          minLength={5}
          maxLength={2000}
          rows={4}
          placeholder="Tell me what you have in mind…"
          value={draft.message}
          readOnly={busy}
          onChange={(event) =>
            onChange({ ...draft, message: event.target.value })
          }
        />
        <input
          type="hidden"
          name="subject"
          value="New message from Zel’s portfolio"
        />
        <p className="zel-field-trap" aria-hidden="true">
          <label htmlFor="zel-website">Leave this field empty</label>
          <input
            id="zel-website"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
          />
        </p>
        <p className="zel-contact-privacy">
          <ShieldCheck size={14} aria-hidden="true" /> Your email and message
          stay out of the AI chat.
        </p>
        {active && endpoint && siteKey && (
          <ZelCaptcha
            siteKey={siteKey}
            resetKey={captchaReset}
            onToken={setToken}
          />
        )}
        <button
          type="submit"
          className="zel-primary"
          disabled={!endpoint || !siteKey || !token || loading || busy}
        >
          {loading ? 'Getting ready…' : busy ? 'Sending…' : 'Send message'}{' '}
          <Send size={15} aria-hidden="true" />
        </button>
        {notice && (
          <p className="zel-form-notice" role="alert">
            {notice}
          </p>
        )}
        {!loading && (!endpoint || !siteKey) && (
          <p className="zel-form-notice" role="status">
            The form is unavailable right now. Please try again later.
          </p>
        )}
        <details className="zel-contact-policy">
          <summary>Privacy notice</summary>
          <p>
            This form uses Cloudflare Turnstile to check for spam in the
            background. Cloudflare processes browser and network signals as
            described in its{' '}
            <a
              href="https://www.cloudflare.com/turnstile-privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Turnstile Privacy Addendum
            </a>
            .
          </p>
          <p>
            Your name, email, and message are sent through Formspree to me so I
            can reply. They are not sent to the AI chat. Form drafts stay in
            memory until you clear them or reload the page; a successful send
            clears the message.
          </p>
        </details>
      </form>
      {(draft.name || draft.email || draft.message) && (
        <button
          type="button"
          className="zel-clear-draft"
          onClick={() => {
            onChange({ name: '', email: '', message: '' });
            setSuccess(false);
            setNotice('');
          }}
          disabled={busy}
        >
          Clear form
        </button>
      )}
      {success && (
        <div className="zel-toast" role="status" aria-live="polite">
          <CheckCircle2 size={18} aria-hidden="true" />
          <span>Message sent! I'll reply by email.</span>
          <button
            type="button"
            className="zel-icon-button"
            aria-label="Dismiss notification"
            onClick={() => setSuccess(false)}
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
