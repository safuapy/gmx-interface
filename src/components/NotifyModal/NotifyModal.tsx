import { Trans, t } from "@lingui/macro";
import { memo } from "react";

import { useNotifyModalState } from "lib/useNotifyModalState";

import ExternalLink from "components/ExternalLink/ExternalLink";

import ArrowBulletIcon from "img/arrow-bullet.svg?react";
import ExternalLinkIcon from "img/external-link.svg?react";
import NotifiLogoIcon from "img/notifi-logo.svg?react";

import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import "./NotifyModal.scss";

export function NotifyModal() {
  const { notifyModalOpen, setNotifyModalOpen } = useNotifyModalState();

  return (
    <Modal isVisible={notifyModalOpen} setIsVisible={setNotifyModalOpen} label={t`GMX Alerts`}>
      <div className="NotifyModal">
        <p className="text-body-medium">
          <Trans>IntelMarkets Trading Alerts</Trans>
        </p>
        <NotifyBulletList />
        <Button
          variant="primary-action"
          to="https://gmx.notifi.network"
          newTab
          className="NotifyModal-button w-full"
          type="submit"
        >
          <Trans>Discover GMX Alerts</Trans>
          <ExternalLinkIcon />
        </Button>
        <div className="NotifyModal-terms text-caption">
          <Trans>
            <span>
              Notifications are provided by Notifi and not affiliated with&nbsp;GMX. By subscribing, you agree that info
              you provide to Notifi will be governed by its{" "}
            </span>
            <ExternalLink href="https://notifi.network/privacy">Privacy Policy</ExternalLink>
            <span> and </span>
            <ExternalLink href="https://notifi.network/terms">Terms of Use</ExternalLink>.
          </Trans>
        </div>
        <div className="NotifyModal-notify text-caption">
          <Trans>Powered by</Trans>
          <NotifiLogoIcon />
        </div>
      </div>
    </Modal>
  );
}

const NotifyBulletList = memo(function NotifyBulletList() {
  return (
    <div className="NotifyModal-bullet-list">
      {[
        t`GMX Announcements`,
        t`Trade Confirmations`,
        t`Liquidation Confirmations`,
        t`Governance Alerts`,
        t`Trade Errors`,
        t`Liquidation Risk Alerts`,
        t`Trading Pair Price Alerts`,
      ].map((item, i) => (
        <div key={i} className="NotifyModal-bullet text-body-medium">
          <ArrowBulletIcon />
          <div className="NotifyModal-bullet-text">{item}</div>
        </div>
      ))}
    </div>
  );
});
