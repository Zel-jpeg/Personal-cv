import { useEffect, useState } from 'react';

export type Contribution = { date: string; count: number; level: number };
type Activity = { days: Contribution[]; total: number };

export function useGitHubActivity() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      setFailed(true);
      controller.abort();
    }, 12000);
    fetch('https://github-contributions-api.jogruber.de/v4/Zel-jpeg?y=last', {
      signal: controller.signal,
    })
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
              Number.isFinite(day.level),
          )
        )
          throw new Error('Invalid activity');
        const days = data.contributions;
        setActivity({
          days,
          total: days.reduce((sum, day) => sum + day.count, 0),
        });
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
