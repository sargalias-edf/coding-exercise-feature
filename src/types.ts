export interface MeterReading {
  id: string;
  /** ISO date string (YYYY-MM-DD) the meter was read. */
  date: string;
  /** Absolute meter value in kWh. A meter only ever counts upwards. */
  value: number;
}

export interface NewMeterReading {
  date: string;
  value: number;
}
