import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { getSyntheticsGraphClient } from "lib/subgraph";
import { TIMEZONE_OFFSET_SEC } from "domain/prices";

type PositionVolumeInfosRespose = {
  positionVolumeInfos: {
    volumeUsd: string;
  }[];
};

function resolve(positionVolumeInfos: PositionVolumeInfosRespose["positionVolumeInfos"]) {
  return positionVolumeInfos.reduce((acc, { volumeUsd }) => {
    return acc + BigInt(volumeUsd);
  }, 0n);
}

export function use24hVolumeUsd(chainId, tokenAddress?: string) {
  const query = gql(`
{
  positionVolumeInfos(
    orderBy:timestamp
    orderDirection:desc
    where:{
      period: "1h"
      indexToken: "${tokenAddress?.toLocaleLowerCase()}"
      timestamp_gt: ${Math.floor(Date.now() / 1000 - 86400) + TIMEZONE_OFFSET_SEC} 
    }
  ) {
    id
    volumeUsd
  }
}
`);

  const [res, setRes] = useState<null | bigint>(null);

  useEffect(() => {
    const graphClient = getSyntheticsGraphClient(chainId);

    if (graphClient && tokenAddress) {
      graphClient
        .query<PositionVolumeInfosRespose>({ query })
        .then((data) => {
          setRes(resolve(data.data.positionVolumeInfos));
        })
        .catch((e) => {
          console.warn(e); // eslint-disable-line
        });
    }
  }, [setRes, query, chainId, tokenAddress]);

  return res;
}
