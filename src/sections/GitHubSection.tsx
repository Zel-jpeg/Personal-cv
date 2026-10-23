import type { CSSProperties } from 'react';
import { useGitHubActivity } from '../hooks/useGitHubActivity';

export default function GitHubSection() {
  const { activity, failed } = useGitHubActivity();
  return (
    <section
      className="cv-section github-section reveal"
      id="activity"
      aria-labelledby="activity-title"
    >
      <div className="section-heading">
        <h2 id="activity-title">
          <a
            href="https://github.com/Zel-jpeg"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Activity
          </a>
        </h2>
      </div>
      <div aria-busy={!activity && !failed}>
        {activity ? (
          <div
            className="contribution-content"
            style={{ '--week-count': activity.weeks } as CSSProperties}
          >
            <div className="contribution-scroll">
              <div className="contribution-calendar">
                <div className="contribution-months">
                  {activity.months.map((month) => (
                    <span
                      key={month.label}
                      style={{ gridColumn: month.column }}
                    >
                      {month.label}
                    </span>
                  ))}
                </div>
                <div
                  className="contribution-grid"
                  role="img"
                  aria-label={`${activity.total} contributions in ${activity.year}, from January to December`}
                >
                  {activity.cells.map((day, index) =>
                    day ? (
                      <span
                        key={day.date}
                        className={`contribution-cell level-${Math.min(4, Math.max(0, Math.floor(day.level)))}`}
                        title={`${day.count} contributions on ${day.date}`}
                      />
                    ) : (
                      <span
                        key={`empty-${index}`}
                        className="contribution-cell calendar-padding"
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
            <p className="contribution-summary">
              {activity.total.toLocaleString()} contributions in {activity.year}
            </p>
          </div>
        ) : (
          <p className="contribution-summary" role="status">
            {failed ? (
              <a
                href="https://github.com/Zel-jpeg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Activity is unavailable right now. View my contributions on
                GitHub.
              </a>
            ) : (
              'Loading public GitHub activity…'
            )}
          </p>
        )}
      </div>
    </section>
  );
}
