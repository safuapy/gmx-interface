import { JsonRpcProvider } from "@ethersproject/providers";
import {
  ARBITRUM,
  ARBITRUM_GOERLI,
  AVALANCHE,
  AVALANCHE_FUJI,
  FALLBACK_PROVIDERS,
  SUPPORTED_CHAIN_ID,
  getAlchemyWsUrl,
  getFallbackRpcUrl,
  getRpcUrl,
} from "config/chains";
import { Signer, ethers } from "ethers";
import { mustNeverExist } from "lib/types";
import { useEffect, useState } from "react";
import {
  HttpTransport,
  PublicClient,
  WebSocketTransport,
  createPublicClient,
  defineChain,
  http,
  webSocket,
} from "viem";
import { arbitrum, avalanche, avalancheFuji, goerli } from "viem/chains";

const viemChainByChainId: Record<SUPPORTED_CHAIN_ID, ReturnType<typeof defineChain>> = {
  [ARBITRUM]: arbitrum,
  [ARBITRUM_GOERLI]: goerli,
  [AVALANCHE]: avalanche,
  [AVALANCHE_FUJI]: avalancheFuji,
};

export function getProvider(signer: undefined, chainId: number): ethers.providers.StaticJsonRpcProvider;
export function getProvider(signer: Signer, chainId: number): Signer;
export function getProvider(signer: Signer | undefined, chainId: number);
export function getProvider(signer: Signer | undefined, chainId: number) {
  let provider;

  if (signer) {
    return signer;
  }

  provider = getRpcUrl(chainId);

  return new ethers.providers.StaticJsonRpcProvider(
    provider,
    // @ts-ignore incorrect Network param types
    { chainId }
  );
}

type ViemWsPublicClient = PublicClient<WebSocketTransport, typeof viemChainByChainId[SUPPORTED_CHAIN_ID]>;
type ViemHttpClient = PublicClient<HttpTransport, typeof viemChainByChainId[SUPPORTED_CHAIN_ID]>;
export type ViemPublicClient = ViemWsPublicClient | ViemHttpClient;

export function getWsClient(chainId: SUPPORTED_CHAIN_ID): ViemPublicClient {
  const chain = viemChainByChainId[chainId];
  if (chainId === ARBITRUM) {
    return createPublicClient({ transport: webSocket(getAlchemyWsUrl()), chain });
  }

  if (chainId === AVALANCHE) {
    return createPublicClient({
      transport: webSocket("wss://api.avax.network/ext/bc/C/ws"),
      chain,
    });
  }

  if (chainId === ARBITRUM_GOERLI) {
    return createPublicClient({
      transport: webSocket("wss://arb-goerli.g.alchemy.com/v2/cZfd99JyN42V9Clbs_gOvA3GSBZH1-1j"),
      chain,
    });
  }

  if (chainId === AVALANCHE_FUJI) {
    return createPublicClient({
      transport: http(getRpcUrl(AVALANCHE_FUJI)),
      pollingInterval: 2000,
      chain,
    });
  }

  throw mustNeverExist(chainId);
}

export function getFallbackProvider(chainId: SUPPORTED_CHAIN_ID) {
  if (!FALLBACK_PROVIDERS[chainId]) {
    return;
  }

  const url = getFallbackRpcUrl(chainId);

  return createPublicClient({
    transport: http(url),
    chain: viemChainByChainId[chainId],
  });
}

/**
 *
 * @deprecated please don't use this function
 */
export function useJsonRpcProvider(chainId: number) {
  const [provider, setProvider] = useState<JsonRpcProvider>();

  useEffect(() => {
    async function initializeProvider() {
      const rpcUrl = getRpcUrl(chainId);

      if (!rpcUrl) return;

      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

      await provider.ready;

      setProvider(provider);
    }

    initializeProvider();
  }, [chainId]);

  return { provider };
}

export function isWebsocketClient(client: ViemPublicClient | undefined): client is ViemWsPublicClient {
  if (!client) return false;
  return client.transport.type === "webSocket";
}

export async function isSocketInClosedState(client: ViemPublicClient) {
  if (!isWebsocketClient(client)) return false;

  const rpcClient = await client.transport.getRpcClient();
  return (
    rpcClient.socket.readyState === rpcClient.socket.CLOSED || rpcClient.socket.readyState === rpcClient.socket.CLOSING
  );
}

export async function closeWsConnection(client: ViemPublicClient) {
  if (!isWebsocketClient(client)) return false;

  if (await isSocketInClosedState(client)) {
    return;
  }

  const rpcClient = await client.transport.getRpcClient();
  rpcClient.socket.close();
}
