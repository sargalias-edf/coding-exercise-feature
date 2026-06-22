import type { MeterReading, NewMeterReading } from "../types";

/**
 * A fake in-memory meter readings API. Stands in for a real backend service so
 * the exercise runs with no network: it mimics async behaviour (latency +
 * promises) and owns the data, like a real API client would.
 */

const SIMULATED_LATENCY_MS = 200;

let readings: MeterReading[] = [
  { id: "r1", date: "2026-01-05", value: 10250 },
  { id: "r2", date: "2026-02-04", value: 10520 },
  { id: "r3", date: "2026-03-06", value: 10810 },
  { id: "r4", date: "2026-04-05", value: 11140 },
];

let nextId = readings.length + 1;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(value), SIMULATED_LATENCY_MS)
  );
}

function clone(reading: MeterReading): MeterReading {
  return { ...reading };
}

function byDateAscending(a: MeterReading, b: MeterReading): number {
  return a.date.localeCompare(b.date);
}

/** Returns all readings, oldest first. */
export async function getReadings(): Promise<MeterReading[]> {
  const sorted = [...readings].sort(byDateAscending).map(clone);
  return delay(sorted);
}

/** Persists a new reading and returns the stored record. */
export async function submitReading(
  input: NewMeterReading
): Promise<MeterReading> {
  const stored: MeterReading = { id: `r${nextId++}`, ...input };
  readings = [...readings, stored];
  return delay(clone(stored));
}

/** Test helper: reset the store to a known state. Not used by the app. */
export function __resetForTests(seed?: MeterReading[]): void {
  readings = seed
    ? seed.map(clone)
    : [
        { id: "r1", date: "2026-01-05", value: 10250 },
        { id: "r2", date: "2026-02-04", value: 10520 },
        { id: "r3", date: "2026-03-06", value: 10810 },
        { id: "r4", date: "2026-04-05", value: 11140 },
      ];
  nextId = readings.length + 1;
}
