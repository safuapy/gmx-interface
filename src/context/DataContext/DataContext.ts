import { Market } from "domain/synthetics/markets";
import { Position } from "domain/synthetics/positions";
import { TokenPrices } from "domain/synthetics/tokens";
import { Token } from "domain/tokens";

type EntityState<TData> = {
  data?: TData;
  error?: string;
  loading: boolean;
};

type TokensState = {
  tokenAddresses: EntityState<string[]>;
  tokensMap: EntityState<Record<string, Token>>;
  tokenPricesMap: EntityState<Record<string, TokenPrices>>;
  tokenBalancesMap: EntityState<Record<string, bigint>>;
  tokenSuppliesMap: EntityState<Record<string, bigint>>;
};

type MarketsState = {
  marketAddresses: string[];
  marketsMap: EntityState<Record<string, Market>>;
  marketsInfoValuesMap: EntityState<Record<string, any>>;
  marketsInfoConfigsMap: EntityState<Record<string, any>>;
};

type PositionsState = {
  positionsKeys: EntityState<string[]>;
  positionsMap: EntityState<Record<string, Position>>;
};

export type DataContextType = {
  data: TokensState & MarketsState & PositionsState & PositionsState;
};

export function useMarketsInfoValuesRequest(chainId: number, params: TokensState) {}
