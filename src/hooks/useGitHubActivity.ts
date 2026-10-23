import { useEffect, useState } from 'react';

import { buildContributionCalendar } from '../data/githubCalendar';
import type { Contribution } from '../data/githubCalendar';
type Activity = ReturnType<typeof buildContributionCalendar>;
const currentYear = Number(
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    timeZone: 'Asia/Manila',
  }).format(new Date()),
);

export function useGitHubActivity() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      setFailed(true);
      controller.abort();
    }, 12000);
    fetch(
      `https://github-contributions-api.jogruber.de/v4/Zel-jpeg?y=${currentYear}`,
      {
        signal: controller.signal,
      },
    )
      .then((response) => {
        if (!response.ok) throw new Error('Activity unavailable');
        return response.json();
      })
      .then((data: { contributions: Contribution[] }) => {
        if (
          !Array.isArray(data.contributions) ||
          !data.contributions.every(
            (day) =>
              typeof day.date === 'string' &&
              Number.isFinite(day.count) &&
              day.count >= 0 &&
              Number.isFinite(day.level),
          )
        )
          throw new Error('Invalid activity');
        setActivity(buildContributionCalendar(data.contributions, currentYear));
        clearTimeout(timeout);
      })
      .catch(() => {
        clearTimeout(timeout);
        if (!controller.signal.aborted) setFailed(true);
      });
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);
  return { activity, failed };
}
