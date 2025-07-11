import { CSSProperties, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLatest, useLocalStorage, useMedia } from "react-use";

import { TV_SAVE_LOAD_CHARTS_KEY } from "config/localStorage";
import { SUPPORTED_RESOLUTIONS_V1, SUPPORTED_RESOLUTIONS_V2 } from "config/tradingview";
import { useSettings } from "context/SettingsContext/SettingsContextProvider";
import { TokenPrices } from "domain/tokens";
import { DataFeed } from "domain/tradingview/DataFeed";
import { getObjectKeyFromValue, getSymbolName } from "domain/tradingview/utils";
import { useOracleKeeperFetcher } from "lib/oracleKeeperFetcher";
import { isChartAvailableForToken } from "sdk/configs/tokens";

import Loader from "components/Common/Loader";

import { defaultChartProps, disabledFeaturesOnMobile } from "./constants";
import { DynamicLines } from "./DynamicLines";
import { SaveLoadAdapter } from "./SaveLoadAdapter";
import { StaticLines } from "./StaticLines";
import type { StaticChartLine } from "./types";
import type {
  ChartData,
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
  ResolutionString,
} from "../../charting_library";

type Props = {
  chainId: number;
  chartLines: StaticChartLine[];
  period: string;
  setPeriod: (period: string) => void;
  chartToken:
    | ({
        symbol: string;
      } & TokenPrices)
    | { symbol: string };
  supportedResolutions: typeof SUPPORTED_RESOLUTIONS_V1 | typeof SUPPORTED_RESOLUTIONS_V2;
  visualMultiplier?: number;
  setIsCandlesLoaded?: (isCandlesLoaded: boolean) => void;
};

