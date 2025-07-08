import { Trans, t } from "@lingui/macro";

import PageTitle from "components/PageTitle/PageTitle";

export function DashboardPageTitle({ tradePageVersion }: { tradePageVersion: number }) {
  return (
    <PageTitle
      title={t`Tokens`}
      subtitle={
        tradePageVersion === 1 ? (
          <>
            <Trans>Market Tokens (MT) are market-specific liquidity tokens for IntelMarkets. Each market has its own MT that earns fees from trading activity.</Trans>
            <br />
            <Trans>Vault Tokens (VT) are the liquidity provider tokens for IntelMarkets vaults. Each VT represents a basket of MT tokens and earns a share of market fees.</Trans>
          </>
        ) : (
          <>
            <Trans>
              INTEL is the utility and governance token. Accrues 30% and 27% of V1 and V2 markets generated fees,
              respectively.
            </Trans>
            <br />
            <Trans>
              GM is the liquidity provider token for IntelMarket V2 markets. Accrues 63% of the V2 markets generated fees.
            </Trans>
          </>
        )
      }
    />
  );
}
