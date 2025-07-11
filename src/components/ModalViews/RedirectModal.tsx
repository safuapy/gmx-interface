import { t, Trans } from "@lingui/macro";

import { userAnalytics } from "lib/userAnalytics";
import { LandingPageAgreementConfirmationEvent } from "lib/userAnalytics/types";
import { useRedirectPopupTimestamp } from "lib/useRedirectPopupTimestamp";

import Button from "components/Button/Button";
import ExternalLink from "components/ExternalLink/ExternalLink";

import Checkbox from "../Checkbox/Checkbox";
import Modal from "../Modal/Modal";
import "./RedirectModal.css";

export function RedirectPopupModal({
  redirectModalVisible,
  setRedirectModalVisible,
  appRedirectUrl,
  setShouldHideRedirectModal,
  shouldHideRedirectModal,
}) {
  const [, setRedirectPopupTimestamp] = useRedirectPopupTimestamp();
  const onClickAgree = () => {
    userAnalytics.pushEvent<LandingPageAgreementConfirmationEvent>({
      event: "LandingPageAction",
      data: {
        action: "AgreementConfirmationAgreeClick",
      },
    });

    if (shouldHideRedirectModal) {
      setRedirectPopupTimestamp(Date.now());
    }
  };

  return (
    <Modal
      className="RedirectModal"
      isVisible={redirectModalVisible}
      setIsVisible={setRedirectModalVisible}
      label={t`Launch App`}
    >
      <Trans>You are leaving IntelMarkets and will be redirected to a third party, independent website.</Trans>
      <br />
      <br />
      <Trans>
        The website is a community deployed and maintained instance of the open source{" "}
        <ExternalLink href="https://github.com/gmx-io/gmx-interface">GMX front end</ExternalLink>, hosted and served on
        the distributed, peer-to-peer <ExternalLink href="https://ipfs.io/">IPFS network</ExternalLink>.
      </Trans>
      <br />
      <br />
      <Trans>
        Alternative links can be found in the{" "}
        <ExternalLink href="https://docs.intelmarkets.trade/docs/community/frontends">docs</ExternalLink>.
        <br />
        <br />
        By clicking Agree you accept the <ExternalLink href="https://intelmarkets.trade/#/terms-and-conditions">
          T&Cs
        </ExternalLink>{" "}
        and <ExternalLink href="https://intelmarkets.trade/#/referral-terms">Referral T&Cs</ExternalLink>.
        <br />
        <br />
      </Trans>
      <div className="mb-15">
        <Checkbox isChecked={shouldHideRedirectModal} setIsChecked={setShouldHideRedirectModal}>
          <Trans>Don't show this message again for 30 days.</Trans>
        </Checkbox>
      </div>
      <Button variant="primary-action" className="w-full" to={appRedirectUrl} onClick={onClickAgree}>
        <Trans>Agree</Trans>
      </Button>
    </Modal>
  );
}
