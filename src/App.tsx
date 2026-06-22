import { useMeterReadings } from "./hooks/useMeterReadings";
import { MeterReadingsList } from "./components/MeterReadingsList";
import { SubmitReadingForm } from "./components/SubmitReadingForm";

export function App() {
  const { readings, loading, error, addReading } = useMeterReadings();

  return (
    <main>
      <h1>My energy account</h1>
      <h2>Meter readings</h2>

      {loading && <p>Loading your readings…</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && <MeterReadingsList readings={readings} />}

      <h2>Submit a new reading</h2>
      <SubmitReadingForm existingReadings={readings} onSubmit={addReading} />
    </main>
  );
}
