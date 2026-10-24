import { Link, useLocation } from 'react-router';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export default function NetworkStatus() {
  const online = useOnlineStatus();
  const { pathname } = useLocation();
  if (online || pathname.replace(/\/$/, '') === '/offline') return null;
  return (
    <aside className="network-status" aria-label="Connection status">
      <WifiOff size={18} aria-hidden="true" />
      <p role="status">You're offline. Some features need a connection.</p>
      <Link to="/offline">Details</Link>
    </aside>
  );
}
