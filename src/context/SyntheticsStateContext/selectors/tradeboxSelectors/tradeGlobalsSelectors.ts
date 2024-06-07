import { TradeAppState } from "context/SyntheticsStateContext/types";
import { createSelectorDeprecated } from "context/SyntheticsStateContext/utils";

export const selectOrdersInfoData = (s: TradeAppState) => s.globals.ordersInfo.ordersInfoData;
export const selectIsOrdersLoading = (s: TradeAppState) => s.globals.ordersInfo.isLoading;
export const selectPositionsInfoData = (s: TradeAppState) => s.globals.positionsInfo.positionsInfoData;
export const selectIsPositionsLoading = (s: TradeAppState) => s.globals.positionsInfo.isLoading;
export const selectMarketsInfoData = (s: TradeAppState) => s.globals.marketsInfo.marketsInfoData;
export const selectTokensData = (s: TradeAppState) => s.globals.marketsInfo.tokensData;
export const selectPricesUpdatedAt = (s: TradeAppState) => s.globals.marketsInfo.pricesUpdatedAt;
export const selectMinCollateralUsd = (s: TradeAppState) => s.globals.positionsConstants.minCollateralUsd;
export const selectMinPositionSizeUsd = (s: TradeAppState) => s.globals.positionsConstants.minPositionSizeUsd;

export const selectClosingPositionKey = (s: TradeAppState) => s.globals.closingPositionKey;
export const selectSetClosingPositionKey = (s: TradeAppState) => s.globals.setClosingPositionKey;

export const selectGasLimits = (s: TradeAppState) => s.globals.gasLimits;
export const selectGasPrice = (s: TradeAppState) => s.globals.gasPrice;

export const selectKeepLeverage = (s: TradeAppState) => s.globals.keepLeverage ?? true;
export const selectSetKeepLeverage = (s: TradeAppState) => s.globals.setKeepLeverage;

export const selectPositionConstants = createSelectorDeprecated(
  [selectMinCollateralUsd, selectMinPositionSizeUsd],
  (minCollateralUsd, minPositionSizeUsd) => ({
    minCollateralUsd,
    minPositionSizeUsd,
  })
);

export const selectClosingPositionKeyState = createSelectorDeprecated(
  [selectClosingPositionKey, selectSetClosingPositionKey],
  (closingPositionKey, setClosingPositionKey) => [closingPositionKey, setClosingPositionKey] as const
);
