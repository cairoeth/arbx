import { ArrowTrendingUpIcon, ArrowUpTrayIcon, TrophyIcon, ChevronDownIcon, ChevronRightIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline"
import Image from 'next/image'
import { useContractRead, useContractReads, useNetwork } from 'wagmi'
import { contracts } from 'components/helpers/contracts'
import { useState, useEffect } from "react";
import { AddLiquidityModal } from 'components/liquidity/modals/addLiquidity'
import { RemoveLiquidityModal } from 'components/liquidity/modals/removeLiquidity'

type Props = {
  data: any
  isError: boolean
  isLoading: boolean
}

const tokens = [
  {
    name: 'weth',
    image: 'https://icons.llamao.fi/icons/agg_icons/ethereum.png',
    chains: [
      {
        name: 'arbitrum',
        image: 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg',
        address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'arbitrum Goerli',
        image: 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg',
        address: '0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'avalanche',
        image: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
        address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'celo',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x66803FB87aBd4aaC3cbB3fAd7C3aa01f6F3FB207',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'goerli',
        image: 'https://icons.llamao.fi/icons/chains/rsz_goerli.png',
        address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'gnosis',
        image: 'https://icons.llamao.fi/icons/chains/rsz_gnosis.jpg',
        address: '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'linea',
        image: 'https://icons.llamao.fi/icons/chains/rsz_linea.jpg',
        address: '0x2C1b868d6596a18e32E61B901E4060C872647b6C',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'optimism',
        image: 'https://icons.llamao.fi/icons/chains/rsz_optimism.jpg',
        address: '0x4200000000000000000000000000000000000006',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'polygon',
        image: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
        address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'usdc',
    image: 'https://icons.llamao.fi/icons/pegged/usd-coin.jpg',
    chains: [
      {
        name: 'arbitrum',
        image: 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg',
        address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'arbitrum Goerli',
        image: 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg',
        address: '0x8192dA45b932EFDc56dee24aC205d6Bcf209AA73',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'avalanche',
        image: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
        address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'celo',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x37f750B7cC259A2f741AF45294f6a16572CF5cAd',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'goerli',
        image: 'https://icons.llamao.fi/icons/chains/rsz_goerli.png',
        address: '0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'gnosis',
        image: 'https://icons.llamao.fi/icons/chains/rsz_gnosis.jpg',
        address: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'linea',
        image: 'https://icons.llamao.fi/icons/chains/rsz_linea.jpg',
        address: '0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'mantle',
        address: '0xc92747b1e4Bd5F89BBB66bAE657268a5F4c4850C',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'optimism',
        image: 'https://icons.llamao.fi/icons/chains/rsz_optimism.jpg',
        address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'polygon',
        image: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
        address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'polygon Mumbai',
        image: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
        address: '0x0FA8781a83E46826621b3BC094Ea2A0212e71B23',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'arb',
    image: 'https://icons.llamao.fi/icons/protocols/arbitrum.png',
    chains: [
      {
        name: 'arbitrum',
        image: 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg',
        address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'usdt',
    image: 'https://icons.llamao.fi/icons/pegged/tether.jpg',
    chains: [
      {
        name: 'arbitrum',
        image: 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg',
        address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'linea',
        image: 'https://icons.llamao.fi/icons/chains/rsz_linea.jpg',
        address: '0x1990BC6dfe2ef605Bfc08f5A23564dB75642Ad73',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'optimism',
        image: 'https://icons.llamao.fi/icons/chains/rsz_optimism.jpg',
        address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'polygon',
        image: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
        address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'stg',
    image: '',
    chains: [
      {
        name: 'arbitrum',
        image: 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg',
        address: '0x6694340fc020c5E6B96567843da2df01b2CE1eb6',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'dodo',
    image: 'https://icons.llamao.fi/icons/protocols/dodo.png',
    chains: [
      {
        name: 'arbitrum',
        image: 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg',
        address: '0x69Eb4FA4a2fbd498C257C57Ea8b7655a2559A581',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'mtg',
    image: '',
    chains: [
      {
        name: 'arbitrum',
        image: 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg',
        address: '0x748b5BE12ac1Ce2EF73035189F943591C1822B7d',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'pendle',
    image: '',
    chains: [
      {
        name: 'arbitrum',
        image: 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg',
        address: '0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'gxy',
    image: '',
    chains: [
      {
        name: 'arbitrum',
        image: 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg',
        address: '0x22D967F10eC4364Cb18974C59699b27a2038524C',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'ausdc',
    image: 'https://icons.llamao.fi/icons/protocols/acala-dollar-(ausd).png',
    chains: [
      {
        name: 'arbitrum Goerli',
        image: 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg',
        address: '0x254d06f33bDc5b8ee05b2ea472107E300226659A',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'avalanche Fuji',
        image: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
        address: '0x57F1c63497AEe0bE305B8852b354CEc793da43bB',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'arbs',
    image: '',
    chains: [
      {
        name: 'arbitrum Goerli',
        image: 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg',
        address: '0xbe737d08Fb505AD45e08a89Ac7FDA9791f025bF2',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'png',
    image: '',
    chains: [
      {
        name: 'avalanche',
        image: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
        address: '0x60781C2586D68229fde47564546784ab3fACA982',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'wavax',
    image: '',
    chains: [
      {
        name: 'avalanche',
        image: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
        address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'avalanche Fuji',
        image: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
        address: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'prmd',
    image: '',
    chains: [
      {
        name: 'avalanche',
        image: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
        address: '0x74c2A8a0161FF501d44A71C2E2dFDB5485912B1F',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'spell',
    image: '',
    chains: [
      {
        name: 'avalanche',
        image: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
        address: '0xCE1bFFBD5374Dac86a2893119683F4911a2F7814',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'cook',
    image: '',
    chains: [
      {
        name: 'avalanche',
        image: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
        address: '0x637afeff75ca669fF92e4570B14D6399A658902f',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'hec',
    image: '',
    chains: [
      {
        name: 'avalanche',
        image: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
        address: '0xC7f4debC8072e23fe9259A5C0398326d8EfB7f5c',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'klo',
    image: '',
    chains: [
      {
        name: 'avalanche',
        image: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
        address: '0xb27c8941a7Df8958A1778c0259f76D1F8B711C35',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'link',
    image: '',
    chains: [
      {
        name: 'avalanche',
        image: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
        address: '0x5947BB275c521040051D82396192181b413227A3',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'avalanche Fuji',
        image: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
        address: '0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'optimism',
        image: 'https://icons.llamao.fi/icons/chains/rsz_optimism.jpg',
        address: '0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'los',
    image: '',
    chains: [
      {
        name: 'avalanche',
        image: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
        address: '0x449674B82F05d498E126Dd6615a1057A9c088f2C',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'hct',
    image: '',
    chains: [
      {
        name: 'avalanche',
        image: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
        address: '0x45C13620B55C35A5f539d26E88247011Eb10fDbd',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'axial',
    image: '',
    chains: [
      {
        name: 'avalanche',
        image: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
        address: '0x57b8a194230ef402584130B1eD31d2C4682d7a71',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'axial',
    image: '',
    chains: [
      {
        name: 'avalanche',
        image: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
        address: '0x57b8a194230ef402584130B1eD31d2C4682d7a71',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'snob',
    image: '',
    chains: [
      {
        name: 'avalanche Fuji',
        image: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
        address: '0xF319e2f610462F846d6e93F51CdC862EEFF2a554',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'celo',
    image: '',
    chains: [
      {
        name: 'celo',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x471EcE3750Da237f93B8E339c536989b8978a438',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'cusd',
    image: '',
    chains: [
      {
        name: 'celo',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'ceur',
    image: '',
    chains: [
      {
        name: 'celo',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'ethix',
    image: '',
    chains: [
      {
        name: 'celo',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x9995cc8F20Db5896943Afc8eE0ba463259c931ed',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x4620D7a5F58f77eeE69A38AfdAa8f2FfB10b42b6',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'mcusd',
    image: '',
    chains: [
      {
        name: 'celo',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x918146359264C492BD6934071c6Bd31C854EDBc3',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x3a0EA4e0806805527C750AB9b34382642448468D',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'sol',
    image: '',
    chains: [
      {
        name: 'celo',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x173234922eB27d5138c5e481be9dF5261fAeD450',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'pact',
    image: '',
    chains: [
      {
        name: 'celo',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x46c9757C5497c5B1f2eb73aE79b6B67D119B0B58',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'poof',
    image: '',
    chains: [
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x00400FcbF0816bebB94654259de7273f4A05c762',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'mceur',
    image: '',
    chains: [
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x0D9B4311657003251d1eFa085e74f761185F271c',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'ntmx',
    image: '',
    chains: [
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x123ED050805E0998EBEf43671327139224218e50',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'moo',
    image: '',
    chains: [
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x17700282592D6917F6A73D0bF8AcCf4D578c131e',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'nceurxold',
    image: '',
    chains: [
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x32974C7335e649932b5766c5aE15595aFC269160',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'mceurxold',
    image: '',
    chains: [
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x32974C7335e649932b5766c5aE15595aFC269160',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'mcreal',
    image: '',
    chains: [
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x3D0EDA535ca4b15c739D46761d24E42e37664Ad7',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'mzpn',
    image: '',
    chains: [
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x4d8BF8347600f5207bfdad57363fBa802C9C2031',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'mzpn',
    image: '',
    chains: [
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x4d8BF8347600f5207bfdad57363fBa802C9C2031',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'mcelo',
    image: '',
    chains: [
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x653cC2Cc0Be398614BAd5d5328336dc79281e246',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'mcusdxold',
    image: '',
    chains: [
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x71DB38719f9113A36e14F409bAD4F07B58b4730b',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'mceloxold',
    image: '',
    chains: [
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0x86f61EB83e10e914fc6F321F5dD3c2dD4860a003',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'scelo',
    image: '',
    chains: [
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0xb9B532e99DfEeb0ffB4D3EDB499f09375CF9Bf07',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'rcelo',
    image: '',
    chains: [
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0xBDeedCDA79BAbc4Eb509aB689895a3054461691e',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'nct',
    image: '',
    chains: [
      {
        name: 'celo Alfajores',
        image: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
        address: '0xfb60a08855389F3c0A66b29aB9eFa911ed5cbCB5',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'dai',
    image: 'https://icons.llamao.fi/icons/liquidations/dai.png',
    chains: [
      {
        name: 'goerli',
        image: 'https://icons.llamao.fi/icons/chains/rsz_goerli.png',
        address: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'gnosis',
        image: 'https://icons.llamao.fi/icons/chains/rsz_gnosis.jpg',
        address: '0x44fA8E6f47987339850636F88629646662444217',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'linea',
        image: 'https://icons.llamao.fi/icons/chains/rsz_linea.jpg',
        address: '0x8741Ba6225A6BF91f9D73531A98A89807857a2B3',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'linea',
        image: 'https://icons.llamao.fi/icons/chains/rsz_linea.jpg',
        address: '0xB38E748dbCe79849b8298A1D206C8374EFc16DA7',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'wxdai',
    image: 'https://icons.llamao.fi/icons/liquidations/dai.png',
    chains: [
      {
        name: 'gnosis',
        image: 'https://icons.llamao.fi/icons/chains/rsz_gnosis.jpg',
        address: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'uni',
    image: 'https://icons.llamao.fi/icons/protocols/uni.png',
    chains: [
      {
        name: 'goerli',
        image: 'https://icons.llamao.fi/icons/chains/rsz_goerli.png',
        address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'gnosis',
        image: 'https://icons.llamao.fi/icons/chains/rsz_gnosis.jpg',
        address: '0x4537e328Bf7e4eFA29D05CAeA260D7fE26af9D74',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'gnosis',
        image: 'https://icons.llamao.fi/icons/chains/rsz_gnosis.jpg',
        address: '0x6fd9d7AD17242c41f7131d257212c54A0e816691',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'meth',
    image: '',
    chains: [
      {
        name: 'goerli',
        image: 'https://icons.llamao.fi/icons/chains/rsz_goerli.png',
        address: '0xdD69DB25F6D620A7baD3023c5d32761D353D3De9',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'hny',
    image: '',
    chains: [
      {
        name: 'goerli',
        image: 'https://icons.llamao.fi/icons/chains/rsz_goerli.png',
        address: '0x71850b7E9Ee3f13Ab46d67167341E4bDc905Eef9',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'aave',
    image: 'https://icons.llamao.fi/icons/protocols/aave.png',
    chains: [
      {
        name: 'gnosis',
        image: 'https://icons.llamao.fi/icons/chains/rsz_gnosis.jpg',
        address: '0xDF613aF6B44a31299E48131e9347F034347E2F00',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'donut',
    image: '',
    chains: [
      {
        name: 'gnosis',
        image: 'https://icons.llamao.fi/icons/chains/rsz_gnosis.jpg',
        address: '0x524B969793a64a602342d89BC2789D43a016B13A',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'donut',
    image: 'https://icons.llamao.fi/icons/protocols/balancer.png',
    chains: [
      {
        name: 'gnosis',
        image: 'https://icons.llamao.fi/icons/chains/rsz_gnosis.jpg',
        address: '0x7eF541E2a22058048904fE5744f9c7E4C57AF717',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'wbtc',
    image: 'https://icons.llamao.fi/icons/liquidations/wbtc.png',
    chains: [
      {
        name: 'gnosis',
        image: 'https://icons.llamao.fi/icons/chains/rsz_gnosis.jpg',
        address: '0x8e5bBbb09Ed1ebdE8674Cda39A0c169401db4252',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'optimism',
        image: 'https://icons.llamao.fi/icons/chains/rsz_optimism.jpg',
        address: '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'polygon Mumbai',
        image: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
        address: '0x97e8dE167322a3bCA28E8A49BC46F6Ce128FEC68',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'must',
    image: '',
    chains: [
      {
        name: 'mantle',
        address: '0xa9b72cCC9968aFeC98A96239B5AA48d828e8D827',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'wbit',
    image: '',
    chains: [
      {
        name: 'mantle',
        address: '0x8734110e5e1dcF439c7F549db740E546fea82d66',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'fsx',
    image: '',
    chains: [
      {
        name: 'mantle',
        address: '0x6dFB16bc471982f19DB32DEE9b6Fb40Db4503cBF',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'op',
    image: '',
    chains: [
      {
        name: 'optimism',
        image: 'https://icons.llamao.fi/icons/chains/rsz_optimism.jpg',
        address: '0x4200000000000000000000000000000000000042',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'snx',
    image: '',
    chains: [
      {
        name: 'optimism',
        image: 'https://icons.llamao.fi/icons/chains/rsz_optimism.jpg',
        address: '0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'ageur',
    image: '',
    chains: [
      {
        name: 'optimism',
        image: 'https://icons.llamao.fi/icons/chains/rsz_optimism.jpg',
        address: '0x9485aca5bbBE1667AD97c7fE7C4531a624C8b1ED',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'matic',
    image: 'https://icons.llamao.fi/icons/liquidations/matic.png',
    chains: [
      {
        name: 'polygon',
        image: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
        address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      },
      {
        name: 'polygon Mumbai',
        image: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
        address: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'nitro',
    image: '',
    chains: [
      {
        name: 'polygon',
        image: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
        address: '0x695FC8B80F344411F34bDbCb4E621aA69AdA384b',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'poli',
    image: '',
    chains: [
      {
        name: 'polygon',
        image: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
        address: '0x6fb54Ffe60386aC33b722be13d2549dd87BF63AF',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'lfi',
    image: '',
    chains: [
      {
        name: 'polygon',
        image: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
        address: '0x77D97db5615dFE8a2D16b38EAa3f8f34524a0a74',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'iux',
    image: '',
    chains: [
      {
        name: 'polygon',
        image: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
        address: '0x77D97db5615dFE8a2D16b38EAa3f8f34524a0a74',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'wnt',
    image: '',
    chains: [
      {
        name: 'polygon',
        image: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
        address: '0x82a0E6c02b91eC9f6ff943C0A933c03dBaa19689',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  },
  {
    name: 'pgen',
    image: '',
    chains: [
      {
        name: 'polygon',
        image: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
        address: '0x01d35cbC2070a3B76693Ce2b6364Eae24eb88591',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 0,
      }
    ],
    userLiquidity: 0,
    totalLiquidity: 0,
    volume: 0,
    apy: 0
  }
]

const columns = ['Token', 'Chain', 'Your Liquidity', 'Total Liquidity', 'Volume 24h', 'APY', '']

const Row: React.FC<{ token: any, setToken: any, setChain: any, setImage: any }> = ({ token, setToken, setChain, setImage }) => {
  // Controls whether child rows are displayed as well as the rotated state of the collapse icon
  const [hidden, setHidden] = useState(true);

  return (
    <>
      <tr key={token.name} onClick={(e) => {
        setHidden(!hidden);
      }}>
        {/* Token */}
        <td className="py-5 pr-6 sm:table-cell">
          <div className="flex">
            <div className="avatar mask mask-squircle w-6 h-6 rounded-full">
              {token.image != '' ?
                <Image width={600} height={600} src={token.image} alt={"Icon of " + token.name} />
                : <Image width={600} height={600} src={'https://generative-placeholders.glitch.me/image?width=600&height=300&img=' + token.name} alt={"Icon of " + token.name} />
            }
            </div>
            <span className="text-gray-900 pl-1">{token.name.toUpperCase()}</span>
          </div>
          <div className="mt-1 text-xs leading-5 text-gray-500">
            {token.chains?.length} Chain
            {token.chains?.length > 1 ?
              's' :
              null
            }
          </div>
        </td>
        {/* Chain */}
        <td className="py-5 pr-6 sm:table-cell">
          <div className="text-sm leading-6 text-gray-900">
            <div className="isolate flex -space-x-2 overflow-hidden mt-1">
              {token.chains.map((chain: any) => (
                <div key={chain.name} className="avatar mask mask-squircle w-6 h-6 rounded-full">
                  <Image width={600} height={600} src={chain.image} alt={"Icon of " + chain.name} />
                </div>
              ))}
            </div>
          </div>
        </td>
        {/* Your Liquidity */}
        <td className="py-5 pr-6 sm:table-cell">
          <div className="flex gap-x-6">
            <div className="flex-auto">
              <div className="flex items-start gap-x-3">
                <div className="text-sm font-medium leading-6 text-gray-900">{token.userLiquidity} {token.name.toUpperCase()}</div>
              </div>
              <div className="mt-1 text-xs leading-5 text-gray-500">$0.00 USD</div>
            </div>
          </div>
        </td>
        {/* Total Liquidity */}
        <td className="py-5 pr-6 sm:table-cell">
          <div className="flex gap-x-6">
            <div className="flex-auto">
              <div className="flex items-start gap-x-3">
                <div className="text-sm font-medium leading-6 text-gray-900">{token.totalLiquidity} {token.name.toUpperCase()}</div>
              </div>
              <div className="mt-1 text-xs leading-5 text-gray-500">$0.00 USD</div>
            </div>
          </div>
        </td>
        {/* Volume 24h */}
        <td className="py-5 pr-6 sm:table-cell">
          <div className="flex gap-x-6">
            <div className="flex-auto">
              <div className="flex items-start gap-x-3">
                <div className="text-sm font-medium leading-6 text-gray-900">${token.volume}</div>
              </div>
            </div>
          </div>
        </td>
        {/* APY */}
        <td className="py-5 pr-6 sm:table-cell">
          <div className="flex gap-x-6">
            <div className="flex-auto">
              <div className="flex items-start gap-x-3">
                <div className="text-sm font-medium leading-6 text-gray-900">{token.apy}%</div>
              </div>
            </div>
          </div>
        </td>
        {/* Icon */}
        <td className="py-5 pr-6 sm:table-cell">
          <div className="flex gap-x-3 justify-center">
            {hidden ? <ChevronRightIcon className="w-6 h-6" /> : <ChevronDownIcon className="w-6 h-6" />}
          </div>
        </td>
      </tr>

      {
        hidden ?
          <></>
          :
          <>
            {token.chains.map((chain: any) => (
              <tr key={chain.name}>
                {/* Empty Space */}
                <td className="py-5 pr-6 sm:table-cell">
                  <div className="flex">
                    <div className="avatar mask mask-squircle w-6 h-6 rounded-full">

                    </div>
                    <span className="text-gray-900 pl-1"></span>
                  </div>
                  <div className="mt-1 text-xs leading-5 text-gray-500">
                  </div>
                </td>
                {/* Chain */}
                <td className="py-5 pr-6 sm:table-cell">
                  <div className="flex">
                    <div className="avatar mask mask-squircle w-6 h-6 rounded-full">
                      <Image width={600} height={600} src={"https://icons.llamao.fi/icons/chains/rsz_" + chain.name + '.jpg'} alt={"Icon of " + chain.name} />
                    </div>
                    <span className="text-gray-900 pl-1">{chain.name[0].toUpperCase() + chain.name.slice(1)}</span>
                  </div>
                </td>
                {/* Your Liquidity */}
                <td className="py-5 pr-6 sm:table-cell">
                  <div className="flex gap-x-6">
                    <div className="flex-auto">
                      <div className="flex items-start gap-x-3">
                        <div className="text-sm font-medium leading-6 text-gray-900">{chain.userLiquidity} {token.name.toUpperCase()}</div>
                      </div>
                      <div className="mt-1 text-xs leading-5 text-gray-500">$0.00 USD</div>
                    </div>
                  </div>
                </td>
                {/* Total Liquidity */}
                <td className="py-5 pr-6 sm:table-cell">
                  <div className="flex gap-x-6">
                    <div className="flex-auto">
                      <div className="flex items-start gap-x-3">
                        <div className="text-sm font-medium leading-6 text-gray-900">{chain.totalLiquidity} {token.name.toUpperCase()}</div>
                      </div>
                      <div className="mt-1 text-xs leading-5 text-gray-500">$0.00 USD</div>
                    </div>
                  </div>
                </td>
                {/* Volume 24h */}
                <td className="py-5 pr-6 sm:table-cell">
                  <div className="flex gap-x-6">
                    <div className="flex-auto">
                      <div className="flex items-start gap-x-3">
                        <div className="text-sm font-medium leading-6 text-gray-900">${chain.volume}</div>
                      </div>
                    </div>
                  </div>
                </td>
                {/* APY */}
                <td className="py-5 pr-6 sm:table-cell">
                  <div className="flex gap-x-6">
                    <div className="flex-auto">
                      <div className="flex items-start gap-x-3">
                        <div className="text-sm font-medium leading-6 text-gray-900">{chain.apy}%</div>
                      </div>
                    </div>
                  </div>
                </td>
                {/* Buttons */}
                <td className="py-5 pr-6 sm:table-cell text-center align-middle items-center content-center place-content-center justify-center place-self-center">
                  <div className="flex gap-x-3 text-center align-middle items-center content-center place-content-center justify-center place-self-center">
                    <label onClick={(e) => {
                      setToken(token.name);
                      setChain(chain.name);
                      setImage(token.image);
                    }} htmlFor="add-liquidity-modal" className="btn btn-circle btn-sm btn-secondary btn-outline align-middle place-content-center justify-center place-self-center">
                      <PlusIcon className="w-6 h-6" />
                    </label>

                    <label onClick={(e) => {
                      setToken(token.name);
                      setChain(chain.name);
                      setImage(token.image);
                    }} htmlFor="remove-liquidity-modal" className="btn btn-circle btn-sm btn-secondary btn-outline align-middle">
                      <MinusIcon className="w-6 h-6" />
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </>
      }
    </>
  )
}

export function Liquidity() {
  const [hydrated, setHydrated] = useState(false);
  const [tokenInput, setToken] = useState(' ');
  const [chainInput, setChain] = useState(' ');
  const [imageInput, setImage] = useState('');

  useEffect(() => {
    // This forces a rerender, so the date is rendered
    // the second time but not the first
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <>
      <div className='mb-10 mt-6 w-full grid-cols-3 gap-4 xl:grid'>
        <div className="col-span-1">
          <div className="h-fullgrid grid-cols-2 gap-1 md:grid-cols-1 w-full md:gap-4">
            <div className="card bg-base-0 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  <ArrowUpTrayIcon className="w-6 h-6" />
                  Your Total Liquidity
                </h2>
                <div className="stat-value">$0.00</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="h-fullgrid grid-cols-2 gap-1 md:grid-cols-1 w-full md:gap-4">
            <div className="card bg-base-0 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  <ArrowTrendingUpIcon className="w-6 h-6" />
                  Your Liquidity Fee Earnings
                </h2>
                <div className="stat-value">$0.00</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="h-fullgrid grid-cols-2 gap-1 md:grid-cols-1 w-full md:gap-4">
            <div className="card bg-base-0 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  <TrophyIcon className="w-6 h-6" />
                  Your Total Farming Rewards&nbsp;
                  <button className="btn btn-sm btn-primary btn-outline align-middle">
                    <div className="inline-flex items-center">
                      Claim
                    </div>
                  </button>
                </h2>

                <div className="stat-value">$0.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-0 shadow-xl mb-10">
        <div className="card-body">
          <div className="overflow-x-auto max-h-min">
            <div className="mt-6 overflow-hidden border-t border-gray-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <table className="table min-w-full text-left">
                  <colgroup>
                    <col className="" />
                    <col className="w-72" />
                    <col className="" />
                    <col className="" />
                    <col className="" />
                    <col className="" />
                    <col className="w-28" />
                  </colgroup>
                  <thead>
                    <tr>
                      {columns.map((column) =>
                        <th scope="col" key={column}>{column}</th>
                      )}
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map((token) => (
                      <Row key={token.name} token={token} setToken={setToken} setChain={setChain} setImage={setImage} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddLiquidityModal tokenInput={tokenInput} chainInput={chainInput} imageInput={imageInput} />
      <RemoveLiquidityModal chainInput={chainInput} />
    </>
  )
}
