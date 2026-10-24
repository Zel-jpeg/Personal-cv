import {
  Check,
  CodeXml,
  Search,
  TriangleAlert,
  Wifi,
  WifiOff,
} from 'lucide-react';
import type { PageStatus } from '../data/pageStatuses';

export default function PageStatusIllustration({
  kind,
  connected = false,
}: {
  kind: PageStatus;
  connected?: boolean;
}) {
  const ConnectionIcon = connected ? Wifi : WifiOff;

  return (
    <svg
      className="page-status-illustration"
      viewBox="0 0 360 224"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="180" cy="207" rx="128" ry="9" className="status-art-fill" />
      <path
        d="M24 94V70a12 12 0 0 1 12-12h12m264 96h12a12 12 0 0 0 12-12v-24"
        className="status-art-guide"
      />
      <path
        d="M28 168h10m-5-5v10m286-143h10m-5-5v10"
        className="status-art-guide"
      />
      <rect
        x="54"
        y="25"
        width="252"
        height="168"
        rx="14"
        className="status-art-window"
      />
      <path d="M54 58h252" className="status-art-guide" />
      {[72, 83, 94].map((cx) => (
        <circle key={cx} cx={cx} cy="42" r="2.5" className="status-art-dot" />
      ))}
      <path d="M252 42h35" className="status-art-guide" />

      {kind === 'not-found' ? (
        <>
          <text
            x="180"
            y="144"
            textAnchor="middle"
            className="status-art-number"
          >
            404
          </text>
          <g transform="rotate(-10 278 164)">
            <rect
              x="248"
              y="136"
              width="56"
              height="56"
              rx="14"
              className="status-art-badge"
            />
            <Search
              x="261"
              y="149"
              width="30"
              height="30"
              strokeWidth="1.5"
              className="status-art-ink"
            />
          </g>
          <path
            d="M147 165h66"
            className="status-art-guide"
            strokeDasharray="3 5"
          />
        </>
      ) : kind === 'offline' ? (
        <>
          <ConnectionIcon
            x="160"
            y="76"
            width="40"
            height="40"
            strokeWidth="1.5"
            className="status-art-ink"
          />
          <path d="M82 151h40m116 0h40" className="status-art-cable" />
          <path
            d="M122 135h18a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-18zM238 135h-18a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h18z"
            className="status-art-badge"
          />
          <path
            d="M146 143h9m-9 16h9m59-16h-9m9 16h-9"
            className="status-art-cable"
          />
          {connected ? (
            <>
              <path d="M155 151h50" className="status-art-cable" />
              <circle cx="278" cy="173" r="22" className="status-art-badge" />
              <Check
                x="267"
                y="162"
                width="22"
                height="22"
                strokeWidth="1.7"
                className="status-art-ink"
              />
            </>
          ) : (
            <path
              d="m177 138 6-8m-6 34 6 8m-13-21h20"
              className="status-art-guide"
            />
          )}
        </>
      ) : (
        <>
          <rect
            x="82"
            y="81"
            width="112"
            height="76"
            rx="8"
            className="status-art-panel"
          />
          <CodeXml
            x="98"
            y="96"
            width="28"
            height="28"
            strokeWidth="1.5"
            className="status-art-muted"
          />
          <path d="M99 137h35m9 0h18" className="status-art-guide" />
          <g transform="rotate(7 227 139)">
            <rect
              x="179"
              y="95"
              width="96"
              height="88"
              rx="12"
              className="status-art-badge"
            />
            <TriangleAlert
              x="206"
              y="111"
              width="42"
              height="42"
              strokeWidth="1.4"
              className="status-art-ink"
            />
            <path d="M211 166h32" className="status-art-guide" />
          </g>
        </>
      )}
    </svg>
  );
}
