import { watchAccount } from "@wagmi/core";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { DEFAULT_CHAIN_ID, isSupportedChain, ETH_MAINNET, ARBITRUM } from "config/chains";
import { isDevelopment } from "config/env";
import { SELECTED_NETWORK_LOCAL_STORAGE_KEY } from "config/localStorage";
import { getRainbowKitConfig } from "lib/wallets/rainbowKitConfig";

/**
 * This returns chainId for contract operations. When connected to ETH_MAINNET, 
 * it returns ARBITRUM for contracts (fake L1 experience) but provides walletChainId 
 * for UI display. Returns default chainId if chainId is not supported or not found.
 */
export function useChainId() {
  let { chainId: unsanitizedChainId } = useAccount();

  const [displayedChainId, setDisplayedChainId] = useState(unsanitizedChainId ?? DEFAULT_CHAIN_ID);

  const chainIdFromLocalStorage = parseInt(localStorage.getItem(SELECTED_NETWORK_LOCAL_STORAGE_KEY) || "");

  const currentChainIdIsSupported = unsanitizedChainId && isSupportedChain(unsanitizedChainId, isDevelopment());
  const localStorageChainIdIsSupported =
    chainIdFromLocalStorage && isSupportedChain(chainIdFromLocalStorage, isDevelopment());

  const mustChangeChainId = !currentChainIdIsSupported || !unsanitizedChainId;

  useEffect(() => {
    if (currentChainIdIsSupported) {
      setDisplayedChainId(unsanitizedChainId);
      return;
    }
    if (localStorageChainIdIsSupported) {
      setDisplayedChainId(chainIdFromLocalStorage);
      return;
    }

    setDisplayedChainId(DEFAULT_CHAIN_ID);
  }, [unsanitizedChainId, chainIdFromLocalStorage, currentChainIdIsSupported, localStorageChainIdIsSupported]);

  useEffect(() => {
    if (mustChangeChainId) {
      if (localStorageChainIdIsSupported) {
        setDisplayedChainId(chainIdFromLocalStorage);
      } else {
        setDisplayedChainId(DEFAULT_CHAIN_ID);
        localStorage.removeItem(SELECTED_NETWORK_LOCAL_STORAGE_KEY);
      }
    }
  }, [chainIdFromLocalStorage, localStorageChainIdIsSupported, mustChangeChainId]);

  useEffect(() => {
    const unsubscribe = watchAccount(getRainbowKitConfig(), {
      onChange: (account) => {
        if (!account.chainId) return;
        if (!isSupportedChain(account.chainId, isDevelopment())) return;

        setDisplayedChainId(account.chainId);
        localStorage.setItem(SELECTED_NETWORK_LOCAL_STORAGE_KEY, account.chainId.toString());
      },
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (mustChangeChainId) {
    if (localStorageChainIdIsSupported) {
      // For fake L1: if local storage shows ETH_MAINNET, use ARBITRUM for contracts
      const contractChainId = chainIdFromLocalStorage === ETH_MAINNET ? ARBITRUM : chainIdFromLocalStorage;
      return { chainId: contractChainId, walletChainId: chainIdFromLocalStorage };
    }

    return { chainId: DEFAULT_CHAIN_ID };
  }

  // For fake L1: if connected to ETH_MAINNET, use ARBITRUM for contracts but keep ETH_MAINNET for wallet display
  const contractChainId = displayedChainId === ETH_MAINNET ? ARBITRUM : displayedChainId;
  return { 
    chainId: contractChainId, 
    walletChainId: displayedChainId,
    isConnectedToChainId: displayedChainId === unsanitizedChainId 
  };
}
