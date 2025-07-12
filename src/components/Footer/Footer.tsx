import { Trans } from "@lingui/macro";
import cx from "classnames";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMedia } from "react-use";

import { getAppBaseUrl, isHomeSite, shouldShowRedirectModal } from "lib/legacy";
import { userAnalytics } from "lib/userAnalytics";
import { LandingPageFooterMenuEvent } from "lib/userAnalytics/types";

import ExternalLink from "components/ExternalLink/ExternalLink";
import { TrackingLink } from "components/TrackingLink/TrackingLink";

import { SOCIAL_LINKS, getFooterLinks } from "./constants";
import { UserFeedbackModal } from "../UserFeedbackModal/UserFeedbackModal";

type Props = {
  showRedirectModal?: (to: string) => void;
  redirectPopupTimestamp?: number;
  isMobileTradePage?: boolean;
};

export default function Footer({ showRedirectModal, redirectPopupTimestamp, isMobileTradePage }: Props) {
  const isHome = isHomeSite();
  const [isUserFeedbackModalVisible, setIsUserFeedbackModalVisible] = useState(false);

  const isMobile = useMedia("(max-width: 1024px)");
  const isVerySmall = useMedia("(max-width: 580px)");

  const linkClassName = cx(
    "cursor-pointer text-[15px] font-medium text-slate-300 !no-underline transition-colors duration-200 hover:!text-white"
  );

  const sectionTitleClassName = "text-lg font-semibold text-white mb-6";

  return (
    <>
      <footer className={cx(
        "relative w-full border-t border-t-[#ffffff1a] bg-[#07071c]/90 backdrop-blur-[20px]",
        isMobileTradePage ? "pb-[92px]" : "pb-8",
        "mt-auto"
      )}>
        <div className={cx(
          "mx-auto w-full max-w-[1440px] px-4 md:px-6 pt-12 md:pt-16",
          "grid gap-8 md:gap-12",
          isMobile ? "grid-cols-2 sm:grid-cols-2" : "grid-cols-4",
          isVerySmall && "grid-cols-1"
        )}>
          {/* Brand Section */}
          <div className={cx(
            "flex flex-col gap-6",
            isVerySmall ? "col-span-1" : isMobile ? "col-span-2" : "col-span-1"
          )}>
            <div className="flex items-start">
              <img src="/intelogo.png" alt="IntelMarket" className="h-8 md:h-10" />
            </div>
            <p className="text-sm text-slate-400 max-w-[280px]">
              Trade with confidence on the world's most advanced decentralized trading platform.
            </p>
            <div className="flex gap-3 md:gap-4">
              {SOCIAL_LINKS.map((platform) => (
                <TrackingLink
                  key={platform.name}
                  onClick={async () => {
                    await userAnalytics.pushEvent<LandingPageFooterMenuEvent>(
                      {
                        event: "LandingPageAction",
                        data: {
                          action: "FooterMenu",
                          button: platform.name,
                        },
                      },
                      { instantSend: true }
                    );
                  }}
                >
                  <ExternalLink 
                    href={platform.link} 
                    className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-[#ffffff0d] transition-colors duration-200 hover:bg-[#ffffff1a]"
                  >
                    <img src={platform.icon} alt={platform.name} className="h-4 w-4 md:h-5 md:w-5" />
                  </ExternalLink>
                </TrackingLink>
              ))}
            </div>
          </div>

          {/* Products Section */}
          <div className="flex flex-col">
            <h3 className={sectionTitleClassName}>Products</h3>
            <div className="flex flex-col gap-3 md:gap-4">
              <NavLink to="/trade" className={linkClassName}>Trade</NavLink>
              <NavLink to="/dashboard" className={linkClassName}>Dashboard</NavLink>
              <NavLink to="/earn" className={linkClassName}>Earn</NavLink>
              <ExternalLink href="https://intelmarkets.trade" className={linkClassName}>Buy</ExternalLink>
            </div>
          </div>

          {/* Resources Section */}
          <div className="flex flex-col">
            <h3 className={sectionTitleClassName}>Resources</h3>
            <div className="flex flex-col gap-3 md:gap-4">
              {getFooterLinks(isHome).map(({ external, label, link, isAppLink }) => {
                if (external) {
                  return (
                    <ExternalLink key={label} href={link} className={linkClassName}>
                      {label}
                    </ExternalLink>
                  );
                }
                if (isAppLink) {
                  if (shouldShowRedirectModal(redirectPopupTimestamp)) {
                    return (
                      <div
                        key={label}
                        className={linkClassName}
                        onClick={() => showRedirectModal && showRedirectModal(link)}
                      >
                        {label}
                      </div>
                    );
                  } else {
                    const baseUrl = getAppBaseUrl();
                    return (
                      <a key={label} href={baseUrl + link} className={linkClassName}>
                        {label}
                      </a>
                    );
                  }
                }
                return (
                  <NavLink key={link} to={link} className={linkClassName}>
                    {label}
                  </NavLink>
                );
              })}
              <div 
                className={cx(linkClassName, "cursor-pointer")}
                onClick={() => setIsUserFeedbackModalVisible(true)}
              >
                Leave Feedback
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="flex flex-col">
            <h3 className={sectionTitleClassName}>Support</h3>
            <div className="flex flex-col gap-3 md:gap-4">
              <ExternalLink href="https://docs.intelmarkets.trade" className={linkClassName}>
                Documentation
              </ExternalLink>
              <ExternalLink href="https://docs.intelmarkets.trade/docs/faq" className={linkClassName}>
                FAQ
              </ExternalLink>
              <ExternalLink href="https://t.me/intelmarkets" className={linkClassName}>
                Telegram Support
              </ExternalLink>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-6 py-8 mt-8 md:mt-12">
          <div className="border-t border-t-[#ffffff1a] pt-8">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} IntelMarkets. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {!isHome && (
        <UserFeedbackModal isVisible={isUserFeedbackModalVisible} setIsVisible={setIsUserFeedbackModalVisible} />
      )}
    </>
  );
}
