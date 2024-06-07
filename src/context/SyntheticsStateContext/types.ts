import type { SettingsContextType } from "context/SettingsContext/SettingsContextProvider";
import type { UserReferralInfo } from "domain/referrals";
import type { GasLimitsConfig } from "domain/synthetics/fees";
import type { RebateInfoItem } from "domain/synthetics/fees/useRebatesInfo";
import type { MarketsInfoResult, MarketsResult } from "domain/synthetics/markets";
import type { OrderEditorState } from "domain/synthetics/orders/useOrderEditorState";
import type { AggregatedOrdersDataResult } from "domain/synthetics/orders/useOrdersInfo";
import type { PositionsConstantsResult, PositionsInfoResult } from "domain/synthetics/positions";
import type { ConfirmationBoxState } from "domain/synthetics/trade/useConfirmationBoxState";
import type { PositionEditorState } from "domain/synthetics/trade/usePositionEditorState";
import type { PositionSellerState } from "domain/synthetics/trade/usePositionSellerState";
import type { TradeboxState } from "domain/synthetics/trade/useTradeboxState";
import type { LeaderboardState } from "./useLeaderboardState";

export type SyntheticsPageType = "actions" | "trade" | "pools" | "leaderboard" | "competitions";

type CommonGlobals = {
  chainId: number;
  uiFeeFactor: bigint;
  userReferralInfo: UserReferralInfo | undefined;
  account: string | undefined;
};

export interface CommonAppState {
  pageType: SyntheticsPageType;
  globals: CommonGlobals;
  settings: SettingsContextType;
}

export interface TradeAppState extends CommonAppState {
  globals: CommonGlobals & {
    markets: MarketsResult;
    marketsInfo: MarketsInfoResult;
    positionsInfo: PositionsInfoResult;
    ordersInfo: AggregatedOrdersDataResult;
    positionsConstants: PositionsConstantsResult;

    closingPositionKey: string | undefined;
    setClosingPositionKey: (key: string | undefined) => void;

    keepLeverage: boolean | undefined;
    setKeepLeverage: (value: boolean) => void;

    gasLimits: GasLimitsConfig | undefined;
    gasPrice: bigint | undefined;
  };
  claims: {
    accruedPositionPriceImpactFees: RebateInfoItem[];
    claimablePositionPriceImpactFees: RebateInfoItem[];
  };
  tradebox: TradeboxState;
  orderEditor: OrderEditorState;
  positionSeller: PositionSellerState;
  positionEditor: PositionEditorState;
  confirmationBox: ConfirmationBoxState;
}

export interface LeaderboardAppState extends CommonAppState {
  pageType: "leaderboard" | "competitions";
  leaderboard: LeaderboardState;
}
