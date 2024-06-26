import { useMemo } from "react";
import useSWR from "swr";
import { useOracleKeeperFetcher } from "./useOracleKeeperFetcher";

type PriceDeltaResponse = {
  open: number;
  high: number;
  low: number;
  close: number;
  tokenSymbol: string;
};

type DeltaType = {
  deltaPrice: number;
  deltaPercentage: number;
  deltaPercentageStr: string;
};

export function use24hPriceDelta(chainId: number, tokenSymbol?: string) {
  const oracleKeeperFetcher = useOracleKeeperFetcher(chainId);

  const { data } = useSWR<PriceDeltaResponse[]>([chainId, oracleKeeperFetcher.url, "use24PriceDelta"], {
    fetcher: () => oracleKeeperFetcher.fetch24hPrices(),
  });

  const priceDelta: undefined | (PriceDeltaResponse & DeltaType) = useMemo(() => {
    const tokenDelta = data?.find((candle) => candle.tokenSymbol === tokenSymbol);

    if (!tokenDelta) {
      return undefined;
    }

    const deltaPrice = tokenDelta.close - tokenDelta.open;
    const deltaPercentage = (deltaPrice * 100) / tokenDelta.open;
    const deltaPercentageStr =
      deltaPercentage > 0 ? `+${deltaPercentage.toFixed(2)}%` : `${deltaPercentage.toFixed(2)}%`;

    return {
      ...tokenDelta,
      deltaPrice,
      deltaPercentage,
      deltaPercentageStr,
    };
  }, [data, tokenSymbol]);

  return priceDelta;
}
