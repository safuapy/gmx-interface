export const negativeCollateralMock = {
  marketInfo: {
    marketTokenAddress: "0x47c031236e19d024b42f8AE6780E44A573170703",
    indexTokenAddress: "0x47904963fc8b2340414262125aF798B9655E58Cd",
    longTokenAddress: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
    shortTokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    isSameCollaterals: false,
    isSpotOnly: false,
    name: "BTC/USD [BTC-USDC]",
    data: "",
    isDisabled: false,
    longToken: {
      name: "Bitcoin (WBTC)",
      symbol: "BTC",
      assetSymbol: "WBTC",
      decimals: 8,
      address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/26115/thumb/btcb.png?1655921693",
      coingeckoUrl: "https://www.coingecko.com/en/coins/wrapped-bitcoin",
      explorerUrl: "https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
      isV1Available: true,
      prices: {
        minPrice: {
          type: "bigint",
          value: "67585124491900000000000000000000000",
        },
        maxPrice: {
          type: "bigint",
          value: "67586066000000000000000000000000000",
        },
      },
      balance: {
        type: "bigint",
        value: "0",
      },
    },
    shortToken: {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      isStable: true,
      isV1Available: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
      coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
      explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      prices: {
        minPrice: {
          type: "bigint",
          value: "999840970000000000000000000000",
        },
        maxPrice: {
          type: "bigint",
          value: "999940940000000000000000000000",
        },
      },
      balance: {
        type: "bigint",
        value: "0",
      },
    },
    indexToken: {
      name: "Bitcoin",
      symbol: "BTC",
      address: "0x47904963fc8b2340414262125aF798B9655E58Cd",
      isSynthetic: true,
      decimals: 8,
      imageUrl: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
      coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
      prices: {
        minPrice: {
          type: "bigint",
          value: "67585124491900000000000000000000000",
        },
        maxPrice: {
          type: "bigint",
          value: "67586066000000000000000000000000000",
        },
      },
    },
    longInterestUsd: {
      type: "bigint",
      value: "46460711625650361729398937638949377920",
    },
    shortInterestUsd: {
      type: "bigint",
      value: "43207369239126082980585502529570326374",
    },
    longInterestInTokens: {
      type: "bigint",
      value: "68833687254",
    },
    shortInterestInTokens: {
      type: "bigint",
      value: "65100543343",
    },
    longPoolAmount: {
      type: "bigint",
      value: "90771521387",
    },
    shortPoolAmount: {
      type: "bigint",
      value: "62265780543453",
    },
    maxLongPoolAmountForDeposit: {
      type: "bigint",
      value: "200000000000",
    },
    maxShortPoolAmountForDeposit: {
      type: "bigint",
      value: "100000000000000",
    },
    maxLongPoolAmount: {
      type: "bigint",
      value: "220000000000",
    },
    maxShortPoolAmount: {
      type: "bigint",
      value: "110000000000000",
    },
    longPoolAmountAdjustment: {
      type: "bigint",
      value: "0",
    },
    shortPoolAmountAdjustment: {
      type: "bigint",
      value: "0",
    },
    poolValueMin: {
      type: "bigint",
      value: "124254508720401023372948892228688013410",
    },
    poolValueMax: {
      type: "bigint",
      value: "124262853036321481237230892228688013410",
    },
    reserveFactorLong: {
      type: "bigint",
      value: "1350000000000000000000000000000",
    },
    reserveFactorShort: {
      type: "bigint",
      value: "1350000000000000000000000000000",
    },
    openInterestReserveFactorLong: {
      type: "bigint",
      value: "1300000000000000000000000000000",
    },
    openInterestReserveFactorShort: {
      type: "bigint",
      value: "1300000000000000000000000000000",
    },
    maxOpenInterestLong: {
      type: "bigint",
      value: "90000000000000000000000000000000000000",
    },
    maxOpenInterestShort: {
      type: "bigint",
      value: "90000000000000000000000000000000000000",
    },
    totalBorrowingFees: {
      type: "bigint",
      value: "328346495058029314056281141760256928",
    },
    positionImpactPoolAmount: {
      type: "bigint",
      value: "423060040",
    },
    minPositionImpactPoolAmount: {
      type: "bigint",
      value: "95000000",
    },
    positionImpactPoolDistributionRate: {
      type: "bigint",
      value: "552000000000000000000000000000000",
    },
    swapImpactPoolAmountLong: {
      type: "bigint",
      value: "1009646",
    },
    swapImpactPoolAmountShort: {
      type: "bigint",
      value: "6186257",
    },
    borrowingFactorLong: {
      type: "bigint",
      value: "7880000000000000000",
    },
    borrowingFactorShort: {
      type: "bigint",
      value: "7880000000000000000",
    },
    borrowingExponentFactorLong: {
      type: "bigint",
      value: "1400000000000000000000000000000",
    },
    borrowingExponentFactorShort: {
      type: "bigint",
      value: "1400000000000000000000000000000",
    },
    fundingFactor: {
      type: "bigint",
      value: "20000000000000000000000",
    },
    fundingExponentFactor: {
      type: "bigint",
      value: "1000000000000000000000000000000",
    },
    fundingIncreaseFactorPerSecond: {
      type: "bigint",
      value: "640000000000000000",
    },
    fundingDecreaseFactorPerSecond: {
      type: "bigint",
      value: "0",
    },
    thresholdForDecreaseFunding: {
      type: "bigint",
      value: "0",
    },
    thresholdForStableFunding: {
      type: "bigint",
      value: "50000000000000000000000000000",
    },
    minFundingFactorPerSecond: {
      type: "bigint",
      value: "300000000000000000000",
    },
    maxFundingFactorPerSecond: {
      type: "bigint",
      value: "10000000000000000000000",
    },
    pnlLongMax: {
      type: "bigint",
      value: "60621597330640833027062361050622080",
    },
    pnlLongMin: {
      type: "bigint",
      value: "61269672071665910601062361050622080",
    },
    pnlShortMax: {
      type: "bigint",
      value: "-791526951032503399414497470429673626",
    },
    pnlShortMin: {
      type: "bigint",
      value: "-790914024143785043631497470429673626",
    },
    netPnlMax: {
      type: "bigint",
      value: "-730905353701862566387435109379051546",
    },
    netPnlMin: {
      type: "bigint",
      value: "-729644352072119133030435109379051546",
    },
    maxPnlFactorForTradersLong: {
      type: "bigint",
      value: "900000000000000000000000000000",
    },
    maxPnlFactorForTradersShort: {
      type: "bigint",
      value: "900000000000000000000000000000",
    },
    minCollateralFactor: {
      type: "bigint",
      value: "5000000000000000000000000000",
    },
    minCollateralFactorForOpenInterestLong: {
      type: "bigint",
      value: "60000000000000000000",
    },
    minCollateralFactorForOpenInterestShort: {
      type: "bigint",
      value: "60000000000000000000",
    },
    claimableFundingAmountLong: {
      type: "bigint",
      value: "0",
    },
    claimableFundingAmountShort: {
      type: "bigint",
      value: "0",
    },
    positionFeeFactorForPositiveImpact: {
      type: "bigint",
      value: "500000000000000000000000000",
    },
    positionFeeFactorForNegativeImpact: {
      type: "bigint",
      value: "700000000000000000000000000",
    },
    positionImpactFactorPositive: {
      type: "bigint",
      value: "60000000000000000000",
    },
    positionImpactFactorNegative: {
      type: "bigint",
      value: "120000000000000000000",
    },
    maxPositionImpactFactorPositive: {
      type: "bigint",
      value: "5000000000000000000000000000",
    },
    maxPositionImpactFactorNegative: {
      type: "bigint",
      value: "5000000000000000000000000000",
    },
    maxPositionImpactFactorForLiquidations: {
      type: "bigint",
      value: "0",
    },
    positionImpactExponentFactor: {
      type: "bigint",
      value: "2000000000000000000000000000000",
    },
    swapFeeFactorForPositiveImpact: {
      type: "bigint",
      value: "500000000000000000000000000",
    },
    swapFeeFactorForNegativeImpact: {
      type: "bigint",
      value: "700000000000000000000000000",
    },
    swapImpactFactorPositive: {
      type: "bigint",
      value: "200000000000000000000",
    },
    swapImpactFactorNegative: {
      type: "bigint",
      value: "200000000000000000000",
    },
    swapImpactExponentFactor: {
      type: "bigint",
      value: "2000000000000000000000000000000",
    },
    borrowingFactorPerSecondForLongs: {
      type: "bigint",
      value: "6973438387839284240873",
    },
    borrowingFactorPerSecondForShorts: {
      type: "bigint",
      value: "0",
    },
    fundingFactorPerSecond: {
      type: "bigint",
      value: "8334687612897399720501",
    },
    longsPayShorts: true,
    virtualPoolAmountForLongToken: {
      type: "bigint",
      value: "90771521387",
    },
    virtualPoolAmountForShortToken: {
      type: "bigint",
      value: "62265780543453",
    },
    virtualInventoryForPositions: {
      type: "bigint",
      value: "-3356006815488278418874322805029051546",
    },
    virtualMarketId: "0xba1ff14bf93fbb00b6f43d3ad403cc4c6496c1bb88489075c8b1bc709bde9ebb",
    virtualLongTokenId: "0x0000000000000000000000000000000000000000000000000000000000000000",
    virtualShortTokenId: "0x0000000000000000000000000000000000000000000000000000000000000000",
  },
  collateralToken: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    isStable: true,
    isV1Available: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    prices: {
      minPrice: {
        type: "bigint",
        value: "999840970000000000000000000000",
      },
      maxPrice: {
        type: "bigint",
        value: "999940940000000000000000000000",
      },
    },
    balance: {
      type: "bigint",
      value: "0",
    },
  },
  isLong: true,
  position: {
    key: "0xAeD7998dd613Cca50c5294A5BACc18747bD1B061:0x47c031236e19d024b42f8AE6780E44A573170703:0xaf88d065e77c8cC2239327C5EDb3A432268e5831:true",
    contractKey: "0x59ffaeae2f7b81dfb68db5b5ce4d6e31bff8a3216fa006aab35e234ab0c3e4ec",
    account: "0xAeD7998dd613Cca50c5294A5BACc18747bD1B061",
    marketAddress: "0x47c031236e19d024b42f8AE6780E44A573170703",
    collateralTokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    sizeInUsd: {
      type: "bigint",
      value: "217673331659901622538920800000000000",
    },
    sizeInTokens: {
      type: "bigint",
      value: "544011271",
    },
    collateralAmount: {
      type: "bigint",
      value: "6537742847",
    },
    increasedAtBlock: {
      type: "bigint",
      value: "173887555",
    },
    decreasedAtBlock: {
      type: "bigint",
      value: "0",
    },
    isLong: true,
    pendingBorrowingFeesUsd: {
      type: "bigint",
      value: "12067953037127785189426503204807869",
    },
    fundingFeeAmount: {
      type: "bigint",
      value: "26139557654",
    },
    claimableLongTokenAmount: {
      type: "bigint",
      value: "116541",
    },
    claimableShortTokenAmount: {
      type: "bigint",
      value: "120640610",
    },
    marketInfo: {
      marketTokenAddress: "0x47c031236e19d024b42f8AE6780E44A573170703",
      indexTokenAddress: "0x47904963fc8b2340414262125aF798B9655E58Cd",
      longTokenAddress: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
      shortTokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      isSameCollaterals: false,
      isSpotOnly: false,
      name: "BTC/USD [BTC-USDC]",
      data: "",
      isDisabled: false,
      longToken: {
        name: "Bitcoin (WBTC)",
        symbol: "BTC",
        assetSymbol: "WBTC",
        decimals: 8,
        address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
        isShortable: true,
        imageUrl: "https://assets.coingecko.com/coins/images/26115/thumb/btcb.png?1655921693",
        coingeckoUrl: "https://www.coingecko.com/en/coins/wrapped-bitcoin",
        explorerUrl: "https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
        isV1Available: true,
        prices: {
          minPrice: {
            type: "bigint",
            value: "67585124491900000000000000000000000",
          },
          maxPrice: {
            type: "bigint",
            value: "67586066000000000000000000000000000",
          },
        },
        balance: {
          type: "bigint",
          value: "0",
        },
      },
      shortToken: {
        name: "USD Coin",
        symbol: "USDC",
        decimals: 6,
        address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        isStable: true,
        isV1Available: true,
        imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
        coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
        explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        prices: {
          minPrice: {
            type: "bigint",
            value: "999840970000000000000000000000",
          },
          maxPrice: {
            type: "bigint",
            value: "999940940000000000000000000000",
          },
        },
        balance: {
          type: "bigint",
          value: "0",
        },
      },
      indexToken: {
        name: "Bitcoin",
        symbol: "BTC",
        address: "0x47904963fc8b2340414262125aF798B9655E58Cd",
        isSynthetic: true,
        decimals: 8,
        imageUrl: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
        coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
        prices: {
          minPrice: {
            type: "bigint",
            value: "67585124491900000000000000000000000",
          },
          maxPrice: {
            type: "bigint",
            value: "67586066000000000000000000000000000",
          },
        },
      },
      longInterestUsd: {
        type: "bigint",
        value: "46460711625650361729398937638949377920",
      },
      shortInterestUsd: {
        type: "bigint",
        value: "43207369239126082980585502529570326374",
      },
      longInterestInTokens: {
        type: "bigint",
        value: "68833687254",
      },
      shortInterestInTokens: {
        type: "bigint",
        value: "65100543343",
      },
      longPoolAmount: {
        type: "bigint",
        value: "90771521387",
      },
      shortPoolAmount: {
        type: "bigint",
        value: "62265780543453",
      },
      maxLongPoolAmountForDeposit: {
        type: "bigint",
        value: "200000000000",
      },
      maxShortPoolAmountForDeposit: {
        type: "bigint",
        value: "100000000000000",
      },
      maxLongPoolAmount: {
        type: "bigint",
        value: "220000000000",
      },
      maxShortPoolAmount: {
        type: "bigint",
        value: "110000000000000",
      },
      longPoolAmountAdjustment: {
        type: "bigint",
        value: "0",
      },
      shortPoolAmountAdjustment: {
        type: "bigint",
        value: "0",
      },
      poolValueMin: {
        type: "bigint",
        value: "124254508720401023372948892228688013410",
      },
      poolValueMax: {
        type: "bigint",
        value: "124262853036321481237230892228688013410",
      },
      reserveFactorLong: {
        type: "bigint",
        value: "1350000000000000000000000000000",
      },
      reserveFactorShort: {
        type: "bigint",
        value: "1350000000000000000000000000000",
      },
      openInterestReserveFactorLong: {
        type: "bigint",
        value: "1300000000000000000000000000000",
      },
      openInterestReserveFactorShort: {
        type: "bigint",
        value: "1300000000000000000000000000000",
      },
      maxOpenInterestLong: {
        type: "bigint",
        value: "90000000000000000000000000000000000000",
      },
      maxOpenInterestShort: {
        type: "bigint",
        value: "90000000000000000000000000000000000000",
      },
      totalBorrowingFees: {
        type: "bigint",
        value: "328346495058029314056281141760256928",
      },
      positionImpactPoolAmount: {
        type: "bigint",
        value: "423060040",
      },
      minPositionImpactPoolAmount: {
        type: "bigint",
        value: "95000000",
      },
      positionImpactPoolDistributionRate: {
        type: "bigint",
        value: "552000000000000000000000000000000",
      },
      swapImpactPoolAmountLong: {
        type: "bigint",
        value: "1009646",
      },
      swapImpactPoolAmountShort: {
        type: "bigint",
        value: "6186257",
      },
      borrowingFactorLong: {
        type: "bigint",
        value: "7880000000000000000",
      },
      borrowingFactorShort: {
        type: "bigint",
        value: "7880000000000000000",
      },
      borrowingExponentFactorLong: {
        type: "bigint",
        value: "1400000000000000000000000000000",
      },
      borrowingExponentFactorShort: {
        type: "bigint",
        value: "1400000000000000000000000000000",
      },
      fundingFactor: {
        type: "bigint",
        value: "20000000000000000000000",
      },
      fundingExponentFactor: {
        type: "bigint",
        value: "1000000000000000000000000000000",
      },
      fundingIncreaseFactorPerSecond: {
        type: "bigint",
        value: "640000000000000000",
      },
      fundingDecreaseFactorPerSecond: {
        type: "bigint",
        value: "0",
      },
      thresholdForDecreaseFunding: {
        type: "bigint",
        value: "0",
      },
      thresholdForStableFunding: {
        type: "bigint",
        value: "50000000000000000000000000000",
      },
      minFundingFactorPerSecond: {
        type: "bigint",
        value: "300000000000000000000",
      },
      maxFundingFactorPerSecond: {
        type: "bigint",
        value: "10000000000000000000000",
      },
      pnlLongMax: {
        type: "bigint",
        value: "60621597330640833027062361050622080",
      },
      pnlLongMin: {
        type: "bigint",
        value: "61269672071665910601062361050622080",
      },
      pnlShortMax: {
        type: "bigint",
        value: "-791526951032503399414497470429673626",
      },
      pnlShortMin: {
        type: "bigint",
        value: "-790914024143785043631497470429673626",
      },
      netPnlMax: {
        type: "bigint",
        value: "-730905353701862566387435109379051546",
      },
      netPnlMin: {
        type: "bigint",
        value: "-729644352072119133030435109379051546",
      },
      maxPnlFactorForTradersLong: {
        type: "bigint",
        value: "900000000000000000000000000000",
      },
      maxPnlFactorForTradersShort: {
        type: "bigint",
        value: "900000000000000000000000000000",
      },
      minCollateralFactor: {
        type: "bigint",
        value: "5000000000000000000000000000",
      },
      minCollateralFactorForOpenInterestLong: {
        type: "bigint",
        value: "60000000000000000000",
      },
      minCollateralFactorForOpenInterestShort: {
        type: "bigint",
        value: "60000000000000000000",
      },
      claimableFundingAmountLong: {
        type: "bigint",
        value: "0",
      },
      claimableFundingAmountShort: {
        type: "bigint",
        value: "0",
      },
      positionFeeFactorForPositiveImpact: {
        type: "bigint",
        value: "500000000000000000000000000",
      },
      positionFeeFactorForNegativeImpact: {
        type: "bigint",
        value: "700000000000000000000000000",
      },
      positionImpactFactorPositive: {
        type: "bigint",
        value: "60000000000000000000",
      },
      positionImpactFactorNegative: {
        type: "bigint",
        value: "120000000000000000000",
      },
      maxPositionImpactFactorPositive: {
        type: "bigint",
        value: "5000000000000000000000000000",
      },
      maxPositionImpactFactorNegative: {
        type: "bigint",
        value: "5000000000000000000000000000",
      },
      maxPositionImpactFactorForLiquidations: {
        type: "bigint",
        value: "0",
      },
      positionImpactExponentFactor: {
        type: "bigint",
        value: "2000000000000000000000000000000",
      },
      swapFeeFactorForPositiveImpact: {
        type: "bigint",
        value: "500000000000000000000000000",
      },
      swapFeeFactorForNegativeImpact: {
        type: "bigint",
        value: "700000000000000000000000000",
      },
      swapImpactFactorPositive: {
        type: "bigint",
        value: "200000000000000000000",
      },
      swapImpactFactorNegative: {
        type: "bigint",
        value: "200000000000000000000",
      },
      swapImpactExponentFactor: {
        type: "bigint",
        value: "2000000000000000000000000000000",
      },
      borrowingFactorPerSecondForLongs: {
        type: "bigint",
        value: "6973438387839284240873",
      },
      borrowingFactorPerSecondForShorts: {
        type: "bigint",
        value: "0",
      },
      fundingFactorPerSecond: {
        type: "bigint",
        value: "8334687612897399720501",
      },
      longsPayShorts: true,
      virtualPoolAmountForLongToken: {
        type: "bigint",
        value: "90771521387",
      },
      virtualPoolAmountForShortToken: {
        type: "bigint",
        value: "62265780543453",
      },
      virtualInventoryForPositions: {
        type: "bigint",
        value: "-3356006815488278418874322805029051546",
      },
      virtualMarketId: "0xba1ff14bf93fbb00b6f43d3ad403cc4c6496c1bb88489075c8b1bc709bde9ebb",
      virtualLongTokenId: "0x0000000000000000000000000000000000000000000000000000000000000000",
      virtualShortTokenId: "0x0000000000000000000000000000000000000000000000000000000000000000",
    },
    indexToken: {
      name: "Bitcoin",
      symbol: "BTC",
      address: "0x47904963fc8b2340414262125aF798B9655E58Cd",
      isSynthetic: true,
      decimals: 8,
      imageUrl: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
      coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
      prices: {
        minPrice: {
          type: "bigint",
          value: "67585124491900000000000000000000000",
        },
        maxPrice: {
          type: "bigint",
          value: "67586066000000000000000000000000000",
        },
      },
    },
    collateralToken: {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      isStable: true,
      isV1Available: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
      coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
      explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      prices: {
        minPrice: {
          type: "bigint",
          value: "999840970000000000000000000000",
        },
        maxPrice: {
          type: "bigint",
          value: "999940940000000000000000000000",
        },
      },
      balance: {
        type: "bigint",
        value: "0",
      },
    },
    pnlToken: {
      name: "Bitcoin (WBTC)",
      symbol: "BTC",
      assetSymbol: "WBTC",
      decimals: 8,
      address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/26115/thumb/btcb.png?1655921693",
      coingeckoUrl: "https://www.coingecko.com/en/coins/wrapped-bitcoin",
      explorerUrl: "https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
      isV1Available: true,
      prices: {
        minPrice: {
          type: "bigint",
          value: "67585124491900000000000000000000000",
        },
        maxPrice: {
          type: "bigint",
          value: "67586066000000000000000000000000000",
        },
      },
      balance: {
        type: "bigint",
        value: "0",
      },
    },
    markPrice: {
      type: "bigint",
      value: "67585124491900000000000000000000000",
    },
    entryPrice: {
      type: "bigint",
      value: "40012651072426332604222973900000000",
    },
    liquidationPrice: {
      type: "bigint",
      value: "46061678052600878882676523000000000",
    },
    collateralUsd: {
      type: "bigint",
      value: "6536703149755041590000000000000000",
    },
    remainingCollateralUsd: {
      type: "bigint",
      value: "-31666650567519027979426503204807869",
    },
    remainingCollateralAmount: {
      type: "bigint",
      value: "-31671687315",
    },
    hasLowCollateral: false,
    leverage: {
      type: "bigint",
      value: "18395",
    },
    leverageWithPnl: {
      type: "bigint",
      value: "18395",
    },
    pnl: {
      type: "bigint",
      value: "149997363095415859510079200000000000",
    },
    pnlPercentage: {
      type: "bigint",
      value: "229469",
    },
    pnlAfterFees: {
      type: "bigint",
      value: "111685172712311839129383236395192131",
    },
    pnlAfterFeesPercentage: {
      type: "bigint",
      value: "168060",
    },
    netValue: {
      type: "bigint",
      value: "118221875862066880719383236395192131",
    },
    closingFeeUsd: {
      type: "bigint",
      value: "108836665829950811269460400000000",
    },
    uiFeeUsd: {
      type: "bigint",
      value: "0",
    },
    pendingFundingFeesUsd: {
      type: "bigint",
      value: "26135400680146284380000000000000000",
    },
    pendingClaimableFundingFeesUsd: {
      type: "bigint",
      value: "199385804457896879000000000000000",
    },
  },
  closeSizeUsd: {
    type: "bigint",
    value: "108836660000000000000000000000000000",
  },
  keepLeverage: true,
  acceptablePriceImpactBuffer: 30,
  minCollateralUsd: {
    type: "bigint",
    value: "1000000000000000000000000000000",
  },
  minPositionSizeUsd: {
    type: "bigint",
    value: "1000000000000000000000000000000",
  },
  uiFeeFactor: {
    type: "bigint",
    value: "0",
  },
  receiveToken: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    isStable: true,
    isV1Available: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    prices: {
      minPrice: {
        type: "bigint",
        value: "999840970000000000000000000000",
      },
      maxPrice: {
        type: "bigint",
        value: "999940940000000000000000000000",
      },
    },
    balance: {
      type: "bigint",
      value: "0",
    },
  },
};

