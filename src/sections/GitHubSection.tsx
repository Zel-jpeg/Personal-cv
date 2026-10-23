import { SiGithub } from 'react-icons/si';
import { ArrowUpRight } from 'lucide-react';
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
          GitHub activity<span className="heading-dot">.</span>
        </h2>
        <a
          className="text-link"
          href="https://github.com/Zel-jpeg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiGithub size={15} /> Zel-jpeg <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="contribution-box" aria-busy={!activity && !failed}>
        {activity ? (
          <>
            <div className="contribution-scroll">
              <div className="contribution-months">
                {activity.days
                  .filter(
                    (day, index) =>
                      index === 0 ||
                      day.date.slice(0, 7) !==
                        activity.days[index - 1].date.slice(0, 7),
                  )
                  .map((day) => (
                    <span key={day.date}>
                      {new Date(`${day.date}T12:00:00Z`).toLocaleString('en', {
                        month: 'short',
                        timeZone: 'UTC',
                      })}
                    </span>
                  ))}
              </div>
              <div
                className="contribution-grid"
                role="img"
                aria-label={`${activity.total} contributions across the displayed period`}
              >
                {activity.days.map((day) => (
                  <span
                    key={day.date}
                    className={`contribution-cell level-${Math.min(4, Math.max(0, day.level))}`}
                    title={`${day.count} contributions on ${day.date}`}
                  />
                ))}
              </div>
            </div>
            <div className="contribution-footer">
              <span>
                {activity.total.toLocaleString()} contributions in the displayed
                period
              </span>
              <span className="activity-legend">
                Less{' '}
                {[0, 1, 2, 3, 4].map((level) => (
                  <i
                    key={level}
                    className={`contribution-cell level-${level}`}
                  />
                ))}{' '}
                More
              </span>
            </div>
          </>
        ) : (
          <p role="status">
            {failed
              ? 'Activity is unavailable right now. Visit GitHub to see my latest contributions.'
              : 'Loading public GitHub activity…'}
          </p>
        )}
      </div>
    </section>
  );
}
