import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import {
  ArrowLeft,
  ArrowUpRight,
  FileQuestion,
  RefreshCw,
  Unplug,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { pageStatuses, type PageStatus } from '../data/pageStatuses';

export default function PageStatusCard({
  kind,
  online = false,
  onRetry,
  retryLabel = 'Try again',
  reloadHome = false,
  notice,
}: {
  kind: PageStatus;
  online?: boolean;
  onRetry?: () => void;
  retryLabel?: string;
  reloadHome?: boolean;
  notice?: string;
}) {
  const reconnected = kind === 'offline' && online;
  const status = reconnected
    ? {
        code: 'CONNECTED',
        title: "You're back online.",
        description:
          'Your device is connected again. You can return to the portfolio whenever you are ready.',
      }
    : pageStatuses[kind];
  const Icon =
    kind === 'not-found'
      ? FileQuestion
      : kind === 'error'
        ? Unplug
        : reconnected
          ? Wifi
          : WifiOff;
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${status.title} — Azel M. Villanueva`;
    if (reloadHome) heading.current?.focus({ preventScroll: true });
    return () => {
      document.title = previousTitle;
    };
  }, [status.title, reloadHome]);

  return (
    <article className="page-status-card">
      <span className="page-status-icon" aria-hidden="true">
        <Icon size={28} />
      </span>
      <p
        className={`page-status-code${kind === 'not-found' ? ' page-status-code-large' : ''}`}
        aria-hidden="true"
      >
        {status.code}
      </p>
      <h1 ref={heading} tabIndex={-1}>
        {kind === 'not-found' && <span className="sr-only">404: </span>}
        {status.title}
      </h1>
      <p className="page-status-description">{status.description}</p>
      <div className="page-status-actions">
        {onRetry && (
          <button
            type="button"
            className="button button-primary"
            onClick={onRetry}
          >
            <RefreshCw size={15} aria-hidden="true" />
            {retryLabel}
          </button>
        )}
        {reloadHome ? (
          <a className="button button-outline" href="/">
            <ArrowLeft size={15} aria-hidden="true" />
            Back to home
          </a>
        ) : (
          <Link
            className={`button ${onRetry ? 'button-outline' : 'button-primary'}`}
            to="/"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back to home
          </Link>
        )}
        {kind === 'not-found' && (
          <Link className="button button-outline" to="/projects">
            Explore projects
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        )}
      </div>
      {notice && (
        <p className="page-status-notice" role="status">
          {notice}
        </p>
      )}
    </article>
  );
}
