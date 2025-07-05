import { useEffect, useSyncExternalStore } from "react";
import { toast } from "react-toastify";

import { ETH_MAINNET } from "config/chains";
import { useChainId as useDisplayedChainId } from "lib/chains";
import { getRealChainId } from "lib/chains/getRealChainId";
import useWallet from "lib/wallets/useWallet";

import { INVALID_NETWORK_TOAST_ID, getInvalidNetworkToastContent } from "components/Errors/errorToasts";

const toastSubscribe = (onStoreChange: () => void): (() => void) => {
  const cleanup = toast.onChange(({ id }) => {
    if (id === INVALID_NETWORK_TOAST_ID) {
      onStoreChange();
    }
  });

  return cleanup;
};

const toastGetSnapshot = () => toast.isActive(INVALID_NETWORK_TOAST_ID);

export function useRealChainIdWarning() {
  const { active: isConnected } = useWallet();
  const { chainId: displayedChainId, isConnectedToChainId } = useDisplayedChainId();
  const realChainId = getRealChainId();

  const isActive = useSyncExternalStore(toastSubscribe, toastGetSnapshot);

  useEffect(() => {
    // Suppress warning if user is connected to Ethereum L1 (we're faking L1 experience)
    const isConnectedToEthereumL1 = realChainId === ETH_MAINNET;
    
    if (!isConnectedToChainId && !isActive && isConnected && !isConnectedToEthereumL1) {
      toast.error(getInvalidNetworkToastContent(displayedChainId), {
        toastId: INVALID_NETWORK_TOAST_ID,
        autoClose: false,
        closeButton: false,
        delay: 2000,
      });
    } else if ((isConnectedToChainId || !isConnected || isConnectedToEthereumL1) && isActive) {
      toast.dismiss(INVALID_NETWORK_TOAST_ID);
    }
  }, [displayedChainId, isActive, isConnected, isConnectedToChainId, realChainId]);

  useEffect(() => {
    return () => {
      toast.dismiss(INVALID_NETWORK_TOAST_ID);
    };
  }, []);
}
