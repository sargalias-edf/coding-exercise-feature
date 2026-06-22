import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SubmitReadingForm } from "./SubmitReadingForm";
import type { MeterReading } from "../types";

const existing: MeterReading[] = [
  { id: "r1", date: "2026-01-05", value: 10250 },
  { id: "r2", date: "2026-02-04", value: 10520 },
];

describe("SubmitReadingForm", () => {
  it("submits a valid reading", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<SubmitReadingForm existingReadings={existing} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Date of reading"), "2026-03-06");
    await user.type(screen.getByLabelText("Meter reading (kWh)"), "10810");
    await user.click(screen.getByRole("button", { name: "Submit reading" }));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({ date: "2026-03-06", value: 10810 })
    );
  });

  it("shows a validation error and does not submit a reading below the previous", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<SubmitReadingForm existingReadings={existing} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Date of reading"), "2026-03-06");
    await user.type(screen.getByLabelText("Meter reading (kWh)"), "10400");
    await user.click(screen.getByRole("button", { name: "Submit reading" }));

    expect(
      screen.getByText(/can't be lower than the previous reading/i)
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
