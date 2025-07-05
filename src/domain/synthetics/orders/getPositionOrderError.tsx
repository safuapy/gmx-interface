import { t } from "@lingui/macro";

import { BASIS_POINTS_DIVISOR } from "config/factors";
import {
  OrderType,
  PositionOrderInfo,
  isLimitIncreaseOrderType,
  isStopIncreaseOrderType,
  isTriggerDecreaseOrderType,
} from "domain/synthetics/orders";
import { PositionInfoLoaded } from "domain/synthetics/positions";
import { NextPositionValues } from "domain/synthetics/trade";

export function getPositionOrderError({
  positionOrder,
  markPrice,
  sizeDeltaUsd,
  triggerPrice,
  acceptablePrice,
  existingPosition,
  nextPositionValuesForIncrease,
  maxAllowedLeverage,
}: {
  positionOrder: PositionOrderInfo;
  markPrice: bigint | undefined;
  sizeDeltaUsd: bigint | undefined;
  triggerPrice: bigint | undefined;
  acceptablePrice: bigint | undefined;
  existingPosition: PositionInfoLoaded | undefined;
  nextPositionValuesForIncrease: NextPositionValues | undefined;
  maxAllowedLeverage: number | undefined;
}): string | undefined {
  if (markPrice === undefined) {
    return t`Loading...`;
  }

  if (sizeDeltaUsd === undefined || sizeDeltaUsd < 0) {
    return t`Enter an amount`;
  }

  if (triggerPrice === undefined || triggerPrice < 0) {
    return t`Enter a price`;
  }

  if (
    sizeDeltaUsd === positionOrder.sizeDeltaUsd &&
    triggerPrice === positionOrder.triggerPrice! &&
    acceptablePrice === positionOrder.acceptablePrice
  ) {
    return t`Enter new amount or price`;
  }

  if (isLimitIncreaseOrderType(positionOrder.orderType)) {
    if (positionOrder.isLong) {
      if (triggerPrice >= markPrice) {
        return t`Limit price above mark price`;
      }
    } else {
      if (triggerPrice <= markPrice) {
        return t`Limit price below mark price`;
      }
    }
  } else if (isStopIncreaseOrderType(positionOrder.orderType)) {
    if (positionOrder.isLong && triggerPrice <= markPrice) {
      return t`Stop Market price is below mark price`;
    } else if (!positionOrder.isLong && triggerPrice >= markPrice) {
      return t`Stop Market price is above mark price`;
    }
  }

  if (isTriggerDecreaseOrderType(positionOrder.orderType)) {
    if (markPrice === undefined) {
      return t`Loading...`;
    }

    if (
      sizeDeltaUsd === (positionOrder.sizeDeltaUsd ?? 0n) &&
      triggerPrice === (positionOrder.triggerPrice ?? 0n) &&
      acceptablePrice === positionOrder.acceptablePrice
    ) {
      return t`Enter a new size or price`;
    }

    if (existingPosition?.liquidationPrice) {
      if (existingPosition.isLong && triggerPrice <= existingPosition?.liquidationPrice) {
        return t`Trigger price below liq. price`;
      }

      if (!existingPosition.isLong && triggerPrice >= existingPosition?.liquidationPrice) {
        return t`Trigger price above liq. price`;
      }
    }

    if (positionOrder.isLong) {
      if (positionOrder.orderType === OrderType.LimitDecrease && triggerPrice <= markPrice) {
        return t`Trigger price below mark price`;
      }

      if (positionOrder.orderType === OrderType.StopLossDecrease && triggerPrice >= markPrice) {
        return t`Trigger price above mark price`;
      }
    } else {
      if (positionOrder.orderType === OrderType.LimitDecrease && triggerPrice >= markPrice) {
        return t`Trigger price above mark price`;
      }

      if (positionOrder.orderType === OrderType.StopLossDecrease && triggerPrice <= markPrice) {
        return t`Trigger price below mark price`;
      }
    }
  }

  if (isLimitIncreaseOrderType(positionOrder.orderType)) {
    if (typeof window !== 'undefined' && window.localStorage?.getItem('fake-eth-mainnet-leverage') === 'true') {
      // Allow any leverage when fake mode is enabled - this is cosmetic only
    } else {
      if (
        nextPositionValuesForIncrease?.nextLeverage !== undefined &&
        maxAllowedLeverage !== undefined &&
        nextPositionValuesForIncrease.nextLeverage > maxAllowedLeverage
      ) {
        return t`Max leverage: ${(maxAllowedLeverage / BASIS_POINTS_DIVISOR).toFixed(1)}x`;
      }
    }
  }
}
