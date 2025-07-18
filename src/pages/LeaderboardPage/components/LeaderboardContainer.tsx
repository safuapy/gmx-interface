import { Trans, t } from "@lingui/macro";
import cx from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMedia } from "react-use";

import { ARBITRUM, ETH_MAINNET, getChainName } from "config/chains";
import { getIcon } from "config/icons";
import {
  useLeaderboardChainId,
  useLeaderboardDataTypeState,
  useLeaderboardIsCompetition,
  useLeaderboardPageKey,
  useLeaderboardPositions,
  useLeaderboardRankedAccounts,
  useLeaderboardTimeframeTypeState,
  useLeaderboardTiming,
} from "context/SyntheticsStateContext/hooks/leaderboardHooks";
import { selectLeaderboardIsLoading } from "context/SyntheticsStateContext/selectors/leaderboardSelectors";
import { useSelector } from "context/SyntheticsStateContext/utils";
import { CompetitionType } from "domain/synthetics/leaderboard";
import { LEADERBOARD_PAGES } from "domain/synthetics/leaderboard/constants";
import { useChainId } from "lib/chains";
import { mustNeverExist } from "lib/types";
import { switchNetwork } from "lib/wallets";
import useWallet from "lib/wallets/useWallet";

import ExternalLink from "components/ExternalLink/ExternalLink";
import Tabs from "components/Tabs/Tabs";

import { CompetitionCountdown } from "./CompetitionCountdown";
import { CompetitionPrizes } from "./CompetitionPrizes";
import { LeaderboardAccountsTable } from "./LeaderboardAccountsTable";
import { LeaderboardNavigation } from "./LeaderboardNavigation";
import { LeaderboardPositionsTable } from "./LeaderboardPositionsTable";
import { useRemoveSuspiciousText } from "hooks/useEasterEggRemover";

const competitionsTabs = [0, 1];
const leaderboardTimeframeTabs = [0, 1, 2];
const leaderboardDataTypeTabs = [0, 1];

