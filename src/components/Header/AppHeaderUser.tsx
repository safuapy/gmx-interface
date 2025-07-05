import { Trans } from "@lingui/macro";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useCallback } from "react";

import { ARBITRUM, AVALANCHE, AVALANCHE_FUJI, BOTANIX, getChainName, ETH_MAINNET, WALLET_CHAIN_ID } from "config/chains";
import { isDevelopment } from "config/env";
import { getIcon } from "config/icons";
import { useChainId } from "lib/chains";
import { getAccountUrl, isHomeSite, shouldShowRedirectModal } from "lib/legacy";
import { sendUserAnalyticsConnectWalletClickEvent, userAnalytics } from "lib/userAnalytics";
import { LandingPageLaunchAppEvent } from "lib/userAnalytics/types";
import { useRedirectPopupTimestamp } from "lib/useRedirectPopupTimestamp";
import { useTradePageVersion } from "lib/useTradePageVersion";
import useWallet from "lib/wallets/useWallet";

import { OneClickButton } from "components/OneClickButton/OneClickButton";

import connectWalletImg from "img/ic_wallet_24.svg";

import { HeaderLink } from "./HeaderLink";
import AddressDropdown from "../AddressDropdown/AddressDropdown";
import ConnectWalletButton from "../Common/ConnectWalletButton";
import LanguagePopupHome from "../NetworkDropdown/LanguagePopupHome";
import NetworkDropdown from "../NetworkDropdown/NetworkDropdown";

import "./Header.scss";

type Props = {
  openSettings: () => void;
  small?: boolean;
  disconnectAccountAndCloseSettings: () => void;
  showRedirectModal: (to: string) => void;
  menuToggle?: React.ReactNode;
};

// UI shows only Ethereum - all data is fetched from Arbitrum behind the scenes
const NETWORK_OPTIONS = [
  {
    label: "Ethereum",
    value: WALLET_CHAIN_ID,
    icon: getIcon(WALLET_CHAIN_ID, "network"),
    color: "#627EEA",
  },
];

// Keep all other network options in code but hidden from UI
// These can be re-enabled by uncommenting the section below
/*
const ALL_NETWORK_OPTIONS = [
  {
    label: getChainName(ARBITRUM),
    value: ARBITRUM,
    icon: getIcon(ARBITRUM, "network"),
    color: "#264f79",
  },
  {
    label: getChainName(AVALANCHE),
    value: AVALANCHE,
    icon: getIcon(AVALANCHE, "network"),
    color: "#E841424D",
  },
  {
    label: getChainName(BOTANIX),
    value: BOTANIX,
    icon: getIcon(BOTANIX, "network"),
    color: "#F7931A",
  },
];

if (isDevelopment()) {
  ALL_NETWORK_OPTIONS.push({
    label: getChainName(AVALANCHE_FUJI),
    value: AVALANCHE_FUJI,
    icon: getIcon(AVALANCHE_FUJI, "network"),
    color: "#E841424D",
  });
}
*/

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

  const tradeLink = tradePageVersion === 2 ? "/trade" : "/v1";

  // Always show "Ethereum" in the UI regardless of connected chain
  // This gives the impression that the app is running on Ethereum L1
  // while all contract operations happen on Arbitrum behind the scenes
  const selectorLabel = "Ethereum";

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
            {!small && <OneClickButton openSettings={openSettings} />}
            <NetworkDropdown
              small={small}
              networkOptions={NETWORK_OPTIONS}
              selectorLabel={selectorLabel}
              openSettings={openSettings}
            />
          </>
        ) : (
          <LanguagePopupHome />
        )}
        {menuToggle}
      </div>
    );
  }

  // For connected users, use the actual chainId for account URL (still Arbitrum)
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
          {!small && <OneClickButton openSettings={openSettings} />}
          <NetworkDropdown
            small={small}
            networkOptions={NETWORK_OPTIONS}
            selectorLabel={selectorLabel}
            openSettings={openSettings}
          />
        </>
      ) : (
        <LanguagePopupHome />
      )}
      {menuToggle}
    </div>
  );
}
