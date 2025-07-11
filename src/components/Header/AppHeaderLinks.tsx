import { Trans } from "@lingui/macro";
import { useCallback } from "react";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

import { isHomeSite } from "lib/legacy";
import { useNotifyModalState } from "lib/useNotifyModalState";
import { userAnalytics } from "lib/userAnalytics";
import { ReferralTopMenuClickEvent } from "lib/userAnalytics/types";

import ExternalLink from "components/ExternalLink/ExternalLink";

import logoImg from "img/logo_INTEL.svg";

import { HeaderLink } from "./HeaderLink";

import "./Header.scss";

type Props = {
  small?: boolean;
  clickCloseIcon?: () => void;
  openSettings?: () => void;
  showRedirectModal: (to: string) => void;
};

export function AppHeaderLinks({ small, openSettings, clickCloseIcon, showRedirectModal }: Props) {
  const { openNotifyModal } = useNotifyModalState();
  const isLeaderboardActive = useCallback(
    (match, location) => Boolean(match) || location.pathname.startsWith("/competitions"),
    []
  );

  return (
    <div className="App-header-links">
      {small && (
        <div className="App-header-links-header">
          <Link className="App-header-link-main" to="/">
            <img src={logoImg} alt="GMX Logo" />
          </Link>
          <div
            className="App-header-menu-icon-block max-w-[450px]:mr-12 mr-8 !border-0"
            onClick={() => clickCloseIcon && clickCloseIcon()}
          >
            <FiX className="App-header-menu-icon" />
          </div>
        </div>
      )}
      <div className="App-header-link-container">
        <HeaderLink qa="trade" to="/trade" showRedirectModal={showRedirectModal}>
          <Trans>Trade</Trans>
        </HeaderLink>
      </div>
      <div className="App-header-link-container">
        <HeaderLink qa="pools" to="/pools" showRedirectModal={showRedirectModal}>
          <Trans>Pools</Trans>
        </HeaderLink>
      </div>
      <div className="App-header-link-container">
        <HeaderLink qa="stake" to="/stake" showRedirectModal={showRedirectModal}>
          <Trans>Stake</Trans>
        </HeaderLink>
      </div>
      <div className="App-header-link-container">
        <HeaderLink qa="stats" to="/stats" showRedirectModal={showRedirectModal}>
          <Trans>Stats</Trans>
        </HeaderLink>
      </div>
      <div className="App-header-link-container">
        <ExternalLink href="https://intelmarkets.trade/">
          <Trans>Buy</Trans>
        </ExternalLink>
      </div>

      <div className="App-header-link-container">
        <HeaderLink
          onClick={() => {
            userAnalytics.pushEvent<ReferralTopMenuClickEvent>({
              event: "ReferralCodeAction",
              data: {
                action: "ReferralTopMenuClick",
              },
            });
          }}
          qa="referrals"
          to="/referrals"
          showRedirectModal={showRedirectModal}
        >
          <Trans>Referrals</Trans>
        </HeaderLink>
      </div>

      <div className="App-header-link-container">
        <HeaderLink
          qa="leaderboard"
          to="/leaderboard"
          showRedirectModal={showRedirectModal}
          isActive={isLeaderboardActive}
        >
          <Trans>Leaderboard</Trans>
        </HeaderLink>
      </div>
      {small && (
        <div className="App-header-link-container">
          <a href="#" onClick={openNotifyModal}>
            <Trans>Alerts</Trans>
          </a>
        </div>
      )}
      {small && !isHomeSite() && (
        <div className="App-header-link-container">
          {/* eslint-disable-next-line */}
          <a href="#" data-qa="settings" onClick={openSettings}>
            <Trans>Settings</Trans>
          </a>
        </div>
      )}
    </div>
  );
}