export const negativeCollateralResult = {
  acceptablePrice: 67611068453572039124830307035303415n,
  acceptablePriceDeltaBps: 3n,
  borrowingFeeUsd: 12067953036175052760000000000000000n,
  collateralDeltaAmount: 0n,
  collateralDeltaUsd: 0n,
  collateralPrice: 999840970000000000000000000000n,
  decreaseSwapType: 1,
  estimatedPnl: 149997363095415859510079200000000000n,
  estimatedPnlPercentage: 229469n,
  feeDiscountUsd: 0n,
  fundingFeeUsd: 26135400680146284380000000000000000n,
  indexPrice: 67585124491900000000000000000000000n,
  isFullClose: false,
  payedOutputUsd: 38289106381905852990000000000000000n,
  payedRemainingCollateralAmount: 0n,
  payedRemainingCollateralUsd: 0n,
  positionFeeUsd: 54418329476575450000000000000000n,
  positionPriceImpactDeltaUsd: 41779225188690234045245790627971n,
  priceImpactDiffUsd: 0n,
  realizedPnl: 74998677549699283931357827612331215n,
  realizedPnlPercentage: 114734n,
  receiveTokenAmount: 36757195889n,
  receiveUsd: 0n,
  recommendedAcceptablePriceDeltaBps: 0n,
  sizeDeltaInTokens: 272005621n,
  sizeDeltaUsd: 108836660000000000000000000000000000n,
  swapProfitFeeUsd: 31334336747782407082701536701479n,
  swapUiFeeUsd: 0n,
  triggerOrderType: undefined,
  triggerPrice: 0n,
  triggerThresholdType: undefined,
  uiFeeUsd: 0n,
};
