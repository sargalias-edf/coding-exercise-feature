import { describe, expect, it, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useMeterReadings } from "./useMeterReadings";
import { __resetForTests } from "../api/meterReadingsApi";

describe("useMeterReadings", () => {
  beforeEach(() => {
    __resetForTests();
  });

  it("loads readings on mount", async () => {
    const { result } = renderHook(() => useMeterReadings());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.readings).toHaveLength(4);
    expect(result.current.error).toBeNull();
  });

  it("adds a reading and refetches", async () => {
    const { result } = renderHook(() => useMeterReadings());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.addReading({ date: "2026-05-05", value: 11500 });
    });

    expect(result.current.readings).toHaveLength(5);
    expect(
      result.current.readings.some((reading) => reading.value === 11500)
    ).toBe(true);
  });
});
