import { isDevelopment } from "config/env";
import { WS_LOST_FOCUS_TIMEOUT } from "config/ui";
import { useChainId } from "lib/chains";
import { ViemPublicClient, closeWsConnection, getWsClient, isSocketInClosedState, isWebsocketClient } from "lib/rpc";
import { useHasLostFocus } from "lib/useHasPageLostFocus";
import useWallet from "lib/wallets/useWallet";
import { ReactNode, createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const WS_HEALTH_CHECK_INTERVAL = 1000 * 30;
const WS_RECONNECT_INTERVAL = 1000 * 5;

export type WebsocketContextType = {
  wsClient?: ViemPublicClient;
};

export const WsContext = createContext({} as WebsocketContextType);

export function useWebsocketClient() {
  return useContext(WsContext) as WebsocketContextType;
}

export function WebsocketContextProvider({ children }: { children: ReactNode }) {
  const { active } = useWallet();
  const { chainId } = useChainId();
  const [publicClient, setPublicClient] = useState<ViemPublicClient>();
  const hasLostFocus = useHasLostFocus({ timeout: WS_LOST_FOCUS_TIMEOUT, checkIsTabFocused: true, debugId: "Tab" });
  const initializedTime = useRef<number>();
  const healthCheckTimerId = useRef<any>();

  useEffect(
    function updateProviderEffect() {
      if (!active || hasLostFocus) {
        return;
      }

      const newProvider = getWsClient(chainId);
      setPublicClient(newProvider);

      if (newProvider) {
        initializedTime.current = Date.now();
        // eslint-disable-next-line no-console
        console.log(`ws provider for chain ${chainId} initialized at ${initializedTime.current}`);
      }

      return function cleanup() {
        initializedTime.current = undefined;
        clearTimeout(healthCheckTimerId.current);

        async function close() {
          if (isWebsocketClient(newProvider)) {
            await closeWsConnection(newProvider);
            // eslint-disable-next-line no-console
            console.log(`ws provider for chain ${chainId} disconnected at ${Date.now()}`);
          }
        }

        close();
      };
    },
    [active, chainId, hasLostFocus]
  );

  useEffect(
    function healthCheckEff() {
      if (!active || hasLostFocus || !isWebsocketClient(publicClient)) {
        return;
      }

      async function nextHealthCheck() {
        if (!isWebsocketClient(publicClient)) {
          return;
        }

        // wait ws provider to be connected and avoid too often reconnects
        const isReconnectingIntervalPassed =
          initializedTime.current && Date.now() - initializedTime.current > WS_RECONNECT_INTERVAL;

        if (isDevelopment() && isReconnectingIntervalPassed) {
          const client = await publicClient.transport.getRpcClient();
          // eslint-disable-next-line no-console
          console.log(
            `ws provider health check, state: ${client.socket.readyState}, subs: ${
              [...client.subscriptions.keys()].length
            }`
          );
        }

        if ((await isSocketInClosedState(publicClient)) && isReconnectingIntervalPassed) {
          closeWsConnection(publicClient);
          const nextProvider = getWsClient(chainId);
          setPublicClient(nextProvider);
          initializedTime.current = Date.now();
          // eslint-disable-next-line no-console
          console.log("ws provider health check failed, reconnecting", initializedTime.current);
        } else {
          healthCheckTimerId.current = setTimeout(nextHealthCheck, WS_HEALTH_CHECK_INTERVAL);
        }
      }

      nextHealthCheck();

      return function cleanup() {
        clearTimeout(healthCheckTimerId.current);
      };
    },
    [active, chainId, hasLostFocus, publicClient]
  );

  const state: WebsocketContextType = useMemo(() => {
    return {
      wsClient: publicClient,
    };
  }, [publicClient]);

  return <WsContext.Provider value={state}>{children}</WsContext.Provider>;
}
