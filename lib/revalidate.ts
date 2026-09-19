export function getSecondsUntilNextYear(): number {
  const now = new Date();
  const nextYearStart = new Date(Date.UTC(now.getUTCFullYear() + 1, 0, 1, 0, 0, 0));
  return Math.floor((nextYearStart.getTime() - now.getTime()) / 1000);
}
