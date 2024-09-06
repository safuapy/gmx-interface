import { MARKETS } from "config/static/markets";

import { ARBITRUM, AVALANCHE } from "config/static/chains";

const stubArb = [
      {
        "indexToken": "0x47904963fc8b2340414262125aF798B9655E58Cd",
        "longToken": "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0x47c031236e19d024b42f8AE6780E44A573170703"
      },
      {
        "indexToken": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        "longToken": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0x70d95587d40A2caf56bd97485aB3Eec10Bee6336"
      },
      {
        "indexToken": "0xC4da4c24fd591125c3F47b340b6f4f76111883d8",
        "longToken": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0x6853EA96FF216fAb11D2d930CE3C508556A4bdc4"
      },
      {
        "indexToken": "0x2bcC6D6CdBbDC0a4071e48bb3B969b06B3330c07",
        "longToken": "0x2bcC6D6CdBbDC0a4071e48bb3B969b06B3330c07",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0x09400D9DB990D5ed3f35D7be61DfAEB900Af03C9"
      },
      {
        "indexToken": "0xB46A094Bc4B0adBD801E14b9DB95e05E28962764",
        "longToken": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0xD9535bB5f58A1a75032416F2dFe7880C30575a41"
      },
      {
        "indexToken": "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0",
        "longToken": "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0xc7Abb2C5f3BF3CEB389dF0Eecd6120D451170B50"
      },
      {
        "indexToken": "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
        "longToken": "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0x7f1fa204bb700853D36994DA19F830b6Ad18455C"
      },
      {
        "indexToken": "0x912CE59144191C1204E64559FE8253a0e49E6548",
        "longToken": "0x912CE59144191C1204E64559FE8253a0e49E6548",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0xC25cEf6061Cf5dE5eb761b50E4743c1F5D7E5407"
      },
      {
        "indexToken": "0x0000000000000000000000000000000000000000",
        "longToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "shortToken": "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
        "id": "0x9C2433dFD71096C435Be9465220BB2B189375eA7"
      },
      {
        "indexToken": "0x0000000000000000000000000000000000000000",
        "longToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "shortToken": "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        "id": "0xB686BcB112660343E6d15BDb65297e110C8311c4"
      },
      {
        "indexToken": "0x0000000000000000000000000000000000000000",
        "longToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "shortToken": "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        "id": "0xe2fEDb9e6139a182B98e7C2688ccFa3e9A53c665"
      },
      {
        "indexToken": "0xc14e065b0067dE91534e032868f5Ac6ecf2c6868",
        "longToken": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0x0CCB4fAa6f1F1B30911619f1184082aB4E25813c"
      },
      {
        "indexToken": "0xa9004A5421372E1D83fB1f85b0fc986c912f91f3",
        "longToken": "0xa9004A5421372E1D83fB1f85b0fc986c912f91f3",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0x2d340912Aa47e33c90Efb078e69E70EFe2B34b9B"
      },
      {
        "indexToken": "0xba5DdD1f9d7F570dc94a51479a000E3BCE967196",
        "longToken": "0xba5DdD1f9d7F570dc94a51479a000E3BCE967196",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0x1CbBa6346F110c8A5ea739ef2d1eb182990e4EB2"
      },
      {
        "indexToken": "0x7D7F1765aCbaF847b9A1f7137FE8Ed4931FbfEbA",
        "longToken": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0x248C35760068cE009a13076D573ed3497A47bCD4"
      },
      {
        "indexToken": "0x1FF7F3EFBb9481Cbd7db4F932cBCD4467144237C",
        "longToken": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0x63Dc80EE90F26363B3FCD609007CC9e14c8991BE"
      },
      {
        "indexToken": "0x565609fAF65B92F7be02468acF86f8979423e514",
        "longToken": "0x565609fAF65B92F7be02468acF86f8979423e514",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0x7BbBf946883a5701350007320F525c5379B8178A"
      },
      {
        "indexToken": "0xaC800FD6159c2a2CB8fC31EF74621eB430287a5A",
        "longToken": "0xaC800FD6159c2a2CB8fC31EF74621eB430287a5A",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0x4fDd333FF9cA409df583f306B6F5a7fFdE790739"
      },
      {
        "indexToken": "0x47904963fc8b2340414262125aF798B9655E58Cd",
        "longToken": "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
        "shortToken": "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
        "id": "0x7C11F78Ce78768518D743E81Fdfa2F860C6b9A77"
      },
      {
        "indexToken": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        "longToken": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        "shortToken": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        "id": "0x450bb6774Dd8a756274E0ab4107953259d2ac541"
      },
      {
        "indexToken": "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
        "longToken": "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0x55391D178Ce46e7AC8eaAEa50A72D1A5a8A622Da"
      },
      {
        "indexToken": "0x25d887Ce7a35172C62FeBFD67a1856F20FaEbB00",
        "longToken": "0x25d887Ce7a35172C62FeBFD67a1856F20FaEbB00",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0x2b477989A149B17073D9C9C82eC9cB03591e20c6"
      },
      {
        "indexToken": "0xA1b91fe9FD52141Ff8cac388Ce3F10BFDc1dE79d",
        "longToken": "0xA1b91fe9FD52141Ff8cac388Ce3F10BFDc1dE79d",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0x0418643F94Ef14917f1345cE5C460C37dE463ef7"
      },
      {
        "indexToken": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        "longToken": "0x5979D7b546E38E414F7E9822514be443A4800529",
        "shortToken": "0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34",
        "id": "0x0Cf1fb4d1FF67A3D8Ca92c9d6643F8F9be8e03E5"
      },
      {
        "indexToken": "0x0000000000000000000000000000000000000000",
        "longToken": "0x5979D7b546E38E414F7E9822514be443A4800529",
        "shortToken": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        "id": "0xb56E5E2eB50cf5383342914b0C85Fe62DbD861C8"
      },
      {
        "indexToken": "0x0000000000000000000000000000000000000000",
        "longToken": "0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0x45aD16Aaa28fb66Ef74d5ca0Ab9751F2817c81a4"
      },
      {
        "indexToken": "0x3E57D02f9d196873e55727382974b02EdebE6bfd",
        "longToken": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0xB62369752D8Ad08392572db6d0cc872127888beD"
      },
      {
        "indexToken": "0x74885b4D524d497261259B38900f54e6dbAd2210",
        "longToken": "0x74885b4D524d497261259B38900f54e6dbAd2210",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0xdf034cd3df9a80eABFA0556232a91E03Ca67D5Cb"
      },
      {
        "indexToken": "0xBaf07cF91D413C0aCB2b7444B9Bf13b4e03c9D71",
        "longToken": "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0xD9377d9B9a2327C7778867203deeA73AB8a68b6B"
      },
      {
        "indexToken": "0x1E15d08f3CA46853B692EE28AE9C7a0b88a9c994",
        "longToken": "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
        "shortToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "id": "0x93385F7C646A3048051914BDFaC25F4d620aeDF1"
      }
    ];

