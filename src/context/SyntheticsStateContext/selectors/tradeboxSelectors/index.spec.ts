import { describe, expect, it } from "vitest";

import { BASIS_POINTS_DIVISOR } from "config/factors";
import { getTradeboxLeverageSliderMarks } from "domain/synthetics/markets";

describe("tradeboxSelectors", () => {
  it("selectTradeboxLeverageSliderMarks", () => {
    // Always returns full 1000x leverage marks regardless of market limits
    expect(getTradeboxLeverageSliderMarks(100 * BASIS_POINTS_DIVISOR)).toEqual([1, 5, 10, 25, 50, 100, 250, 500, 1000]);
    expect(getTradeboxLeverageSliderMarks(120 * BASIS_POINTS_DIVISOR)).toEqual([1, 5, 10, 25, 50, 100, 250, 500, 1000]);
    expect(getTradeboxLeverageSliderMarks(140 * BASIS_POINTS_DIVISOR)).toEqual([1, 5, 10, 25, 50, 100, 250, 500, 1000]);
    expect(getTradeboxLeverageSliderMarks(150 * BASIS_POINTS_DIVISOR)).toEqual([1, 5, 10, 25, 50, 100, 250, 500, 1000]);
    expect(getTradeboxLeverageSliderMarks(160 * BASIS_POINTS_DIVISOR)).toEqual([1, 5, 10, 25, 50, 100, 250, 500, 1000]);
    expect(getTradeboxLeverageSliderMarks(180 * BASIS_POINTS_DIVISOR)).toEqual([1, 5, 10, 25, 50, 100, 250, 500, 1000]);
    expect(getTradeboxLeverageSliderMarks(200 * BASIS_POINTS_DIVISOR)).toEqual([1, 5, 10, 25, 50, 100, 250, 500, 1000]);

    expect(getTradeboxLeverageSliderMarks(220 * BASIS_POINTS_DIVISOR)).toEqual([1, 5, 10, 25, 50, 100, 250, 500, 1000]);
    expect(getTradeboxLeverageSliderMarks(240 * BASIS_POINTS_DIVISOR)).toEqual([1, 5, 10, 25, 50, 100, 250, 500, 1000]);
    expect(getTradeboxLeverageSliderMarks(250 * BASIS_POINTS_DIVISOR)).toEqual([1, 5, 10, 25, 50, 100, 250, 500, 1000]);

    expect(getTradeboxLeverageSliderMarks(300 * BASIS_POINTS_DIVISOR)).toEqual([1, 5, 10, 25, 50, 100, 250, 500, 1000]);
  });
});
