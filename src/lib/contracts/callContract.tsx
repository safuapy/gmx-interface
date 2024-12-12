import { Trans, t } from "@lingui/macro";
import ExternalLink from "components/ExternalLink/ExternalLink";
import { getIsFlagEnabled } from "config/ab";
import { getExplorerUrl } from "config/chains";
import { Contract, Overrides, Wallet } from "ethers";
import { OrderMetricId } from "lib/metrics/types";
import { sendOrderTxnSubmittedMetric, sendTxnErrorMetric } from "lib/metrics/utils";
import { getTenderlyConfig, simulateTxWithTenderly } from "lib/tenderly";
import React, { ReactNode } from "react";
import { helperToast } from "../helperToast";
import { extractError, getErrorMessage } from "./transactionErrors";
import { GasPriceData, getBestNonce, getGasLimit, getGasPrice } from "./utils";

export async function callContract(
  chainId: number,
  contract: Contract,
  method: string,
  params: any,
  opts: {
    value?: bigint | number;
    gasLimit?: bigint | number;
    gasPriceData?: GasPriceData;
    detailsMsg?: ReactNode;
    sentMsg?: string;
    successMsg?: string;
    successDetailsMsg?: ReactNode;
    hideSentMsg?: boolean;
    hideSuccessMsg?: boolean;
    showPreliminaryMsg?: boolean;
    failMsg?: string;
    customSigners?: Wallet[];
    customSignersGasLimits?: (bigint | number)[];
    customSignersGasPrices?: GasPriceData[];
    bestNonce?: number;
    setPendingTxns?: (txns: any) => void;
    metricId?: OrderMetricId;
  }
) {
  try {
    const wallet = contract.runner as Wallet;

    if (!Array.isArray(params) && typeof params === "object" && opts === undefined) {
      opts = params;
      params = [];
    }

    if (!opts) {
      opts = {};
    }

    const tenderlyConfig = getTenderlyConfig();

    if (tenderlyConfig) {
      await simulateTxWithTenderly(chainId, contract, wallet.address, method, params, {
        gasLimit: opts.gasLimit !== undefined ? BigInt(opts.gasLimit) : undefined,
        value: opts.value !== undefined ? BigInt(opts.value) : undefined,
        comment: `calling ${method}`,
      });
      return;
    }

    const txnOpts: Overrides = {};

    if (opts.value) {
      txnOpts.value = opts.value;
    }

    if (opts.customSigners?.length) {
      // If we send the transaction to multiple RPCs simultaneously,
      // we should specify a fixed nonce to avoid possible txn duplication.
      if (opts.bestNonce) {
        txnOpts.nonce = opts.bestNonce;
      } else {
        txnOpts.nonce = await getBestNonce([wallet, ...opts.customSigners]);
      }
    }

    if (opts.showPreliminaryMsg && !opts.hideSentMsg) {
      showCallContractToast({
        chainId,
        sentMsg: opts.sentMsg || t`Transaction sent.`,
        detailsMsg: opts.detailsMsg || "",
      });
    }

    const customSignerContracts = opts.customSigners?.map((signer) => contract.connect(signer)) || [];

    let isTxnExecuted = false;

    const customGasLimits = [opts.gasLimit].concat(opts.customSignersGasLimits || []);
    const customGasPrices = [opts.gasPriceData].concat(opts.customSignersGasPrices || []);

    const txnCalls = [contract, ...customSignerContracts].map(async (cntrct, i) => {
      const txnInstance = { ...txnOpts };

      if (!cntrct.runner?.provider) {
        throw new Error("No provider found on contract.");
      }

      async function retrieveGasLimit(force?: boolean) {
        // disable gas limits for testRemoveGasRequests flag (keep it for 1ct)
        if (!force && getIsFlagEnabled("testRemoveGasRequests") && !customSignerContracts.length) {
          return undefined;
        }

        return customGasLimits[i] !== undefined
          ? (customGasLimits[i] as bigint | number)
          : await getGasLimit(cntrct, method, params, opts.value);
      }

      async function retrieveGasPrice() {
        return customGasPrices[i] !== undefined
          ? (customGasPrices[i] as GasPriceData)
          : await getGasPrice(cntrct.runner!.provider!, chainId);
      }

      async function initGasParams(force?: boolean) {
        const gasLimitPromise = retrieveGasLimit(force).then((gasLimit) => {
          txnInstance.gasLimit = gasLimit;
        });

        const gasPriceDataPromise = retrieveGasPrice().then((gasPriceData) => {
          if ("gasPrice" in gasPriceData) {
            txnInstance.gasPrice = gasPriceData.gasPrice;
          } else {
            txnInstance.maxFeePerGas = gasPriceData.maxFeePerGas;
            txnInstance.maxPriorityFeePerGas = gasPriceData.maxPriorityFeePerGas;
          }
        });

        await Promise.all([gasLimitPromise, gasPriceDataPromise]);
      }

      await initGasParams();

      if (opts.metricId) {
        sendOrderTxnSubmittedMetric(opts.metricId);
      }

      return cntrct[method](...params, txnInstance)
        .then((res) => {
          isTxnExecuted = true;
          return res;
        })
        .catch(async (e) => {
          const [message] = extractError(e);

          // Fallback to gas requests in case of low gas price
          if (message?.includes("max fee per gas less than block base fee")) {
            sendTxnErrorMetric(opts.metricId as OrderMetricId, e, "sendingFallback");
            await initGasParams(true);
            return cntrct[method](...params, txnInstance);
          }

          if (message?.includes("nonce") && opts.customSigners && !isTxnExecuted) {
            sendTxnErrorMetric(opts.metricId as OrderMetricId, e, "sendingFallback");
            txnInstance.nonce = await getBestNonce([wallet, ...opts.customSigners]);
            return cntrct[method](...params, txnInstance);
          }

          throw e;
        });
    });

    const res = await Promise.any(txnCalls).catch(({ errors }) => {
      if (errors.length > 1) {
        // eslint-disable-next-line no-console
        console.error("All transactions failed", ...errors);
      }

      throw errors[0];
    });

    if (!opts.hideSentMsg) {
      showCallContractToast({
        chainId,
        sentMsg: opts.sentMsg || t`Transaction sent.`,
        detailsMsg: opts.detailsMsg || "",
        hash: res.hash,
      });
    }

    if (opts.setPendingTxns) {
      const message = opts.hideSuccessMsg ? undefined : opts.successMsg || t`Transaction completed!`;
      const pendingTxn = {
        hash: res.hash,
        message,
        messageDetails: opts.successDetailsMsg ?? opts.detailsMsg,
        metricId: opts.metricId,
      };
      opts.setPendingTxns((pendingTxns) => [...pendingTxns, pendingTxn]);
    }

    return res;
  } catch (e) {
    const { failMsg, autoCloseToast } = getErrorMessage(chainId, e, opts?.failMsg);

    helperToast.error(failMsg, { autoClose: autoCloseToast });
    throw e;
  }
}

function showCallContractToast({
  chainId,
  hash,
  sentMsg,
  detailsMsg,
  toastId,
}: {
  chainId: number;
  hash?: string;
  sentMsg: string;
  detailsMsg?: React.ReactNode;
  toastId?: string;
}) {
  helperToast.success(
    <div>
      {sentMsg || t`Transaction sent.`}{" "}
      {hash && (
        <ExternalLink href={getExplorerUrl(chainId) + "tx/" + hash}>
          <Trans>View status.</Trans>
        </ExternalLink>
      )}
      <br />
      {detailsMsg && <br />}
      {detailsMsg}
    </div>,
    {
      toastId,
    }
  );
}
