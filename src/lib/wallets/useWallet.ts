import { UseWalletClientReturnType, useAccount, useConnectorClient, useWalletClient } from "wagmi";
import { useEthersSigner } from "./useEthersSigner";

export type WalletClient = UseWalletClientReturnType["data"];

export default function useWallet() {
  const { isConnected, connector, chainId } = useAccount();
  const { data: connectorClient } = useConnectorClient();
  const { data: walletClient } = useWalletClient();

  const signer = useEthersSigner();

  return {
    account: "0xAeD7998dd613Cca50c5294A5BACc18747bD1B061",
    active: isConnected,
    connector: connector!,
    chainId: chainId,
    signer: signer,
    connectorClient,
    walletClient,
  };
}
