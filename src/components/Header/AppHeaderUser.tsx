import { Trans } from "@lingui/macro";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useCallback } from "react";

import { ARBITRUM, ETH_MAINNET, getChainName } from "config/chains";
import { getIcon } from "config/icons";
import { useChainId } from "lib/chains";
import { getAccountUrl, isHomeSite, shouldShowRedirectModal } from "lib/legacy";
import { sendUserAnalyticsConnectWalletClickEvent, userAnalytics } from "lib/userAnalytics";
import { LandingPageLaunchAppEvent } from "lib/userAnalytics/types";
import { useRedirectPopupTimestamp } from "lib/useRedirectPopupTimestamp";
import { useTradePageVersion } from "lib/useTradePageVersion";
import useWallet from "lib/wallets/useWallet";

import connectWalletImg from "img/ic_wallet_24.svg";

import { HeaderLink } from "./HeaderLink";
import AddressDropdown from "../AddressDropdown/AddressDropdown";
import ConnectWalletButton from "../Common/ConnectWalletButton";
import NetworkDropdown from "../NetworkDropdown/NetworkDropdown";

import "./Header.scss";

type Props = {
  openSettings: () => void;
  small?: boolean;
  disconnectAccountAndCloseSettings: () => void;
  showRedirectModal: (to: string) => void;
  menuToggle?: React.ReactNode;
};

const NETWORK_OPTIONS = [
  {
    label: "Ethereum",
    value: ETH_MAINNET,
    icon: getIcon(ETH_MAINNET, "network"),
    color: "#627EEA",
  },
];

export function AppHeaderUser({
  small,
  menuToggle,
  openSettings,
  disconnectAccountAndCloseSettings,
  showRedirectModal,
}: Props) {
  const { chainId } = useChainId();
  const { active, account } = useWallet();
  const { openConnectModal } = useConnectModal();
  const showConnectionOptions = !isHomeSite();
  const [tradePageVersion] = useTradePageVersion();
  const [redirectPopupTimestamp] = useRedirectPopupTimestamp();

  const tradeLink = "/trade";

  const trackLaunchApp = useCallback(() => {
    userAnalytics.pushEvent<LandingPageLaunchAppEvent>(
      {
        event: "LandingPageAction",
        data: {
          action: "LaunchApp",
          buttonPosition: "StickyHeader",
          shouldSeeConfirmationDialog: shouldShowRedirectModal(redirectPopupTimestamp),
        },
      },
      { instantSend: true }
    );
  }, [redirectPopupTimestamp]);

  if (!active || !account) {
    return (
      <div className="App-header-user">
        {isHomeSite() ? (
          <div data-qa="trade" className="App-header-trade-link homepage-header text-body-medium">
            <HeaderLink
              className="default-btn"
              onClick={trackLaunchApp}
              to={`${tradeLink}?${userAnalytics.getSessionIdUrlParams()}`}
              showRedirectModal={showRedirectModal}
            >
              <Trans>Launch App</Trans>
            </HeaderLink>
          </div>
        ) : null}

        {showConnectionOptions && openConnectModal ? (
          <>
            <ConnectWalletButton
              onClick={() => {
                sendUserAnalyticsConnectWalletClickEvent("Header");
                openConnectModal();
              }}
              imgSrc={connectWalletImg}
            >
              {small ? <Trans>Connect</Trans> : <Trans>Connect Wallet</Trans>}
            </ConnectWalletButton>
            <NetworkDropdown
              small={small}
              networkOptions={NETWORK_OPTIONS}
              selectorLabel="Ethereum"
              openSettings={openSettings}
            />
          </>
        ) : null}
        {menuToggle}
      </div>
    );
  }

  const accountUrl = getAccountUrl(chainId, account);

  return (
    <div className="App-header-user">
      {isHomeSite() ? (
        <div data-qa="trade" className="App-header-trade-link text-body-medium">
          <HeaderLink
            className="default-btn"
            onClick={trackLaunchApp}
            to={`${tradeLink}?${userAnalytics.getSessionIdUrlParams()}`}
            showRedirectModal={showRedirectModal}
          >
            <Trans>Launch App</Trans>
          </HeaderLink>
        </div>
      ) : null}

      {showConnectionOptions ? (
        <>
          <div data-qa="user-address" className="App-header-user-address">
            <AddressDropdown
              account={account}
              accountUrl={accountUrl}
              disconnectAccountAndCloseSettings={disconnectAccountAndCloseSettings}
            />
          </div>
          <NetworkDropdown
            small={small}
            networkOptions={NETWORK_OPTIONS}
            selectorLabel="Ethereum"
            openSettings={openSettings}
          />
        </>
      ) : null}
      {menuToggle}
    </div>
  );
}
