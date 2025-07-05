import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { matchPath, useHistory, useLocation } from "react-router-dom";
import { useLocalStorage } from "react-use";

import { REDIRECT_POPUP_TIMESTAMP_KEY, TRADE_LINK_KEY } from "config/localStorage";
import { useChainId } from "lib/chains";
import { useLocalStorageSerializeKey } from "lib/localStorage";

type GlobalContextType = null | {
  tradePageVersion: number;
  setTradePageVersion: (version: number) => void;

  redirectPopupTimestamp: number | undefined;
  setRedirectPopupTimestamp: Dispatch<SetStateAction<number | undefined>>;

  notifyModalOpen: boolean;
  setNotifyModalOpen: (nextState: boolean) => void;
};

const context = createContext<GlobalContextType>(null);

const { Provider } = context;

export const GlobalStateProvider = memo(({ children }: PropsWithChildren<{}>) => {
  const [tradePageVersion, setTradePageVersion] = useTradePageVersion();

  const [notifyModalOpen, setNotifyModalOpen] = useState(false);

  const [redirectPopupTimestamp, setRedirectPopupTimestamp] = useLocalStorage<number | undefined>(
    REDIRECT_POPUP_TIMESTAMP_KEY,
    undefined,
    {
      raw: false,
      deserializer: (val) => {
        if (!val) {
          return undefined;
        }
        const num = parseInt(val);

        if (Number.isNaN(num)) {
          return undefined;
        }

        return num;
      },
      serializer: (val) => (val ? val.toString() : ""),
    }
  );

  const value = useMemo(
    () => ({
      tradePageVersion,
      setTradePageVersion,
      redirectPopupTimestamp,
      setRedirectPopupTimestamp,
      notifyModalOpen,
      setNotifyModalOpen,
    }),
    [
      tradePageVersion,
      setTradePageVersion,
      redirectPopupTimestamp,
      setRedirectPopupTimestamp,
      notifyModalOpen,
      setNotifyModalOpen,
    ]
  );

  return <Provider value={value}>{children}</Provider>;
});

export const useGlobalContext = () => {
  const value = useContext(context);
  if (value === null) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }

  return value;
};

function useTradePageVersion() {
  const { chainId } = useChainId();
  const location = useLocation();
  const history = useHistory();

  const isV2Matched = useMemo(() => matchPath(location.pathname, { path: "/trade/:tradeType?" }), [location.pathname]);
  const isV1Matched = useMemo(() => matchPath(location.pathname, { path: "/v1/:tradeType?" }), [location.pathname]);
  const defaultVersion = 2; // Always default to V2
  const [savedTradePageVersion, setSavedTradePageVersion] = useLocalStorageSerializeKey(
    [chainId, TRADE_LINK_KEY],
    defaultVersion
  );

  const tradePageVersion = 2; // Always use V2, ignore saved version

  // manual switch - always force V2
  const setTradePageVersion = useCallback(
    (version: number) => {
      // Always force V2, ignore the requested version
      setSavedTradePageVersion(2);
      if (isV1Matched) {
        history.replace("/trade");
      }
    },
    [history, setSavedTradePageVersion, isV1Matched]
  );

  // chainId changes -> always redirect to V2
  useEffect(() => {
    if (isV1Matched) {
      history.replace("/trade");
    }
  }, [chainId, history, isV1Matched]);

  return [tradePageVersion, setTradePageVersion] as const;
}
