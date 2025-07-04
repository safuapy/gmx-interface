import { t } from "@lingui/macro";

import { getPageTitle } from "lib/legacy";

import SEO from "components/Common/SEO";
import Footer from "components/Footer/Footer";
import PageTitle from "components/PageTitle/PageTitle";
import TokenCard from "components/TokenCard/TokenCard";

import "./Buy.css";

export default function BuyGMXGLP() {
  return (
    <SEO title="Buy GLP or INTEL | IntelMarket">
      <div className="BuyGMXGLP page-layout">
        <div className="default-container">
          <div className="BuyGMXGLP-container">
            <PageTitle showNetworkIcon={false} isTop title={t`Protocol Tokens`} qa="buy-page" />
            <TokenCard />
          </div>
        </div>
        <Footer />
      </div>
    </SEO>
  );
}
