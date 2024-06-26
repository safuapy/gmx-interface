import { useMemo } from "react";
import { Trans } from "@lingui/macro";
import cx from "classnames";

import { CHART_PERIODS } from "lib/legacy";
import { formatRatePercentage, formatUsd, numberWithCommas } from "lib/numbers";

import { Token } from "domain/tokens";
import { TokenData, convertToTokenAmount } from "domain/synthetics/tokens";
import { MarketInfo } from "domain/synthetics/markets";
import { getBorrowingFactorPerPeriod, getFundingFactorPerPeriod } from "domain/synthetics/fees";
import { use24hVolumeUsd } from "domain/synthetics/tokens/use24Volume";
import { use24hPriceDelta } from "domain/synthetics/tokens/use24PriceDelta";

import TooltipWithPortal from "components/Tooltip/TooltipWithPortal";

import { TVChartHeaderValue as Value } from "./TVChartHeaderValue";
import MarketNetFee from "../MarketNetFee/MarketNetFee";

import { formatAmount } from "../../../lib/numbers";

export function MinMaxLabels({ chartToken }: { chartToken: TokenData | undefined }) {
  return (
    <div className="Chart-min-max-price">
      <div className="ExchangeChart-main-price">
        {formatUsd(chartToken?.prices?.maxPrice, {
          displayDecimals: chartToken?.priceDecimals,
        }) || "..."}
      </div>
      <div className="ExchangeChart-info-label">
        {formatUsd(chartToken?.prices?.minPrice, {
          displayDecimals: chartToken?.priceDecimals,
        }) || "..."}
      </div>
    </div>
  );
}

interface DailyPriceChangesLabelsProps {
  dayPriceDelta: ReturnType<typeof use24hPriceDelta>;
}

export function DailyPriceChangesLabels({ dayPriceDelta }: DailyPriceChangesLabelsProps) {
  const deltaClassName = useMemo(() => {
    return cx({
      positive: dayPriceDelta?.deltaPercentage && dayPriceDelta?.deltaPercentage > 0,
      negative: dayPriceDelta?.deltaPercentage && dayPriceDelta?.deltaPercentage < 0,
    });
  }, [dayPriceDelta]);

  const deltaPrefixText = useMemo(() => {
    return dayPriceDelta?.deltaPercentage ? dayPriceDelta?.deltaPrice.toFixed(2) : "-";
  }, [dayPriceDelta]);

  return (
    <div className="Chart-24h-change">
      <div className="ExchangeChart-info-label">
        <Trans>24h Change</Trans>
      </div>
      <div className="whitespace-nowrap">
        <span className="ExchangeChart-info-label">
          <Trans>Price:</Trans>
        </span>{" "}
        <Value className={deltaClassName}>{deltaPrefixText}</Value>
      </div>
      <div className="whitespace-nowrap">
        <span className="ExchangeChart-info-label">
          <Trans>Price %:</Trans>
        </span>{" "}
        <Value className={deltaClassName}>{dayPriceDelta?.deltaPercentageStr || "-"}</Value>
      </div>
    </div>
  );
}

export interface DailyPriceLabelsProps {
  dayPriceDelta: ReturnType<typeof use24hPriceDelta>;
  chartToken: Token | undefined;
}

export function DailyPriceLabels({ dayPriceDelta, chartToken }: DailyPriceLabelsProps) {
  return (
    <div className="ExchangeChart-additional-info ExchangeChart-24h-price">
      <div className="ExchangeChart-info-label">24h Price</div>
      <div>
        <span className="ExchangeChart-info-label">High: </span>
        <Value>
          {dayPriceDelta?.high ? numberWithCommas(dayPriceDelta.high.toFixed(chartToken?.priceDecimals || 2)) : "-"}
        </Value>
      </div>
      <div>
        <span className="ExchangeChart-info-label">Low: </span>
        <Value>
          {dayPriceDelta?.low ? numberWithCommas(dayPriceDelta?.low.toFixed(chartToken?.priceDecimals || 2)) : "-"}
        </Value>
      </div>
    </div>
  );
}

export interface DailyVolumeLabelsProps {
  chainId: number;
  marketInfo: MarketInfo | undefined;
  chartToken: TokenData | undefined;
}

export function DailyVolumeLabels({ chainId, marketInfo, chartToken }: DailyVolumeLabelsProps) {
  const dailyVolumeUsd = use24hVolumeUsd(chainId, marketInfo?.indexTokenAddress);

  const avgPrice = marketInfo
    ? (marketInfo.indexToken.prices.maxPrice + marketInfo.indexToken.prices.minPrice) / 2n
    : 1n;

  const volumeInToken =
    dailyVolumeUsd !== null && marketInfo
      ? convertToTokenAmount(dailyVolumeUsd, marketInfo.indexToken.decimals, avgPrice)
      : null;

  return (
    <div className="ExchangeChart-additional-info ExchangeChart-24h-volume">
      <div className="ExchangeChart-additional-info">
        <div className="ExchangeChart-info-label">24h Volume</div>
        <div>
          <span className="ExchangeChart-info-label">USD: </span>
          {dailyVolumeUsd !== null ? <Value>{formatUsd(dailyVolumeUsd, { displayDecimals: 2 })}</Value> : "-"}
        </div>
        <div>
          <span className="ExchangeChart-info-label">{chartToken?.symbol}: </span>
          {volumeInToken !== null ? (
            <Value>{formatAmount(volumeInToken, marketInfo!.indexToken.decimals, 2)}</Value>
          ) : (
            "-"
          )}
        </div>
      </div>
    </div>
  );
}

