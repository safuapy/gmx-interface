import { Trans, t } from "@lingui/macro";
import { useMemo } from "react";

import { ARBITRUM, AVALANCHE } from "config/chains";
import { USD_DECIMALS } from "config/factors";
import { getIcons } from "config/icons";
import { GMX_PRICE_DECIMALS } from "config/ui";
import { useTotalGmxStaked } from "domain/legacy";
import { GMX_DECIMALS } from "lib/legacy";
import { expandDecimals, formatAmount, formatAmountHuman } from "lib/numbers";
import { sumBigInts } from "lib/sumBigInts";
import { bigMath } from "sdk/utils/bigmath";

import { AmountWithUsdHuman } from "components/AmountWithUsd/AmountWithUsd";
import InteractivePieChart from "components/InteractivePieChart/InteractivePieChart";
import StatsTooltipRow from "components/StatsTooltip/StatsTooltipRow";
import TooltipComponent from "components/Tooltip/Tooltip";

import AssetDropdown from "./AssetDropdown";

export function GmxCard({
  chainId,
  gmxPrice,
  gmxPriceFromArbitrum,
  gmxPriceFromAvalanche,
  totalGmxSupply,
  gmxMarketCap,
  totalGmxInLiquidity,
}: {
  chainId: number;
  gmxPrice: bigint | undefined;
  gmxPriceFromArbitrum: bigint | undefined;
  gmxPriceFromAvalanche: bigint | undefined;
  totalGmxSupply: bigint | undefined;
  gmxMarketCap: bigint | undefined;
  totalGmxInLiquidity: bigint;
}) {
  const currentIcons = getIcons(chainId)!;

  let { [AVALANCHE]: stakedGmxAvalanche, [ARBITRUM]: stakedGmxArbitrum, total: totalStakedGmx } = useTotalGmxStaked();

  const stakedGmxArbitrumUsd =
    gmxPriceFromArbitrum !== undefined && stakedGmxArbitrum !== undefined
      ? bigMath.mulDiv(stakedGmxArbitrum, gmxPriceFromArbitrum, expandDecimals(1, GMX_DECIMALS))
      : undefined;
  const stakedGmxAvalancheUsd =
    gmxPriceFromAvalanche !== undefined && stakedGmxAvalanche !== undefined
      ? bigMath.mulDiv(stakedGmxAvalanche, gmxPriceFromAvalanche, expandDecimals(1, GMX_DECIMALS))
      : undefined;
  const totalStakedGmxUsd = sumBigInts(stakedGmxArbitrumUsd, stakedGmxAvalancheUsd);

  let stakedPercent = 0;

  if (totalGmxSupply !== undefined && totalGmxSupply !== 0n && totalStakedGmx !== 0n) {
    stakedPercent = Number(bigMath.mulDiv(totalStakedGmx, 100n, totalGmxSupply));
  }

  let liquidityPercent = 0;

  if (totalGmxSupply !== undefined && totalGmxSupply !== 0n && totalGmxInLiquidity !== undefined) {
    liquidityPercent = Number(bigMath.mulDiv(totalGmxInLiquidity, 100n, totalGmxSupply));
  }

  let notStakedPercent = 100 - stakedPercent - liquidityPercent;

  const gmxDistributionData = useMemo(() => {
    let arr = [
      {
        name: t`staked`,
        value: stakedPercent,
        color: "#4353fa",
      },
      {
        name: t`in liquidity`,
        value: liquidityPercent,
        color: "#0598fa",
      },
      {
        name: t`not staked`,
        value: notStakedPercent,
        color: "#5c0af5",
      },
    ];

    return arr;
  }, [liquidityPercent, notStakedPercent, stakedPercent]);

  const formattedTotalStakedGmxUsd = formatAmountHuman(totalStakedGmxUsd, USD_DECIMALS, true, 2);

  return (
    <div className="App-card">
      <div className="stats-block">
        <div className="App-card-title">
          <div className="App-card-title-mark">
            <div className="App-card-title-mark-icon">
              <img src={currentIcons.gmx} width="40" alt="GMX Token Icon" />
            </div>
            <div className="App-card-title-mark-info">
              <div className="App-card-title-mark-title">INTEL</div>
              <div className="App-card-title-mark-subtitle">INTEL</div>
            </div>
            <div>
              <AssetDropdown assetSymbol="GMX" />
            </div>
          </div>
        </div>
        <div className="App-card-divider"></div>
        <div className="App-card-content">
          <div className="App-card-row">
            <div className="label">
              <Trans>Price</Trans>
            </div>
            <div>
              {gmxPrice === undefined || gmxPrice === 0n ? (
                "..."
              ) : (
                <TooltipComponent
                  position="bottom-end"
                  className="whitespace-nowrap"
                  handle={"$" + formatAmount(gmxPrice, USD_DECIMALS, GMX_PRICE_DECIMALS, true)}
                  content={
                    <>
                      <StatsTooltipRow
                        label={t`Price on Arbitrum`}
                        value={formatAmount(gmxPriceFromArbitrum, USD_DECIMALS, GMX_PRICE_DECIMALS, true)}
                        showDollar={true}
                      />
                      <StatsTooltipRow
                        label={t`Price on Avalanche`}
                        value={formatAmount(gmxPriceFromAvalanche, USD_DECIMALS, GMX_PRICE_DECIMALS, true)}
                        showDollar={true}
                      />
                    </>
                  }
                />
              )}
            </div>
          </div>
          <div className="App-card-row">
            <div className="label">
              <Trans>Total Supply</Trans>
            </div>
            <div>
              <TooltipComponent
                position="bottom-end"
                handle={formatAmountHuman(totalGmxSupply, GMX_DECIMALS, false, 2)}
                content={t`Total circulating supply of GMX tokens.`}
              />
            </div>
          </div>
          <div className="App-card-row">
            <div className="label">
              <Trans>Total Staked</Trans>
            </div>
            <div>
              <TooltipComponent
                position="bottom-end"
                tooltipClassName="!max-w-[450px]"
                handle={formattedTotalStakedGmxUsd}
                content={
                  <>
                    <StatsTooltipRow
                      label={t`Staked on Arbitrum`}
                      value={
                        <AmountWithUsdHuman
                          amount={stakedGmxArbitrum}
                          usd={stakedGmxArbitrumUsd}
                          decimals={GMX_DECIMALS}
                          symbol="GMX"
                        />
                      }
                      showDollar={false}
                    />
                    <StatsTooltipRow
                      label={t`Staked on Avalanche`}
                      value={
                        <AmountWithUsdHuman
                          amount={stakedGmxAvalanche}
                          usd={stakedGmxAvalancheUsd}
                          decimals={GMX_DECIMALS}
                          symbol="GMX"
                        />
                      }
                      showDollar={false}
                    />
                    <div className="!my-8 h-1 bg-gray-800" />
                    <StatsTooltipRow
                      label={t`Total`}
                      value={
                        <AmountWithUsdHuman
                          amount={totalStakedGmx}
                          usd={totalStakedGmxUsd}
                          decimals={GMX_DECIMALS}
                          symbol="GMX"
                        />
                      }
                      showDollar={false}
                    />
                  </>
                }
              />
            </div>
          </div>
          <div className="App-card-row">
            <div className="label">
              <Trans>Market Cap</Trans>
            </div>
            <div>{formatAmountHuman(gmxMarketCap, USD_DECIMALS, true, 2)}</div>
          </div>
        </div>
      </div>
      <InteractivePieChart data={gmxDistributionData} label={t`Distribution`} />
    </div>
  );
}
