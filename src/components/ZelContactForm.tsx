import { ExternalLink, Mail, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { contactEmail } from '../data/personal';

export type ContactDraft = { name: string; email: string; message: string };
type Props = {
  endpoint: string | null;
  loading: boolean;
  draft: ContactDraft;
  onChange: (draft: ContactDraft) => void;
};

export default function ZelContactForm({
  endpoint,
  loading,
  draft,
  onChange,
}: Props) {
  const [opened, setOpened] = useState(false);
  const [lastSubmit, setLastSubmit] = useState(0);
  const [notice, setNotice] = useState('');
  const submit = (event: FormEvent<HTMLFormElement>) => {
    if (!endpoint || Date.now() - lastSubmit < 60_000) {
      event.preventDefault();
      setNotice(
        'Please wait a minute before opening another send request. Your draft is still here.',
      );
      return;
    }
    if (!draft.email.trim() || !draft.message.trim()) {
      event.preventDefault();
      setNotice('Please enter your email and a message.');
      return;
    }
    setLastSubmit(Date.now());
    setOpened(true);
    setNotice('');
    // Native POST preserves Formspree’s hosted CAPTCHA. Opening a tab does not
    // prove delivery, so retain the draft and never show a false “sent” state.
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
      <form
        action={endpoint ?? undefined}
        method="POST"
        target="_blank"
        rel="noopener"
        onSubmit={submit}
        className="zel-contact-form"
      >
        <label htmlFor="zel-contact-name">
          Name <span>(optional)</span>
        </label>
        <input
          id="zel-contact-name"
          name="name"
          autoComplete="name"
          maxLength={80}
          value={draft.name}
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
        <button
          type="submit"
          className="zel-primary"
          disabled={!endpoint || loading}
        >
          {loading ? 'Getting ready…' : 'Continue to send'}{' '}
          <ExternalLink size={15} aria-hidden="true" />
        </button>
        <p className="zel-contact-help">
          Opens a secure Formspree tab. Complete any spam verification there to
          send your message.
        </p>
        {opened && (
          <p className="zel-form-notice" role="status">
            Finish sending in the new tab. Your draft stays here until you clear
            it.
          </p>
        )}
        {notice && (
          <p className="zel-form-notice" role="status">
            {notice}
          </p>
        )}
        {!loading && !endpoint && (
          <p className="zel-form-notice" role="status">
            The form is unavailable right now. You can email me directly below.
          </p>
        )}
      </form>
      <a className="zel-direct-email" href={`mailto:${contactEmail}`}>
        <Mail size={14} aria-hidden="true" /> Email me directly
      </a>
      {(draft.name || draft.email || draft.message) && (
        <button
          type="button"
          className="zel-clear-draft"
          onClick={() => {
            onChange({ name: '', email: '', message: '' });
            setOpened(false);
            setNotice('');
          }}
        >
          Clear draft
        </button>
      )}
    </div>
  );
}