export function OpenInterestLabels({ marketInfo }: { marketInfo?: MarketInfo }) {
  const longInterest = useMemo(() => {
    if (!marketInfo) {
      return "-";
    }

    return formatUsd(marketInfo.longInterestUsd, { displayDecimals: 0 });
  }, [marketInfo]);

  const shortInterest = useMemo(() => {
    if (!marketInfo) {
      return "-";
    }

    return formatUsd(marketInfo.shortInterestUsd, { displayDecimals: 0 });
  }, [marketInfo]);

  return (
    <div className="ExchangeChart-additional-info ExchangeChart-open-interest">
      <div className="ExchangeChart-additional-info">
        <div className="ExchangeChart-info-label">
          <Trans>Open Interest</Trans>
        </div>
        <div className="whitespace-nowrap">
          <span className="ExchangeChart-info-label">
            <Trans>Long</Trans>:
          </span>{" "}
          <Value>{longInterest}</Value>
        </div>
        <div className="whitespace-nowrap">
          <span className="ExchangeChart-info-label">
            <Trans>Short</Trans>:
          </span>{" "}
          <Value>{shortInterest}</Value>
        </div>
      </div>
    </div>
  );
}

export function NetRateLabels({ marketInfo }: { marketInfo?: MarketInfo }) {
  const data = useMemo(() => {
    if (!marketInfo) {
      return null;
    }

    const borrowingRateLong = -getBorrowingFactorPerPeriod(marketInfo, true, CHART_PERIODS["1h"]);
    const borrowingRateShort = -getBorrowingFactorPerPeriod(marketInfo, false, CHART_PERIODS["1h"]);
    const fundingRateLong = getFundingFactorPerPeriod(marketInfo, true, CHART_PERIODS["1h"]);
    const fundingRateShort = getFundingFactorPerPeriod(marketInfo, false, CHART_PERIODS["1h"]);

    return {
      borrowingRateLong,
      borrowingRateShort,
      fundingRateLong,
      fundingRateShort,
    };
  }, [marketInfo]);

  const netFeeLong1hText = useMemo(() => {
    if (!data) {
      return "-";
    }
    const netFeeLong1h = data.borrowingRateLong + data.fundingRateLong;

    return formatRatePercentage(netFeeLong1h);
  }, [data]);

  const netFeeShort1hText = useMemo(() => {
    if (!data) {
      return "-";
    }

    const netFeeShort1h = data.borrowingRateShort + data.fundingRateShort;

    return formatRatePercentage(netFeeShort1h);
  }, [data]);

  const netFeeLongs = useMemo(() => {
    if (!data) {
      return "-";
    }

    return (
      <MarketNetFee borrowRateHourly={data.borrowingRateLong} fundingRateHourly={data.fundingRateLong} isLong={true} />
    );
  }, [data]);

  const netFeeShorts = useMemo(() => {
    if (!data) {
      return "-";
    }

    return (
      <MarketNetFee
        borrowRateHourly={data.borrowingRateShort}
        fundingRateHourly={data.fundingRateShort}
        isLong={false}
      />
    );
  }, [data]);

  return (
    <div className="ExchangeChart-additional-info ExchangeChart-net-rate">
      <div className="ExchangeChart-additional-info">
        <div className="ExchangeChart-info-label">
          <Trans>Net Rate / 1h</Trans>
        </div>
        <div className="whitespace-nowrap">
          <span className="ExchangeChart-info-label">
            <Trans>Long</Trans>:{" "}
          </span>{" "}
          <TooltipWithPortal
            portalClassName="MarketList-netfee-tooltip"
            handle={<Value>{netFeeLong1hText}</Value>}
            maxAllowedWidth={510}
            position="bottom-end"
            renderContent={() => netFeeLongs}
          />
        </div>
        <div className="whitespace-nowrap">
          <span className="ExchangeChart-info-label">
            <Trans>Short</Trans>:{" "}
          </span>{" "}
          <TooltipWithPortal
            portalClassName="MarketList-netfee-tooltip"
            handle={<Value>{netFeeShort1hText}</Value>}
            maxAllowedWidth={510}
            position="bottom-end"
            renderContent={() => netFeeShorts}
          />
        </div>
      </div>
    </div>
  );
}
