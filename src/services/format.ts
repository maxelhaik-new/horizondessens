import type { ServiceVariant } from "./types";

/** 75 → "1h15", 60 → "1h", 45 → "45 min". */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, "0")}`;
}

export function formatPrice(euros: number): string {
  return `${euros} €`;
}

/** "1h · 100 €" */
export function formatVariant(variant: ServiceVariant): string {
  const duration = formatDuration(variant.durationMinutes);
  return variant.priceEuros === null
    ? duration
    : `${duration} · ${formatPrice(variant.priceEuros)}`;
}
