import { Trans, t } from "@lingui/macro";

import PageTitle from "components/PageTitle/PageTitle";

export function DashboardPageTitle({ tradePageVersion }: { tradePageVersion: number }) {
  return (
    <PageTitle
      title={t`Tokens`}
      subtitle={
        tradePageVersion === 1 ? (
          <>
            <Trans>
              INTEL is the utility and governance token. Accrues 30% and 27% of V1 and V2 markets generated fees,
              respectively.
            </Trans>
            <br />
            <Trans>
              GLP is the liquidity provider token for IntelMarket V1 markets. Accrues 70% of the V1 markets generated fees.
            </Trans>
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