export default function TVChartContainer({
  chartToken,
  chainId,
  chartLines,
  period,
  setPeriod,
  supportedResolutions,
  visualMultiplier,
  setIsCandlesLoaded,
}: Props) {
  const { shouldShowPositionLines } = useSettings();
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const tvWidgetRef = useRef<IChartingLibraryWidget | null>(null);
  const [chartReady, setChartReady] = useState(false);
  const [isChartChangingSymbol, setIsChartChangingSymbol] = useState(false);
  const [chartDataLoading, setChartDataLoading] = useState(true);
  const [tvCharts, setTvCharts] = useLocalStorage<ChartData[] | undefined>(TV_SAVE_LOAD_CHARTS_KEY, []);

  const oracleKeeperFetcher = useOracleKeeperFetcher(chainId);

  const [datafeed, setDatafeed] = useState<DataFeed | null>(null);

  useEffect(() => {
    const newDatafeed = new DataFeed(chainId, oracleKeeperFetcher, 2);
    if (setIsCandlesLoaded) {
      newDatafeed.addEventListener("candlesDisplay.success", (event: Event) => {
        const isFirstDraw = (event as CustomEvent).detail.isFirstTimeLoad;
        if (isFirstDraw) {
          setIsCandlesLoaded(true);
        }
      });
    }
    setDatafeed((prev) => {
      if (prev) {
        prev.destroy();
      }
      return newDatafeed;
    });
  }, [chainId, oracleKeeperFetcher, setIsCandlesLoaded]);

  const isMobile = useMedia("(max-width: 550px)");
  const symbolRef = useRef(chartToken.symbol);

  useEffect(() => {
    if (
      !chartReady ||
      !tvWidgetRef.current ||
      !chartToken.symbol ||
      !isChartAvailableForToken(chainId, chartToken.symbol)
    ) {
      return;
    }

    const newSymbolWithMultiplier = getSymbolName(chartToken.symbol, visualMultiplier);
    const currentSymbolInfo = tvWidgetRef.current?.activeChart().symbolExt();
    const currentSymbolWithMultiplier = currentSymbolInfo
      ? getSymbolName(
          currentSymbolInfo.name,
          currentSymbolInfo.unit_id ? parseInt(currentSymbolInfo.unit_id) : undefined
        )
      : undefined;

    if (newSymbolWithMultiplier !== currentSymbolWithMultiplier) {
      setIsChartChangingSymbol(true);

      tvWidgetRef.current.setSymbol(newSymbolWithMultiplier, tvWidgetRef.current.activeChart().resolution(), () => {
        const priceScale = tvWidgetRef.current?.activeChart().getPanes().at(0)?.getMainSourcePriceScale();
        if (priceScale) {
          priceScale.setAutoScale(true);
        }
        setIsChartChangingSymbol(false);
      });
    }
  }, [chainId, chartReady, chartToken.symbol, visualMultiplier]);

  const lastPeriod = useLatest(period);
  const lastSupportedResolutions = useLatest(supportedResolutions);

  useLayoutEffect(() => {
    if (symbolRef.current) {
      datafeed?.prefetchBars(
        symbolRef.current,
        getObjectKeyFromValue(lastPeriod.current, lastSupportedResolutions.current) as ResolutionString
      );
    }
  }, [datafeed, lastPeriod, lastSupportedResolutions]);

  useEffect(() => {
    if (!datafeed) return;

    const widgetOptions: ChartingLibraryWidgetOptions = {
      debug: false,
      symbol: symbolRef.current && getSymbolName(symbolRef.current, visualMultiplier), // Using ref to avoid unnecessary re-renders on symbol change and still have access to the latest symbol
      datafeed,
      theme: defaultChartProps.theme,
      container: chartContainerRef.current!,
      library_path: defaultChartProps.library_path,
      locale: defaultChartProps.locale,
      loading_screen: defaultChartProps.loading_screen,
      enabled_features: defaultChartProps.enabled_features,
      disabled_features: isMobile
        ? defaultChartProps.disabled_features.concat(disabledFeaturesOnMobile)
        : defaultChartProps.disabled_features,
      client_id: defaultChartProps.client_id,
      user_id: defaultChartProps.user_id,
      fullscreen: defaultChartProps.fullscreen,
      autosize: defaultChartProps.autosize,
      custom_css_url: defaultChartProps.custom_css_url,
      overrides: defaultChartProps.overrides,
      interval: getObjectKeyFromValue(period, supportedResolutions) as ResolutionString,
      favorites: { ...defaultChartProps.favorites, intervals: Object.keys(supportedResolutions) as ResolutionString[] },
      custom_formatters: defaultChartProps.custom_formatters,
      load_last_chart: true,
      auto_save_delay: 1,
      save_load_adapter: new SaveLoadAdapter(tvCharts, setTvCharts, 2),
    };
    tvWidgetRef.current = new window.TradingView.widget(widgetOptions);

    tvWidgetRef.current!.onChartReady(function () {
      setChartReady(true);

      const savedPeriod = tvWidgetRef.current?.activeChart().resolution();
      const preferredPeriod = getObjectKeyFromValue(period, supportedResolutions) as ResolutionString;

      if (savedPeriod && savedPeriod !== preferredPeriod) {
        tvWidgetRef.current?.activeChart().setResolution(preferredPeriod);
      }

      tvWidgetRef.current
        ?.activeChart()
        .onIntervalChanged()
        .subscribe(null, (interval) => {
          if (supportedResolutions[interval]) {
            const period = supportedResolutions[interval];
            setPeriod(period);
            tvWidgetRef.current?.saveChartToServer(undefined, undefined, {
              chartName: `gmx-chart-v2`,
            });

            const priceScale = tvWidgetRef.current?.activeChart().getPanes().at(0)?.getMainSourcePriceScale();
            if (priceScale) {
              priceScale.setAutoScale(true);
            }
          }
        });

      tvWidgetRef.current?.subscribe("onAutoSaveNeeded", () => {
        tvWidgetRef.current?.saveChartToServer(undefined, undefined, {
          chartName: `gmx-chart-v2`,
        });
      });

      tvWidgetRef.current?.activeChart().dataReady(() => {
        setChartDataLoading(false);
      });
    });

    return () => {
      if (tvWidgetRef.current) {
        tvWidgetRef.current.remove();
        tvWidgetRef.current = null;
        setChartReady(false);
        setChartDataLoading(true);
      }
    };
    // We don't want to re-initialize the chart when the symbol changes. This will make the chart flicker.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, datafeed]);

  const style = useMemo<CSSProperties>(
    () => ({ visibility: !chartDataLoading ? "visible" : "hidden" }),
    [chartDataLoading]
  );

  return (
    <div className="ExchangeChart-error">
      {chartDataLoading && <Loader />}
      <div style={style} ref={chartContainerRef} className="ExchangeChart-bottom-content" />
      {shouldShowPositionLines && chartReady && !isChartChangingSymbol && (
        <>
          <StaticLines tvWidgetRef={tvWidgetRef} chartLines={chartLines} />
          <DynamicLines isMobile={isMobile} tvWidgetRef={tvWidgetRef} />
        </>
      )}
    </div>
  );
}
