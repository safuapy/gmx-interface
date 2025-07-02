import { Trans } from "@lingui/macro";

import ExternalLink from "components/ExternalLink/ExternalLink";

type BridgingOption = {
  name: string;
  render?: () => JSX.Element;
  generateLink?: (chainId: number) => string;
};

const BRIDGING_OPTIONS: { [symbol: string]: BridgingOption[] } = {
  // No L2 bridging options for Ethereum L1
};

export function getBridgingOptionsForToken(tokenSymbol?: string): BridgingOption[] | undefined {
  if (!tokenSymbol) return;
  return BRIDGING_OPTIONS[tokenSymbol];
}
