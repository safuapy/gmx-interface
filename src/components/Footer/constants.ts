import { t } from "@lingui/macro";

import substackIcon from "img/ic_substack.svg";
import telegramIcon from "img/ic_telegram.svg";
import xIcon from "img/ic_x.svg";

type Link = {
  label: string;
  link: string;
  external?: boolean;
  isAppLink?: boolean;
};

type SocialLink = {
  link: string;
  name: string;
  icon: string;
};

export function getFooterLinks(isHome) {
  const FOOTER_LINKS: { home: Link[]; app: Link[] } = {
    home: [
      { label: t`Terms and Conditions`, link: "/terms-and-conditions" },
      { label: t`Referral Terms`, link: "/referral-terms" },
      { label: t`Media Kit`, link: "https://docs.intelmarkets.trade/docs/community/media-kit", external: true },
      // { label: "Jobs", link: "/jobs", isAppLink: true },
    ],
    app: [
      { label: t`Media Kit`, link: "https://docs.intelmarkets.trade/docs/community/media-kit", external: true },
      { label: t`Charts by TradingView`, link: "https://www.tradingview.com/", external: true },
      // { label: "Jobs", link: "/jobs" },
    ],
  };
  return FOOTER_LINKS[isHome ? "home" : "app"];
}

export const SOCIAL_LINKS = [
  { link: "https://t.me/IntelMarketsOfficial", name: "Telegram", icon: telegramIcon },
  { link: "https://twitter.com/intel_markets", name: "Twitter", icon: xIcon },
];
