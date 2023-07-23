import { WagmiConfig, configureChains, createClient } from "wagmi";
import { goerli, celoAlfajores, celo, gnosis, arbitrum, arbitrumGoerli, optimism, polygon, polygonMumbai, avalanche, avalancheFuji } from '@wagmi/chains'
import { ConnectKitProvider } from "connectkit";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { Chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'

export const linea = {
  id: 59140,
  name: 'Linea Testnet',
  network: 'Linea Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://rpc.goerli.linea.build'] },
    default: { http: ['https://linea-goerli.infura.io/v3/' + process.env.INFURA as string] },
  },
} as const satisfies Chain

export const mantle = {
  id: 5001,
  name: 'Mantle Testnet',
  network: 'Mantle Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Mantle',
    symbol: 'MNT',
  },
  rpcUrls: {
    public: { http: ['https://rpc.testnet.mantle.xyz'] },
    default: { http: ['https://rpc.testnet.mantle.xyz'] },
  },
} as const satisfies Chain

console.log(process.env.NEXT_PUBLIC_WALLETCONNECT)

const { chains, provider, webSocketProvider } = configureChains(
  [goerli, celoAlfajores, celo, gnosis, linea, mantle, arbitrum, arbitrumGoerli, optimism, polygon, polygonMumbai, avalanche, avalancheFuji],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://few-soft-bird.ethereum-goerli.discover.quiknode.pro/${process.env.NEXT_PUBLIC_QUICKNODE as string}`,
      }),
    }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://celo-alfajores.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA as string}`,
      }),
    }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://celo-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA as string}`,
      }),
    }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: 'https://rpc.ankr.com/gnosis',
      }),
    }),
    publicProvider(),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://arbitrum-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA as string}`,
      }),
    }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://arbitrum-goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA as string}`,
      }),
    }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://optimism-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA as string}`,
      }),
    }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://optimism-goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA as string}`,
      }),
    }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA as string}`,
      }),
    }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://polygon-mumbai.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA as string}`,
      }),
    }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://avalanche-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA as string}`,
      }),
    }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://avalanche-fuji.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA as string}`,
      }),
    })
  ],
);

const client = createClient({
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'ArbX',
        headlessMode: true,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT as string,
      },
    }),
    new InjectedConnector({
      chains,
    })
  ],
  autoConnect: true,
  provider,
  webSocketProvider
});

type Props = {
  children: any;
};

export function Page({ children }: Props): JSX.Element {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <div className="min-h-screen">
          {children}
        </div>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};
