import { createSelector as createSelectorCommon } from "reselect";
import { EnhancedSelector, createSelectionContext } from "@taskworld.com/rereselect";
import { Selector } from "reselect";
import { OrderOption } from "domain/synthetics/trade/usePositionSellerState";
import { TradeMode, TradeType } from "domain/synthetics/trade/types";
import { LRUCache } from "./LruCache";
import { CommonAppState, LeaderboardAppState, TradeAppState } from "./types";
export { useSyntheticsStateSelector as useSelector } from "./SyntheticsStateContextProvider";

/**
 * @deprecated use createTradeSelector, createLeaderboardSelector, etc  instead
 */
export const createSelectorDeprecated = createSelectorCommon.withTypes<TradeAppState>();

const makeCreateSelector = <T extends CommonAppState>() => {
  const context = createSelectionContext<T>();
  const createSelector = context.makeSelector;
  return createSelector;
};

export const createTradeSelector = makeCreateSelector<TradeAppState>();
export const createLeaderboardSelector = makeCreateSelector<LeaderboardAppState>();

type Arg = boolean | string | undefined | null | number | TradeMode | TradeType | OrderOption | bigint;
type SupportedArg = Arg | Record<string, Arg>;

type CachedSelector<T> = EnhancedSelector<TradeAppState, T> | Selector<TradeAppState, T>;

export function createSelectorFactory<SelectionResult, Args extends SupportedArg[]>(
  factory: (...args: Args) => CachedSelector<SelectionResult>
): (...args: Args) => CachedSelector<SelectionResult> {
  const cache = new LRUCache<CachedSelector<SelectionResult>>(20);

  return (...args: Args) => {
    const key = getKeyForArgs(...args);

    if (cache.has(key)) {
      const selector = cache.get(key);
      if (!selector) throw new Error("Selector is undefined");
      return selector;
    }

    const selector = factory(...args);
    cache.set(key, selector);

    return selector;
  };
}

function getKeyForArgs(...args: SupportedArg[]) {
  return args
    .map((arg) =>
      typeof arg === "object" && arg
        ? Object.entries(arg)
            .map(([k, v]) => `${k}=${v}`)
            .join(";")
        : arg
    )
    .join(",");
}
