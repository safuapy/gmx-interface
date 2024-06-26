import { VersionSwitch } from "components/VersionSwitch/VersionSwitch";
import { getToken, isChartAvailabeForToken } from "config/tokens";
import { selectAvailableChartTokens, selectChartToken } from "context/SyntheticsStateContext/selectors/chartSelectors";
import { selectTradeboxMarketInfo } from "context/SyntheticsStateContext/selectors/tradeboxSelectors";
import { useSelector } from "context/SyntheticsStateContext/utils";

import { use24hPriceDelta } from "domain/synthetics/tokens/use24PriceDelta";

import { Token } from "domain/tokens";
import { useChainId } from "lib/chains";
import { CHART_PERIODS } from "lib/legacy";
import ChartTokenSelector from "../ChartTokenSelector/ChartTokenSelector";
import {
  DailyPriceChangesLabels,
  DailyPriceLabels,
  DailyVolumeLabels,
  MinMaxLabels,
  NetRateLabels,
  OpenInterestLabels,
} from "./TVChartHeaderLabels";

import "./TVChart.scss";

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

  return (
    <div className="ExchangeChart-header">
      <div className="ExchangeChart-info">
        <div className="ExchangeChart-top-inner">
          <ChartTokenSelector selectedToken={selectedTokenOption} options={tokenOptions} />
          <MinMaxLabels chartToken={chartToken} />
          <DailyPriceChangesLabels dayPriceDelta={dayPriceDelta} />
          <DailyPriceLabels dayPriceDelta={dayPriceDelta} chartToken={chartToken} />
          <DailyVolumeLabels chainId={chainId} marketInfo={marketInfo} chartToken={chartToken} />
          <OpenInterestLabels marketInfo={marketInfo} />
          <NetRateLabels marketInfo={marketInfo} />
        </div>
      </div>
      <div className="ExchangeChart-info VersionSwitch-wrapper">
        <VersionSwitch />
      </div>
    </div>
  );
}
