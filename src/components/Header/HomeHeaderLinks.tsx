import { t } from "@lingui/macro";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

import { shouldShowRedirectModal } from "lib/legacy";
import { userAnalytics } from "lib/userAnalytics";
import { LandingPageLaunchAppEvent } from "lib/userAnalytics/types";
import { useRedirectPopupTimestamp } from "lib/useRedirectPopupTimestamp";

import ExternalLink from "components/ExternalLink/ExternalLink";

import { HeaderLink } from "./HeaderLink";

import "./Header.scss";

type Props = {
  small?: boolean;
  clickCloseIcon?: () => void;
  showRedirectModal: (to: string) => void;
};

type HomeLink = { label: string; link: string; isHomeLink?: boolean | false; onClick?: () => void };

export function HomeHeaderLinks({ small, clickCloseIcon, showRedirectModal }: Props) {
  const [redirectPopupTimestamp] = useRedirectPopupTimestamp();

  const HOME_MENUS: HomeLink[] = [
    {
      label: t`App`,
      isHomeLink: true,
      link: `/trade?${userAnalytics.getSessionIdUrlParams()}`,
      onClick: async () => {
        await userAnalytics.pushEvent<LandingPageLaunchAppEvent>(
          {
            event: "LandingPageAction",
            data: {
              action: "LaunchApp",
              buttonPosition: "MenuButton",
              shouldSeeConfirmationDialog: shouldShowRedirectModal(redirectPopupTimestamp),
            },
          },
          { instantSend: true }
        );
      },
    },
  ];
  return (
    <div className="App-header-links">
      {small && (
        <div className="App-header-links-header">
          <Link className="App-header-link-main" to="/">
            <img src="/intelogo.png" alt="IntelMarket" />
          </Link>
          <div
            className="App-header-menu-icon-block mobile-cross-menu"
            onClick={() => clickCloseIcon && clickCloseIcon()}
          >
            <FiX className="App-header-menu-icon" />
          </div>
        </div>
      )}
      {HOME_MENUS.map(({ link, label, isHomeLink = false, onClick }) => {
        return (
          <div key={label} className="App-header-link-container">
            {isHomeLink ? (
              <HeaderLink onClick={onClick} to={link} showRedirectModal={showRedirectModal}>
                {label}
              </HeaderLink>
            ) : (
              <ExternalLink href={link}>{label}</ExternalLink>
            )}
          </div>
        );
      })}
    </div>
  );
}
