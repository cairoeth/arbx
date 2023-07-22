import React from 'react'
import { useEffect, useState } from 'react'
import { Page } from 'components/ui/page'
import { Navbar } from 'components/ui/navbar'
import { Footer } from 'components/ui/footer'
import { Portfolio } from "components/dashboard/portfolio"
import { Trades } from "components/dashboard/trades"
import { useAccount } from 'wagmi'
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";
import Link from 'next/link'

export default function App() {
  useEffect(() => {
    document.title = "Dashboard - ArbX";
    document.documentElement.setAttribute("data-theme", "winter");
    document.documentElement.className = 'bg-base-300';
  });

  const { address, connector, isConnected } = useAccount()
  const [_isConnected, _setIsConnected] = useState(false);

  useEffect(() => {
    _setIsConnected(isConnected);
  }, [isConnected]);

  if (_isConnected) {
    return (
      <Page>
        <Navbar />
        <div className="px-4 py-4 sm:px-6 lg:px-40 bg-base-300 gap-y-2">
          <Portfolio />
          <Trades />
        </div>
        <Footer />
      </Page>
    )
  }

  return (
    <Page>
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-40 bg-base-300 gap-y-2">

        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-28 sm:py-44 lg:py-48">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              The first cross-chain arbitrage protocol. <Link href="https://ethglobal.com/showcase/arbx" className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></Link>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">ArbX</h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {`Optimizing price rates across more than 100 decentralized exchanges in 20 chains.`}</p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <ConnectKitButton />
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-20rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-40rem)]">
            <svg className="relative left-[calc(50%)] h-[14.1875rem] max-w-none -translate-x-1/2 sm:h-[34.375rem]" viewBox="0 0 1155 678">
              <path fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)" fillOpacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
              <defs>
                <linearGradient id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9089FC" />
                  <stop offset="1" stopColor="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <Footer />
    </Page>
  )
}
