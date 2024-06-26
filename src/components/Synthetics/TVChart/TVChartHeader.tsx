import { Trans } from "@lingui/macro";
import cx from "classnames";
import { VersionSwitch } from "components/VersionSwitch/VersionSwitch";
import { getToken, isChartAvailabeForToken } from "config/tokens";
import { selectAvailableChartTokens, selectChartToken } from "context/SyntheticsStateContext/selectors/chartSelectors";
import { selectTradeboxMarketInfo } from "context/SyntheticsStateContext/selectors/tradeboxSelectors";
import { useSelector } from "context/SyntheticsStateContext/utils";

import { use24hPriceDelta } from "domain/synthetics/tokens/use24PriceDelta";

import { Token } from "domain/tokens";
import { useChainId } from "lib/chains";
import { CHART_PERIODS } from "lib/legacy";
import { formatRatePercentage, formatUsd, numberWithCommas } from "lib/numbers";
import { useMemo } from "react";
import ChartTokenSelector from "../ChartTokenSelector/ChartTokenSelector";
import "./TVChart.scss";
import { MarketInfo } from "domain/synthetics/markets";
import { getBorrowingFactorPerPeriod, getFundingFactorPerPeriod } from "domain/synthetics/fees";
import TooltipWithPortal from "components/Tooltip/TooltipWithPortal";
import MarketNetFee from "../MarketNetFee/MarketNetFee";
import { TVChartHeaderValue as Value } from "./TVChartHeaderValue";
import { use24hVolumeUsd } from "domain/synthetics/tokens/use24Volume";
import { formatAmount } from "../../../lib/numbers";
import { convertToTokenAmount } from "domain/synthetics/tokens";

const DEFAULT_PERIOD = "5m";

interface TVChartHeaderProps {
  period: string | undefined;
}

export function TVChartHeader({ period }: TVChartHeaderProps) {
  const chartToken = useSelector(selectChartToken);
  const availableTokens = useSelector(selectAvailableChartTokens);

  const { chainId } = useChainId();
  const chartTokenAddress = chartToken?.address;

  if (!period || !(period in CHART_PERIODS)) {
    period = DEFAULT_PERIOD;
  }

  const tokenOptions: Token[] | undefined = availableTokens?.filter((token) =>
    isChartAvailabeForToken(chainId, token.symbol)
  );

  const selectedTokenOption = chartTokenAddress ? getToken(chainId, chartTokenAddress) : undefined;

  const dayPriceDelta = use24hPriceDelta(chainId, chartToken?.symbol);
  const marketInfo = useSelector(selectTradeboxMarketInfo);
  const dailyVolumeUsd = use24hVolumeUsd(chainId, marketInfo?.indexTokenAddress);

  return (
    <div className="ExchangeChart-header">
      <div className="ExchangeChart-info">
        <div className="ExchangeChart-top-inner">
          <ChartTokenSelector selectedToken={selectedTokenOption} options={tokenOptions} />
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

          <div className="Chart-24h-change">
            <div className="ExchangeChart-info-label">24h Change</div>
            <div
              className={cx({
                positive: dayPriceDelta?.deltaPercentage && dayPriceDelta?.deltaPercentage > 0,
                negative: dayPriceDelta?.deltaPercentage && dayPriceDelta?.deltaPercentage < 0,
              })}
            >
              {dayPriceDelta?.deltaPercentageStr || "-"}
            </div>
            <div
              className={cx({
                positive: dayPriceDelta?.deltaPrice && dayPriceDelta?.deltaPrice > 0,
                negative: dayPriceDelta?.deltaPrice && dayPriceDelta?.deltaPrice < 0,
              })}
            >
              {dayPriceDelta?.deltaPrice.toFixed(2) || "-"}
            </div>
          </div>
          <div className="ExchangeChart-additional-info">
            <div className="ExchangeChart-info-label">24h Price</div>
            <div>
              <span className="ExchangeChart-info-label">High: </span>
              <Value as="span">
                {dayPriceDelta?.high
                  ? numberWithCommas(dayPriceDelta.high.toFixed(chartToken?.priceDecimals || 2))
                  : "-"}
              </Value>
            </div>
            <div>
              <span className="ExchangeChart-info-label">Low: </span>
              <Value as="span">
                {dayPriceDelta?.low
                  ? numberWithCommas(dayPriceDelta?.low.toFixed(chartToken?.priceDecimals || 2))
                  : "-"}
              </Value>
            </div>
          </div>
          <DailyVolumeLabels dailyVolumeUsd={dailyVolumeUsd} marketInfo={marketInfo} />
          <InterestLabels marketInfo={marketInfo} />
          <NetRate marketInfo={marketInfo} />
        </div>
      </div>
      <div className="ExchangeChart-info VersionSwitch-wrapper">
        <VersionSwitch />
      </div>
    </div>
  );
}

function DailyVolumeLabels({ dailyVolumeUsd, marketInfo }: { dailyVolumeUsd: bigint | null; marketInfo?: MarketInfo }) {
  const avgPrice = marketInfo
    ? (marketInfo.indexToken.prices.maxPrice + marketInfo.indexToken.prices.minPrice) / 2n
    : 1n;

  const volumeInToken =
    dailyVolumeUsd !== null && marketInfo
      ? convertToTokenAmount(dailyVolumeUsd, marketInfo.indexToken.decimals, avgPrice)
      : null;

  return (
    <div className="ExchangeChart-additional-info Chart-24h-low">
      <div className="ExchangeChart-additional-info">
        <div className="ExchangeChart-info-label">24h Volume</div>
        {dailyVolumeUsd !== null ? (
          <div>
            <span className="ExchangeChart-info-label">USD: </span>
            <Value as="span">{formatUsd(dailyVolumeUsd, { displayDecimals: 2 })}</Value>
          </div>
        ) : (
          "-"
        )}
        {volumeInToken === null ? (
          "-"
        ) : (
          <div>
            <span className="ExchangeChart-info-label">{marketInfo?.indexToken.symbol}: </span>
            <Value as="span">{formatAmount(volumeInToken, marketInfo!.indexToken.decimals, 2)}</Value>
          </div>
        )}
      </div>
    </div>
  );
}

function InterestLabels({ marketInfo }: { marketInfo?: MarketInfo }) {
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
    <div className="ExchangeChart-additional-info Chart-24h-low">
      <div className="ExchangeChart-additional-info">
        <div className="ExchangeChart-info-label">
          <Trans>Open Interest</Trans>
        </div>
        <div className="whitespace-nowrap">
          <span className="ExchangeChart-info-label">
            <Trans>Long</Trans>:
          </span>{" "}
          <Value as="span">{longInterest}</Value>
        </div>
        <div className="whitespace-nowrap">
          <span className="ExchangeChart-info-label">
            <Trans>Short</Trans>:
          </span>{" "}
          <Value as="span">{shortInterest}</Value>
        </div>
      </div>
    </div>
  );
}

function NetRate({ marketInfo }: { marketInfo?: MarketInfo }) {
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
    <div className="ExchangeChart-additional-info Chart-24h-low">
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
            handle={<Value as="span">{netFeeLong1hText}</Value>}
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
            handle={<Value as="span">{netFeeShort1hText}</Value>}
            maxAllowedWidth={510}
            position="bottom-end"
            renderContent={() => netFeeShorts}
          />
        </div>
      </div>
    </div>
  );
}
