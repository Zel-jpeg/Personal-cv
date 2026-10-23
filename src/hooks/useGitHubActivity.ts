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
const cacheKey = `azel-github-activity-${currentYear}`;
const cacheLifetime = 15 * 60 * 1000;
type CachedActivity = { fetchedAt: number; days: Contribution[] };
let memoryCache: CachedActivity | null = null;

function validDays(days: unknown): days is Contribution[] {
  return (
    Array.isArray(days) &&
    days.every(
      (day) =>
        day &&
        typeof day.date === 'string' &&
        Number.isFinite(day.count) &&
        day.count >= 0 &&
        Number.isFinite(day.level),
    )
  );
}

function readCache() {
  try {
    const cached =
      memoryCache ??
      (JSON.parse(
        sessionStorage.getItem(cacheKey) ?? 'null',
      ) as CachedActivity | null);
    if (
      cached &&
      Number.isFinite(cached.fetchedAt) &&
      Date.now() - cached.fetchedAt >= 0 &&
      Date.now() - cached.fetchedAt < cacheLifetime &&
      validDays(cached.days)
    ) {
      memoryCache = cached;
      return buildContributionCalendar(cached.days, currentYear);
    }
  } catch {
    /* Optional cache; the public request still works without storage. */
  }
  return null;
}

export function useGitHubActivity() {
  const [activity, setActivity] = useState<Activity | null>(readCache);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (readCache()) return;
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
        if (!validDays(data.contributions)) throw new Error('Invalid activity');
        memoryCache = { fetchedAt: Date.now(), days: data.contributions };
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(memoryCache));
        } catch {
          /* Storage is optional. */
        }
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
