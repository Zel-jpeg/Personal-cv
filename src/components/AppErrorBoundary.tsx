import { Component, type ReactNode } from 'react';
import PageStatusCard from './PageStatusCard';

// Keep the recovery screen outside the failed app/router tree.
export default class AppErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <main
          className="page-status-page page-status-fallback"
          id="main-content"
        >
          <PageStatusCard
            kind="error"
            reloadHome
            onRetry={() => this.setState({ failed: false })}
          />
        </main>
      );
    }
    return this.props.children;
  }
}
