import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router';
import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  RotateCcw,
  Send,
  X,
} from 'lucide-react';
import { chatSuggestionLabels, chatSuggestions } from '../data/chat';
import { useZelChat } from '../hooks/useZelChat';
import profilePhoto from '../assets/profile-zel.webp';
import ZelContactForm from './ZelContactForm';
import type { ContactDraft } from './ZelContactForm';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'contact'>('chat');
  const [question, setQuestion] = useState('');
  const [draft, setDraft] = useState<ContactDraft>({
    name: '',
    email: '',
    message: '',
  });
  const [endpoint, setEndpoint] = useState<string | null>(null);
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const dialog = useRef<HTMLDialogElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const thread = useRef<HTMLDivElement>(null);
  const followThread = useRef(true);
  const { messages, busy, awaitingReply, notice, send, reset } = useZelChat();

  useEffect(() => {
    if (!open) return;
    const active = new AbortController();
    fetch('/api/zel', { signal: active.signal, cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (active.signal.aborted) return;
        const value = data?.contactEndpoint;
        if (
          typeof value === 'string' &&
          /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(value)
        )
          setEndpoint(value);
        else setEndpoint(null);
        setSiteKey(
          typeof data?.contactSiteKey === 'string' &&
            /^[a-zA-Z0-9_-]{3,100}$/.test(data.contactSiteKey)
            ? data.contactSiteKey
            : null,
        );
      })
      .catch(() => {})
      .finally(() => {
        if (!active.signal.aborted) setLoading(false);
      });
    return () => active.abort();
  }, [open]);

  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
    if (!open && dialog.current?.open) dialog.current.close();
    if (open && mode === 'chat') input.current?.focus({ preventScroll: true });
  }, [open, mode]);

  useEffect(() => {
    if (open && mode === 'chat' && thread.current && followThread.current)
      thread.current.scrollTop = thread.current.scrollHeight;
  }, [messages, busy, open, mode]);

  useEffect(() => {
    if (!open || mode !== 'chat' || !input.current) return;
    const textarea = input.current;
    textarea.style.height = '0px';
    textarea.style.height = `${Math.max(44, Math.min(104, textarea.scrollHeight + 2))}px`;
  }, [question, open, mode]);

  const close = () => {
    setOpen(false);
    launcher.current?.focus({ preventScroll: true });
  };
  const sendQuestion = (text: string) => {
    followThread.current = true;
    const accepted = send(text);
    if (accepted) setQuestion((current) => (current === text ? '' : current));
    input.current?.focus({ preventScroll: true });
  };
  const moveToContact = () => {
    if (question.trim() && !draft.message)
      setDraft((previous) => ({ ...previous, message: question }));
    setMode('contact');
  };

  return createPortal(
    <>
      <button
        ref={launcher}
        type="button"
        className="zel-launcher"
        aria-haspopup="dialog"
        aria-controls="zel-chat-dialog"
        aria-expanded={open}
        onClick={() => setOpen((previous) => !previous)}
      >
        <MessageCircle size={19} aria-hidden="true" />
        <span>Chat with Zel</span>
      </button>
      <dialog
        ref={dialog}
        id="zel-chat-dialog"
        className="zel-dialog"
        aria-labelledby="zel-chat-title"
        onCancel={close}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialog.current) {
            const rect = dialog.current.getBoundingClientRect();
            if (
              event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom
            )
              close();
          }
        }}
      >
        <div className="zel-panel">
          <header className="zel-header">
            <img
              src={profilePhoto}
              alt=""
              width={38}
              height={38}
              decoding="async"
            />
            <div className="zel-heading">
              <h2 id="zel-chat-title">Chat with Zel</h2>
              <span>Automated portfolio chat</span>
            </div>
            <button
              type="button"
              className="zel-icon-button"
              aria-label="Start a new chat"
              title="Start a new chat"
              onClick={() => {
                reset();
                setQuestion('');
                setMode('chat');
              }}
            >
              <RotateCcw size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="zel-icon-button"
              aria-label="Close chat"
              onClick={close}
            >
              <X size={19} aria-hidden="true" />
            </button>
          </header>
          <div
            className="zel-tabs"
            role="group"
            aria-label="Choose how to connect"
          >
            <button
              type="button"
              aria-pressed={mode === 'chat'}
              onClick={() => setMode('chat')}
            >
              <MessageCircle size={14} aria-hidden="true" /> Ask a question
            </button>
            <button
              type="button"
              aria-pressed={mode === 'contact'}
              onClick={moveToContact}
            >
              <Mail size={14} aria-hidden="true" /> Send a message
            </button>
          </div>
          <div hidden={mode !== 'chat'} className="zel-chat-view">
            <div
              className="zel-thread"
              ref={thread}
              role="log"
              tabIndex={0}
              aria-label="Conversation with Zel"
              aria-live="polite"
              aria-relevant="additions"
              aria-busy={busy}
              onScroll={() => {
                const element = thread.current;
                if (element)
                  followThread.current =
                    element.scrollHeight -
                      element.scrollTop -
                      element.clientHeight <
                    64;
              }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`zel-message zel-message-${message.role}${message.revealing || (awaitingReply && message.id === messages[messages.length - 1].id) ? ' zel-message-arriving' : ''}`}
                >
                  <span className="zel-speaker">
                    {message.role === 'user' ? 'You' : 'Zel'}
                  </span>
                  <p>
                    {message.displayContent ?? message.content}
                    {message.revealing && (
                      <span className="zel-typing-cursor" aria-hidden="true" />
                    )}
                  </p>
                  {!message.revealing && message.reply?.links && (
                    <div className="zel-reply-links">
                      {message.reply.links.map((link) =>
                        link.href.startsWith('/') ? (
                          <Link key={link.href} to={link.href} onClick={close}>
                            {link.label}
                            <ArrowUpRight size={13} aria-hidden="true" />
                          </Link>
                        ) : (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.label}
                            <ArrowUpRight size={13} aria-hidden="true" />
                          </a>
                        ),
                      )}
                    </div>
                  )}
                  {!message.revealing && message.reply?.contact && (
                    <button
                      type="button"
                      className="zel-reply-contact"
                      onClick={moveToContact}
                    >
                      Send me a message <Mail size={13} aria-hidden="true" />
                    </button>
                  )}
                  {!message.revealing && message.reply && (
                    <span className="zel-answer-source">
                      {message.reply.source === 'ai'
                        ? 'AI reply · check details with me'
                        : 'From my portfolio'}
                    </span>
                  )}
                </div>
              ))}
              {awaitingReply && (
                <div className="zel-thinking" role="status">
                  <span className="zel-thinking-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>{' '}
                  Zel is typing…
                </div>
              )}
            </div>
            <div className="zel-suggestions" aria-label="Suggested questions">
              {chatSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  disabled={busy}
                  aria-label={suggestion}
                  onClick={() => void sendQuestion(suggestion)}
                >
                  {chatSuggestionLabels[suggestion]}
                  <ArrowUpRight size={12} aria-hidden="true" />
                </button>
              ))}
            </div>
            {notice && (
              <p className="zel-chat-notice" role="status">
                {notice}
              </p>
            )}
            <form
              className="zel-composer"
              onSubmit={(event) => {
                event.preventDefault();
                void sendQuestion(question);
              }}
            >
              <label className="zel-sr-only" htmlFor="zel-question">
                Your question for Zel
              </label>
              <textarea
                ref={input}
                id="zel-question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                maxLength={600}
                rows={1}
                placeholder="Ask about my work…"
                aria-describedby="zel-chat-privacy"
                onKeyDown={(event) => {
                  if (
                    event.key === 'Enter' &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    if (!busy) void sendQuestion(question);
                  }
                }}
              />
              <button
                type="submit"
                className="zel-send"
                disabled={busy || !question.trim()}
                aria-label="Send question"
              >
                <Send size={17} aria-hidden="true" />
              </button>
            </form>
            <p className="zel-privacy" id="zel-chat-privacy">
              Questions may be processed by AI. Keep personal details in the
              message form.
            </p>
          </div>
          <div
            hidden={mode !== 'contact'}
            className="zel-contact-view"
            role="region"
            aria-label="Message form"
            tabIndex={0}
          >
            <ZelContactForm
              endpoint={endpoint}
              siteKey={siteKey}
              active={open && mode === 'contact'}
              loading={loading}
              draft={draft}
              onChange={setDraft}
            />
          </div>
        </div>
      </dialog>
    </>,
    document.body,
  );
}
