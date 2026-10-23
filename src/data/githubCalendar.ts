export type Contribution = { date: string; count: number; level: number };

export function buildContributionCalendar(
  source: Contribution[],
  year: number,
) {
  const first = new Date(Date.UTC(year, 0, 1));
  const end = Date.UTC(year + 1, 0, 1);
  const records = new Map(
    source
      .filter((day) => day.date.startsWith(`${year}-`))
      .map((day) => [day.date, day]),
  );
  const days: Contribution[] = [];
  for (let time = first.getTime(); time < end; time += 86400000) {
    const date = new Date(time).toISOString().slice(0, 10);
    days.push(records.get(date) ?? { date, count: 0, level: 0 });
  }
  const leading = first.getUTCDay();
  const cells: (Contribution | null)[] = [
    ...Array<null>(leading).fill(null),
    ...days,
  ];
  while (cells.length % 7) cells.push(null);
  const months = Array.from({ length: 12 }, (_, month) => {
    const date = new Date(Date.UTC(year, month, 1));
    return {
      label: date.toLocaleDateString('en', { month: 'short', timeZone: 'UTC' }),
      column:
        Math.floor(
          (leading + (date.getTime() - first.getTime()) / 86400000) / 7,
        ) + 1,
    };
  });
  return {
    cells,
    months,
    weeks: cells.length / 7,
    total: days.reduce((sum, day) => sum + day.count, 0),
    year,
  };
}
