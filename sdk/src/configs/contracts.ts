import { type Address, zeroAddress } from "viem";

import { ETH_MAINNET } from "./chains";

export const CONTRACTS = {
  [ETH_MAINNET]: {
    // TODO: Fill in actual L1 contract addresses after deployment
    Vault: zeroAddress,
    Router: zeroAddress,
    // ... add other contract keys as needed, all set to zeroAddress or placeholder
  },
};

export function getContract(chainId: number, name: string): Address {
  if (!CONTRACTS[chainId]) {
    throw new Error(`Unknown chainId ${chainId}`);
  }

  if (!CONTRACTS[chainId][name]) {
    throw new Error(`Unknown contract "${name}" for chainId ${chainId}`);
  }

  return CONTRACTS[chainId][name];
}