const stubAv = [
  {
    "indexToken": "0x152b9d0FdC40C096757F570A51E494bd4b943E50",
    "longToken": "0x152b9d0FdC40C096757F570A51E494bd4b943E50",
    "shortToken": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    "id": "0xFb02132333A79C8B5Bd0b64E3AbccA5f7fAf2937"
  },
  {
    "indexToken": "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
    "longToken": "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
    "shortToken": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    "id": "0xB7e69749E3d2EDd90ea59A4932EFEa2D41E245d7"
  },
  {
    "indexToken": "0xC301E6fe31062C557aEE806cc6A841aE989A3ac6",
    "longToken": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    "shortToken": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    "id": "0x8970B527E84aA17a33d38b65e9a5Ab5817FC0027"
  },
  {
    "indexToken": "0xFE6B19286885a4F7F55AdAD09C3Cd1f906D2478F",
    "longToken": "0xFE6B19286885a4F7F55AdAD09C3Cd1f906D2478F",
    "shortToken": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    "id": "0xd2eFd1eA687CD78c41ac262B3Bc9B53889ff1F70"
  },
  {
    "indexToken": "0x8E9C35235C38C44b5a53B56A41eaf6dB9a430cD6",
    "longToken": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    "shortToken": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    "id": "0xA74586743249243D3b77335E15FE768bA8E1Ec5A"
  },
  {
    "indexToken": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    "longToken": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    "shortToken": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    "id": "0x913C1F46b48b3eD35E7dc3Cf754d4ae8499F31CF"
  },
  {
    "indexToken": "0x0000000000000000000000000000000000000000",
    "longToken": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    "shortToken": "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
    "id": "0xf3652Eba45DC761e7ADd4091627d5Cda21F61613"
  },
  {
    "indexToken": "0x0000000000000000000000000000000000000000",
    "longToken": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    "shortToken": "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
    "id": "0x297e71A931C5825867E8Fb937Ae5cda9891C2E99"
  },
  {
    "indexToken": "0x0000000000000000000000000000000000000000",
    "longToken": "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
    "shortToken": "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
    "id": "0xA7b768d6a1f746fd5a513D440DF2970ff099B0fc"
  },
  {
    "indexToken": "0x0000000000000000000000000000000000000000",
    "longToken": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    "shortToken": "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
    "id": "0xDf8c9BD26e7C1A331902758Eb013548B2D22ab3b"
  },
  {
    "indexToken": "0x34B2885D617cE2ddeD4F60cCB49809fc17bb58Af",
    "longToken": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    "shortToken": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    "id": "0xD1cf931fa12783c1dd5AbB77a0706c27CF352f25"
  },
  {
    "indexToken": "0x152b9d0FdC40C096757F570A51E494bd4b943E50",
    "longToken": "0x152b9d0FdC40C096757F570A51E494bd4b943E50",
    "shortToken": "0x152b9d0FdC40C096757F570A51E494bd4b943E50",
    "id": "0x3ce7BCDB37Bf587d1C17B930Fa0A7000A0648D12"
  },
  {
    "indexToken": "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
    "longToken": "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
    "shortToken": "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
    "id": "0x2A3Cf4ad7db715DF994393e4482D6f1e58a1b533"
  },
  {
    "indexToken": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    "longToken": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    "shortToken": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    "id": "0x08b25A2a89036d298D6dB8A74ace9d1ce6Db15E5"
  }
];

function checkStub(stub, chain) {
  stub.forEach((m) => {
    if (!MARKETS[chain][m.id]) {
      throw new Error('!!!!!');
    }
    if (MARKETS[chain][m.id].marketTokenAddress !== m.id) {
      throw new Error('!!!!!');
    }
    if (MARKETS[chain][m.id].longTokenAddress !== m.longToken) {
      throw new Error('!!!!!');
    }
    if (MARKETS[chain][m.id].shortTokenAddress !== m.shortToken) {
      throw new Error('!!!!!');
    }
    if (MARKETS[chain][m.id].indexTokenAddress !== m.indexToken) {
      throw new Error('!!!!!');
    }
  });
}

checkStub(stubArb, ARBITRUM);
checkStub(stubAv, AVALANCHE);

console.log('ok');