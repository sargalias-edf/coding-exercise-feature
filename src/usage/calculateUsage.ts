import type { MeterReading } from "../types";

export interface UsageRow {
  reading: MeterReading;
  /**
   * kWh consumed since the previous reading, or null for the first reading
   * (there's nothing before it to measure against).
   */
  usage: number | null;
}

/**
 * Returns each reading with the consumption since the previous reading.
 * Readings are sorted oldest-first, so callers don't have to pre-sort.
 */
export function calculateUsage(readings: MeterReading[]): UsageRow[] {
  const ordered = [...readings].sort((a, b) => a.date.localeCompare(b.date));

  return ordered.map((reading, index) => {
    if (index === 0) {
      return { reading, usage: null };
    }
    const previous = ordered[index - 1];
    return { reading, usage: reading.value - previous.value };
  });
}
