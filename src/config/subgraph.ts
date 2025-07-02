import { ETH_MAINNET } from "./chains";

const SUBGRAPH_URLS = {
  common: {
    [ETH_MAINNET]: {
      chainLink: "https://api.thegraph.com/subgraphs/name/deividask/chainlink",
    },
  },
};

export function getSubgraphUrl(
  chainId: number,
  subgraph: "chainLink"
): string | undefined {
  if (chainId === ETH_MAINNET) {
    return SUBGRAPH_URLS.common[ETH_MAINNET]?.[subgraph];
  }
  return undefined;
}
