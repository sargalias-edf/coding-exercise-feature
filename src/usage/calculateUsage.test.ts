import { describe, expect, it } from "vitest";
import { calculateUsage } from "./calculateUsage";
import type { MeterReading } from "../types";

const readings: MeterReading[] = [
  { id: "r1", date: "2026-01-05", value: 10250 },
  { id: "r2", date: "2026-02-04", value: 10520 },
  { id: "r3", date: "2026-03-06", value: 10810 },
];

describe("calculateUsage", () => {
  it("returns null usage for the first reading", () => {
    const rows = calculateUsage(readings);
    expect(rows[0].usage).toBeNull();
  });

  it("derives usage as the difference from the previous reading", () => {
    const rows = calculateUsage(readings);
    expect(rows[1].usage).toBe(270);
    expect(rows[2].usage).toBe(290);
  });

  it("sorts readings oldest-first before deriving", () => {
    const shuffled = [readings[2], readings[0], readings[1]];
    const rows = calculateUsage(shuffled);
    expect(rows.map((row) => row.reading.id)).toEqual(["r1", "r2", "r3"]);
    expect(rows[1].usage).toBe(270);
  });

  it("returns an empty array for no readings", () => {
    expect(calculateUsage([])).toEqual([]);
  });
});
