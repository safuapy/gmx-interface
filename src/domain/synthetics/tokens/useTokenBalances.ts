import { getContract } from "config/contracts";
import { getRealChainId } from "lib/chains/getRealChainId";
import {
  useTokensBalancesUpdates,
  useUpdatedTokensBalances,
} from "context/TokensBalancesContext/TokensBalancesContextProvider";
import { PLACEHOLDER_ACCOUNT } from "lib/legacy";
import { MulticallRequestConfig, useMulticall } from "lib/multicall";
import useWallet from "lib/wallets/useWallet";
import { getV2Tokens, NATIVE_TOKEN_ADDRESS } from "sdk/configs/tokens";

import { TokenBalancesData } from "./types";

type BalancesDataResult = {
  balancesData?: TokenBalancesData;
  error?: Error;
};

export function useTokenBalances(
  chainId: number,
  overrideAccount?: string | undefined,
  overrideTokenList?: {
    address: string;
    isSynthetic?: boolean;
  }[],
  refreshInterval?: number
): BalancesDataResult {
  const { resetTokensBalancesUpdates } = useTokensBalancesUpdates();

  const { account: currentAccount } = useWallet();

  const account = overrideAccount ?? currentAccount;

  // For wallet balances, use the real connected chainId (e.g., Ethereum L1)
  // This ensures we fetch balances from the chain the user is actually connected to
  const realChainId = getRealChainId();
  const balanceChainId = realChainId || chainId;

  const { data, error } = useMulticall(balanceChainId, "useTokenBalances", {
    key: account ? [account, ...(overrideTokenList || []).map((t) => t.address)] : null,

    refreshInterval,

    request: () =>
      (overrideTokenList ?? getV2Tokens(balanceChainId)).reduce((acc, token) => {
        // Skip synthetic tokens
        if (token.isSynthetic) return acc;

        const address = token.address;

        if (address === NATIVE_TOKEN_ADDRESS) {
          acc[address] = {
            contractAddress: getContract(balanceChainId, "Multicall"),
            abiId: "Multicall",
            calls: {
              balance: {
                methodName: "getEthBalance",
                params: [account],
              },
            },
          };
        } else {
          acc[address] = {
            contractAddress: address,
            abiId: "Token",
            calls: {
              balance: {
                methodName: "balanceOf",
                params: [account ?? PLACEHOLDER_ACCOUNT],
              },
            },
          };
        }

        return acc;
      }, {} as MulticallRequestConfig<any>),
    parseResponse: (res) => {
      const result: TokenBalancesData = {};

      Object.keys(res.data).forEach((tokenAddress) => {
        result[tokenAddress] = res.data[tokenAddress].balance.returnValues[0];
      });

      resetTokensBalancesUpdates(Object.keys(result));

      return result;
    },
  });

  const balancesData = useUpdatedTokensBalances(data);

  return {
    balancesData,
    error,
  };
}
