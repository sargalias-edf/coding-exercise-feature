import { useId, useState } from "react";
import type { MeterReading, NewMeterReading } from "../types";
import { validateReading } from "../validation/readingValidation";

interface SubmitReadingFormProps {
  existingReadings: MeterReading[];
  onSubmit: (input: NewMeterReading) => Promise<void>;
}

/**
 * Form for submitting a new reading. Uses the shared validateReading util.
 */
export function SubmitReadingForm({
  existingReadings,
  onSubmit,
}: SubmitReadingFormProps) {
  const dateId = useId();
  const valueId = useId();
  const [date, setDate] = useState("");
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const input: NewMeterReading = { date, value: Number(value) };

    const result = validateReading(input, existingReadings);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setErrors([]);
    setSubmitting(true);
    try {
      await onSubmit(input);
      setDate("");
      setValue("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Submit a meter reading">
      <div>
        <label htmlFor={dateId}>Date of reading</label>
        <input
          id={dateId}
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor={valueId}>Meter reading (kWh)</label>
        <input
          id={valueId}
          type="number"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>

      {errors.length > 0 && (
        <ul aria-live="polite">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <button type="submit" disabled={submitting}>
        {submitting ? "Saving…" : "Submit reading"}
      </button>
    </form>
  );
}