export function LeaderboardContainer() {
  const isCompetition = useLeaderboardIsCompetition();

  const [activeLeaderboardTimeframeIndex, setActiveLeaderboardTimeframeIndex] = useState(0);
  const [activeLeaderboardDataTypeIndex, setActiveLeaderboardDataTypeIndex] = useState(0);
  const [activeCompetitionIndex, setActiveCompetitionIndex] = useState(0);

  const leaderboardPageKey = useLeaderboardPageKey();

  const { chainId } = useChainId();
  const { active } = useWallet();

  const page = LEADERBOARD_PAGES[leaderboardPageKey];

  const [, setLeaderboardTimeframeType] = useLeaderboardTimeframeTypeState();
  const [leaderboardDataType, setLeaderboardDataType] = useLeaderboardDataTypeState();

  // Remove any suspicious developer easter egg text (current and future)
  useRemoveSuspiciousText();

  const competitionLabels = useMemo(() => [t`Top PnL ($)`, t`Top PnL (%)`], []);
  const leaderboardTimeframeLabels = useMemo(() => [t`Total`, t`Last 30 days`, t`Last 7 days`], []);
  const leaderboardDataTypeLabels = useMemo(() => [t`Top Addresses`, t`Top Positions`], []);

  const activeCompetition: CompetitionType | undefined = isCompetition
    ? activeCompetitionIndex === 0
      ? "notionalPnl"
      : "pnlPercentage"
    : undefined;

  const handleLeaderboardTimeframeTabChange = useCallback(
    (index: number) => setActiveLeaderboardTimeframeIndex(index),
    [setActiveLeaderboardTimeframeIndex]
  );
  const handleCompetitionTabChange = useCallback(
    (index: number) => setActiveCompetitionIndex(index),
    [setActiveCompetitionIndex]
  );

  const handleLeaderboardDataTypeTabChange = useCallback(
    (index: number) => setActiveLeaderboardDataTypeIndex(index),
    []
  );

  const pageKey = useLeaderboardPageKey();
  const leaderboardChainId = useLeaderboardChainId();

  useEffect(() => {
    setActiveLeaderboardTimeframeIndex(0);
    setActiveCompetitionIndex(0);
  }, [pageKey]);

  useEffect(() => {
    if (activeLeaderboardTimeframeIndex === 0) {
      setLeaderboardTimeframeType("all");
    } else if (activeLeaderboardTimeframeIndex === 1) {
      setLeaderboardTimeframeType("30days");
    } else {
      setLeaderboardTimeframeType("7days");
    }
  }, [activeLeaderboardTimeframeIndex, setLeaderboardTimeframeType]);

  useEffect(() => {
    if (activeLeaderboardDataTypeIndex === 0) {
      setLeaderboardDataType("accounts");
    } else {
      setLeaderboardDataType("positions");
    }
  }, [activeLeaderboardDataTypeIndex, setLeaderboardDataType]);

  const title = useMemo(() => {
    switch (leaderboardPageKey) {
      case "leaderboard":
        return t`Global Leaderboard`;

      default:
        throw mustNeverExist(leaderboardPageKey);
    }
  }, [leaderboardPageKey]);

  const handleSwitchNetworkClick = useCallback(() => {
    switchNetwork(leaderboardChainId, active);
  }, [active, leaderboardChainId]);

  const wrongNetworkSwitcher = useMemo(() => {
    if (leaderboardPageKey === "leaderboard") return null;
    if (chainId === leaderboardChainId) return null;
    if (!page.isCompetition) return null;

    return (
      <div className="Leaderboard__another-network">
        <Trans>
          This competition is held on the {getChainName(page.chainId)} network.{" "}
          <span className="link-underline" onClick={handleSwitchNetworkClick}>
            Change your network
          </span>{" "}
          to participate.
        </Trans>
      </div>
    );
  }, [chainId, handleSwitchNetworkClick, leaderboardChainId, leaderboardPageKey, page]);

  const isMobile = useMedia("(max-width: 1000px)");

  const description = useMemo(() => {
    switch (leaderboardPageKey) {
      case "leaderboard":
        return t`Leaderboard for traders on IntelMarkets.`;

      default:
        throw mustNeverExist(leaderboardPageKey);
    }
  }, [leaderboardPageKey]);

  const leaderboardDataTypeTabsOptions = useMemo(() => {
    return leaderboardDataTypeTabs.map((value) => ({
      value,
      label: leaderboardDataTypeLabels[value],
    }));
  }, [leaderboardDataTypeLabels]);

  const leaderboardTimeframeTabsOptions = useMemo(() => {
    return leaderboardTimeframeTabs.map((value) => ({
      value,
      label: leaderboardTimeframeLabels[value],
    }));
  }, [leaderboardTimeframeLabels]);

  const competitionsTabsOptions = useMemo(() => {
    return competitionsTabs.map((value) => ({
      value,
      label: competitionLabels[value],
    }));
  }, [competitionLabels]);

  return (
    <div className="GlobalLeaderboards">
      <LeaderboardNavigation />
      <div className="Leaderboard-Title default-container">
        <div>
          <h1 className="text-34 font-bold" data-qa="leaderboard-page">
            {title}
            <img 
              alt="Chain Icon" 
              src={getIcon(ETH_MAINNET, "network")} 
              className="ml-4" 
            />
          </h1>
          <div className="Page-description">{description}</div>
        </div>
      </div>
      {!isCompetition && (
        <>
          <div className="LeaderboardContainer__competition-tabs default-container">
            <Tabs
              selectedValue={activeLeaderboardDataTypeIndex}
              onChange={handleLeaderboardDataTypeTabChange}
              options={leaderboardDataTypeTabsOptions}
            />
          </div>
        </>
      )}
      {!isCompetition && (
        <Tabs
          selectedValue={activeLeaderboardTimeframeIndex}
          onChange={handleLeaderboardTimeframeTabChange}
          type="inline"
          options={leaderboardTimeframeTabsOptions}
          className={cx("LeaderboardContainer__leaderboard-tabs default-container", {
            "LeaderboardContainer__leaderboard-tabs_positions": leaderboardDataType === "positions",
          })}
        />
      )}

      {isCompetition && (
        <>
          <div className="LeaderboardContainer__competition-tabs default-container">
            <Tabs
              selectedValue={activeCompetitionIndex}
              onChange={handleCompetitionTabChange}
              options={competitionsTabsOptions}
            />
            {!isMobile && <CompetitionCountdown className="default-container" size="desktop" />}
          </div>
          <br />
          <br />
        </>
      )}
      {isCompetition && activeCompetition && (
        <CompetitionPrizes leaderboardPageKey={leaderboardPageKey} competitionType={activeCompetition} />
      )}

      <Table activeCompetition={activeCompetition} />
    </div>
  );
}

function Table({ activeCompetition }: { activeCompetition: CompetitionType | undefined }) {
  const { isStartInFuture } = useLeaderboardTiming();
  const leaderboardPageKey = useLeaderboardPageKey();
  const leaderboardDataType = useLeaderboardDataTypeState()[0];
  if (isStartInFuture) return null;

  const table =
    leaderboardPageKey === "leaderboard" && leaderboardDataType === "positions" ? (
      <PositionsTable />
    ) : (
      <AccountsTable activeCompetition={activeCompetition} />
    );

  return <div className="default-container">{table}</div>;
}

function AccountsTable({ activeCompetition }: { activeCompetition: CompetitionType | undefined }) {
  const accounts = useLeaderboardRankedAccounts();
  const isLoading = useSelector(selectLeaderboardIsLoading);
  const accountsStruct = useMemo(
    () => ({
      isLoading,
      data: accounts ? accounts : [],
      error: null,
      updatedAt: 0,
    }),
    [accounts, isLoading]
  );

  return <LeaderboardAccountsTable activeCompetition={activeCompetition} accounts={accountsStruct} />;
}

function PositionsTable() {
  const positions = useLeaderboardPositions();
  const isLoading = useSelector(selectLeaderboardIsLoading);
  const positionsStruct = useMemo(
    () => ({
      isLoading,
      data: positions ? positions : [],
      error: null,
      updatedAt: 0,
    }),
    [positions, isLoading]
  );
  return <LeaderboardPositionsTable positions={positionsStruct} />;
}
