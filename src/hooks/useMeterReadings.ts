import { useCallback, useEffect, useState } from "react";
import type { MeterReading, NewMeterReading } from "../types";
import { getReadings, submitReading } from "../api/meterReadingsApi";

/**
 * Owns the meter readings data: loading, errors, and the operations the UI can
 * perform. Components consume this hook and stay presentational — data access
 * lives here, not in the components.
 */
export interface UseMeterReadings {
  readings: MeterReading[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addReading: (input: NewMeterReading) => Promise<void>;
}

export function useMeterReadings(): UseMeterReadings {
  const [readings, setReadings] = useState<MeterReading[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setReadings(await getReadings());
    } catch {
      setError("We couldn't load your meter readings. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const addReading = useCallback(
    async (input: NewMeterReading) => {
      await submitReading(input);
      await refetch();
    },
    [refetch]
  );

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { readings, loading, error, refetch, addReading };
}
