import { ONE_MINUTE_MS } from "@/core/application/bobs-corn-constants";

export function getElapsedMs(since: Date): number {
  return Date.now() - since.getTime();
}

export function getRemainingSeconds(
  lastPurchase: Date,
  limitMs = ONE_MINUTE_MS,
): number {
  const remainingMs = limitMs - getElapsedMs(lastPurchase);
  return Math.max(Math.ceil(remainingMs / 1000), 0);
}

export function hasOneMinutePassed(
  lastPurchase: Date,
  limitMs = ONE_MINUTE_MS,
): boolean {
  return getElapsedMs(lastPurchase) >= limitMs;
}
