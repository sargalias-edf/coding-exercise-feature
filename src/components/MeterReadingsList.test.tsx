import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MeterReadingsList } from "./MeterReadingsList";
import type { MeterReading } from "../types";

const readings: MeterReading[] = [
  { id: "r1", date: "2026-01-05", value: 10250 },
  { id: "r2", date: "2026-02-04", value: 10520 },
];

describe("MeterReadingsList", () => {
  it("renders a row per reading with derived usage", () => {
    render(<MeterReadingsList readings={readings} />);

    expect(screen.getByText("2026-01-05")).toBeInTheDocument();
    expect(screen.getByText("2026-02-04")).toBeInTheDocument();
    // Usage between the two readings: 10520 - 10250 = 270.
    expect(screen.getByText("270")).toBeInTheDocument();
  });

  it("shows an empty message when there are no readings", () => {
    render(<MeterReadingsList readings={[]} />);
    expect(screen.getByText("No meter readings yet.")).toBeInTheDocument();
  });
});
