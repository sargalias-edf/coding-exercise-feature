import type { MeterReading } from "../types";
import { calculateUsage } from "../usage/calculateUsage";

interface MeterReadingsListProps {
  readings: MeterReading[];
}

/**
 * Presentational list of readings with the usage shown between them.
 */
export function MeterReadingsList({ readings }: MeterReadingsListProps) {
  const rows = calculateUsage(readings);

  if (rows.length === 0) {
    return <p>No meter readings yet.</p>;
  }

  return (
    <table>
      <caption>Your meter readings</caption>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Reading (kWh)</th>
          <th scope="col">Usage since last (kWh)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ reading, usage }) => (
          <tr key={reading.id}>
            <td>{reading.date}</td>
            <td>{reading.value.toLocaleString()}</td>
            <td>{usage === null ? "—" : usage.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
