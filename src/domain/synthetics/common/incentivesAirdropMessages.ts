import { msg } from "@lingui/macro";

export const INCENTIVE_TYPE_MAP = {
  1001: msg`GM Airdrop`,
  1002: msg`GLP to GM Airdrop`,
  1003: msg`TRADING Airdrop`,
  1004: msg`STIP.b LP incentives`,
  1005: msg`STIP.b trading incentives`,
  1100: msg`Avalanche LP incentives`,
  1101: msg`Avalanche trading incentives`,
};

export const INCENTIVE_TOOLTIP_MAP = {
  2001: { link: "/competitions/march_13-20_2024", text: msg`EIP-4844, 13-20 Mar` },
  2002: { link: "/competitions/march_20-27_2024", text: msg`EIP-4844, 20-27 Mar` },
};
