import { describe, expect, it } from "vitest";
import { validateReading, ValidationMessage } from "./readingValidation";
import type { MeterReading } from "../types";

const existing: MeterReading[] = [
  { id: "r1", date: "2026-01-05", value: 10250 },
  { id: "r2", date: "2026-02-04", value: 10520 },
];

function futureDate(): string {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().slice(0, 10);
}

describe("validateReading", () => {
  it("accepts a valid reading above the previous value", () => {
    const result = validateReading(
      { date: "2026-03-06", value: 10810 },
      existing
    );
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("rejects a non-positive value", () => {
    const result = validateReading({ date: "2026-03-06", value: 0 }, existing);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(ValidationMessage.VALUE_NOT_POSITIVE);
  });

  it("rejects a NaN value", () => {
    const result = validateReading(
      { date: "2026-03-06", value: Number.NaN },
      existing
    );
    expect(result.errors).toContain(ValidationMessage.VALUE_NOT_A_NUMBER);
  });

  it("rejects a missing date", () => {
    const result = validateReading({ date: "", value: 10810 }, existing);
    expect(result.errors).toContain(ValidationMessage.DATE_MISSING);
  });

  it("rejects a future date", () => {
    const result = validateReading(
      { date: futureDate(), value: 10810 },
      existing
    );
    expect(result.errors).toContain(ValidationMessage.DATE_IN_FUTURE);
  });

  it("rejects a value below the most recent previous reading", () => {
    const result = validateReading(
      { date: "2026-03-06", value: 10400 },
      existing
    );
    expect(result.errors).toContain(ValidationMessage.VALUE_BELOW_PREVIOUS);
  });

  it("compares against the previous reading by date, not insertion order", () => {
    const result = validateReading(
      { date: "2026-01-20", value: 10300 },
      existing
    );
    // 2026-01-20 sits after r1 (10250) and before r2, so 10300 is valid.
    expect(result.valid).toBe(true);
  });
});
