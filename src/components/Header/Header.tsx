import { Trans } from "@lingui/macro";
import cx from "classnames";
import { AnimatePresence as FramerAnimatePresence, motion } from "framer-motion";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useMedia } from "react-use";

import { isHomeSite } from "lib/legacy";

import { AppHeaderLinks } from "./AppHeaderLinks";
import { AppHeaderUser } from "./AppHeaderUser";
import { HeaderLink } from "./HeaderLink";
import { HomeHeaderLinks } from "./HomeHeaderLinks";

import "./Header.scss";

const AnimatePresence = (props: React.ComponentProps<typeof FramerAnimatePresence> & { children: ReactNode }) => (
  <FramerAnimatePresence {...props} />
);

const FADE_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const SLIDE_VARIANTS = {
  hidden: { x: "100%" },
  visible: { x: "0" },
};

const TRANSITION = { duration: 0.2 };

type Props = {
  disconnectAccountAndCloseSettings: () => void;
  openSettings: () => void;
  showRedirectModal: (to: string) => void;
};

const Header = ({ disconnectAccountAndCloseSettings, openSettings, showRedirectModal }: Props) => {
  const isMobile = useMedia("(max-width: 1335px)");
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isNativeSelectorModalVisible, setIsNativeSelectorModalVisible] = useState(false);

  useEffect(() => {
    if (isDrawerVisible) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("mobile-menu-open");
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isDrawerVisible]);

  return (
    <>
      {isDrawerVisible && (
        <AnimatePresence>
          {isDrawerVisible && (
            <motion.div
              className="App-header-backdrop"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={FADE_VARIANTS}
              transition={TRANSITION}
              onClick={() => setIsDrawerVisible(false)}
            ></motion.div>
          )}
        </AnimatePresence>
      )}
      {isNativeSelectorModalVisible && (
        <AnimatePresence>
          {isNativeSelectorModalVisible && (
            <motion.div
              className="selector-backdrop"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={FADE_VARIANTS}
              transition={TRANSITION}
              onClick={() => setIsNativeSelectorModalVisible(!isNativeSelectorModalVisible)}
            ></motion.div>
          )}
        </AnimatePresence>
      )}
      <header data-qa="header">
        {!isMobile && (
          <div className="App-header large">
            <div className="App-header-container-left">
              <Link className="App-header-link-main" to="/">
                <img src="/intelogo.png" className="big" alt="IntelMarket" />
                <img src="/intelogo.png" className="small" alt="IntelMarket" />
              </Link>
              {isHomeSite() ? (
                <HomeHeaderLinks showRedirectModal={showRedirectModal} />
              ) : (
                <AppHeaderLinks showRedirectModal={showRedirectModal} />
              )}
            </div>
            <div className="App-header-container-right">
              <AppHeaderUser
                disconnectAccountAndCloseSettings={disconnectAccountAndCloseSettings}
                openSettings={openSettings}
                showRedirectModal={showRedirectModal}
              />
            </div>
          </div>
        )}
        {isMobile && (
          <div className={cx("App-header", "small", { active: isDrawerVisible })}>
            <div
              className={cx("App-header-link-container", "App-header-top", {
                active: isDrawerVisible,
              })}
            >
              <div className="App-header-container-left">
                <div className="App-header-link-main clickable" onClick={() => setIsDrawerVisible(!isDrawerVisible)}>
                  <img src="/intelogo.png" className="big" alt="IntelMarket" />
                  <img src="/intelogo.png" className="small" alt="IntelMarket" />
                </div>
              </div>
              <div className="App-header-container-right">
                  <AppHeaderUser
                    disconnectAccountAndCloseSettings={disconnectAccountAndCloseSettings}
                    openSettings={openSettings}
                    small
                    showRedirectModal={showRedirectModal}
                    menuToggle={
                    <div className="App-header-menu-icon-block" onClick={() => setIsDrawerVisible(!isDrawerVisible)}>
                        <RiMenuLine className="App-header-menu-icon" />
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
        )}
      </header>
      <AnimatePresence>
        {isDrawerVisible && (
          <motion.div
            onClick={() => setIsDrawerVisible(false)}
            className="App-header-links-container App-header-drawer"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={SLIDE_VARIANTS}
            transition={TRANSITION}
          >
            {isHomeSite() ? (
              <HomeHeaderLinks
                small
                clickCloseIcon={() => setIsDrawerVisible(false)}
                showRedirectModal={showRedirectModal}
              />
            ) : (
              <AppHeaderLinks
                small
                openSettings={openSettings}
                clickCloseIcon={() => setIsDrawerVisible(false)}
                showRedirectModal={showRedirectModal}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { Header };
