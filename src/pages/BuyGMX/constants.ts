import { ARBITRUM, AVALANCHE, AVALANCHE_FUJI, BOTANIX } from "config/chains";
import { getContract } from "config/contracts";

const ARBITRUM_GMX = getContract(ARBITRUM, "GMX").toLowerCase();
const AVALANCHE_GMX = getContract(AVALANCHE, "GMX").toLowerCase();

type Exchange = {
  name: string;
  icon: string;
  links: { [key: number]: string };
};

export const EXTERNAL_LINKS = {
  [ARBITRUM]: {
    networkWebsite: "https://arbitrum.io/",
    buyGmx: {
      uniswap: `https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${ARBITRUM_GMX}`,
      gmx: `https://intelmarkets.trade/#/trade/swap/?mode=market&from=usdc&to=gmx`,
    },
  },
  [AVALANCHE]: {
    networkWebsite: "https://www.avax.network/",
    buyGmx: {
      traderjoe: `https://traderjoexyz.com/trade?outputCurrency=${AVALANCHE_GMX}`,
    },
  },
  [AVALANCHE_FUJI]: {
    networkWebsite: "https://www.avax.network/",
    buyGmx: {
      traderjoe: `https://traderjoexyz.com/trade?outputCurrency=${AVALANCHE_GMX}`,
    },
  },
  [BOTANIX]: {
    networkWebsite: "https://botanixlabs.com/",
    buyGmx: {
      uniswap: undefined,
    },
  },
};

export const FIAT_GATEWAYS: Exchange[] = [
  {
    name: "Banxa",
    icon: "ic_banxa.svg",
    links: {
      [ARBITRUM]: "https://gmx.banxa.com/?coinType=GMX&fiatType=USD&fiatAmount=500&blockchain=arbitrum",
      [AVALANCHE]: "https://gmx.banxa.com/?coinType=GMX&fiatType=USD&fiatAmount=500&blockchain=avalanche",
    },
  },
  {
    name: "Transak",
    icon: "ic_tansak.svg",
    links: {
      [ARBITRUM]:
        "https://global.transak.com/?apiKey=28a15a9b-d94e-4944-99cc-6aa35b45cc74&networks=arbitrum&defaultCryptoCurrency=GMX&isAutoFillUserData=true&hideMenu=true&isFeeCalculationHidden=true",
    },
  },
];

export const GMX_FROM_ANY_NETWORKS: Exchange[] = [
  {
    name: "Bungee",
    icon: "ic_bungee.png",
    links: {
      [ARBITRUM]: `https://multitx.bungee.exchange/?toChainId=42161&toTokenAddress=${ARBITRUM_GMX}`,
      [AVALANCHE]: `https://multitx.bungee.exchange/?toChainId=43114&toTokenAddress=${AVALANCHE_GMX}`,
    },
  },
];

export const BUY_NATIVE_TOKENS: Exchange[] = [];

export const TRANSFER_EXCHANGES: Exchange[] = [];

export const CENTRALISED_EXCHANGES: Exchange[] = [];

export const DECENTRALISED_AGGRIGATORS: Exchange[] = [];
