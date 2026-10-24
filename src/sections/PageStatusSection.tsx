import { useState } from 'react';
import PageStatusCard from '../components/PageStatusCard';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import type { PageStatus } from '../data/pageStatuses';

function PageStatusSection({ kind }: { kind: PageStatus }) {
  const online = useOnlineStatus();
  const [notice, setNotice] = useState('');
  const retry = () => {
    if (kind === 'offline') {
      setNotice(
        navigator.onLine
          ? 'Your device is connected. You can return to the portfolio.'
          : 'Your device is still offline. Reconnect, then check again.',
      );
    } else window.location.reload();
  };

  return (
    <main className="page-status-page" id="main-content">
      <PageStatusCard
        kind={kind}
        online={online}
        onRetry={kind === 'not-found' ? undefined : retry}
        retryLabel={kind === 'offline' ? 'Check connection' : 'Reload page'}
        notice={kind === 'offline' && !online ? notice : undefined}
      />
    </main>
  );
}

export default function NotFoundSection() {
  return <PageStatusSection kind="not-found" />;
}
export function OfflineSection() {
  return <PageStatusSection kind="offline" />;
}
export function ErrorSection() {
  return <PageStatusSection kind="error" />;
}
