import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app'

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { bsc , sepolia } from 'wagmi/chains'; // version "^1.2.1"
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [bsc],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Metta",
  projectId: "bf4b1e058833c937b30ecbf93afa757f",
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export default function App({ Component, pageProps }: AppProps) {
  return <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      <Component {...pageProps} />
    </RainbowKitProvider>
  </WagmiConfig>
}
