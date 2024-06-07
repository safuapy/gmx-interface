import { CommonAppState } from "../types";

export const selectAccount = (s: CommonAppState) => s.globals.account;
export const selectUiFeeFactor = (s: CommonAppState) => s.globals.uiFeeFactor;
export const selectUserReferralInfo = (s: CommonAppState) => s.globals.userReferralInfo;
export const selectChainId = (s: CommonAppState) => s.globals.chainId;
