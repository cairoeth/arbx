import { WagmiConfig, configureChains, createClient } from "wagmi";
import { goerli, gnosis, optimism, scrollTestnet } from "wagmi/chains";
import { ConnectKitProvider } from "connectkit";
import { infuraProvider } from 'wagmi/providers/infura'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { Chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

export const polygonZkEvmTestnet = {
  id: 1442,
  name: 'Polygon zkEVM Testnet',
  network: 'Polygon zkEVM Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://rpc.public.zkevm-test.net'] },
    default: { http: ['https://rpc.public.zkevm-test.net'] },
  },
} as const satisfies Chain

const { chains, provider, webSocketProvider } = configureChains(
  [goerli, gnosis, optimism, scrollTestnet, polygonZkEvmTestnet],
  [
    infuraProvider({ apiKey: process.env.INFURA as string, stallTimeout: 1_000 }),
    publicProvider(),
    publicProvider(),
    publicProvider(),
    publicProvider()
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
        projectId: '5245c2597c09eaa73a4e6fa3209e623e',
        showQrModal: true,
      },
    }),
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
