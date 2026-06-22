import type { MeterReading, NewMeterReading } from "../types";

/**
 * Shared validation rules for meter readings.
 */

export const ValidationMessage = {
  VALUE_NOT_A_NUMBER: "Enter the reading as a number.",
  VALUE_NOT_POSITIVE: "A meter reading must be greater than zero.",
  DATE_MISSING: "Enter the date of the reading.",
  DATE_IN_FUTURE: "A reading can't be dated in the future.",
  VALUE_BELOW_PREVIOUS:
    "A reading can't be lower than the previous reading — a meter only counts upwards.",
} as const;

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Validates a new reading against the business rules.
 *
 * `existingReadings` is the current set of readings. The "not below previous"
 * rule compares against the most recent reading dated on or before the new
 * reading's date.
 */
export function validateReading(
  input: NewMeterReading,
  existingReadings: MeterReading[]
): ValidationResult {
  const errors: string[] = [];

  if (typeof input.value !== "number" || Number.isNaN(input.value)) {
    errors.push(ValidationMessage.VALUE_NOT_A_NUMBER);
  } else if (input.value <= 0) {
    errors.push(ValidationMessage.VALUE_NOT_POSITIVE);
  }

  if (!input.date) {
    errors.push(ValidationMessage.DATE_MISSING);
  } else if (input.date > today()) {
    errors.push(ValidationMessage.DATE_IN_FUTURE);
  }

  if (input.date && typeof input.value === "number" && !Number.isNaN(input.value)) {
    const previous = previousReading(input.date, existingReadings);
    if (previous && input.value < previous.value) {
      errors.push(ValidationMessage.VALUE_BELOW_PREVIOUS);
    }
  }

  return { valid: errors.length === 0, errors };
}

function previousReading(
  date: string,
  existingReadings: MeterReading[]
): MeterReading | undefined {
  return existingReadings
    .filter((reading) => reading.date <= date)
    .sort((a, b) => b.date.localeCompare(a.date))[0];
}
