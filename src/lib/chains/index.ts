import { DEFAULT_CHAIN_ID, SUPPORTED_CHAIN_ID, SUPPORTED_CHAIN_IDS } from "config/chains";
import { SELECTED_NETWORK_LOCAL_STORAGE_KEY } from "config/localStorage";
import useWallet from "lib/wallets/useWallet";

export function useChainId(): { chainId: SUPPORTED_CHAIN_ID } {
  let { chainId } = useWallet();

  if (!chainId) {
    const chainIdFromLocalStorage = localStorage.getItem(SELECTED_NETWORK_LOCAL_STORAGE_KEY);
    if (chainIdFromLocalStorage) {
      chainId = parseInt(chainIdFromLocalStorage);
      if (!chainId) {
        // localstorage value is invalid
        localStorage.removeItem(SELECTED_NETWORK_LOCAL_STORAGE_KEY);
      }
    }
  }

  return { chainId: isSupportedChainId(chainId) ? chainId : DEFAULT_CHAIN_ID };
}

function isSupportedChainId(chainId: number | undefined): chainId is SUPPORTED_CHAIN_ID {
  if (!chainId) return false;
  return SUPPORTED_CHAIN_IDS.includes(chainId);
}
