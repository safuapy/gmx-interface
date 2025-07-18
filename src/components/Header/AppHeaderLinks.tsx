import { Trans } from "@lingui/macro";
import React from "react";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

import { isHomeSite } from "lib/legacy";

import { HeaderLink } from "./HeaderLink";
import ExternalLink from "../ExternalLink/ExternalLink";

import logoImg from "img/logo_INTEL.svg";

import "./Header.scss";

type Props = {
  small?: boolean;
  openSettings?: () => void;
  clickCloseIcon?: () => void;
  openNotifyModal?: () => void;
  showRedirectModal: (to: string) => void;
};

export function AppHeaderLinks({ small, openSettings, clickCloseIcon, openNotifyModal, showRedirectModal }: Props) {
  return (
    <div className="App-header-links">
      {small && (
        <div className="App-header-links-header">
          <Link className="App-header-link-main" to="/">
            <img src={logoImg} alt="GMX Logo" />
          </Link>
          <div className="App-header-menu-icon-block">
            <FiX className="App-header-menu-icon" onClick={clickCloseIcon} />
          </div>
        </div>
      )}
      <div className="App-header-link-container">
        <HeaderLink to="/trade" qa="trade" showRedirectModal={showRedirectModal}>
          <Trans>Trade</Trans>
        </HeaderLink>
      </div>
      <div className="App-header-link-container">
        <ExternalLink href="https://intelmarkets.trade/">
          <Trans>Buy</Trans>
        </ExternalLink>
      </div>
      <div className="App-header-link-container">
        <HeaderLink to="/leaderboard" qa="leaderboard" showRedirectModal={showRedirectModal}>
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
