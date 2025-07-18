import { Trans, t } from "@lingui/macro";
import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { ARBITRUM, AVALANCHE, BOTANIX, getChainName, getConstant } from "config/chains";
import { getIcons } from "config/icons";
import { useChainId } from "lib/chains";
import { importImage } from "lib/legacy";
import { switchNetwork } from "lib/wallets";
import useWallet from "lib/wallets/useWallet";

import Button from "components/Button/Button";
import Card from "components/Common/Card";
import ExternalLink from "components/ExternalLink/ExternalLink";
import Footer from "components/Footer/Footer";

import bondProtocolIcon from "img/ic_bondprotocol_arbitrum.svg";
import gmxArbitrumIcon from "img/ic_gmx_arbitrum.svg";
import traderjoeIcon from "img/ic_traderjoe_avax.png";
import uniswapArbitrumIcon from "img/ic_uni_arbitrum.svg";

import "./BuyGMX.css";

import {
  BUY_NATIVE_TOKENS,
  CENTRALISED_EXCHANGES,
  DECENTRALISED_AGGRIGATORS,
  EXTERNAL_LINKS,
  FIAT_GATEWAYS,
  GMX_FROM_ANY_NETWORKS,
  TRANSFER_EXCHANGES,
} from "./constants";

export default function BuyGMX() {
  const { chainId } = useChainId();
  const isArbitrum = chainId === ARBITRUM;
  const { active } = useWallet();
  const icons = getIcons(chainId);
  const chainName = getChainName(chainId);
  const nativeTokenSymbol = getConstant(chainId, "nativeTokenSymbol");
  const externalLinks = EXTERNAL_LINKS[chainId];
  const location = useLocation();

  const onNetworkSelect = useCallback(
    (value) => {
      if (value === chainId) {
        return;
      }
      return switchNetwork(value, active);
    },
    [chainId, active]
  );

  useEffect(() => {
    if (location.hash === "#bridge") {
      const element = document.getElementById("bridge");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    if (chainId === BOTANIX) {
      onNetworkSelect(ARBITRUM);
    }
  }, [chainId, onNetworkSelect]);

  return (
    <div className="BuyGMXGLP default-container page-layout">
      <div className="BuyGMXGLP-container">
        <div className="section-title-block">
          <div className="section-title-content">
            <div className="Page-title">
              <Trans>Buy INTEL on {chainName}</Trans>
              <img className="Page-title-icon ml-5 inline-block" src={icons?.network} alt={chainName} />
            </div>
            <div className="Page-description">
              <Trans>Choose to buy from decentralized or centralized exchanges.</Trans>
              <br />
              <Trans>
                To purchase GMX on the {isArbitrum ? "Avalanche" : "Arbitrum"} blockchain, please{" "}
                <span onClick={() => onNetworkSelect(isArbitrum ? AVALANCHE : ARBITRUM)}>change your network</span>.
              </Trans>
            </div>
          </div>
        </div>
        <div className="cards-row">
          <DecentralisedExchanges chainId={chainId} externalLinks={externalLinks} />
          <CentralisedExchanges chainId={chainId} />
        </div>

        {isArbitrum ? (
          <div className="section-title-block mt-top" id="bridge">
            <div className="section-title-content">
              <div className="Page-title">
                <Trans>Buy or Transfer ETH to Arbitrum</Trans>
                <img className="Page-title-icon ml-5 inline-block" src={icons?.network} alt={chainName} />
              </div>
              <div className="Page-description">
                <Trans>Buy ETH directly on Arbitrum or transfer it there.</Trans>
              </div>
            </div>
          </div>
        ) : (
          <div className="section-title-block mt-top" id="bridge">
            <div className="section-title-content">
              <div className="Page-title">
                <Trans>Buy or Transfer AVAX to Avalanche</Trans>
                <img className="Page-title-icon ml-5 inline-block" src={icons?.network} alt={chainName} />
              </div>
              <div className="Page-description">
                <Trans>Buy AVAX directly to Avalanche or transfer it there.</Trans>
              </div>
            </div>
          </div>
        )}

        <div className="cards-row">
          <Card title={t`Buy ${nativeTokenSymbol}`}>
            <div className="App-card-content">
              <div className="BuyGMXGLP-description">
                {isArbitrum ? (
                  <Trans>
                    You can buy ETH directly on{" "}
                    <ExternalLink href={externalLinks.networkWebsite}>Arbitrum</ExternalLink> using these options:
                  </Trans>
                ) : (
                  <Trans>
                    You can buy AVAX directly on{" "}
                    <ExternalLink href={externalLinks.networkWebsite}>Avalanche</ExternalLink> using these options:
                  </Trans>
                )}
              </div>
              <div className="buttons-group">
                {BUY_NATIVE_TOKENS.filter((e) => chainId in e.links).map((exchange) => {
                  const icon = importImage(exchange.icon) || "";
                  const link = exchange.links[chainId];
                  return (
                    <Button
                      variant="secondary"
                      textAlign="left"
                      key={exchange.name}
                      to={link}
                      // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                      imgSrc={icon}
                      imgAlt={exchange.name}
                      newTab
                    >
                      {exchange.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          </Card>
          <Card title={t`Transfer ${nativeTokenSymbol}`}>
            <div className="App-card-content">
              {isArbitrum ? (
                <div className="BuyGMXGLP-description">
                  <Trans>You can transfer ETH from other networks to Arbitrum using any of the below options:</Trans>
                </div>
              ) : (
                <div className="BuyGMXGLP-description">
                  <Trans>You can transfer AVAX from other networks to Avalanche using any of the below options:</Trans>
                </div>
              )}
              <div className="buttons-group">
                {TRANSFER_EXCHANGES.filter((e) => chainId in e.links).map((exchange) => {
                  const icon = importImage(exchange.icon) || "";
                  const link = exchange.links[chainId];
                  return (
                    <Button
                      variant="secondary"
                      textAlign="left"
                      key={exchange.name}
                      to={link}
                      imgSrc={icon}
                      imgAlt={exchange.name}
                      newTab
                    >
                      {exchange.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function DecentralisedExchanges({ chainId, externalLinks }) {
  const isArbitrum = chainId === ARBITRUM;
  return (
    <Card title={t`Buy INTEL from decentralized exchanges`}>
      <div className="App-card-content">
        {isArbitrum ? (
          <div className="exchange-info-group">
            <div className="BuyGMXGLP-description">
              <Trans>Buy INTEL from Uniswap or directly on IntelMarket (make sure to select Arbitrum):</Trans>
            </div>
            <div className="buttons-group">
              <Button
                variant="secondary"
                textAlign="left"
                imgSrc={uniswapArbitrumIcon}
                imgAlt={"Uniswap"}
                to={externalLinks.buyGmx.uniswap}
                newTab
              >
                Uniswap
              </Button>
              <Button
                variant="secondary"
                textAlign="left"
                imgSrc={gmxArbitrumIcon}
                imgAlt="GMX"
                to={externalLinks.buyGmx.gmx}
                showExternalLinkArrow={false}
                newTab
              >
                GMX
              </Button>
            </div>
          </div>
        ) : (
          <div className="exchange-info-group">
            <div className="BuyGMXGLP-description">
              <Trans>Buy INTEL from Traderjoe:</Trans>
            </div>
            <div className="buttons-group col-1">
              <Button
                variant="secondary"
                textAlign="left"
                to={externalLinks.buyGmx.traderjoe}
                imgSrc={traderjoeIcon}
                imgAlt="Traderjoe"
                newTab
              >
                TraderJoe
              </Button>
            </div>
          </div>
        )}
        <div className="exchange-info-group">
          <div className="BuyGMXGLP-description">
            <Trans>Buy GMX using Decentralized Exchange Aggregators:</Trans>
          </div>
          <div className="buttons-group">
            {DECENTRALISED_AGGRIGATORS.filter((e) => chainId in e.links).map((exchange) => {
              const icon = importImage(exchange.icon) || "";
              const link = exchange.links[chainId];
              return (
                <Button
                  variant="secondary"
                  textAlign="left"
                  key={exchange.name}
                  to={link}
                  imgSrc={icon}
                  imgAlt={exchange.name}
                  newTab
                >
                  {exchange.name}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="exchange-info-group">
          <div className="BuyGMXGLP-description">
            <Trans>Buy GMX using any token from any network:</Trans>
          </div>
          <div className="buttons-group">
            {GMX_FROM_ANY_NETWORKS.filter((e) => chainId in e.links).map((exchange) => {
              const icon = importImage(exchange.icon) || "";
              const link = exchange.links[chainId];
              return (
                <Button
                  variant="secondary"
                  textAlign="left"
                  key={exchange.name}
                  to={link}
                  imgSrc={icon}
                  imgAlt={exchange.name}
                  newTab
                >
                  {exchange.name}
                </Button>
              );
            })}
          </div>
        </div>
        {isArbitrum && (
          <div className="exchange-info-group">
            <div className="BuyGMXGLP-description">
              <Trans>GMX bonds can be bought on Bond Protocol with a discount and a small vesting period:</Trans>
            </div>
            <div className="buttons-group col-1">
              <Button
                variant="secondary"
                textAlign="left"
                to="https://app.bondprotocol.finance/#/tokens/42161/0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a"
                imgSrc={bondProtocolIcon}
                imgAlt="Bond Protocol"
                newTab
              >
                Bond Protocol
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

function CentralisedExchanges({ chainId }) {
  return (
    <Card title={t`Buy INTEL from centralized services`}>
      <div className="App-card-content">
        <div className="exchange-info-group">
          <div className="BuyGMXGLP-description">
            <Trans>Buy GMX from centralized exchanges:</Trans>
          </div>
          <div className="buttons-group">
            {CENTRALISED_EXCHANGES.filter((e) => chainId in e.links).map((exchange) => {
              const icon = importImage(exchange.icon) || "";
              const link = exchange.links[chainId];
              return (
                <Button
                  variant="secondary"
                  textAlign="left"
                  key={exchange.name}
                  to={link}
                  imgSrc={icon}
                  imgAlt={exchange.name}
                  newTab
                >
                  {exchange.name}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="exchange-info-group">
          <div className="BuyGMXGLP-description">
            <Trans>Buy GMX using FIAT gateways:</Trans>
          </div>
          <div className="buttons-group col-2">
            {FIAT_GATEWAYS.filter((e) => chainId in e.links).map((exchange) => {
              const icon = importImage(exchange.icon) || "";
              let link = exchange.links[chainId];

              return (
                <Button
                  variant="secondary"
                  textAlign="left"
                  key={exchange.name}
                  to={link}
                  imgSrc={icon}
                  imgAlt={exchange.name}
                  newTab
                >
                  {exchange.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
